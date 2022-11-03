import { NewTask, Action, State } from "../App";

// Reducer
export const newTaskReducer = (
  newTask: NewTask = {isComplete: false, text: ''},
  action: Action<string>
) => {

  switch (action.type) {
    case 'newTask/updateText':
      if (typeof action.payload === 'string') {
        return {...newTask, text: action.payload};
      } else {
        return newTask;
      }
    case 'newTask/toggleComplete':
      return {...newTask, isComplete: !newTask.isComplete};
    case 'todo/addTodo': // acts on todo and newTask slice
      return {isComplete: false, text: ''};
    default:
      return newTask;
  }
}

// Action creators
export const updateText = (text: string): Action<string> => ({
  type: 'newTask/updateText',
  payload: text
});

export const toggleCompleteNewTask = (): Action<string> => ({
  type: 'newTask/toggleComplete'
});

// Selectors
export const selectNewTask = (state: State) => state.newTask;