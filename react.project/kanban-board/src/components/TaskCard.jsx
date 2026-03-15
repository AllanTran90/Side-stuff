export default function TaskCard({ task, moveTask, deleteTask, openEditModal }) {

  return(
    <div style={{
      background: "#f1f5f9",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "6px",
    }}>

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