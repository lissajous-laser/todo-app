import {  Action, State } from "../App";

// Can't import ListDisplayMode from ../App, browser throws
// Uncaught ReferenceError:
// can't access lexical declaration 'ListDisplayMode' before initialization
enum ListDisplayMode {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

// Reducer
export const listDisplayModeReducer = (
  listDisplayMode: ListDisplayMode = ListDisplayMode.All,
  action: Action<undefined>
 ) => {

  switch (action.type) {
    case 'listDisplayMode/displayAll':
      return ListDisplayMode.All;
    case 'listDisplayMode/displayActive':
      return ListDisplayMode.Active;
    case 'listDisplayMode/displayCompleted':
      return ListDisplayMode.Completed;
    default:
      return listDisplayMode;
  }
};


// Action creators
export const displayAll = (): Action<undefined> => ({
  type: 'listDisplayMode/displayAll'
})

export const displayActive = (): Action<undefined> => ({
  type: 'listDisplayMode/displayActive'
})

export const displayCompleted = (): Action<undefined> => ({
  type: 'listDisplayMode/displayCompleted'
})

// Selector
export const selectListDisplayMode = (state: State) => state.listDisplayMode;