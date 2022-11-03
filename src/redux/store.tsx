import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo";
import { darkModeReducer } from "./darkMode";
import { listDisplayModeReducer } from "./listDisplayMode";
import { newTaskReducer } from "./newTask";

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
    darkMode: darkModeReducer,
    listDisplayMode: listDisplayModeReducer,
    newTask: newTaskReducer,
  }
});
