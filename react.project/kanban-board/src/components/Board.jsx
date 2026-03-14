import Column from "./Column";
import { useState } from "react";
import AddTask from "./AddTask";

export default function Board(){

  const [tasks, setTasks] = useState([
    { id: 1, title: "Build React app", status: "todo" },
    { id: 2, title: "Create components", status: "progress" },
    { id: 3, title: "Deploy project", status: "done" }
  ]);

    function addTask(title) {
        const newTask = {
            id: Date.now(),
            title: title,
            status: "todo"
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div>

    <AddTask addTask={addTask} />

    <div style={{ display: "flex", gap: "20px" }}>
      
      <Column
        title="Todo"
        status="todo"
        tasks={tasks}
      />

      <Column
        title="In Progress"
        status="progress"
        tasks={tasks}
      />

      <Column
        title="Done"
        status="done"
        tasks={tasks}
      />

    </div>
    </div>
  );
}