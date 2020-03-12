// @ts-ignore
import React from 'react';
// @ts-ignore
import { TaskProperties } from '../types';


interface TaskForm{
  tasks: TaskProperties[];
  taskCreate: ( task: TaskProperties ) => void;
}


const TaskForm = ( props: TaskForm ) => {
  // Create ref for form input
  const inputTitleRef = React.useRef<HTMLInputElement>( null );
  const inputDescRef = React.useRef<HTMLInputElement>( null );
  // Create form state
  const [formState, setFormState] = React.useState( {
    title       : '',
    description : ''
  } );
  
  // Handle todo input change
  function handleInputChange( event: React.ChangeEvent<HTMLInputElement> ){
    // Update form state with the text from input
    setFormState( {
      ...formState,
      [event.target.name] : event.target.value
    } );
  }
  
  // Handle 'Enter' in todo input
  function handleInputEnter( event: React.KeyboardEvent ){
    // Check for 'Enter' key
    if( event.key === 'Enter' ){
      // Prepare new todo object
      const newTask: TaskProperties = {
        id          : Math.random().toString(),
        title       : formState.title,
        description : formState.description,
        date        : new Date,
        completed   : false
      };
      
      // Create new todo item
      props.taskCreate( newTask );
      // Reset the input field
      if( inputTitleRef && inputTitleRef.current ){
        inputTitleRef.current.value = '';
      }
      if( inputDescRef && inputDescRef.current ){
        inputDescRef.current.value = '';
      }
    }
  }
  
  return (
      <div className="task__form">
        <input
            ref={inputTitleRef}
            type="text"
            name="title"
            placeholder="Enter Task"
            onChange={event => handleInputChange( event )}
            onKeyPress={event => handleInputEnter( event )}
        />
        <input
            ref={inputDescRef}
            type="text"
            name="description"
            placeholder="Enter Description"
            onChange={event => handleInputChange( event )}
            onKeyPress={event => handleInputEnter( event )}
        />
      </div>
  );
};

// @ts-ignore
export default TaskForm;