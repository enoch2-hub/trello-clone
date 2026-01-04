// src/Task.js

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: snapshot.isDragging ? '2px solid #0079bf' : '1px solid lightgray',
            padding: '8px',
            marginBottom: '8px',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: snapshot.isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'box-shadow 0.2s',
            userSelect: 'none',
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