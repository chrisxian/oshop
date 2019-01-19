import { Injectable } from '@angular/core';
import { config } from "./app.config";

import { Task } from "./app.model";
import { AngularFirestoreDocument, AngularFirestore,  AngularFirestoreCollection } from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  tasks: AngularFirestoreCollection<Task>;
  private taskDoc : AngularFirestoreDocument<Task>;

  constructor(private db: AngularFirestore) {
      this.tasks = db.collection<Task>(config.collection_endpoint);
   }

   addTask(task){
     this.tasks.add(task);
   }

   updateTask(id, update){
     this.taskDoc = this.db.doc<Task>('${config.collection_endpoint}/${id}');
     this.taskDoc.update(update);
   }

   deleteTask(id){
    this.taskDoc = this.db.doc<Task>('${config.collection_endpoint}/${id}');
    this.taskDoc.delete();
   }
}
