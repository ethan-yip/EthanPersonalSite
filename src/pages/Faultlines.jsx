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

/*
  ImgSlot: shows a real image when src is provided, styled placeholder otherwise.
  All images are CC-licensed from Wikimedia Commons.
*/
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

/* Wikimedia Commons CC-licensed image URLs (standard 1920px / 960px thumbnails) */
const IMGS = {
  barcelona:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Vista_a%C3%A8ria_del_circuit_de_Montmel%C3%B3_-_20220625_064806.jpg/1920px-Vista_a%C3%A8ria_del_circuit_de_Montmel%C3%B3_-_20220625_064806.jpg',
  spain2016:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ricciardo_Verstappen_Vettel_Spain_2016.jpg/1920px-Ricciardo_Verstappen_Vettel_Spain_2016.jpg',
  totoWolff:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Toto_Wolff_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8425%29.jpg/960px-Toto_Wolff_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8425%29.jpg',
  laudaToto:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Susie_Wolff%2C_Niki_Lauda%2C_Toto_Wolff.jpg/1920px-Susie_Wolff%2C_Niki_Lauda%2C_Toto_Wolff.jpg',
  hamilton:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Lewis_Hamilton-Mercedes_W11_%285%29.jpg/960px-Lewis_Hamilton-Mercedes_W11_%285%29.jpg',
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

export default function Faultlines() {
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
              The Hidden Curriculum of Leadership &nbsp;·&nbsp; Essay 1
            </div>

            <div className="essay-title-block">
              <h1 className="essay-display-title reveal">
                Fault Lines
              </h1>
              <div className="essay-title-aside reveal">
                <div className="essay-title-aside-label">On</div>
                <div className="essay-title-aside-desc">
                  Blame, accountability, and the system beneath every failure: through Toto Wolff and the Mercedes dynasty.
                </div>
                <div className="essay-title-aside-desc" style={{ marginTop: '14px' }}>
                  In 2016, two Mercedes drivers crashed on lap one. What Wolff did next built a dynasty, and exposes everything SF's startup culture gets wrong about fault.
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
            In 2016, Lewis Hamilton and Nico Rosberg, Mercedes' two championship drivers, collided on the opening lap of the Spanish Grand Prix at Barcelona, retiring both cars on the spot. In a single corner, forty-three championship points, millions of dollars, and months of preparation had all just evaporated in under a minute.
          </p>

          <p className="essay-p reveal">
            The instinct, from all of us watching from the outside, was incredibly obvious: to find out whose fault it was.
          </p>

          <p className="essay-p reveal">
            What Toto Wolff did next is one of the most important things any leader can do when something goes catastrophically wrong.
          </p>

          <div className="reveal">
            <ImgSlot
              src={IMGS.spain2016}
              alt="Ricciardo, Verstappen and Vettel fighting for the lead at the 2016 Spanish Grand Prix"
              aspect="16/9"
              objectPosition="center center"
              caption="With both Mercedes cars retired, Verstappen went on to take his first-ever F1 win at just 18. Photo: Alex Rushton / CC BY 2.0"
              wide
            />
          </div>

          {/* ── Section I ──────────────────────────── */}
          <SectionHead
            marker="I"
            title="The first story is about blame."
          />

          <p className="essay-p reveal">
            There's a{' '}
            <Src href="https://www.youtube.com/watch?v=q8mGymE7bXo">
              video from the Mercedes Deep Dive series
            </Src>
            {' '}where Toto Wolff, Team Principal and CEO of Mercedes AMG Petronas, walks through his entire leadership philosophy: his no blame culture, purpose, and leading by example. To this day it is one of my favorite leadership conversations I have come across, for how honest and unfiltered it is, coming from someone running one of the most dominant dynasties in sports history.
          </p>

          <ImgSlot
            src={IMGS.totoWolff}
            alt="Toto Wolff at the 2026 Australian Grand Prix Melbourne Walk"
            aspect="4/3"
            objectPosition="center top"
            caption="Toto Wolff, Mercedes AMG Petronas Team Principal. Photo: Yu Chu Chin / CC BY-SA 4.0"
            wide
          />

          <p className="essay-p reveal">
            His argument is deceptively simple. When something breaks, it is fundamentally on you as the leader. Not the mechanic. Not the engineer. Not the driver. If a wheel gun malfunctions, the process that allowed it to malfunction is the problem, and that process is yours to design and own. We blame the process, not the person. He has said it in interview after interview. The fact that he keeps saying it probably tells you everything.
          </p>

          <p className="essay-p reveal">
            Harvard Business School professor Anita Elberse spent time embedded with the Mercedes team in 2021, watching them operate before, during, and after races. Her{' '}
            <Src href="https://hbr.org/2022/11/number-one-in-formula-one">
              research, published in the Harvard Business Review
            </Src>
            {' '}and now part of HBS curriculum, found that this philosophy was one of the central pillars holding the dynasty together. This is not a system you reach for after something breaks. It has to work even when everything is going right. That is what makes it hard, and that is what made Mercedes different.
          </p>

          <p className="essay-p reveal">
            The logic underneath it is identical to something aviation figured out decades ago. In Crew Resource Management, the framework that reshaped how airlines think about safety, catastrophic failure almost never comes from one person's mistake. It comes from a chain of small system errors that nobody felt safe enough to surface. The no-blame culture is what keeps that chain from forming.
          </p>

          <Pullquote>
            A hidden error in a high-risk system is exponentially more dangerous than an acknowledged one.
          </Pullquote>

          {/* ── Section II ─────────────────────────── */}
          <SectionHead
            marker="II"
            title="The second story is about the aftermath of the crash."
          />

          <p className="essay-p reveal">
            When Niki Lauda, Mercedes' non-executive chairman and a three-time world champion, walked out of that garage in Barcelona, he did what most people's instincts told them to do.
          </p>

          <p className="essay-p reveal">
            He immediately went on camera and publicly blamed Hamilton.
          </p>

          <p className="essay-p reveal">
            Wolff's response was different. When reporters pointed out that Lauda had identified Hamilton as the culprit, Wolff{' '}
            <Src href="https://africa.espn.com/f1/story/_/id/15549526/toto-wolff-lewis-hamilton-nico-rosberg-collision-not-clear-cut">
              pushed back directly
            </Src>
            : <em>"Niki has from his driver's perspective, he has an opinion and this is his instinct and it's fair enough that he has that — but if you look at the data and when you have the discussions with the drivers it's maybe different. It's not clear cut."</em>
          </p>

          <Pullquote>
            Protect the driver. Look at the data. Don't let instinct substitute for analysis.
          </Pullquote>

          <p className="essay-p reveal">
            But accountability absolutely still followed. It was deliberate, structural, and it landed hard on the systems and agreements behind the drivers, not just that moment itself.
          </p>

          <p className="essay-p reveal">
            Both drivers were fined. Mercedes split the{' '}
            <Src href="https://www.gpfans.com/en/f1-news/1070002/f1-nico-rosberg-mercedes-fine-lewis-hamilton-incident-2026-spanish-gp-barcelona/">
              £360,000 repair bill between Hamilton and Rosberg equally
            </Src>
            {' '}along with a contract both had to sign acknowledging that their actions had consequences. Lauda was explicit: "We have to win, one of you guys has to win, you cannot push each other off." Contract clauses were inserted with the threat of termination if it happened again. And James Vowles, then Mercedes' head of strategy, created what became known internally as the{' '}
            <Src href="https://www.formula1.com/en/latest/article/vowles-shares-details-of-secret-document-mercedes-used-to-manage-intense.4FzNhDoTm7T3Rxdk3Sm1QT">
              Rules of Engagement
            </Src>
            : a formal document that codified on-track behavior between teammates and set the parameters for how they would compete going forward.
          </p>

          <div className="essay-callout reveal">
            <div className="essay-callout-rule" />
            <div className="essay-callout-text">
              <strong>Blame and accountability.</strong> These are not the same thing, and Mercedes ran both simultaneously.
            </div>
          </div>

          <p className="essay-p reveal">
            Most leaders collapse these two things. Blame is finding a person to carry the fault. Accountability is understanding what actually broke, and making sure the system is built so it doesn't break the same way again. Blame feels like accountability because it's fast, it's satisfying, and it gives the fault somewhere to land. Real accountability is slower and harder, and it requires you to look back very critically at the things that you built.
          </p>

          <p className="essay-p reveal">
            Take the no-blame principle too far and you get an organization where nothing is anyone's responsibility, and performance quietly deteriorates because consequences never land. Take blame culture too far and you get a team too afraid to surface problems, where errors stay hidden until they become catastrophic. Mercedes steered the narrow road between them.
          </p>

          {/* ── Section III ────────────────────────── */}
          <SectionHead
            marker="III"
            title="The third story is about the fact that Toto Wolff is a human being."
          />

          <p className="essay-p reveal">
            Because he is, and it's probably the most important part of all this.
          </p>

          <div className="reveal">
            <ImgSlot
              src={IMGS.laudaToto}
              alt="Susie Wolff, Niki Lauda, and Toto Wolff on stage at a Mercedes event"
              aspect="16/9"
              objectPosition="center 30%"
              caption="Susie Wolff, Niki Lauda, and Toto Wolff at a Mercedes motorsport event, Stuttgart 2014. When Lauda blamed Hamilton publicly, Wolff pushed back. Photo: Thomas Ormston / CC BY 2.0"
              wide
            />
          </div>

          <p className="essay-p reveal">
            In 2016, after Hamilton and Rosberg collided again at the Austrian Grand Prix, there was visible frustration from the garage. In 2021, during the Saudi Arabian Grand Prix, as the Hamilton–Verstappen rivalry reached its most volatile point, cameras caught Wolff screaming at his monitor and throwing his headset across the desk. Later that season at Abu Dhabi, as Hamilton lost the championship on the final lap under circumstances Wolff still describes as incomprehensible, his radio produced the now-legendary "No Mikey No... that was so not right" directed at race director Michael Masi, a line that has not left F1 fan culture since. The emotions were all over his face in real time, and he's said he thinks about that race every day.
          </p>

          <p className="essay-p reveal">
            In 2023, when Mercedes produced the W14, a car that managed to be simultaneously complicated, inconsistent, and painfully slow, Wolff{' '}
            <Src href="https://www.gpfans.com/en/f1-news/107138/toto-wolff-mercedes-f1-car-w14-2023-not-acceptable-nasty-piece-of-work-miami-grand-prix/">
              called it "not acceptable" and "a nasty piece of work"
            </Src>
            {' '}and said at one point the car simply didn't deserve to win. Notably, the blame went to the car and the system, not to Hamilton, not to Russell. But you cannot deny or pretend that the anger or emotion wasn't there.
          </p>

          <p className="essay-p reveal">
            This is important because the no-blame culture is sometimes discussed as though it requires leaders to be emotionally flat: to process disasters with some kind of detached calm. Toto Wolff is not emotionally flat. He feels the losses hard and doesn't always hide it. What the no-blame culture actually requires isn't the absence of emotion. It's the discipline to not let emotion drive the diagnosis.
          </p>

          <Pullquote>
            You can be furious at the situation. The question is whether you then spend that energy finding a person or finding the problem.
          </Pullquote>

          {/* ── Section IV ─────────────────────────── */}
          <SectionHead
            marker="IV"
            title="What this produces in people."
          />

          <p className="essay-p reveal">
            Lewis Hamilton arrived at Mercedes in 2013, having spent his entire life inside the McLaren ecosystem from junior karting through his first six Formula 1 seasons. He described the difference plainly years later: at McLaren, the engineers largely believed they knew best and didn't always make space for driver input. At Mercedes,{' '}
            <Src href="https://www.essentiallysports.com/f1-news-lewis-hamilton-reveals-one-of-the-biggest-difference-between-mclaren-and-mercedes/">
              the dynamic was built around genuine collaboration
            </Src>
            {' '}and the driver was treated as a core part of the engineering process, not an output of it.
          </p>

          <ImgSlot
            src={IMGS.hamilton}
            alt="Lewis Hamilton in Mercedes W11 at Circuit de Barcelona-Catalunya testing, 2020"
            aspect="16/9"
            objectPosition="center center"
            caption="Hamilton in the W11 at Barcelona, 2020, the car that won his seventh championship. Photo: Alberto-g-rovi / CC BY 3.0"
            wide
          />

          <p className="essay-p reveal">
            James Vowles, who watched Hamilton closely throughout his Mercedes years,{' '}
            <Src href="https://www.planetf1.com/news/lewis-hamilton-mentality-shift-mercedes">
              observed a real shift in mentality
            </Src>
            {': from "win every race at all costs, full stop" to something more nuanced. Maximizing results as part of a system, trusting the people around him, giving and receiving feedback in ways that compound over time.'}
          </p>

          <p className="essay-p reveal">
            Optimize for the process, not the result. That's longevity.
          </p>

          <p className="essay-p reveal">
            Six of his seven championships came in that environment.
          </p>

          <p className="essay-p reveal">
            We all watched Hamilton cross over to Ferrari in 2025.{' '}
            <Src href="https://www.formula1.com/en/latest/article/i-hold-no-grudge-wolff-on-hamiltons-ferrari-move-how-he-was-told-and-the.1cATzXmouKYAF9TtytvlTZ">
              Wolff said publicly he held no grudge
            </Src>
            . He talked about it the way you'd want any partnership to end: nothing but warmth for the person, even after the work was done. After the 2026 Chinese Grand Prix in Shanghai, Hamilton stepped off the podium in a Ferrari race suit and boarded Toto's private jet alongside Valtteri Bottas and George Russell. Three current and former Mercedes drivers, all Mercedes family. Bono, Hamilton's longtime race engineer, was there on the podium celebrating with all of them. You don't get that from a blame culture.
          </p>

          {/* ── Pivot ──────────────────────────────── */}
          <SectionHead title="Why does this matter to you as a leader, startup founder, or investor?" />

          <p className="essay-p reveal">
            If you have spent any time in the startup world, and specifically in the engineering founder culture of San Francisco and New York, you have seen the opposite system at work. I'm not naming specific accelerators, VCs or companies; there is a pattern I have seen enough times to give it a name: the talent formula. Take founders at completely different stages, with completely different backgrounds, run them all through an identical roadmap with identical metrics, and measure success by identical outputs.
          </p>

          <p className="essay-p reveal">
            I had a conversation with{' '}
            <Src href="https://www.linkedin.com/in/heejin-irene-koo">Irene Koo</Src>
            , partner at Soma Capital, that touched on exactly this: the rigidity of systems, and what happens when the framework starts serving itself instead of the people it was built to develop. The mold becomes the point. And when a startup fails inside that mold, the fault almost always lands on the founder, their execution, their commitment, their ability to fit the shape. Rarely on the system that was supposed to support them.
          </p>

          <p className="essay-p reveal">
            I have sat across from a 13-year-old founder pitching VCs at a UN and HTSI event, and thought, genuinely, that this person might be remarkable someday. Not because of their traction. Because of how they thought about the problem. The moment we, as people of empowerment, measure that person by exclusively startup metrics instead of by who they are becoming, we have already drawn the fault line in exactly the wrong spot.
          </p>

          {/* ── Personal ───────────────────────────── */}
          <SectionHead title="The final story is about San Francisco, and getting it wrong." />

          <p className="essay-p reveal">
            A few years ago I was working on a startup, fast-moving, operating across different cities, the kind of thing where the hustle felt personal (because it really was). Growth rates were churning. Deliverables were high. Demand was slow. Something was very evidently wrong.
          </p>

          <p className="essay-p reveal">
            My first instinct was to find the person.
          </p>

          <p className="essay-p reveal">
            There was a team member I pushed blame toward, and as the leader of the organization, I watched the rest of my team pile blame onto them too. I did it the way that feels like decisiveness: fast, critical, direct, and specific. What I thought was accountability was actually relief. The fault line had somewhere to go that wasn't back toward the go-to-market strategy we'd designed, the expectations we'd set, or the gaps in how we'd built the system.
          </p>

          <p className="essay-p reveal">
            I was wrong. The fault was inherently in the system, and most importantly, it was the system that <em>I</em> designed. By the time I understood that, the team had already changed. The dynamic had shifted, and relationships built through real hustle across cities were quietly different than before. We stayed on good terms. But different is a cost that doesn't show up on any dashboard.
          </p>

          <p className="essay-p reveal">
            Around the same period I was working with a group of interns and developers at Constellation Technologies, people from universities, professionals, some who had recently come to the US following the displacement in Ukraine. I made a point of showing up to the smaller meetings, of writing cover letters for people moving on to their next opportunity, of giving people a real view into the work. Not because I had to, but because I genuinely believed that what you put into the development of people compounds. The founders who understand that early build better teams. The teams that feel genuinely invested in build better products. The causality runs in one direction, and it starts with how you treat the people inside your system.
          </p>

          <p className="essay-p reveal">
            I think about this now when I look at how HTSI's programs get evaluated. It is easy to measure a young founder by their startup's traction. That is the very same talent formula operating in disguise. When things don't work, the fault almost never lives in the founder. It lives in how the system around them was built and where the pressure was placed. As a startup founder, you need to adopt the same mentality toward the people inside your own organization.
          </p>

          {/* ── Closing ────────────────────────────── */}
          <div className="essay-hr reveal" />

          <p className="essay-p reveal">
            Toto Wolff is not a case study in emotional perfection. The headset had been thrown (multiple times). Abu Dhabi 2021 still very much lives within him. The key idea I urge us to come back to is that none of that undoes the structural thing he did get right: when something broke, he looked at the system before he looked for a person. That is easier said than done, of course, but that's one of the best approaches to take when things go very wrong.
          </p>

          <p className="essay-p reveal">
            You won't get it right every time. Neither did he. But the discipline of asking "what in the system produced this outcome" before asking "who caused this problem" is one of the most important things I have seen genuinely change how organizations operate over time.
          </p>

          <p className="essay-p reveal">
            That's where we should draw the fault line.
          </p>

          {/* ── Sources ────────────────────────────── */}
          <div className="essay-sources reveal">
            <div className="essay-sources-label">Sources &amp; Further Reading</div>
            <ul className="essay-sources-list">
              {[
                { label: 'Mercedes Deep Dive: Toto Wolff on no-blame culture and leadership', href: 'https://www.youtube.com/watch?v=q8mGymE7bXo' },
                { label: 'HBR: Anita Elberse on leadership lessons from Mercedes F1', href: 'https://hbr.org/2022/11/number-one-in-formula-one' },
                { label: 'Wolff on Spain 2016: "not clear cut"', href: 'https://africa.espn.com/f1/story/_/id/15549526/toto-wolff-lewis-hamilton-nico-rosberg-collision-not-clear-cut' },
                { label: 'Lauda on Hamilton: "unacceptable"', href: 'https://africa.espn.com/f1/story/_/id/15549400/niki-lauda-blames-lewis-hamilton-unacceptable-nico-rosberg-collision' },
                { label: 'The £360k fine and the Rules of Engagement', href: 'https://www.gpfans.com/en/f1-news/1070002/f1-nico-rosberg-mercedes-fine-lewis-hamilton-incident-2026-spanish-gp-barcelona/' },
                { label: 'Vowles on the Rules of Engagement document', href: 'https://www.formula1.com/en/latest/article/vowles-shares-details-of-secret-document-mercedes-used-to-manage-intense.4FzNhDoTm7T3Rxdk3Sm1QT' },
                { label: 'Toto on the W14: "not acceptable, nasty piece of work"', href: 'https://www.gpfans.com/en/f1-news/107138/toto-wolff-mercedes-f1-car-w14-2023-not-acceptable-nasty-piece-of-work-miami-grand-prix/' },
                { label: 'Toto\'s headset moment, 2021 Saudi Arabia', href: 'https://www.si.com/onsi/f1/news/f1-news-toto-wolff-comments-on-his-headphone-fury-ive-broken-a-few' },
                { label: 'Hamilton on McLaren vs Mercedes culture', href: 'https://www.essentiallysports.com/f1-news-lewis-hamilton-reveals-one-of-the-biggest-difference-between-mclaren-and-mercedes/' },
                { label: 'Hamilton mentality shift at Mercedes: James Vowles', href: 'https://www.planetf1.com/news/lewis-hamilton-mentality-shift-mercedes' },
                { label: 'Toto on Hamilton\'s Ferrari move: "I hold no grudge"', href: 'https://www.formula1.com/en/latest/article/i-hold-no-grudge-wolff-on-hamiltons-ferrari-move-how-he-was-told-and-the.1cATzXmouKYAF9TtytvlTZ' },
                { label: 'Mercedes Junior Programme history', href: 'https://mercedes-f1.shorthandstories.com/a-history-of-the-mercedes-f1-junior-programme/' },
                { label: 'Gwen Lagrue and scouting Antonelli', href: 'https://www.planetf1.com/features/mercedes-gwen-lagrue-discovering-george-russell-and-kimi-antonelli' },
                { label: '2026 Mercedes Junior Programme announcement', href: 'https://www.mercedesamgf1.com/news/introducing-our-2026-junior-driver-line-up' },
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
            <span className="essay-footer-series">Essay 1 of 10: The Hidden Curriculum of Leadership</span>
          </div>

        </div>
      </article>
    </>
  );
}
