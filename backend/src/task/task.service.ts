import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TaskDTO } from 'src/dto/task.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { Task } from 'src/entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  // eslint-disable-next-line no-unused-vars
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

  private entityToDTO(task: Task): TaskDTO {
    const taskDTO = new TaskDTO();

    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.status = task.status;

    return taskDTO;
  }

  public async getAll() {
    const tasks: Task[] = await this.taskRepository.find();

    const tasksDTO: TaskDTO[] = tasks.map((item) => this.entityToDTO(item));
    return tasksDTO;
  }

  public async getOne(taskId: number) {
    const task: Task = await this.taskRepository.findOne(taskId);

    if (!task) throw new NotFoundException(`아이디로 ${taskId}를 가진 항목이 없습니다.`);

    const taskDTO: TaskDTO = this.entityToDTO(task);
    return taskDTO;
  }

  public async createOne(createTaskRequest: CreateTaskDTO) {
    const task: Task = new Task();

    task.title = createTaskRequest.title;
    task.description = createTaskRequest.description;
    task.status = 'Created';

    await this.taskRepository.save(task);

    const taskDTO: TaskDTO = this.entityToDTO(task);
    return taskDTO;
  }

  public async updateOne(taskId: number, updateTaskRequest: UpdateTaskDTO) {
    const task: Task = await this.getOne(taskId);

    task.title = updateTaskRequest.title ? updateTaskRequest.title : task.title;
    task.description = updateTaskRequest.description ? updateTaskRequest.description : task.description;
    task.status = updateTaskRequest.status ? updateTaskRequest.status : task.status;

    await this.taskRepository.save(task);

    const taskDTO: TaskDTO = this.entityToDTO(task);
    return taskDTO;
  }

  public async deleteOne(taskId: number) {
    const task: Task = await this.getOne(taskId);

    await this.taskRepository.remove(task);
  }
}
