import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Todo.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Todo() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/api/tasks/", {
        title,
        completed: false,
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/api/tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await api.put(`/api/tasks/${task.id}/`, {
        ...task,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (task: Task) => {
    const newTitle = prompt("Edit Task", task.title);

    if (!newTitle) return;

    try {
      await api.put(`/api/tasks/${task.id}/`, {
        ...task,
        title: newTitle,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-container">
      <div className="todo-card">
        <div className="top-bar">
          <h1>My Tasks</h1>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="todo-input-section">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />

                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
              </div>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => editTask(task)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
