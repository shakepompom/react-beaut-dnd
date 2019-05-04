export const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Create React App',
    },
    'task-2': {
      id: 'task-2',
      content: 'Connect local and remote repo',
    },
    'task-3': {
      id: 'task-3',
      content: 'Create App Structure',
    },
    'task-4': {
      id: 'task-4',
      content: 'Add dnd plugin',
    },
    'task-5': {
      id: 'task-5',
      content: 'Test project',
    },
    'task-6': {
      id: 'task-6',
      content: 'Git push',
    },
    'task-7': {
      id: 'task-7',
      content: 'Publish Repo',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [
        'task-1',
        'task-2',
        'task-3',
        'task-4',
        'task-5',
        'task-6',
        'task-7',
      ],
    },
  },
  columnOrder: ['column-1'],
};
