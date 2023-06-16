import { configureStore } from '@reduxjs/toolkit';
import todosReducer from "../features/todos/todosSlice";
import UserReducer from "../features/adduser/addUserSlice"

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    addUser: UserReducer,
    users: UserReducer
  },
});
