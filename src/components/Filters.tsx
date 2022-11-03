import { useDispatch, useSelector } from "react-redux";
import { ListDisplayMode } from "../App";
import {
  selectListDisplayMode,
  displayAll,
  displayActive,
  displayCompleted 
} from "../redux/listDisplayMode";

// Filters all, active and completed tasks.
export default function Filters() {
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