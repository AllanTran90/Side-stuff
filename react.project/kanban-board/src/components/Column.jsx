import  TaskCard  from "./TaskCard";

export default function Column({ title, status, tasks, moveTask, deleteTask }) {

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div style={{ background: "#5287d0ff", padding: "20px", width: "200px" }}>
      <h3>{title}</h3>

      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
        ))}
    </div>
  );
}