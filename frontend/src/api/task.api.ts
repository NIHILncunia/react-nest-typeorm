import { TaskDTO } from "@/types/task.types";

class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    const resp = await fetch('http://localhost:3000/tasks', {
      method: 'GET',
    });

    const data = await resp.json();
    return data;
  }
}

export default TaskAPI;
