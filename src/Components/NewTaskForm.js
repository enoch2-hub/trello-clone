// src/NewTaskForm.js

import React, { useState } from 'react';

function NewTaskForm({ listId, addTask }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addTask(listId, content.trim());
      setContent(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '8px' }}>
      <input
        type="text"
        placeholder="Enter task content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '8px',
          border: '1px solid #ccc',
          borderRadius: '3px',
          boxSizing: 'border-box', // Ensures padding is included in the width
        }}
      />
      <button 
        type="submit" 
        style={{
          padding: '6px 12px',
          backgroundColor: '#5aac44',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Add Card
      </button>
    </form>
  );
}

export default NewTaskForm;