import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './Column';
import { initialData } from './constants';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 30px 20px;
  height: calc(100vh - 40px);
  padding: 20px;
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? 'lightyellow' : 'white'};
  transition: 0.3s;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.column === this.props.column &&
      nextProps.taskMap === this.props.taskMap &&
      nextProps.index === this.props.index
    ) {
      return false;
    }

    return true;
  }

  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} index={index} tasks={tasks} />;
  }
}
class App extends Component {
  state = initialData;

  onDragEnd = ({ draggableId, source, destination, type }) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };

      this.setState(newState);
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
        <Droppable
          droppableId='allColumns'
          direction='horizontal'
          type='column'
        >
          {(provided, snapshot) => (
            <Wrapper
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={this.state.tasks}
                  />
                );
              })}
              {provided.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
