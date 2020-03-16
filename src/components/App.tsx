import React from 'react';

import TaskForm from './Form';
import TaskList from './List';
import '../styles/main.css';
import { TaskProperties } from './Task';

const TaskListApp = () => {
  
  const [tasks, setTasks] = React.useState<TaskProperties[]>( [] );
  
  const sortByOldestDate = ( tasks: TaskProperties[] ) => {
    return [...tasks].sort( ( a, b ) => {
      return new Date( a.date ).getTime() - new Date( b.date ).getTime();
    } );
  };
  
  const saveToLocalStorage = ( tasks: TaskProperties[] ) => {
    const sortedTasks = sortByOldestDate( tasks );
    localStorage.setItem( 'myCurrentTasks', JSON.stringify( sortedTasks ) );
  };
  
  const removeFromLocalStorage = ( id: string ) => {
    const localTasks = JSON.parse( localStorage.getItem( 'myCurrentTasks' ) );
    const newLocalTasks = localTasks.filter( ( task: TaskProperties ) => task.id !== id );
    const sortedTasks = sortByOldestDate( newLocalTasks );
    localStorage.removeItem( 'myCurrentTasks' );
    localStorage.setItem( 'myCurrentTasks', JSON.stringify( sortedTasks ) );
  };
  
  const taskCreate = ( task: TaskProperties ) => {
    // Get all existing tasks
    const newTasksState: TaskProperties[] = [...tasks];
    // Add new task into existing task array
    newTasksState.push( task );
    setTasks( newTasksState );
    saveToLocalStorage( newTasksState );
  };
  
  const taskSort = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    const sortType = event.target.value;
    const newTasksState = sortByOldestDate( [...tasks] );
    if( sortType === 'oldest' ){
      setTasks( newTasksState );
    }
    if( sortType === 'newest' ){
      setTasks( newTasksState.reverse() );
    }
  };
  
  const taskUpdate = ( event: React.ChangeEvent<HTMLInputElement>, id: string ) => {
    const newTasksState: TaskProperties[] = [...tasks];
    const sectionEdited = event.target.name.toString();
    const currentItem = newTasksState.find( ( task: TaskProperties ) => task.id === id );
    // @ts-ignore
    currentItem[sectionEdited] = event.target.value;
    setTasks( newTasksState );
    removeFromLocalStorage( id );
    saveToLocalStorage( newTasksState );
  };
  
  const taskRemove = ( id: string ) => {
    // Filter out selected id
    const newTasksState: TaskProperties[] = tasks.filter( ( task: TaskProperties ) => task.id !== id );
    setTasks( newTasksState );
    removeFromLocalStorage( id );
  };
  
  const taskComplete = ( id: string ) => {
    const newTasksState: TaskProperties[] = [...tasks];
    const selectedTask = newTasksState.find( ( task: TaskProperties ) => task.id === id );
    selectedTask.completed = !selectedTask.completed;
    setTasks( newTasksState );
    removeFromLocalStorage( id );
    saveToLocalStorage( newTasksState );
  };
  
  function taskBlur( event: React.ChangeEvent<HTMLInputElement> ){
    if( event.target.value.length === 0 ){
      event.target.classList.add( '-error' );
    }
    else{
      event.target.classList.remove( '-error' );
    }
  }
  
  // Load from local storage
  window.addEventListener( 'load', function(){
    const localTasks = localStorage.getItem( 'myCurrentTasks' );
    if( localTasks ){
      const savedTasksState: TaskProperties[] = JSON.parse( localTasks );
      setTasks( sortByOldestDate( savedTasksState ) );
    }
  } );
  
  return (
      <div className="task__app">
        <TaskForm
            tasks={tasks}
            taskCreate={taskCreate}
            taskSort={taskSort}
        />
        <TaskList
            tasks={tasks}
            taskUpdate={taskUpdate}
            taskRemove={taskRemove}
            taskComplete={taskComplete}
            taskBlur={taskBlur}
        />
      </div>
  );
};

export default TaskListApp;