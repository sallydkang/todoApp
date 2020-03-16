// @ts-ignore
import React from 'react';
// @ts-ignore
import TaskItem from './Task';
// @ts-ignore
import { TaskProperties } from '../types';


interface TaskList{
  taskUpdate: ( event: React.ChangeEvent<HTMLInputElement>, id: string ) => void;
  taskRemove: ( id: string ) => void;
  taskComplete: ( id: string ) => void;
  taskBlur: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  tasks: TaskProperties[]
}


// @ts-ignore
const TaskList = ( props: TaskList ) => {
  return (
      <div className="task__list">
        <ul>
          {props.tasks.map( ( task ) => (
              <li key={task.id}>
                <TaskItem
                    task={task}
                    taskUpdate={props.taskUpdate}
                    taskRemove={props.taskRemove}
                    taskComplete={props.taskComplete}
                    taskBlur={props.taskBlur}
                />
              </li>
          ) )}
        </ul>
      </div>
  );
};

// @ts-ignore
export default TaskList;