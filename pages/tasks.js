import { useState, useEffect } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Buscar tarefas
  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data.data);
  };

  // Adicionar tarefa
  const addTask = async () => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    });
    setNewTask('');
    fetchTasks();
  };

  // Atualizar tarefa
  const toggleTask = async (id, completed) => {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed })
    });
    fetchTasks();
  };

  // Deletar tarefa
  const deleteTask = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      
      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
            />
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none' 
            }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}