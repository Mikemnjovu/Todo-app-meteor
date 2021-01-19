import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

function TaskForm() {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      console.log('text Nothing', text);
      return;
    }
    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
    });
    setText('');
  };

  return (
    <div>
      <form
        className='task-form'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type='submit'>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
