import { Allow, BackendMethod,remult } from "remult";
import { Task } from "./task";

export class TaskController{
   @BackendMethod({allowed:Allow.authenticated})//allowed:true=>everyone available to edit web app
    static async setAllCompleted(completed: boolean){
        const taskRepo=remult.repo(Task);
            //function to disable/enable all tasks checkpoints ,backend function
        for (const task of await taskRepo.find()){
          await taskRepo.save({...task,completed})
        } 
   }
}