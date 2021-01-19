import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Task from './Task.jsx';
import Wellcome from './Wellcome.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import TaskForm from './TaskForm.jsx';

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetch()
  );
  const toggleChecked = ({
    _id,
    isChecked,
  }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };
  const deleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
  };

  return (
    <div className='app'>
      <Wellcome />
      <div className='main'>
        <TaskForm />
        <ul className='tasks'>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={
                toggleChecked
              }
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
