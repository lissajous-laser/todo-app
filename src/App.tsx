import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import checkIcon from './images/icon-check.svg'
import crossIcon from './images/icon-cross.svg';
import sunIcon from './images/icon-sun.svg';
import moonIcon from './images/icon-moon.svg';
import './index.css';
import bgDesktopLight from './images/bg-desktop-light.jpg';
import bgDesktopDark from './images/bg-desktop-dark.jpg';
import bgMobileLight from './images/bg-mobile-light.jpg';
import bgMobileDark from './images/bg-mobile-dark.jpg';

const SML_BG_BREAK_POINT = 375;
const MOBILE_BREAK_POINT = 540;
const TABLET_BREAK_POINT = 960;
const CHARACTER_LIMIT = 36;

/* REDUX PARTS */

// state type

type State = {
  todoList: Task[],
  darkMode: boolean,
  listDisplayMode: ListDisplayMode,
  newTask: NewTask,
  windowWidth: number
}

// action types

type Task = {
  id: number,
  isComplete: boolean,
  text: string
}

type NewTask = {
  isComplete: boolean,
  text: string
}

type Action<T> = {
  type: string
  payload?: T
}

enum ListDisplayMode {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

// Reducers and Action Creators

const sampleTasks: Task[] = [
  {id: 0, isComplete: false, text: 'mow lawn'},
  {id: 1, isComplete: true, text: 'do laundry'}
];

const todoReducer = (
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

const addTodo = (task: Task): Action<NewTask> => ({
  type: 'todo/addTodo',
  payload: task
});

const deleteTodo = (task: Task): Action<Task> => ({
  type: 'todo/deleteTodo',
  payload: task
});

const toggleComplete = (task: Task): Action<Task> => ({
  type: 'todo/toggleComplete',
  payload: task
});

const clearCompleted = (): Action<Task> => ({
  type: 'todo/clearCompleted'
})

const darkModeReducer = (
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

const toggleDarkMode = (): Action<undefined> => ({
  type: 'darkMode/toggleDarkMode'
})


const listDisplayModeReducer = (
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

const displayAll = (): Action<undefined> => ({
  type: 'listDisplayMode/displayAll'
})

const displayActive = (): Action<undefined> => ({
  type: 'listDisplayMode/displayActive'
})

const displayCompleted = (): Action<undefined> => ({
  type: 'listDisplayMode/displayCompleted'
})

const newTaskReducer = (
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

const updateText = (text: string): Action<string> => ({
  type: 'newTask/updateText',
  payload: text
});

const toggleCompleteNewTask = (): Action<string> => ({
  type: 'newTask/toggleComplete'
});

// Store

const store = configureStore({
  reducer: {
    todoList: todoReducer,
    darkMode: darkModeReducer,
    listDisplayMode: listDisplayModeReducer,
    newTask: newTaskReducer,
  }
});

// Selectors

const selectTodoList = (state: State) => state.todoList;
const selectDarkMode = (state: State) => state.darkMode;
const selectListDisplayMode = (state: State) => state.listDisplayMode;
const selectNewTask = (state: State) => state.newTask;

/* COMPONENTS */

function App() {
  return (
    <Provider store={store}>
      <Background />
    </Provider>

  );
}
 
function Background() {
  const darkMode = useSelector(selectDarkMode);


  const [windowWidth, setWindowWidth] =
    useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => setWindowWidth(window.innerWidth)
    );
    return () => {
      window.removeEventListener(
        'resize',
        () => setWindowWidth(window.innerWidth)
      )
    }
  });

  function backgroundStyle() {
    if (windowWidth > SML_BG_BREAK_POINT) {
      if (darkMode) {
        return {style: {
          backgroundImage: `url(${bgDesktopDark})`,
          maxWidth: 1440,
          backgroundPosition: '35% 0%'
        }};
      } else {
        return {style: {
          backgroundImage: `url(${bgDesktopLight})`,
          maxWidth: 1440,
          backgroundPosition: '35% 0%'
        }};
      }
    } else if (windowWidth <= SML_BG_BREAK_POINT) {
      if (darkMode) {
        return {style: {backgroundImage: `url(${bgMobileDark})`}};
      } else {
        return {style: {backgroundImage: `url(${bgMobileLight})`}}
      }
    }
  }

  return (
    <div {...darkMode && {className: 'dark'}}>
      <div
        className="flex justify-center h-screen w-screen border
          bg-very-light-gray dark:bg-very-dark-blue"
        style={{fontFamily: 'Josefin Sans'}}
      >
        <main 
          className=" w-full flex justify-center no bg-no-repeat"
          {...backgroundStyle()}
        >
          <div className="mt-10 xs:mt-20 w-10/12 md:w-132">
            <Header/>
            <NewTaskEditor/>
            <div
              className="rounded shadow-lg dark:shadow-2xl bg-white
                dark:bg-very-dark-desaturated-blue"
              >
              <List windowWidth={windowWidth}/>
              <MenuBar windowWidth={windowWidth}/>
            </div>
            {windowWidth < MOBILE_BREAK_POINT && <div 
              className="rounded shadow-lg dark:shadow-2xl mt-6
                text-dark-grayish-blue h-12 flex content-center
                justify-center bg-white dark:bg-very-dark-desaturated-blue
                dark:text-very-dark-grayish-blue-dark-mode-1 "
            ><Filters/></div>}
          </div>
        </main>    
      </div>
    </div>
  )
}

// Renders the list.
function List(props: {windowWidth: number}) {
  const todoList = useSelector(selectTodoList);
  const listDisplayMode = useSelector(selectListDisplayMode);

  function filterCallback(x: Task) {
    return listDisplayMode === ListDisplayMode.Active ?
    !x.isComplete
    : listDisplayMode === ListDisplayMode.Completed ?
    x.isComplete
    : true};

  return (
    <ul>
      {todoList.filter(filterCallback).map(task =>
       <ListItem task={task} windowWidth={props.windowWidth} key={task.id}/> 
      )}
    </ul>
  );
}

// Renders list items, competed buttons and delete buttons.
function ListItem(props: {task: Task, windowWidth: number}) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  function buttonStyle(task: Task) {
    if (task.isComplete) {
      return {className: `h-5 w-5 sm:h-6 sm:w-6 rounded-full relative
        bg-gradient-to-br from-icon-blue to-icon-purple`};
    } else {
      return {className: `h-5 w-5 sm:h-6 sm:w-6 rounded-full
        bg-very-light-grayish-blue dark:bg-very-dark-grayish-blue-dark-mode-2
        rounded-full hover:bg-gradient-to-br hover:from-icon-blue
        hover:to-icon-purple relative`}
    }
  }

  function buttonMaskStyle(task: Task) {
    if (task.isComplete) {
      return {className: `h-5minus w-5minus sm:h-6minus sm:w-6minus
        rounded-full absolute left-2/4 top-2/4 -translate-x-2/4
        -translate-y-2/4 bg-transparent`};
    } else {
      return {className: `h-5minus w-5minus sm:h-6minus sm:w-6minus
        rounded-full absolute left-2/4 top-2/4 -translate-x-2/4
        -translate-y-2/4 bg-white dark:bg-very-dark-desaturated-blue`}
    }
  }

  function listTextStyle(task: Task) {
    if (task.isComplete) {
      return {className: `flex-grow text-light-grayish-blue
        dark:text-very-dark-grayish-blue-dark-mode-2 line-through
        cursor-pointer`};
    } else {
      return {className: 'flex-grow cursor-pointer'}
    }
  }


  return (
    <li
      className="flex items-center px-5 sm:px-6 py-3 sm:py-4 gap-5 sm:gap-6 text-sm
        sm:text-lg border-b border-light-grayish-blue 
        text-very-dark-grayish-blue
        dark:border-very-dark-grayish-blue-dark-mode-2
        dark:text-light-grayish-blue-dark-mode" 
      // key={props.task.id}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <button
        id={String(props.task.id)}
        onClick={() => dispatch(toggleComplete(props.task))}
        {...buttonStyle(props.task)}
      >
        <div {...buttonMaskStyle(props.task)}></div>
        {props.task.isComplete && <img className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"  src={checkIcon} alt="check mark"/>}
      </button>
      <label 
        htmlFor={String(props.task.id)}
        {...listTextStyle(props.task)}
      >
        {props.task.text}
      </label>
      {(hover || props.windowWidth < TABLET_BREAK_POINT) && <button onClick={() => dispatch(deleteTodo(props.task))} ><img className="w-3 h-3 sm:w-fit sm:h-fit" src={crossIcon} alt="cross"/></button>}
    </li>
  );
}

// Input area for new tasks.
function NewTaskEditor() {
  const newTask = useSelector(selectNewTask);
  const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();

  function inputOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      dispatch(updateText(event.target.value));
  }

  function inputKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter' && newTask.text.length > 0) {
      // adds task to todo
      const maxId = Math.max(...todoList.map((task) => task.id));
      const taskToAdd: Task = {
        id: maxId + 1,
        ...newTask
      }
      dispatch(addTodo(taskToAdd));
    } 
    
  }

  function buttonStyle(newTask: NewTask) {
    if (newTask.isComplete) {
      return {className: `h-5 w-5 sm:h-6 sm:w-6 rounded-full relative
        bg-gradient-to-br from-icon-blue to-icon-purple`};
    } else {
      return {className: `h-5 w-5 sm:h-6 sm:w-6 rounded-full
        bg-very-light-grayish-blue dark:bg-very-dark-grayish-blue-dark-mode-2
        rounded-full hover:bg-gradient-to-br hover:from-icon-blue
        hover:to-icon-purple relative`}
    }
  }

  function buttonMaskStyle(newTask: NewTask) {
    if (newTask.isComplete) {
      return {className: `h-5minus w-5minus sm:h-6minus sm:w-6minus
        rounded-full absolute left-2/4 top-2/4 -translate-x-2/4
        -translate-y-2/4 bg-transparent`};
    } else {
      return {className: `h-5minus w-5minus sm:h-6minus sm:w-6minus
        rounded-full absolute left-2/4 top-2/4 -translate-x-2/4
        -translate-y-2/4 bg-white dark:bg-very-dark-desaturated-blue`}
    }
  }

  return (
  <div 
    className="h-12 sm:h-16 rounded flex items-center p-5 sm:p-6 mt-8 mb-4 
      sm:mb-8 gap-5 sm:gap-6 text-sm sm:text-lg bg-white 
    dark:bg-very-dark-desaturated-blue"
  >
    <button
      {...buttonStyle(newTask)}
      onClick={() => dispatch(toggleCompleteNewTask())}
    >
      <div {...buttonMaskStyle(newTask)}></div>
      {newTask.isComplete && <img
        className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
        src={checkIcon}
        alt="check mark"
      />}
    </button>
    <input
      className="grow w-32 text-very-dark-grayish-blue
        dark:text-light-grayish-blue caret-bright-blue outline-none
        placeholder:text-dark-grayish-blue
        dark:placeholder:text-very-dark-grayish-blue-dark-mode-1
        dark:bg-very-dark-desaturated-blue"
      onChange={inputOnChangeHandler}
      onKeyDown={inputKeyDownHandler}
      value={newTask.text}
      placeholder="Create a new todo..."
      maxLength={CHARACTER_LIMIT}
    />
  </div>    
  );
} 

