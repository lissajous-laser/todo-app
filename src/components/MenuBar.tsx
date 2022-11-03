import { useSelector, useDispatch } from "react-redux";
import { MOBILE_BREAK_POINT } from "../App";
import { selectTodoList, clearCompleted } from "../redux/todo";
import Filters from "./Filters";

// Menubar containing tasks completed, filters (on desktop), and
// Clear Completed button
export default function MenuBar(props: {windowWidth: number}) {
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