import React from 'react';
import TaskList from './components/TaskList';
import TaskImportExport from './components/TaskImportExport';

const App = () => {
  return (
    <div>
      <h1>Task Management System</h1>
      <TaskImportExport />
      <TaskList />
    </div>
  );
};

export default App;
