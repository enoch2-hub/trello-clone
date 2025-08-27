import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './data';
import List from './List';

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) {
      return;
    }

    // Dropped back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move within the same list
    const startList = data.lists[source.droppableId];
    const endList = data.lists[destination.droppableId];

    if (startList === endList) {
      const newTaskIds = Array.from(startList.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...startList,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [newList.id]: newList,
        },
      };

      setData(newState);
      return;
    }

    // Move between different lists
    const startTaskIds = Array.from(startList.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartList = {
      ...startList,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(endList.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndList = {
      ...endList,
      taskIds: endTaskIds,
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newStartList.id]: newStartList,
        [newEndList.id]: newEndList,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        {data.listOrder.map((listId) => {
          const list = data.lists[listId];
          const tasks = list.taskIds.map((taskId) => data.tasks[taskId]);
          return <List key={list.id} list={list} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default App;