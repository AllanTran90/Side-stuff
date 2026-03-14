export default function TaskCard({ task }) {
    return(
        <div style={{
            background: "white",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px"
        }}>
        {task.title}
    </div>
    )
    
}