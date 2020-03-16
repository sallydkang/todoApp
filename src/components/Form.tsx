import React from 'react';
import { TaskProperties } from './Task';
import Input, { InputProperties } from './Input';
import SortOptions, { DropdownProperties } from './Sort';


interface TaskForm{
  tasks: TaskProperties[];
  taskCreate: ( task: TaskProperties ) => void;
  taskSort: ( event: React.ChangeEvent<HTMLSelectElement> ) => void;
}


const TaskForm = ( props: TaskForm ) => {
  
  const inputTitleRef = React.useRef<HTMLInputElement>( null );
  const inputDescRef = React.useRef<HTMLInputElement>( null );
  
  const [formState, setFormState] = React.useState( {
    title       : '',
    description : ''
  } );
  
  function handleInputChange( event: React.ChangeEvent<HTMLInputElement> ){
    setFormState( {
      ...formState,
      [event.target.name] : event.target.value
    } );
  }
  
  function handleInputEnter( event: React.KeyboardEvent ){
    
    if( event.key === 'Enter' ){
      
      const newTask: TaskProperties = {
        id          : Math.random().toString(),
        title       : formState.title,
        description : formState.description,
        date        : new Date,
        completed   : false
      };
      
      props.taskCreate( newTask );
      inputTitleRef.current.value = '';
      inputDescRef.current.value = '';
      setFormState( {
        title       : '',
        description : ''
      } );
    }
  }
  
  const inputs: InputProperties[] = [
    {
      type        : 'text',
      name        : 'title',
      placeholder : 'Enter title',
      onKeyPress  : handleInputEnter,
      onChange    : handleInputChange,
      ref         : inputTitleRef
    },
    {
      type        : 'text',
      name        : 'description',
      placeholder : 'Enter description',
      onKeyPress  : handleInputEnter,
      onChange    : handleInputChange,
      ref         : inputDescRef
    }
  ];
  
  const options: DropdownProperties[] = [
    { name : 'oldest' }, { name : 'newest' }
  ];
  
  return (
      <div className="task__form">
        {inputs.map( ( input, i ) => (
            <Input key={i} input={input}/>
        ) )}
        <SortOptions options={options} handleClick={props.taskSort}/>
      </div>
  );
};

export default TaskForm;
