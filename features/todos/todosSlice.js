import { createSlice } from '@reduxjs/toolkit';

const initialState = {
                        counter   : 0,
                        inputTask : "",
                        isEdit    : true,
                        updateId  : 0,
                        todo      : [],
                      };

export const todosSlice = createSlice({
      name: 'todos',
      initialState,
      reducers: {
                  inputRequest : (state, action) => {state.inputTask = action.payload},

                  addTodo: (state) => {
                                        if(!state.inputTask) { alert("Plese Enter Task");}
                                        else {
                                              let addTask = state.todo.filter(task => task.title === state.inputTask);
                                              if (addTask.length === 0) {
                                                                        state.counter += 1;
                                                                        state.todo = [...state.todo,
                                                                                      {id: state.counter, title: state.inputTask, status: false }
                                                                                    ]
                                                                        state.inputTask = "";
                                                                        }
                                              else {alert("Entered Task already in the list / Plese Enter new one Task");}
                                            }
                                          },

                    resetTodo: (state) => {
                                            state.counter = 0;
                                            state.todo = [];
                                            state.inputTask = "";
                                          },

                    editTodo : (state, action) => {
                                                    state.todo.filter((task)=>{
                                                              if (task.id === action.payload) 
                                                                {return (state.inputTask = task.title);}
                                                          });
                                                    state.isEdit = false;
                                                    state.updateId = action.payload;
                                                    state.todo = [...state.todo];
                                                  },
                                      
                    markTodo : (state, action) => {
                                                    let markTodos = state.todo.map((task)=>{
                                                        if (task.id === action.payload) {
                                                            return ({id:task.id, title: task.title, status: !task.status})
                                                          }
                                                          return task
                                                        });
                                                    state.todo = [...markTodos];
                                                  },
                                          
                                          
                    updateTodo: (state) => {
                                              let updateTask = state.todo.filter(task => task.title === state.inputTask);
                                              if (updateTask.length  === 0) {
                                                    let updatedList = state.todo.map((task) => {
                                                        if(task.id === state.updateId){
                                                            return ({id:task.id, title:state.inputTask, status : task.status})
                                                          }
                                                            return task
                                                        });
                                                      state.todo = [...updatedList];
                                                      state.inputTask = "";
                                                      state.isEdit = true;
                                                  }
                                              else {alert("Entered Task already in the list / Plese Enter new one Task");}
                                            },

                    deleteTodo : (state, action) => {
                                                      let deleteTask = state.todo.filter(task => task.id !== action.payload);
                                                      state.todo = [...deleteTask];
                                                      state.isEdit = true;
                                                      state.inputTask = "";
                                                    }, 

    
                    cancelTodo : (state) => {
                                                  state.isEdit = true;
                                                  state.inputTask = "";
                                            },

            },
      });

export const selectTodo = (state) => state.todos.todo;

export const selectInput = (state) => state.todos.inputTask;

export const selectIsEdit = (state) => state.todos.isEdit;

export const { inputRequest, addTodo, resetTodo, updateTodo, deleteTodo, markTodo, editTodo, cancelTodo } = todosSlice.actions;

export default todosSlice.reducer;
