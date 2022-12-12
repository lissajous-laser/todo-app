import { useState } from "react";
import { useDispatch } from "react-redux";
import { Task } from "../App";
import { toggleComplete, deleteTodo } from "../redux/todo";
import checkIcon from '../images/icon-check.svg'
import crossIcon from '../images/icon-cross.svg';

const TABLET_BREAK_POINT = 960;

// Renders list items, competed buttons and delete buttons.
export default function ListItem(props: {task: Task, windowWidth: number}) {
  const dispatch = useDispatch();
  // State of if component is hovered over by mouse.
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
        aria-label="Toggle completed"
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
      {(hover || props.windowWidth < TABLET_BREAK_POINT) && 
        <button onClick={() => dispatch(deleteTodo(props.task))} >
          <img className="w-3 h-3 sm:w-fit sm:h-fit" src={crossIcon} alt="cross"/>
        </button>
      }
    </li>
  );
}