import { Injectable } from '@angular/core';
import axios from "axios";
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }

  getAllTasks(): Promise<Task[]>{
    return axios
      .get("http://localhost:3000/tasks")
      .then(response => response.data);
  }

  getTaskById(id: number): Promise<Task>{
    return axios
      .get(`http://localhost:3000/tasks/${id}`)
      .then(response => response.data);
  }

  deleteTask(id: number): Promise<Task>{
    return axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(response => response.data);
  }

  addTask(task): Promise<Task>{
    return axios
      .post("http://localhost:3000/tasks/", task)
      .then(response => response.data);
  }

  editTask(oldtask, newTitle): Promise<Task>{
    const task = {...oldtask};
    task.title = newTitle; // esto es para romper el puntero
    return axios
      .put(`http://localhost:3000/tasks/${task.id}`, task)
      .then(response => response.data);
  }

  editStatusTask(oldtask, newStatus): Promise<Task>{
    const task = {...oldtask};
    task.completed = newStatus; // esto es para romper el puntero
    return axios
      .put(`http://localhost:3000/tasks/${task.id}`, task)
      .then(response => response.data);
  }
}
