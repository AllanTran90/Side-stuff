import { useState } from "react";

export default function EditTaskModal({task, updateTask, closeModal }) {
    
    const [title, setTitle] = useState(task.title);

    function handleSave() {

        updateTask(task.id, title);
        closeModal();
        
    }
      return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "300px"
      }}>

        <h3>Edit Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={closeModal}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}