import { TaskCard } from "./TaskCard";

export default function Column({ title, status, tasks }) {

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
      <h3>{title}</h3>

      {filteredTasks.map(task => (
       <TaskCard key={task.id} task={task} />
      ))}

    </div>
  );
}