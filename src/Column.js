import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from './Task';

const Container = styled.div`
  background: ${({ isDragging }) => (isDragging ? 'lavenderblush' : 'white')};
  border: 1px solid gray;
  border-radius: 2px;
  transition: 0.3s;
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
    isDraggingOver ? 'lightgray' : 'inherit'};
  transition: 0.3s;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }

    return true;
  }

  render() {
    const { tasks } = this.props;

    return tasks.map((task, index) => (
      <Task key={task.id} id={task.id} content={task.content} index={index} />
    ));
  }
}

export function Column({ column, index, tasks }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
