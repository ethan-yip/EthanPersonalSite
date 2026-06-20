import { useEffect, useRef } from 'react';

const PAPERS = [
  {
    year: '2026',
    status: 'progress',
    statusLabel: 'In Progress · May 2026',
    title: 'PRISM: Predicting and Repairing Instability in SAE Manifolds',
    meta: 'Primary Author',
    desc: 'Language models fail on many prompts not because they lack knowledge, but because the prompt sits in the wrong part of their internal geometry. PRISM uses sparse autoencoder encoder boundary proximity to predict which prompts will cause unstable feature activation before any answer is produced — then rewrites those prompts to stabilize their internal pathway and recover the lost accuracy.',
    tags: ['Sparse Autoencoders', 'Mechanistic Interpretability', 'Gemma Scope', 'Gemma-2-2B', 'Prompt Geometry'],
  },
  {
    year: '2026',
    status: 'review',
    statusLabel: 'Under Review · ICML',
    title: 'Shadow: Geometric Characterization of LLM Reasoning Manifolds',
    meta: 'Coauthor',
    desc: 'Activation-steering work applying Forman–Ricci curvature to FFN-output manifolds of Mistral-7B. Investigates the geometric structure of reasoning in large language models through eigendecomposition on cross-layer graphs and Bayesian network analysis.',
    tags: ['PyTorch', 'Mechanistic Interpretability', 'Bayesian Networks', 'Mistral-7B'],
  },
  {
    year: '2025',
    status: 'published',
    statusLabel: 'Published',
    title: 'Temporal Aggregation for Transformer-Based Depression Detection',
    meta: 'Primary Author',
    desc: 'Investigated how input data structure — independent of model architecture — influences transformer-based depression classification. By systematically varying training data formatting, the research demonstrates that structural decisions in how text is organized for training materially shift model performance.',
    tags: ['DepRoBERTa', 'Temporal Aggregation', 'Reddit Corpus', 'Mental Health NLP', 'Transformer Fine-tuning'],
  },
];

export default function Research() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="research" className="research" ref={ref}>
      <div className="research-top reveal">
        <h2 className="research-heading">Research</h2>
        <span className="research-count">3 papers</span>
      </div>

      <div className="research-papers">
        {PAPERS.map((p, i) => (
          <div key={i} className={`research-paper reveal reveal-d${i}`}>
            <div className="research-paper-left">
              <span className="research-year">{p.year}</span>
              <span className={`research-badge status-${p.status}`}>
                <span className="research-badge-dot" />
                {p.statusLabel}
              </span>
            </div>
            <div className="research-paper-right">
              <h3 className="research-paper-title">{p.title}</h3>
              <div className="research-paper-meta">{p.meta}</div>
              <p className="research-paper-desc">{p.desc}</p>
              <div className="research-tags">
                {p.tags.map(t => <span key={t} className="research-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
