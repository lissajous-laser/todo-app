import { Provider } from 'react-redux';
import Background from './components/Background';
import { store } from './redux/store';
import './index.css';

export const SML_BG_BREAK_POINT = 375;
export const MOBILE_BREAK_POINT = 540;

// Types
export type State = {
  todoList: Task[],
  darkMode: boolean,
  listDisplayMode: ListDisplayMode,
  newTask: NewTask,
  windowWidth: number
}

export type Task = {
  id: number,
  isComplete: boolean,
  text: string
}

export type NewTask = {
  isComplete: boolean,
  text: string
}

export type Action<T> = {
  type: string
  payload?: T
}

export enum ListDisplayMode {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

function App() {
  return (
    <Provider store={store}>
      <Background />
    </Provider>

  );
}

export default App;
