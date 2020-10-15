import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskServiceService } from '../../services/task-service.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskDetail: Task;


  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getTaskId(id);
  }

  ngOnInit(): void {
  }

  getTaskId(id) :void{
    this.taskService.getTaskById(id)
      .then(response => {
        this.taskDetail = response;
      });
  }


  changeStatus(){
    this.taskService.editStatusTask(this.taskDetail, !this.taskDetail.completed)
      .then(response => {
        this.taskDetail = response;
      })
  }

}
