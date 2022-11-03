import { useSelector, useDispatch } from "react-redux";
import { Task, NewTask } from "../App";
import checkIcon from '../images/icon-check.svg';
import { selectNewTask, toggleCompleteNewTask } from "../redux/newTask";
import { selectTodoList, addTodo } from "../redux/todo";
import { updateText } from "../redux/newTask";


const CHARACTER_LIMIT = 36;

// Input area for new tasks.
export default function NewTaskEditor() {
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



