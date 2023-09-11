import { Page } from './page'

export type TaskStatus = 'TODO' | 'DONE' | 'IN_PROGRESS'
export type Task = {
  id: string
  topic: string
  description: string
  status: TaskStatus
  userId: string
  created: Date
}
export type TaskFilter = {
  status?: TaskStatus
} & Partial<Page>
