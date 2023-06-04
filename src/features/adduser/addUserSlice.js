import { createSlice } from '@reduxjs/toolkit';

const initialState = {
                        counter : 10,
                        userData : [],
                        inputData : "",
                      };

export const addUserSlice = createSlice({
      name: 'addUser',
      initialState,
      reducers: {
                  inputRequest : (state, action) => {
                    state.inputData = action.payload;

                  },

                  
                  addUserData: (state, action) => {
                                        if(!state.inputData) { alert("Plese Enter User Name");}
                                        else {  
                                                state.counter = state.counter + 1;
                                                if(state.userData.length < 10){
                                                      state.userData = [...action.payload, ...state.userData,
                                                                                {id: state.counter, name: state.inputData}
                                                                        ]
                                                      }
                                                else {
                                                      state.userData = [...state.userData,
                                                                        {id: state.counter, name: state.inputData}
                                                                      ]
                                                      }
                                                state.inputData = "";
                                              }
                                          },
                                        }
                
      });

export const selectUserData = (state) => state.addUser.userData;

export const selectInputData = (state) => state.addUser.inputData;

export const { inputRequest, addUserData } = addUserSlice.actions;

export default addUserSlice.reducer;
