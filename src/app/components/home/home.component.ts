import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Task[]=[];
  idNumber: number;
  newTask: Task = {id: 0, title: "", completed: false};
  hid: boolean = false;
  hiddenButton: string ="Ocultar tareas completadas";
  constructor(private taskService: TaskServiceService) {
    this.getAllTask();
    this.idNumber = this.tasks.length * 100;
   }
   ngOnInit(): void {
  }
  getAllTask(): void {
    this.taskService.getAllTasks()
      .then(response => {
        this.tasks=response;
      })
  }

  addTask(){
      console.log("Entrando a add");
      this.taskService.addTask(this.newTask)
        .then(task=>{
          this.tasks.push(task);
        });
  }

 editTask(task){
  const title = prompt('Nuevo nombre de la tarea: ');
  this.taskService.editTask(task, title)
  .then(data =>{
    task.title=title;
   })
 }

deleteTask(id: number){
  this.taskService.deleteTask(id)
    .then(unused=>{
      this.tasks=this.tasks.filter(task => task.id != id);
    })
 }

 hiddenTask(){
  this.hid=!this.hid;
  if(this.hid===true){
    this.hiddenButton="Mostrar tareas completadas";
  }else{
    this.hiddenButton="Ocultar tareas completadas";
  }
}
}
