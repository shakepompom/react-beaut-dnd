import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';

const Container = styled.div`
  border: 1px solid gray;
  border-radius: 2px;
`;

const Title = styled.div`
  padding: 10px;
  margin: 0 20px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid gray;
`;

const TaskList = styled.div`
  min-height: calc(100% - 79px);
  padding: 20px;
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? 'lightcyan' : 'white'};
  transition: 0.3s;
`;

export function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                index={index}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
