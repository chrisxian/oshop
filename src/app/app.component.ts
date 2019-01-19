import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { AppService } from './app.service'
import { config } from "./app.config";
import { Task } from './app.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  tasks: Observable<any[]>;
  constructor(private db: AngularFirestore, private taskService: AppService) {}

  ngOnInit(){
    this.tasks = this.db.collection(config.collection_endpoint)
    .snapshotChanges()
    .pipe(
          map(actions=>{
            return actions.map(a=>{
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return {id, data};
      })
    }));
  }
}
