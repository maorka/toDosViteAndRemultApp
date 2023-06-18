import { Allow, Entity, Fields,Validators, remult } from "remult";


//Entity decorator
@Entity<Task>("tasks",{
 //allowApiCrud: true=everyone available 
  allowApiCrud: Allow.authenticated,
  apiPrefilter:()=>({
    owner:[remult.user!.id]//connect the tasks to the owenr/user,tasks per user
  })

})

export class Task {
    @Fields.uuid()           //id
    id=0;
    @Fields.string({
        validate:Validators.required //forbid/prevent empty tasks.built-in validator
    })                               //title=>string
    title="";
    @Fields.boolean()              //completed=>boolean
    completed=false;
   // @Fields.date()              //completed=>boolean

   @Fields.string({allowApiUpdate:false}) //connect the tasks to the owenr/user,tasks per user
   owner = remult.user?.id;//connect the tasks to the owenr/user,tasks per user
}
