import React from 'react';

function HideCompleted() {
  const [
    hidecompleted,
    sethideCompleted,
  ] = useState(false);
  return (
    <div className='filter'>
      <button
        onClick={() => {
          sethideCompleted(
            !hidecompleted
          );
        }}
      >
        {hidecompleted
          ? 'Show All'
          : 'Hide Completed'}
      </button>
    </div>
  );
}

export default HideCompleted;
