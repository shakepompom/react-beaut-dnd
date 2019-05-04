import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './Column';
import { initialData } from './constants';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 30px 20px;
  height: calc(100vh - 40px);
  margin: 20px;
`;
class App extends Component {
  state = initialData;

  onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = this.state.columns[source.droppableId];
    const finishColumn = this.state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColummn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColummn.id]: newColummn,
        },
      };

      this.setState(newState);
      return;
    }

    const startColumnTaskIds = Array.from(startColumn.taskIds);
    startColumnTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startColumnTaskIds,
    };

    const finishColumnTaskIds = Array.from(finishColumn.taskIds);
    finishColumnTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishColumnTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Wrapper>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              taskId => this.state.tasks[taskId]
            );
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Wrapper>
      </DragDropContext>
    );
  }
}

export default App;
