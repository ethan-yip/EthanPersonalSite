export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="sec-title">Contact</h2>
        </div>

        <h3 className="contact-head reveal">Let&rsquo;s build<br />something.</h3>

        <div className="contact-rows reveal d1">
          <a className="contact-row" href="https://mail.google.com/mail/?view=cm&fs=1&to=ethan@rsnc.ai" target="_blank" rel="noopener noreferrer">
            <span className="k">Resonance</span>
            <span className="v">ethan@rsnc.ai</span>
            <span className="a">↗</span>
          </a>
          <a className="contact-row" href="https://mail.google.com/mail/?view=cm&fs=1&to=ethan-yip@substrate-labs.org" target="_blank" rel="noopener noreferrer">
            <span className="k">Research</span>
            <span className="v">ethan-yip@substrate-labs.org</span>
            <span className="a">↗</span>
          </a>
          <a className="contact-row" href="https://www.linkedin.com/in/yip-ethan" target="_blank" rel="noopener noreferrer">
            <span className="k">LinkedIn</span>
            <span className="v">/in/yip-ethan</span>
            <span className="a">↗</span>
          </a>
        </div>

        <div className="footer reveal d2">
          <span>© 2026 Ethan Yip</span>
          <span>Builder · Researcher · Investor</span>
          <span>New York</span>
        </div>
      </div>
    </section>
  );
}