// Menubar containing tasks completed, filters (on desktop), and
// Clear Completed button
function MenuBar(props: {windowWidth: number}) {
  const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();

  let itemsLeft = todoList.reduce(
    (count, task) => !task.isComplete ? count + 1 : count, 0
  );

  return (
    <>
      <div
        className="gap-7 flex text-dark-grayish-blue
        dark:text-very-dark-grayish-blue-dark-mode-1 px-6 h-12 items-center
        place-content-between"
      >
        <div className="w-24 text-xs sm:text-sm">{itemsLeft} item{itemsLeft !== 1 && 's'} left</div>
        {props.windowWidth > MOBILE_BREAK_POINT && <Filters/>}
        <button
          className="hover:text-very-dark-grayish-blue
            dark:hover:text-light-grayish-blue text-xs sm:text-sm"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear Completed
        </button>
      </div>
    </>      
  );
}

// Filters all, active and completed tasks.
function Filters() {
  const dispatch = useDispatch();
  const listDisplayMode = useSelector(selectListDisplayMode);

  function buttonStyle(displayMode: ListDisplayMode) {
    if (listDisplayMode === displayMode) {
      return {className: 'text-bright-blue'};
    } else {
      return {className: `hover:text-very-dark-grayish-blue
        dark:hover:text-light-grayish-blue`}
    }
  }

  return (
    <div className="text-sm flex gap-5 font-bold justify-center">
      <button
        {...buttonStyle(ListDisplayMode.All)}
        onClick={() => dispatch(displayAll())}
      >
        All
      </button>
      <button
        {...buttonStyle(ListDisplayMode.Active)}
        onClick={() => dispatch(displayActive())}
      >
        Active
      </button>
      <button
        {...buttonStyle(ListDisplayMode.Completed)}
        onClick={() => dispatch(displayCompleted())}
      >
        Completed
      </button>
    </div>    
  )
}

// Contains heading and dark mode button.
function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  function darkModeIcon() {
    if (darkMode) {
      return <img
        className="w-5 h-5 sm:w-fit sm:h-fit"
        src={sunIcon}
        alt='sun'
      />;
    } else {
      return  <img
        className="w-5 h-5 sm:w-fit sm:h-fit"
        src={moonIcon} alt="moon"
      />
    }
  }

  return (
    <header className="flex items-center place-content-between">
      <h1 
        className="font-bold text-white inline-block text-2xl sm:text-4xl"
        style={{letterSpacing: 18}}
      >TODO</h1>
      <button onClick={() => dispatch(toggleDarkMode())}>
        {darkModeIcon()}
      </button>
    </header>
  );
}

export default App;
