export default function TaskCard({ task, moveTask, deleteTask, openEditModal }) {

  return(
    <div className="taskCard">

    <p onClick={() => openEditModal(task)}
        style={{ cursor: "pointer" }}
        >
        {task.title}
    </p>    

    <button onClick={() => moveTask(task.id, "back")}>◀
    </button>

    <button onClick={() => moveTask(task.id, "forward")}>▶
    </button>

    <button onClick={() => deleteTask(task.id)}>🗑
    </button>

    </div>
  )
}