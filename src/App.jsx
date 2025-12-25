// src/App.js - UPDATED
import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import initialData from './initial-data';
import List from './Components/List';
import NewListForm from './Components/NewListForm'; // Import the new component
import './App.css';

function App() {
  const [data, setData] = useState(initialData);

  // --- NEW LOGIC: Function to add a new list ---
  const addList = (title) => {
    const newListId = `list-${Date.now()}`;
    
    const newList = {
      id: newListId,
      title: title,
      taskIds: [],
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
      listOrder: [...data.listOrder, newListId], // Adds the new list ID to the end of the order
    };

    setData(newState);
  };

  // Keep your existing addTask and onDragEnd functions here...
  const addTask = (listId, content) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };
    const newTasks = { ...data.tasks, [newTaskId]: newTask };
    const list = data.lists[listId];
    const newTaskIds = [...list.taskIds, newTaskId];

    const newState = {
      ...data,
      tasks: newTasks,
      lists: { ...data.lists, [listId]: { ...list, taskIds: newTaskIds } }
    };
    setData(newState);
  };

  const onDragEnd = (result) => {
     // ... (Keep your previous onDragEnd code here)
     const { destination, source, draggableId } = result;
     if (!destination) return;
     if (destination.droppableId === source.droppableId && destination.index === source.index) return;

     const startList = data.lists[source.droppableId];
     const endList = data.lists[destination.droppableId];

     if (startList === endList) {
       const newTaskIds = Array.from(startList.taskIds);
       newTaskIds.splice(source.index, 1);
       newTaskIds.splice(destination.index, 0, draggableId);
       const newList = { ...startList, taskIds: newTaskIds };
       setData({ ...data, lists: { ...data.lists, [newList.id]: newList } });
       return;
     }

     const startTaskIds = Array.from(startList.taskIds);
     startTaskIds.splice(source.index, 1);
     const endTaskIds = Array.from(endList.taskIds);
     endTaskIds.splice(destination.index, 0, draggableId);

     setData({
       ...data,
       lists: {
         ...data.lists,
         [startList.id]: { ...startList, taskIds: startTaskIds },
         [endList.id]: { ...endList, taskIds: endTaskIds }
       }
     });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ 
        display: 'flex', 
        padding: '20px', 
        backgroundColor: '#0079bf', 
        minHeight: '100vh', 
        alignItems: 'flex-start',
        overflowX: 'auto' // Allows scrolling horizontally when many lists are added
      }}>
        {data.listOrder.map((listId) => {
          const list = data.lists[listId];
          const tasks = list.taskIds.map((taskId) => data.tasks[taskId]);
          return <List key={list.id} list={list} tasks={tasks} addTask={addTask} />;
        })}
        
        {/* Render the New List Form at the end of the row */}
        <NewListForm addList={addList} />
      </div>
    </DragDropContext>
  );
}

export default App;