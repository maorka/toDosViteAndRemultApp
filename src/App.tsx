import { FormEvent, useEffect, useState } from 'react';
import { remult } from "remult";
import { Task } from "./shared/task";
import { TaskController } from './shared/TasksControoler';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const taskRepo = remult.repo(Task); // repository pattern

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState(""); // input for new task

  useEffect(() => {
    return taskRepo.liveQuery({
      // where:{
      //   owner:[remult.user?.id!],
      // }
    }).subscribe(info => setTasks(info.applyChanges));
  }, []);

  async function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent refreshing
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle }); // add new task
      // setTasks((tasks) => [...tasks, newTask]);
      setNewTaskTitle("");
      toast.success("Task saved!");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function setAllCompleted(completed: boolean) {
    await TaskController.setAllCompleted(completed); //
  }

  return (
    <div>
      <h1>To Do List</h1>
      <main>
        <form onSubmit={e => addTask(e)}>
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder='please enter your task'>
          </input>
          <button>add</button>
        </form>
        {tasks.map((task) => {
          function setTask(value: Task) {
            setTasks((tasks) => tasks.map((t) => (t === task ? value : t)));
          }
          async function setCompleted(completed: boolean) {
            await setTask(await taskRepo.save({ ...task, completed }));
          }
          async function deleteTask() {
            try {
              await taskRepo.delete(task);
              setTasks(tasks => tasks.filter((t) => t !== task));
              toast.success("Task deleted!");
            } catch (error: any) {
              alert(error.message);
            }
          }

          function setTitle(title: string): void {
            setTask({ ...task, title });
          }

          async function saveTaskUser() {
            try {
              setTask(await taskRepo.save(task));
              toast.success("Task saved!");
            } catch (error: any) {
              alert(error.message);
            }
          }

          return (
            <div key={task.id}>
              <input
                checked={task.completed}
                type="checkbox"
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <textarea
                style={{
                  border: '10px  black',
                  padding: '10px',
                  borderRadius: '25px'
                }}
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4} // מספר השורות שניתן לראות
                cols={50} // מספר העמודות שניתן לראות
              />
              <button onClick={() => saveTaskUser()}>Save task</button>
              <button onClick={() => deleteTask()}>Delete</button>
            </div>
          );
        })}
        <div>
          <button onClick={() => setAllCompleted(true)}>Set all completed</button>
          <button onClick={() => setAllCompleted(false)}>Set all UnCompleted</button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
