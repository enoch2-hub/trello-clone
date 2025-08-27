import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: '1px solid lightgray',
            padding: '8px',
            marginBottom: '8px',
            backgroundColor: 'white',
            borderRadius: '4px',
            ...provided.draggableProps.style,
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default Task;