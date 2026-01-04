// src/initial-data.js

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design board layout' },
    'task-2': { id: 'task-2', content: 'Implement drag-and-drop' },
    'task-3': { id: 'task-3', content: 'Handle state updates' },
    'task-4': { id: 'task-4', content: 'Final styling' },
  },
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'list-2': {
      id: 'list-2',
      title: 'In Progress',
      taskIds: [],
    },
    'list-3': {
      id: 'list-3',
      title: 'Done',
      taskIds: [],
    },
  },
  listOrder: ['list-1', 'list-2', 'list-3'],
};

export default initialData;