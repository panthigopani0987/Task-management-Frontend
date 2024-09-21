import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
