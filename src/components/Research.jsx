const PAPERS = [
  {
    no: '01', year: '2026', role: 'Primary Author',
    title: 'PRISM: Predicting and Repairing Instability in SAE Manifolds',
    desc: 'Uses sparse-autoencoder boundary proximity to predict which prompts will destabilize a model’s internal geometry before any answer is produced — then rewrites them to recover the lost accuracy.',
    tags: ['Sparse Autoencoders', 'Interpretability', 'Gemma Scope', 'Prompt Geometry'],
  },
  {
    no: '02', year: '2026', role: 'Coauthor',
    title: 'Shadow: Geometric Characterization of LLM Reasoning Manifolds',
    desc: 'Activation-steering work applying Forman–Ricci curvature to the FFN-output manifolds of Mistral-7B, probing the geometric structure of reasoning through cross-layer graphs and Bayesian analysis.',
    tags: ['PyTorch', 'Interpretability', 'Bayesian Networks', 'Mistral-7B'],
  },
  {
    no: '03', year: '2025', role: 'Primary Author',
    title: 'Temporal Aggregation for Transformer-Based Depression Detection',
    desc: 'Shows that how text is structured for training — independent of model architecture — materially shifts transformer-based depression classification performance.',
    tags: ['DepRoBERTa', 'Temporal Aggregation', 'Reddit Corpus', 'Mental-Health NLP'],
  },
];

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="sec-title">Research</h2>
          <p className="sec-sub">Interpretability and the geometry of reasoning in large language models.</p>
        </div>

        <div className="papers">
          {PAPERS.map(p => (
            <div key={p.no} className="paper reveal">
              <div className="paper-byline lbl">{p.year} — {p.role}</div>
              <h3 className="paper-title">{p.title}</h3>
              <p className="paper-desc">{p.desc}</p>
              <div className="paper-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
