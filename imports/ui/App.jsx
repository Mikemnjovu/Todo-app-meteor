import React, {
  Fragment,
  useState,
} from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Task from './Task.jsx';
import Wellcome from './Wellcome.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import TaskForm from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';

export const App = () => {
  const [
    hideCompleted,
    setHideCompleted,
  ] = useState(false);
  const hidecompletedFilter = {
    isChecked: { $ne: true },
  };
  const user = useTracker(() =>
    Meteor.user()
  );
  const userFilter = user
    ? { userId: user._id }
    : {};
  const pendingOnlyFilter = {
    ...hidecompletedFilter,
    ...userFilter,
  };

  const tasks = useTracker(() =>
    TasksCollection.find(
      hideCompleted
        ? hidecompletedFilter
        : userFilter,
      {
        sort: { createdAt: -1 },
      }
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
  const pendingTaskCount = useTracker(
    () => {
      if (!user) {
        return 0;
      }
      TasksCollection.find(
        pendingOnlyFilter
      ).count();
    }
  );
  const [
    uncomplet,
    setUncomplet,
  ] = useState();
  // setUncomplet(pendingTaskCount);

  const deleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
  };
  const logout = (params) => {
    Meteor.logout();
  };

  // console.log(uncomplet);
  return (
    <div className='app'>
      <Wellcome />
      <div className='main'>
        {user ? (
          <Fragment>
            <div
              className='user'
              onClick={logout}
            >
              <button>Logout</button>
            </div>
            <TaskForm user={user} />
            <div className='filter'>
              <button
                onClick={() =>
                  setHideCompleted(
                    !hideCompleted
                  )
                }
              >
                {hideCompleted
                  ? 'Show All'
                  : 'Hide Completed'}
              </button>
            </div>
            <ul className='tasks'>
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={
                    toggleChecked
                  }
                  onDeleteClick={
                    deleteTask
                  }
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
