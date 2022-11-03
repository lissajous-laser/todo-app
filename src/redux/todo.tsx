import { Task, NewTask } from "../App";
import { Action, State } from "../App";

const sampleTasks: Task[] = [
  {id: 0, isComplete: false, text: 'mow lawn'},
  {id: 1, isComplete: true, text: 'do laundry'}
];

// Reducer
export const todoReducer = (
  todoList: Task[] = sampleTasks,
  action: Action<Task>
) => {

  switch (action.type) {
    case 'todo/addTodo':
      if (action.payload) {
        return [...todoList, action.payload];
      } else {
        return todoList;
      }
    case 'todo/deleteTodo':
      return todoList.filter(
        (task) => task.id !== (action.payload ? action.payload.id : -1)
      );
    case 'todo/toggleComplete':
      return todoList.map(
        task => 
        task.id === (action.payload ? action.payload.id : -1) ?
        {...task, isComplete: !task.isComplete}
        : {...task}
      );
    case 'todo/clearCompleted':
      return todoList.filter(task => task.isComplete === false);
    default:
        return todoList;
  }
};

// Action creators
export const addTodo = (task: Task): Action<NewTask> => ({
  type: 'todo/addTodo',
  payload: task
});

export const deleteTodo = (task: Task): Action<Task> => ({
  type: 'todo/deleteTodo',
  payload: task
});

export const toggleComplete = (task: Task): Action<Task> => ({
  type: 'todo/toggleComplete',
  payload: task
});

export const clearCompleted = (): Action<Task> => ({
  type: 'todo/clearCompleted'
})

// Selector
export const selectTodoList = (state: State) => state.todoList;