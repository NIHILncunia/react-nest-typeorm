export type TaskStatus = ('Created' | 'InProgress' | 'Done');

export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
