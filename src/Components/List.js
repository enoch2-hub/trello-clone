// src/List.js - UPDATED

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from '../Task';
import NewTaskForm from './NewTaskForm'; // Import the new component

function List({ list, tasks, addTask, isDarkMode }) { // Receive addTask prop
  return (
    <div
      style={{
        margin: '8px',
        border: '1px solid lightgray',
        borderRadius: '3px',
        width: '272px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDarkMode ? '#161a1d':'#ebecf0',
        transition: 'background-color 0.3s ease'
      }}
    >
      <h3 style={{ padding: '8px', margin: 0, fontSize: '16px', color: isDarkMode ? '#b6c2cf':'#172b4d' }}>{list.title}</h3>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: '8px',
              transition: 'background-color 0.2s ease',
              backgroundColor: snapshot.isDraggingOver ? '#c6d1da' : 'inherit',
              minHeight: '100px',
              flexGrow: 1,
            }}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* ADD THE NEW TASK FORM HERE */}
      <NewTaskForm listId={list.id} addTask={addTask} /> 
    </div>
  );
}

export default List;