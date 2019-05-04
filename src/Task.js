import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  padding: 5px;
  background: white;
  border: 1px solid lightgray;
  border-radius: 2px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export function Task({ id, content, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {content}
        </Wrapper>
      )}
    </Draggable>
  );
}
