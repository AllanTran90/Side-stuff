import { useState } from "react";

export default function AddTask({ addTask }) {

  const [title, setTitle] = useState("");

  function handleSubmit() {
    if (!title) return;

    addTask(title);
    setTitle("");
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}