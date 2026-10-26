export type Owner = 'Delna' | 'Diya' | 'Joseph' | 'Shared'

export interface TaskGroup {
  owner: Owner
  tasks: string[]
}

export interface Phase {
  id: string
  title: string
  weeks: string
  summary: string
  groups: TaskGroup[]
  exitCriteria: string
}

export interface Risk {
  risk: string
  mitigation: string
}
