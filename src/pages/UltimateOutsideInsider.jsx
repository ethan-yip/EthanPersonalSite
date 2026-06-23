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

const IMGS = {
  dyson:     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/James_Dyson_4.jpg/1280px-James_Dyson_4.jpg',
  armstrong: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Brian_Armstrong_-_TechCrunch_Disrupt_2018_02.jpg/960px-Brian_Armstrong_-_TechCrunch_Disrupt_2018_02.jpg',
  paulGraham:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Paul_Graham_programming.jpg/960px-Paul_Graham_programming.jpg',
  thiel:     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Peter_Thiel_by_Dan_Taylor.jpg/960px-Peter_Thiel_by_Dan_Taylor.jpg',
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

export default function UltimateOutsideInsider() {
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
              The Hidden Curriculum of Leadership &nbsp;·&nbsp; Essay 3
            </div>

            <div className="essay-title-block">
              <h1 className="essay-display-title reveal" style={{ fontSize: 'clamp(30px, 4vw, 62px)', lineHeight: 1.08 }}>
                The Ultimate Outside Insider
              </h1>
              <div className="essay-title-aside reveal">
                <div className="essay-title-aside-label">On</div>
                <div className="essay-title-aside-desc">
                  The sequence the startup world always leaves out.
                </div>
                <div className="essay-title-aside-desc" style={{ marginTop: '14px' }}>
                  Why the people who actually changed the games they entered almost never started with the rulebook.
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
            The startup world has a phrase it delivers to every founder who is just getting started. Learn by building. Ship it now. Build and iterate faster. Get in the market before you are ready.
          </p>

          <p className="essay-p reveal">
            This is all true. But crucially, they all leave out the same thing.
          </p>

          <p className="essay-p reveal">
            Walk into any room of founders and they will sound remarkably similar. Same vocabulary, same mental models, same frameworks. Walk into a room of VCs and the pattern repeats. This is not a coincidence. Most of them read the same playbooks and learned the game the same way.{' '}
            <Src href="https://en.wikipedia.org/wiki/James_Dyson">James Dyson</Src>{' '}
            said it plainly: <em>be different for the sake of being different.</em> Because the person who starts from the same place as everyone else ends up in the same place.
          </p>

          <p className="essay-p reveal">
            What never makes it into "learn by building" is the sequence. The people who actually changed the games they entered almost never started with the rulebook.
          </p>

          <p className="essay-p reveal">
            This essay is about the outside insider, and how they play the game.
          </p>

          {/* ── Dyson wide image ─────────────────────── */}
          <div className="reveal">
            <ImgSlot
              src={IMGS.dyson}
              alt="James Dyson at a product presentation"
              aspect="3/2"
              objectPosition="center center"
              caption="James Dyson. The engineer who built 5,127 prototypes before getting the vacuum right — and made that number the brand. Photo: Michiel Hendryckx / CC BY-SA 3.0"
              wide
            />
          </div>

          {/* ── Section I ────────────────────────────── */}
          <SectionHead
            marker="I"
            title="The first story is about trying the game."
          />

          <p className="essay-p reveal">
            I remember my first real software engineering experience. It was nothing fancy. This was a time before ChatGPT, Cursor, Claude Code. I was manually building websites by hand and trying to figure out how to center a div and make it blue on Stack Overflow. Truly, the good old days.
          </p>

          <p className="essay-p reveal">
            I didn't know it then, but I had some incredible mentors around me. Jason, who went to M&T and then founded Resonance. Max, who went to Duke and then Kalshi. Daniel, who also went to Penn and then Photon. Agni. Daniel Achacon. And so many others I am not mentioning here. I was doing the work, but something was not totally right for me yet. I didn't have the vocabulary to fully process what I was watching.
          </p>

          <p className="essay-p reveal">
            What I noticed first was not the technical skill. Don't misunderstand. These people were incredibly technical. What I was watching was how they moved in rooms. How they talked to each other when something went wrong. How they decided what to push and when to let something go. How they could read a situation before it had fully resolved itself.
          </p>

          <p className="essay-p reveal">
            I remember Daniel telling me something along the lines of: "cut the corporate jargon, nobody is going to get fired, just tell me what is going on." None of this was in any document I had access to. It was just a result of being in the room with people operating at a frequency I wasn't resonating at yet.
          </p>

          <p className="essay-p reveal">
            Then I tried to replicate it. Star Hack, 2023: an international coalition and ranking system for hackathon participants, designed to be financeable and scalable in a space that was slightly less saturated than it is now. Built on everything I had absorbed from those rooms. It did not work. Not because the idea was structurally wrong, but because watching someone play a game and playing it yourself are completely different kinds of knowledge. The rulebook I was trying to follow was the one I had assembled in my head from observation, and it turned out to be full of gaps I had not found yet.
          </p>

          <p className="essay-p reveal">
            Brian Armstrong, CEO of Coinbase, has a line he credits to Paul Graham:{' '}
            <Src href="https://tim.blog/2021/03/08/brian-armstrong/">action produces information.</Src>{' '}
            If you do not know what to do, just do something, because the doing will tell you what to do next. He said it was true at Coinbase: sometimes he shipped something and the moment it went live, he knew it was wrong. But that gave him the idea for what to do next.
          </p>

          {/* ── Armstrong image ───────────────────────── */}
          <div className="reveal">
            <ImgSlot
              src={IMGS.armstrong}
              alt="Brian Armstrong at TechCrunch Disrupt 2018"
              aspect="16/9"
              objectPosition="center top"
              caption="Brian Armstrong, CEO of Coinbase, at TechCrunch Disrupt 2018. Photo: TechCrunch / CC BY 2.0"
            />
          </div>

          <Pullquote>
            Playing without the rulebook does not just produce information. It produces different information than playing with it.
          </Pullquote>

          <p className="essay-p reveal">
            The person who enters a game without the manual asks questions that the manual has already answered for everyone else. They notice structural realities that veterans have long since explained away. They find the edges of the game that the conventional approach has been trained to skip past. Star Hack failing fast was not a waste. It was my first data. The gaps between what I expected and what actually happened were the most valuable thing I had collected since those rooms.
          </p>

          <p className="essay-p reveal">
            The opportunity when you play before you know the rules: you get to learn the game unlike anyone who played it with the rulebook first. Do not waste it.
          </p>

          {/* ── Section II ───────────────────────────── */}
          <SectionHead
            marker="II"
            title="The second story is about learning the game."
          />

          <p className="essay-p reveal">
            Most people who play the game without the rulebook eventually get the rulebook and stop there. They fold the early lessons into the conventional framework and move forward. That is also leaving something out.
          </p>

          <p className="essay-p reveal">
            <Src href="https://paulgraham.com/think.html">Paul Graham's argument in How to Think for Yourself</Src>{' '}
            is specific: some kinds of work can only be done well by people who think differently from everyone else. Scientists, investors, and founders cannot win by being right about what everyone else is already right about. They have to be right about something that most people are currently wrong about. And the problem with full immersion in a game is that the game starts teaching you what to think. The inside insider loses the angle that made them dangerous. The independent-mindedness that was the source of every real insight gets gradually replaced by fluency in the existing frameworks.
          </p>

          {/* ── Paul Graham image ─────────────────────── */}
          <div className="reveal">
            <ImgSlot
              src={IMGS.paulGraham}
              alt="Paul Graham programming at a laptop"
              aspect="4/3"
              objectPosition="center top"
              caption="Paul Graham, co-founder of Y Combinator. His essay How to Think for Yourself is one of the clearest articulations of why the outside insider position matters. Photo: Gabor Cselle / CC BY 2.0"
            />
          </div>

          <p className="essay-p reveal">
            This is where the outside insider position matters, and why it has to be built deliberately rather than stumbled into.
          </p>

          <p className="essay-p reveal">
            Not a pure insider. Not captured by the assumptions of the game, not fluent enough in its orthodoxy to mistake the map for the territory. But not a pure outsider either. You still need actual access. Actual information. You need to develop an understanding of what the other side of the table is evaluating before you walk into the room.
          </p>

          <p className="essay-p reveal">
            For me, this looked like learning venture from the startup side. Understanding term sheets and round structure and bridge financing and the logic of financial viability through conversation, through study, and through proximity to people already inside the game. I still am nowhere near knowing it fully. I just know enough of the macro to hold both sides of the table in mind simultaneously.
          </p>

          <Pullquote>
            The outside insider learns the rules in order to understand why what they found without them actually matters.
          </Pullquote>

          {/* ── Section III ──────────────────────────── */}
          <SectionHead
            marker="III"
            title="The third story is about coming back to the game."
          />

          <p className="essay-p reveal">
            <Src href="https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296">Peter Thiel's argument in Zero to One</Src>{' '}
            is that every great business is built on a secret: something true that almost nobody else believes yet. The outside insider is the only position from which those secrets become consistently visible. Pure insiders have accepted the conventional wisdom and can no longer see what it conceals. Pure outsiders do not have the actual access. The outside insider holds both, which is why the contrarian bet that looks wrong from inside the game and invisible from outside it is, from that position, the most legible move available.
          </p>

          {/* ── Thiel image ───────────────────────────── */}
          <div className="reveal">
            <ImgSlot
              src={IMGS.thiel}
              alt="Peter Thiel at a conference"
              aspect="16/9"
              objectPosition="center top"
              caption="Peter Thiel, co-founder of PayPal and Palantir, author of Zero to One. Photo: Dan Taylor / Heisenberg Media / CC BY 2.0"
            />
          </div>

          <p className="essay-p reveal">
            Most founders and investors are optimizing inside the existing system. Competing for the same signals, the same markets, the same categories. The rulebook teaches that. It is fundamentally a zero-sum document: read it and you learn how to fight for your share of what already exists.
          </p>

          <p className="essay-p reveal">
            The outside insider sees something different. The game is not zero-sum. It never was. Business is not zero-sum. Leadership is not zero-sum. The person who wrote the rulebook was describing the table that existed at the time. The outside insider is building a different table entirely.
          </p>

          <p className="essay-p reveal">
            Bryan Kim, formerly of a16z, said in an interview that he optimizes for how fast he can say no. The Joy of Missing Out. When I first heard him articulate JOMO, I recognized something I had been trying to get to for a long time without having the vocabulary for it.
          </p>

          <p className="essay-p reveal">
            I say yes too often. I have always said yes too often. Overcommitted, overextended, watching the things that actually matter get crowded out by the things I agreed to because the anxiety of missing out felt more immediate than the cost of diluting my focus. And here is what that anxiety actually is: it is the insider trap. It is optimizing within the existing system, trying not to miss any of the existing opportunities, because the rulebook has trained you to believe the table is fixed and every empty seat is a permanent loss.
          </p>

          <p className="essay-p reveal">
            Every yes to the conventional opportunity is a no to the time required to find the unconventional one. JOMO is not passivity. It is the discipline of protecting the outside insider position. It is what you earn after you have played the game, learned its shape, and understood what it actually costs to keep saying yes.
          </p>

          <p className="essay-p reveal">
            I am still incredibly bad at this. Hopefully five years from now I am saying a hundred no's for every yes.
          </p>

          <p className="essay-p reveal">
            For me, this is a no I said early. Not just on high school founders, but on the broader convention that dismisses university students and young people who have not yet had the full traditional foundation. Everyone said it was too early. To a degree, that is true. But HTSI was built on that no. And the outlier signal is exactly what you find when you are willing to say it early enough, before the noise covers it. By the time the outlier is legible to everyone else, it is already priced in, trapped in a zero-sum race to split a consensus asset. This is how AI training works too: signal-to-noise degrades as more data arrives. The outside insider finds the signal when it is still clean, before the rulebook has caught up to it.
          </p>

          <Pullquote>
            Not every game is worth coming back to. The outside insider earns the judgment to know which ones are.
          </Pullquote>

          {/* ── Pivot ────────────────────────────────── */}
          <div className="essay-hr" />

          <SectionHead title="Why does this matter to you as a leader, founder, or investor?" />

          <p className="essay-p reveal">
            The rulebook does not just teach you how to play the game. It teaches you that the game is zero-sum. That there is a fixed table and a finite number of seats and your job is to get one before someone else does. Most accelerator programs are built on this assumption. They hand founders the manual first: here is how to pitch, here is how to build a team, here is what a good deck looks like. By the time the founders start building, they are optimizing for the table that already exists.
          </p>

          <div className="essay-callout reveal">
            <div className="essay-callout-rule" />
            <div className="essay-callout-text">
              The outside insider sees that the table can be expanded. That is not an inspirational observation. It is a <strong>structural one</strong> that is only available from a position holding both the insider's access and the outsider's perspective simultaneously.
            </div>
          </div>

          <p className="essay-p reveal">
            At HTSI, this is the question I think about most. The edge is not in the curriculum. It is in the sequence. Give someone the rulebook before they have played and you produce a skilled player of the game. Let someone play without it first, teach them the rules, then send them back, and you produce someone who understands the game at a level the rulebook was never designed to transmit.
          </p>

          <p className="essay-p reveal">
            Most accelerators get the sequence wrong.
          </p>

          {/* ── Personal ─────────────────────────────── */}
          <SectionHead title="The final story is personal." />

          <p className="essay-p reveal">
            There have been rooms where I was the youngest person by over two decades, without the formal vocabulary, without the credential that explained why I was there. In most of those rooms, I produced and contributed nothing because I did not know enough to see what I was looking at or for.
          </p>

          <p className="essay-p reveal">
            In others, not knowing the rules was the most useful thing I had. The questions you ask because you did not know you were not supposed to ask them. The observation I made because I had not yet learned to write it off as obvious. The direction I pushed toward because I had not read the essay explaining why I was wrong. In that world, it did me quite good to stay stupid.
          </p>

          <p className="essay-p reveal">
            The outside insider position was not something I chose deliberately at first. It was circumstance: being younger, being on the startup side, not having the full manual. At some point it became a choice to maintain it. To keep going back to learn the rules without letting the architecture of the room become the limit of what you think is possible.
          </p>

          <p className="essay-p reveal">
            Try the game. Learn the game. Come back to the game.
            <br /><br />
            Not once. Every time you leave and come back, the stakes rise and the rules shift underneath you.
            <br /><br />
            That is what it means to be the ultimate outside insider.
          </p>

          {/* ── Sources ──────────────────────────────── */}
          <div className="essay-sources reveal">
            <div className="essay-sources-label">Sources &amp; Further Reading</div>
            <ul className="essay-sources-list">
              {[
                { label: 'Brian Armstrong on "action produces information" — Tim Ferriss Show', href: 'https://tim.blog/2021/03/08/brian-armstrong/' },
                { label: 'Paul Graham, "How to Think for Yourself"', href: 'https://paulgraham.com/think.html' },
                { label: 'Peter Thiel, Zero to One', href: 'https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296' },
                { label: 'James Dyson on differentiation', href: 'https://en.wikipedia.org/wiki/James_Dyson' },
              ].map((s, i) => (
                <li key={i}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Footer ───────────────────────────────── */}
        <footer className="essay-footer">
          <div className="essay-footer-series">Essay 3 of 10: The Hidden Curriculum of Leadership</div>
          <Link to="/" className="essay-footer-home">← Back to home</Link>
        </footer>

      </article>
    </>
  );
}
