import type { Phase } from '../types'
import { ROLES } from '../data/plan'
import type { Filter } from './OwnerFilter'

interface Props {
  phase: Phase
  index: number
  filter: Filter
  checked: Record<string, boolean>
  onToggle: (id: string) => void
}

export function taskId(phaseId: string, owner: string, i: number) {
  return `${phaseId}-${owner}-${i}`
}

export function visibleGroups(phase: Phase, filter: Filter) {
  if (filter === 'All') return phase.groups
  return phase.groups.filter((g) => g.owner === filter || g.owner === 'Shared')
}

export default function PhaseCard({ phase, index, filter, checked, onToggle }: Props) {
  const groups = visibleGroups(phase, filter)
  const ids = groups.flatMap((g) => g.tasks.map((_, i) => taskId(phase.id, g.owner, i)))
  const done = ids.filter((id) => checked[id]).length
  const pct = ids.length ? Math.round((done / ids.length) * 100) : 0

  return (
    <section className="phase" id={phase.id} aria-labelledby={`${phase.id}-title`}>
      <header className="phase-head">
        <span className="phase-num">0{index + 1}</span>
        <div>
          <h2 id={`${phase.id}-title`}>{phase.title}</h2>
          <p className="weeks">{phase.weeks}</p>
        </div>
        <div className="phase-progress" aria-label={`${done} of ${ids.length} tasks done`}>
          <span>
            {done}/{ids.length}
          </span>
          <div className="bar small">
            <div className="bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>
      <p className="summary">{phase.summary}</p>

      <div className="groups">
        {groups.map((g) => (
          <article key={g.owner} className={`group owner-${g.owner.toLowerCase()}`}>
            <h3>
              <span className="dot" aria-hidden="true" />
              {g.owner}
              <small>{ROLES[g.owner]}</small>
            </h3>
            <ul>
              {g.tasks.map((t, i) => {
                const id = taskId(phase.id, g.owner, i)
                return (
                  <li key={id}>
                    <label className={checked[id] ? 'done' : ''}>
                      <input type="checkbox" checked={!!checked[id]} onChange={() => onToggle(id)} />
                      <span>{t}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>

      <p className="exit">
        <strong>Exit criteria:</strong> {phase.exitCriteria}
      </p>
    </section>
  )
}
