import { Page } from './page'

export type TaskStatus = 'TODO'
export type Task = {
  id: string
  topic: string
  description: string
  status: TaskStatus
  userId: string
  created: Date
}
export type TaskFilter = {
  status: TaskStatus
} & Page
