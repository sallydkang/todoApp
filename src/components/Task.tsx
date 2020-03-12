// @ts-ignore
import React from 'react';
// @ts-ignore
import { TaskProperties } from '../types';


interface TaskItem{
  taskUpdate: ( event: React.ChangeEvent<HTMLInputElement>, id: string ) => void;
  taskRemove: ( id: string ) => void;
  taskComplete: ( id: string ) => void;
  taskBlur: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  task: TaskProperties;
}


// @ts-ignore
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
              value={props.task.title}
              onBlur={props.taskBlur}
              onChange={( event: React.ChangeEvent<HTMLInputElement> ) => props.taskUpdate( event, props.task.id)}
          />
          <input
              value={props.task.description}
              onBlur={props.taskBlur}
              onChange={( event: React.ChangeEvent<HTMLInputElement> ) => props.taskUpdate( event, props.task.id)}
          />
        </div>
        <div className="task__remove" onClick={() => props.taskRemove( props.task.id )}>
          ⨯
        </div>
      </div>
  );
};

// @ts-ignore
export default TaskItem;