// @ts-ignore
import React from 'react';
// @ts-ignore
import moment from 'moment';

export type TaskProperties = {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}


interface TaskItem{
  taskUpdate: ( event: React.ChangeEvent<HTMLInputElement>, id: string ) => void;
  taskRemove: ( id: string ) => void;
  taskComplete: ( id: string ) => void;
  taskBlur: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  task: TaskProperties;
}


const TaskItem = ( props: TaskItem ) => {
  
  return (
      <div className="task__item">
        <div onClick={() => props.taskComplete( props.task.id )}>
          {props.task.completed ? (
              <span className="task__item -checked">✔</span>
          ) : (
              <span className="task__item -unchecked"/>
          )}
        </div>
        <div className="task__form -added">
          <input
              name="title"
              value={props.task.title}
              onBlur={props.taskBlur}
              onChange={( event: React.ChangeEvent<HTMLInputElement> ) => props.taskUpdate( event, props.task.id )}
          />
          <input
              name={'description'}
              value={props.task.description}
              onBlur={props.taskBlur}
              onChange={( event: React.ChangeEvent<HTMLInputElement> ) => props.taskUpdate( event, props.task.id )}
          />
          <div
              className="task__date">{moment( props.task.date ).format( 'MMMM Do YYYY, h:mm:ss a' )}</div>
        </div>
        <div className="task__remove" onClick={() => props.taskRemove( props.task.id )}>
          ⨯
        </div>
      </div>
  );
};

// @ts-ignore
export default TaskItem;