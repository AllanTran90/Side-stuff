import { useState } from "react";

export default function Board(){

    const [tasks, setTasks] = useState([
        { id: 1, title: "Build React app", status: "todo" },
        { id: 2, title: "Create components", status: "progress" },
        { id: 3, title: "Deploy project", status: "done" }

    ]);

    return(
    <div style={{ display: "flex", gap: "20px" }}>
      
      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>Todo</h3>
            {tasks
                .filter(task => task.status === "todo")
                .map(task => (
                <p key={task.id}>{task.title}</p>
            ))}
      </div>

      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>In Progress</h3>

        {tasks
            .filter(task => task.status === "progress")
            .map(task => (
            <p key={task.id}>{task.title}</p>
          ))}

      </div>

      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>Done</h3>

        {tasks
            .filter(task => task.status === "done")
            .map(task => (
            <p key={task.id}>{task.title}</p>
        ))}

      </div>

    </div>
  );
}