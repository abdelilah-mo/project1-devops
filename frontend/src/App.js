import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // function باش نجيبو tasks
  const loadTasks = () => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  };

  // load tasks فالأول
  useEffect(() => {
    loadTasks();
  }, []);

  // add task
  const addTask = () => {
    if (!title) return;

    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
      .then(() => {
        setTitle("");
        loadTasks(); // ⬅️ هادي هي الزبدة
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
  {Array.isArray(tasks) && tasks.map(task => (
    <li key={task.id}>{task.title}</li>
  ))}
</ul>
    </div>
  );
}

export default App;
