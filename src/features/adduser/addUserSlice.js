import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from "../../apiService";

const initialState = {
                        counter : 10,
                        userData : [],
                        inputData : "",
                        activeTab: true,
                        
                      };

export const fetchUsers = createAsyncThunk("fetchData", async () => {
  const response = await API.getUsers();
  return response.data

})

export const addUserSlice = createSlice({
      name: 'addUser',
      initialState,
      reducers: {
                  inputRequest : (state, action) => {
                    state.inputData = action.payload;

                  },

                  fetchUserRequest : (state, action) => {
                      state.userData = [...action.payload, ...state.userData];
                
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
                                            console.log("before", state.userData);
                                                state.userData = [...state.userData,
                                                                  {id: state.counter, name: state.inputData}
                                                                ]
                                                }

                                                state.activeTab = false;
                                                console.log("after",state.userData);
                                                state.inputData = "";
                                              }
                                          },
                  default : (state) => {
                          state.userData = [...state.userData, fetchUsers]
                    
                  },

                                        },

                      extraReducers(builder) {
                        builder.addCase(fetchUsers, (state, action) => {
                          state.userData = [...state.userData, ...action.payload]
                            
               })
                      },
                
      });

export const selectUserData = (state) => state.addUser.userData;

export const selectInputData = (state) => state.addUser.inputData;

export const selectActiveTab = (state) => state.addUser.activeTab;

export const { inputRequest, addUserData, fetchUserRequest } = addUserSlice.actions;

export default addUserSlice.reducer;
