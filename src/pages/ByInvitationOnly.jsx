import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cursor from '../components/Cursor';
import './Faultlines.css';

const Sun = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const Moon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}

/* ImgSlot: shows a real image when src is provided, styled placeholder otherwise. */
function ImgSlot({ src, alt, aspect = '16/9', caption, wide, objectPosition = 'center' }) {
  return (
    <figure className={wide ? 'essay-fig essay-fig--wide' : 'essay-fig'}>
      {src ? (
        <div className="essay-img-wrap" style={{ aspectRatio: aspect }}>
          <img
            src={src}
            alt={alt || caption || ''}
            className="essay-img"
            style={{ objectPosition }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="essay-img-placeholder" style={{ aspectRatio: aspect }}>
          <div className="essay-img-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* Wikimedia Commons CC-licensed image URLs */
const IMGS = {
  sf:           'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg/1920px-San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg',
  naval:        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Naval_Ravikant_in_2011.jpg/960px-Naval_Ravikant_in_2011.jpg',
  horowitz:     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Ben_Horowitz_at_TechCrunch_Disrupt.jpg/960px-Ben_Horowitz_at_TechCrunch_Disrupt.jpg',
  marc:         'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Marc_Andreessen-9.jpg/960px-Marc_Andreessen-9.jpg',
};

function Pullquote({ children }) {
  return (
    <blockquote className="essay-pullquote reveal">
      {children}
    </blockquote>
  );
}

function SectionHead({ marker, title }) {
  return (
    <div className="essay-section-head reveal">
      {marker && <span className="essay-section-num">{marker}</span>}
      <h2 className="essay-section-title">{title}</h2>
    </div>
  );
}

function Src({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="essay-inline-src">
      {children}
    </a>
  );
}

export default function ByInvitationOnly() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );
  const progress = useReadingProgress();
  const bodyRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const els = bodyRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Cursor />

      {/* Reading progress bar */}
      <div className="reading-bar" style={{ transform: `scaleX(${progress})` }} />

      {/* Nav */}
      <nav className="nav">
        <Link to="/" className="nav-logo">EY</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">← home</Link>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      </nav>

      <article ref={bodyRef}>

        {/* ── Hero ─────────────────────────────────── */}
        <header className="essay-hero">
          <div className="essay-hero-inner">

            <div className="essay-eyebrow reveal">
              The Hidden Curriculum of Leadership &nbsp;·&nbsp; Essay 2
            </div>

            <div className="essay-title-block">
              <h1 className="essay-display-title reveal" style={{ fontSize: 'clamp(40px, 5.8vw, 84px)' }}>
                By Invitation Only
              </h1>
              <div className="essay-title-aside reveal">
                <div className="essay-title-aside-label">On</div>
                <div className="essay-title-aside-desc">
                  Networks, rooms, and the filter that every great team runs. Whether they know it or not.
                </div>
                <div className="essay-title-aside-desc" style={{ marginTop: '14px' }}>
                  Why the meritocracy story is more comfortable than true, and what the best founders actually do instead.
                </div>
              </div>
            </div>

            <div className="essay-byline reveal">
              <span>by Ethan Yip</span>
              <span className="essay-byline-dot" />
              <span>June 2026</span>
            </div>

          </div>
        </header>

        {/* ── Body ─────────────────────────────────── */}
        <div className="essay-body">

          <p className="essay-p reveal">
            The startup world is deeply in love with the word "meritocracy". You must find the best talent, open applications, blind reviews. We've built entire systems around the idea that great teams can only be assembled via fair and open process. That's absolutely how you build a great team.
          </p>

          <p className="essay-p reveal">
            However, every <em>exceptional</em> team was built the exact opposite way. Closed networks, warm introductions, and very deliberate decisions about who is allowed to be near the vision. The invitation was never open. The filter was and always will be there. The only question is whether you ran it on purpose or not.
          </p>

          <p className="essay-p reveal">
            This essay is about the invitation: what it actually is, and what the right people do to the rooms they walk into. Every time I have watched someone try to fix a broken one, it has already been too little too late.
          </p>

          <div className="reveal">
            <ImgSlot
              src={IMGS.sf}
              alt="San Francisco from the Marin Headlands, March 2019"
              aspect="16/9"
              objectPosition="center center"
              caption="San Francisco from the Marin Headlands. The city that runs the invitation harder than anywhere else in the world. Photo: King of Hearts / CC BY-SA 4.0"
              wide
            />
          </div>

          {/* ── Section I ──────────────────────────── */}
          <SectionHead
            marker="I"
            title="The first story is about what an invitation actually is."
          />

          <p className="essay-p reveal">
            Hiring is usually talked about as a transaction. You give someone a salary, they give you a function, and the whole thing is bounded and replaceable on both sides.
          </p>

          <p className="essay-p reveal">
            The best early team decisions I have seen weren't transactions. They felt more like declarations. Someone looked at another person and made a call that was never truly about the role at all. I think that difference matters more than most hiring frameworks acknowledge, and it carries something a contract doesn't.
          </p>

          <p className="essay-p reveal">
            This is what elite universities are actually selling, and it is almost never the curriculum. The room is the product. Put enough people operating at high standards together and those standards become ambient. You stop feeling like you are pushing and start feeling like things just naturally work that way. I have watched this happen in classrooms and I have watched it happen in early teams. The natural environment will do more work than the culture you try to artificially induce.
          </p>

          <p className="essay-p reveal">
            The same thing runs through old money circles, through the networks that move serious capital, through rooms I have only recently had the chance to observe. People cluster not just because of shared taste but because the room shapes what is visible: what risks feel possible, what timescale feels normal. The invitation is into a way of seeing, not just a seat at the table.
          </p>

          <ImgSlot
            src={IMGS.naval}
            alt="Naval Ravikant at Startup School 2011"
            aspect="3/2"
            objectPosition="center top"
            caption="Naval Ravikant at Startup School, 2011. Photo: Steve Jurvetson / CC BY-SA 2.0"
            wide
          />

          <p className="essay-p reveal">
            One of my favorite quotes of all time is Naval Ravikant's: <em>play long-term games with long-term people.</em> Good things take time. The only people who stay long enough for good things to materialize are the ones who accepted a declaration, not a deal. Short term players optimize for the next move. Long term players optimize for what compounds. That distinction begins with the invitation.
          </p>

          {/* ── Section II ─────────────────────────── */}
          <SectionHead
            marker="II"
            title="The second story is about what A players do to the room."
          />

          <ImgSlot
            src={IMGS.horowitz}
            alt="Ben Horowitz at TechCrunch Disrupt"
            aspect="3/2"
            objectPosition="center top"
            caption="Ben Horowitz at TechCrunch Disrupt. Photo: TechCrunch / CC BY 2.0"
            wide
          />

          <p className="essay-p reveal">
            Ben Horowitz in{' '}
            <Src href="https://a16z.com/books/the-hard-thing-about-hard-things/">
              The Hard Thing About Hard Things
            </Src>
            {' '}makes the argument that most startup founders need to hear: hire for the right kind of ambition, people who want the company to succeed and see their own success as a byproduct of that. Hire for genuine strengths, not for lack of weaknesses. Set a high standard and defend it actively. It is the right framework, and I think there is something worth adding to it.
          </p>

          <p className="essay-p reveal">
            The most important part about A players is not just about what they do in a room, but what they do <em>to</em> the room.
          </p>

          <p className="essay-p reveal">
            Different problems become visible. Different things start feeling unacceptable. In an interview with HBS professor Anita Elberse, Toto Wolff said that finishing third or fourth was not just a learning moment. It was a defeat, and it should be treated as such. That standard did not live in a document. It lived in the people. The moment the room changes, the standard changes with it. Not officially, but perceptually, and usually before anyone has named what just happened.
          </p>

          <p className="essay-p reveal">
            I have personally found myself guilty of this. And I think it's a broad human thing: we calibrate to the people around us and shift our expectations to protect ourselves. Cialdini calls it being driven by social proof. Others call it{' '}
            <Src href="https://en.wikipedia.org/wiki/Asch_conformity_experiments">
              normative influence
            </Src>
            . Whatever you call it, you will have a team that either keeps the bar high and executes there, or slowly sinks into the abyss.
          </p>

          <p className="essay-p reveal">
            Agency, standards, vision, culture. These are the traits that matter in A players, and what I have come to think is that you don't find them by screening for them. You write an invitation clear enough that people who already carry those things can recognize themselves in it.
          </p>

          <p className="essay-p reveal">
            Look at the density of talent at Anthropic right now. That did not happen because they ran better interviews. It happened because the mission was written specifically enough that a certain kind of person felt it was addressed to them personally. A vague invitation attracts vague people, not because the candidates are wrong, but because the game wasn't made specific enough for the right ones to see themselves in it.
          </p>

          <ImgSlot
            src={IMGS.marc}
            alt="Marc Andreessen"
            aspect="3/2"
            objectPosition="center top"
            caption="Marc Andreessen, co-founder of Andreessen Horowitz. Photo: TechCrunch / CC BY 2.0"
            wide
          />

          <p className="essay-p reveal">
            Marc Andreessen makes a point that fits here:{' '}
            <Src href="https://pmarchive.com/guide_to_startups_part4.html">
              hire for drive, curiosity, and ethics over raw intelligence
            </Src>
            . He explicitly rejects the Microsoft logic puzzle model and the Google PhD pipeline as reliable predictors of company success.
          </p>

          <p className="essay-p reveal">
            A credential tells you someone performed well inside a system that already existed. Character is what you need when the system doesn't exist yet. Both matter, but they are not the same thing, and the invitation you write will signal which one you are actually screening for.
          </p>

          <p className="essay-p reveal">
            Steven Bartlett hired someone with a two-line CV and zero experience because she thanked the security guard by name on the way into the building. That said more about the room he was building at Flightstory than it did about the hire herself.
          </p>

          <Pullquote>
            He wasn't dismissing the credential. He was reading the character.
          </Pullquote>

          {/* ── Section III ────────────────────────── */}
          <SectionHead
            marker="III"
            title="The third story is about what B players do to the room."
          />

          <p className="essay-p reveal">
            B players are not just people who underperform. For me, that is a convenient yet incomplete way to think about it.
          </p>

          <p className="essay-p reveal">
            B players change the room the same way A players do, just in the other direction. Standards that felt fixed start to feel negotiable. Problems that an A player would have surfaced in week one go unnamed for months. The things that made the room exceptional begin to feel like too much rather than just normal, and over time the people around them start adjusting down to meet the new ambient level. This isn't a character judgment on anyone. It is just how environments work. The room wins, eventually.
          </p>

          <p className="essay-p reveal">
            This is what Bartlett means when he says one bad apple can spoil the bunch, and it is also what makes those first ten hires so consequential. You are not just hiring people. You are setting the environmental conditions that everyone who comes after them will be shaped by without realizing it.
          </p>

          <p className="essay-p reveal">
            The encouraging part of this is that B players in a room of A players can actually become A players themselves. Put someone in an environment where the standard is high enough and the environment does a lot of the lifting. Elite institutions have known this for a long time. The classroom is the product.
          </p>

          <p className="essay-p reveal">
            None of this means B players are simply bad people or bad hires. Sometimes the person you are calling a B player just sees the problem differently, and that perspective is worth having in the room. The issue is not the individual. It is what happens when too many people who don't share the same alignment start shaping the environment together. At that point it stops being a diversity of perspective and starts being a drift in direction, and nobody can quite explain how you got there.
          </p>

          {/* ── Section IV ─────────────────────────── */}
          <SectionHead
            marker="IV"
            title="What believers and executors do to the invitation."
          />

          <p className="essay-p reveal">
            There are only so many believers, and the hard part isn't finding them. It is that in an interview, genuine belief and a good performance of belief look almost identical.
          </p>

          <p className="essay-p reveal">
            Believers and paid executors aren't different performance tiers. They are people playing different games on different timescales, and when a genuine fork appears, they make different decisions. A believer is building toward an end state. A paid executor is building toward the next deliverable. Those two visions can produce the same behavior for months before anyone notices the divergence.
          </p>

          <p className="essay-p reveal">
            The motive misread is the specific version of this that founders almost never catch in time. Instead, it shows up in direction, in what someone prioritizes when no one is forcing them to, in what they get excited about between formal conversations.
          </p>

          <p className="essay-p reveal">
            Jason Xu and Ruoyu Xu at Resonance, cousins who have been building together since elementary school, are an extreme version of what aligned timescales actually look like at the founding level. Not because of the family relationship, but because decades of shared history likely means the game between them is settled before anyone sits down.{' '}
            <Src href="https://hbr.org/2013/12/the-founders-dilemma">
              Noam Wasserman at Harvard found that 65% of high-potential startups fail from co-founder conflict
            </Src>
            . Most of that is essentially two people who accepted different invitations to the same thing, and never figured out how to surface the divergence before it cost them everything.
          </p>

          <Pullquote>
            You learn more in the ten minutes after a meeting than in the meeting itself.
          </Pullquote>

          {/* ── Pivot ──────────────────────────────── */}
          <SectionHead title="Why does this matter to you as a leader, founder, or investor?" />

          <p className="essay-p reveal">
            Every team is already, in one way or another, by invitation only. The meritocracy story is more comfortable, and easier to put in a pitch deck. But it is not entirely wrong either. Merit does matter. But merit still has to get into the room to matter. Who gets evaluated, by what standard, and in front of whom are all questions about the invitation before they are questions about merit. The filter is always there, running on whatever criteria you established, on purpose or not.
          </p>

          <p className="essay-p reveal">
            A vague invitation produces a vague team. A transactional one produces a team that leaves when the transaction stops making sense. A declaration that says clearly what you are building, for how long, and at what standard produces the thing that actually grows. And the people who accept that kind of invitation tend to leave the room different from how they found it.
          </p>

          <p className="essay-p reveal">
            At HTSI I think about this more than almost anything else. It is easy to let people in on enthusiasm, on what someone says they believe when you are watching. It is much harder to build an invitation specific enough that the right people recognize themselves in it and the wrong ones quietly don't. I don't think we have fully figured that out yet. But it is probably the most important thing to get right.
          </p>

          {/* ── Personal ───────────────────────────── */}
          <SectionHead title="The final story is about a startup, and getting this wrong." />

          <p className="essay-p reveal">
            2 years ago I was working on a fast-moving startup, operating across different cities, the kind of thing where growth was entirely reliant on network effects, which meant you had to keep the velocity up just to maintain the slope. There was a genuine product. There were actual users. And at some point, without me noticing, something in the room changed.
          </p>

          <p className="essay-p reveal">
            The mismatch that surfaced was almost invisible at first. Nothing explicitly wrong was being done. What emerged slowly was a difference in direction: expanding a free user base as wide as possible versus protecting the roughly two hundred users who were driving most of the revenue. Both are real strategies. But they belong to different games. One builds toward a fundraising story, toward acquisition metrics, toward the kind of growth that looks good in a deck. The other builds toward the users who notice when growth features start crowding out the core experience, and the product begins to feel like it was built for someone else.
          </p>

          <p className="essay-p reveal">
            What I didn't expect was where the first sign originated. It didn't come from inside the team. It came from the users. The devoted ones sensed the shift in direction before we had named it internally. They felt the product changing timescale and started leaving. The room's perception had already moved. Our conversations just hadn't caught up yet.
          </p>

          <p className="essay-p reveal">
            Nothing the other person did was wrong in isolation. But it was misaligned with what I saw, and with what the users were depending on. And that misalignment changed how the users experienced us, which is a cost that almost never makes it onto a post-mortem analysis.
          </p>

          <div className="essay-callout reveal">
            <div className="essay-callout-rule" />
            <div className="essay-callout-text">
              There are not truly many bad hires. There are <strong>incorrect hires</strong>, and the difference matters. The wrong hire is not about the person. It is a mirror of the invitation that let them in. Fix the invitation.
            </div>
          </div>

          <p className="essay-p reveal">
            If the same misread keeps happening with different faces, you haven't written the invitation specific enough about the game you are playing.
            <br /><br />
            Good things take time. And as I mentioned earlier, Naval said it best: <em>play long-term games with long-term people.</em> And long-term people need an invitation that was never truly about the role.
            <br /><br />
            The best rooms that you have watched, that you are entering, and that you will build are all constructed in the same way:
            <br /><br />
            By Invitation Only.
          </p>

          {/* ── Sources ────────────────────────────── */}
          <div className="essay-sources reveal">
            <div className="essay-sources-label">Sources &amp; Further Reading</div>
            <ul className="essay-sources-list">
              {[
                { label: 'Ben Horowitz, The Hard Thing About Hard Things', href: 'https://a16z.com/books/the-hard-thing-about-hard-things/' },
                { label: 'Marc Andreessen: Guide to Startups, Part 4 — Hiring', href: 'https://pmarchive.com/guide_to_startups_part4.html' },
                { label: 'Toto Wolff at Harvard Business School on maintaining standards', href: 'https://www.mercedesamgf1.com/news/toto-wolff-to-teach-in-harvard-business-schools-mba-program' },
                { label: 'HBR: Anita Elberse on Mercedes leadership lessons', href: 'https://hbr.org/2022/11/number-one-in-formula-one' },
                { label: 'Steven Bartlett on the first ten people and company culture', href: 'https://www.youtube.com/watch?v=HlfjCtXe9lU' },
                { label: 'Naval Ravikant on long term games with long term people', href: 'https://nav.al/long-term' },
                { label: 'Noam Wasserman, The Founder\'s Dilemma, on co-founder conflict', href: 'https://hbr.org/2013/12/the-founders-dilemma' },
              ].map((s, i) => (
                <li key={i} className="essay-source-item">
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="essay-footer reveal">
            <Link to="/" className="essay-footer-back">← Back to home</Link>
            <span className="essay-footer-series">Essay 2 of 10: The Hidden Curriculum of Leadership</span>
          </div>

        </div>
      </article>
    </>
  );
}
