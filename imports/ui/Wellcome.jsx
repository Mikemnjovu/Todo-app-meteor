import React from 'react';
import { Meteor } from 'meteor/meteor';

function Wellcome({ user }) {
  //   console.log(props);
  return (
    <div className='app-bar'>
      <div className='app-header'>
        <h1>📝️ To Do List</h1>
      </div>
    </div>
  );
}

export default Wellcome;
