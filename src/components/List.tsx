import { useSelector } from "react-redux";
import { Task, ListDisplayMode } from "../App";
import ListItem from "./ListItem";
import { selectTodoList } from "../redux/todo";
import { selectListDisplayMode } from "../redux/listDisplayMode";

// Renders the list.
export default function List(props: {windowWidth: number}) {
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
