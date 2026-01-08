// src/App.js - UPDATED
import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import initialData from './initial-data';
import List from './Components/List';
import NewListForm from './Components/NewListForm'; // Import the new component
import './App.css';

function App() {
  // 1. Initialize state for data AND background image from LocalStorage
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('trello-board-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [bgImage, setBgImage] = useState(() => {
    return localStorage.getItem('trello-bg-image') || null;
  });

  // 2. Persist data and background whenever they change
  useEffect(() => {
    localStorage.setItem('trello-board-data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (bgImage) {
      localStorage.setItem('trello-bg-image', bgImage);
    }
  }, [bgImage]);

  // 3. Function to handle the image upload
  const handleWallpaperUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This converts the image to a Base64 string
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('trello-dark-mode') === 'true';
  });

  useEffect(()=> {
    localStorage.setItem('trello-darak-mode', isDarkMode)
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const removeWallpaper = () => {
    setBgImage(null);
    localStorage.removeItem('trello-bg-image');
  };

  // --- Existing logic for tasks and lists ---
  const addTask = (listId, content) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };
    const newTasks = { ...data.tasks, [newTaskId]: newTask };
    const list = data.lists[listId];
    const newTaskIds = [...list.taskIds, newTaskId];
    setData({ ...data, tasks: newTasks, lists: { ...data.lists, [listId]: { ...list, taskIds: newTaskIds } } });
  };

  const addList = (title) => {
    const newListId = `list-${Date.now()}`;
    const newList = { id: newListId, title, taskIds: [] };
    setData({ ...data, lists: { ...data.lists, [newListId]: newList }, listOrder: [...data.listOrder, newListId] });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startList = data.lists[source.droppableId];
    const endList = data.lists[destination.droppableId];

    if (startList === endList) {
      const newTaskIds = Array.from(startList.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setData({ ...data, lists: { ...data.lists, [startList.id]: { ...startList, taskIds: newTaskIds } } });
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
    <div 
      className="app-container"
      style={{ 
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundColor: bgImage ? 'transparent' : '#0079bf', // Fallback color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        transition: 'background 0.3s ease'
      }}
    >
      {/* Header / Toolbar */}
      <div style={{ padding: '10px 20px', display: 'flex', gap: '10px', backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)':'rgba(0,0,0,0.3)' }}>
        <label style={{ 
          backgroundColor: '#ffffff33', 
          color: 'white', 
          padding: '5px 10px', 
          borderRadius: '3px', 
          cursor: 'pointer',
          fontSize: '14px' 
        }}>
          Upload Wallpaper
          <input type="file" accept="image/*" onChange={handleWallpaperUpload} style={{ display: 'none' }} />
        </label>
        {bgImage && (
          <button onClick={removeWallpaper} style={{ 
            backgroundColor: '#ff4d4d', 
            color: 'white', 
            border: 'none', 
            padding: '5px 10px', 
            borderRadius: '3px', 
            cursor: 'pointer' 
          }}>
            Remove Wallpaper
          </button>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', padding: '20px', alignItems: 'flex-start', overflowX: 'auto' }}>
          {data.listOrder.map((listId) => {
            const list = data.lists[listId];
            const tasks = list.taskIds.map((taskId) => data.tasks[taskId]);
            return <List key={list.id} list={list} tasks={tasks} addTask={addTask} isDarkMode={isDarkMode} />;
          })}
          <NewListForm addList={addList} />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
