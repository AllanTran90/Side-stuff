import Column from "./Column";
import { useState, useEffect } from "react";
import AddTask from "./AddTask";


export default function Board() {

const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");

  if (!saved || saved === "undefined") {
    return [
      { id: 1, title: "Build React app", status: "todo" },
      { id: 2, title: "Create components", status: "progress" },
      { id: 3, title: "Deploy project", status: "done" }
    ];
  }

  return JSON.parse(saved);
});
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      status: "todo"
    };

    setTasks([...tasks, newTask]);
  }

function moveTask(id, direction) {

  setTasks(tasks.map(task => {

        if (task.id !== id) return task;

        if (direction === "forward") {
        if (task.status === "todo") return { ...task, status: "progress" };
        if (task.status === "progress") return { ...task, status: "done" };
    }

        if (direction === "back") {
        if (task.status === "done") return { ...task, status: "progress" };
        if (task.status === "progress") return { ...task, status: "todo" };
    }

    return task;

  }));

  
}
function deleteTask(id) {
  setTasks(tasks.filter(task => task.id !== id));
}

useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  return (
    <div>

      <AddTask addTask={addTask} />

      <div style={{ display: "flex", gap: "20px" }}>
        
        <Column
          title="Todo"
          status="todo"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />

        <Column
          title="In Progress"
          status="progress"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />

        <Column
          title="Done"
          status="done"
          tasks={tasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />

      </div>

    </div>
  );
}