// src/NewListForm.js
import React, { useState } from 'react';

function NewListForm({ addList }) {
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addList(title.trim());
      setTitle('');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          minWidth: '272px',
          backgroundColor: 'rgba(255, 255, 255, 0.24)',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          padding: '12px',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '14px',
          fontWeight: 'bold',
          height: 'fit-content'
        }}
      >
        + Add another list
      </button>
    );
  }

  return (
    <div style={{
      minWidth: '272px',
      backgroundColor: '#ebecf0',
      borderRadius: '3px',
      padding: '8px',
      height: 'fit-content'
    }}>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          placeholder="Enter list title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '8px',
            border: '1px solid #0079bf',
            borderRadius: '3px',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="submit"
            style={{
              padding: '6px 12px',
              backgroundColor: '#5aac44',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Add List
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b778c'
            }}
          >
            ✕
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewListForm;

