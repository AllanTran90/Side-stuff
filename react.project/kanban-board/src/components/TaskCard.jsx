export default function TaskCard({ task, moveTask, deleteTask }) {

  return(
    <div style={{
      background: "white",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "6px"
    }}>

    <p>{task.title}</p>

    <button onClick={() => moveTask(task.id, "back")}>◀
    </button>

    <button onClick={() => moveTask(task.id, "forward")}>▶
    </button>

    <button onClick={() => deleteTask(task.id)}>🗑
    </button>

    </div>
  )
}