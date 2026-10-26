import { useState } from 'react'
import OwnerFilter from './components/OwnerFilter'
import type { Filter } from './components/OwnerFilter'
import PhaseCard, { taskId, visibleGroups } from './components/PhaseCard'
import { useChecked } from './hooks/useChecked'
import { architecture, goal, inScope, outOfScope, phases, risks, timeline } from './data/plan'

export default function App() {
  const [filter, setFilter] = useState<Filter>('All')
  const { checked, toggle, reset } = useChecked('echo-ppt-plan:progress')

  const allIds = phases.flatMap((p) =>
    visibleGroups(p, filter).flatMap((g) => g.tasks.map((_, i) => taskId(p.id, g.owner, i))),
  )
  const done = allIds.filter((id) => checked[id]).length
  const pct = allIds.length ? Math.round((done / allIds.length) * 100) : 0

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">MVP Action Plan</p>
          <h1>
            ECHO<span>-</span>PPT
          </h1>
          <p className="lead">{goal}</p>
          <dl className="meta">
            <div>
              <dt>Timeline</dt>
              <dd>{timeline}</dd>
            </div>
          </dl>
        </div>
      </header>

      <nav className="phase-nav" aria-label="Phases">
        <div className="wrap">
          {phases.map((p, i) => (
            <a key={p.id} href={`#${p.id}`}>
              <b>0{i + 1}</b> {p.title}
            </a>
          ))}
          <a href="#risks">Risks</a>
        </div>
      </nav>

      <main className="wrap">
        <section className="scope" aria-labelledby="scope-title">
          <h2 id="scope-title">MVP scope</h2>
          <div className="scope-grid">
            <div className="panel">
              <h3>In scope</h3>
              <ul>
                {inScope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="panel muted">
              <h3>Out of scope for the MVP</h3>
              <ul>
                {outOfScope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="arch-title">Architecture</h3>
          <ol className="arch" aria-label="System architecture flow">
            {architecture.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="toolbar" aria-label="Progress and filters">
          <OwnerFilter value={filter} onChange={setFilter} />
          <div className="overall">
            <div className="overall-top">
              <span>
                {done} of {allIds.length} tasks done ({pct}%)
              </span>
              <button type="button" className="link" onClick={reset}>
                Reset progress
              </button>
            </div>
            <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </section>

        {phases.map((p, i) => (
          <PhaseCard key={p.id} phase={p} index={i} filter={filter} checked={checked} onToggle={toggle} />
        ))}

        <section className="risks" id="risks" aria-labelledby="risks-title">
          <h2 id="risks-title">Key risks and mitigations</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Risk</th>
                  <th scope="col">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((r) => (
                  <tr key={r.risk}>
                    <td>{r.risk}</td>
                    <td>{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">ECHO-PPT · Delna &amp; Diya (UI/UX + Frontend) · Joseph (Backend, CV, Kinect)</div>
      </footer>
    </>
  )
}
