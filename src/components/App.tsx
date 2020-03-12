import React from 'react';

import TaskForm from './Form'
import TaskList from './List'
import { TaskProperties } from '../types'
import '../styles/main.css'

const TaskListApp = () => {
  
  const [tasks, setTasks] = React.useState<TaskProperties[]>([]);
  
  // Creating new todo item
  function taskCreate(task: TaskProperties) {
    // Prepare new todos state
    const newTasksState: TaskProperties[] = [...tasks];
    // Update new todos state
    newTasksState.push(task);
    // Update todos state
    setTasks(newTasksState)
  }
  
  // Update existing todo item
  function taskUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    // Prepare new todos state
    const newTasksState: TaskProperties[] = [...tasks];
    // Find correct todo item to update
    newTasksState.find((task: TaskProperties) => task.id === id)!.title = event.target.value;
    // Update todos state
    setTasks(newTasksState)
  }
  
  // Remove existing todo item
  function taskRemove(id: string) {
    // Prepare new todos state
    const newTasksState: TaskProperties[] = tasks.filter((task: TaskProperties) => task.id !== id);
    // Update todos state
    setTasks(newTasksState)
  }
  
  // Check existing todo item as completed
  function taskComplete(id: string) {
    // Copy current todos state
    const newTasksState: TaskProperties[] = [...tasks];
    // Find the correct todo item and update its 'isCompleted' key
    newTasksState.find((task: TaskProperties) => task.id === id)!.completed = !newTasksState.find((task: TaskProperties) => task.id === id)!.completed;
    // Update todos state
    setTasks(newTasksState)
  }
  
  // Check if todo item has title
  function taskBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('-error')
    } else {
      event.target.classList.remove('-error')
    }
  }
  
  return (
      <div className="task__app">
        <TaskForm
            tasks={tasks}
            taskCreate={taskCreate}
        />
        <TaskList
            tasks={tasks}
            taskUpdate={taskUpdate}
            taskRemove={taskRemove}
            taskComplete={taskComplete}
            taskBlur={taskBlur}
        />
      </div>
  )
};

export default TaskListApp