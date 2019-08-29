import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        console.log(params);
        this.taskService.getTasks(params.listId).subscribe((tasks : Task[])=>{
            this.tasks = tasks;
        }); 
      });
    this.taskService.getLists().subscribe((lists: List[]) =>{
      this.lists = lists;
    });
  }
 onTaskClick(task: Task){
   // We want to set the task to complete
   this.taskService.complete(task).subscribe(()=>{
     // The task has been set to completed successfully
     console.log("Completed Successfully! ");
     task.completed = !task.completed;
   });
 }
}
