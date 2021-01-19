import React from 'react';

function Task({
  task,
  onCheckboxClick,
  onDeleteClick,
}) {
  console.log(task);
  return (
    <li className='task'>
      <input
        type='checkbox'
        checked={!!task.isChecked}
        onClick={() => {
          onCheckboxClick(task);
        }}
      />
      <span className='task_span'>
        {task.text}
      </span>
      <button
        className='task_button'
        onClick={() => {
          onDeleteClick(task);
        }}
      >
        &times;
      </button>
    </li>
  );
}

export default Task;
