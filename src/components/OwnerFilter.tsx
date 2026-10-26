import type { Owner } from '../types'
import { OWNERS, ROLES } from '../data/plan'

export type Filter = 'All' | Owner

interface Props {
  value: Filter
  onChange: (next: Filter) => void
}

export default function OwnerFilter({ value, onChange }: Props) {
  const options: Filter[] = ['All', ...OWNERS]
  return (
    <div className="filter" role="group" aria-label="Filter tasks by team member">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`chip ${opt === 'All' ? '' : `owner-${opt.toLowerCase()}`} ${value === opt ? 'active' : ''}`}
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          title={opt === 'All' ? 'Show everyone' : ROLES[opt]}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
