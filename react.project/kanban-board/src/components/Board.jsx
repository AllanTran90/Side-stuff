export default function Board(){
    return(
    <div style={{ display: "flex", gap: "20px" }}>
      
      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>Todo</h3>
      </div>

      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>In Progress</h3>
      </div>

      <div style={{ background: "#eee", padding: "20px", width: "200px" }}>
        <h3>Done</h3>
      </div>

    </div>
  );
}