import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
  background: ${({ isDragging }) => (isDragging ? 'lemonchiffon' : 'white')};
  border: 1px solid lightgray;
  border-radius: 2px;
`;

const Handle = styled.div`
  width: 20px;
  flex: 0 0 20px;
  height: 20px;
  margin-right: 20px;
  background: lavender;
  border-radius: 4px;
`;

export function Task({ id, content, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
        >
          <Handle {...provided.dragHandleProps} />
          {content}
        </Wrapper>
      )}
    </Draggable>
  );
}
