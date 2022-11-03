import { Action, State } from "../App";

// Reducer
export const darkModeReducer = (
  darkMode: boolean = false,
  action: Action<undefined>
) => {
  
  switch (action.type) {
    case 'darkMode/toggleDarkMode':
      return !darkMode;
    default:
      return darkMode;
  }
};

// Action creators
export const toggleDarkMode = (): Action<undefined> => ({
  type: 'darkMode/toggleDarkMode'
})

// Selector
export const selectDarkMode = (state: State) => state.darkMode;