import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from "../../apiService";
import { createContext } from "react";

const initialState = {
                        counter : 10,
                        userData : [],
                        inputUser : [],
                        inputData : "",
                        status: "",
                        apiError:"",
                        activeTab: true,
                      };

export const fetchUsers = createAsyncThunk("addUser/fetchUsers", async () => {
                                            const response = await API.getUsers();
                                            return response.data              })


export const addUserSlice = createSlice({
      name: 'addUser',
      initialState,
      reducers: {
                  inputRequest : (state, action) => {
                                                        state.inputData = action.payload;
                                                    },
                
                  addNewUser: (state, action) => {

                                                        if(!action.payload) { alert("Plese Enter User Name");}
                                                        else {  
                                                                state.counter = state.counter + 1;
                                                                state.inputUser = [{id: state.counter, name: state.inputData}]
                                                                state.activeTab = false;
                                                                state.userData = [...state.userData,...state.inputUser];
                                                                state.inputData = "";
                                                                state.status = "succeeded";
                                                                localStorage.setItem("data", JSON.stringify(state.inputUser));
                                                              }

                                                    },
                                                          
                    addUserData: (state, action) => {

                                                          if(!action.payload) { alert("Plese Enter User Name");}
                                                          else {  
                                                                  state.counter = action.payload.length + 11;
                                                                  state.inputUser = [...action.payload,
                                                                                      {id: state.counter, name: state.inputData}
                                                                                    ]
                                                                  state.activeTab = false;
                                                                  state.userData = [...state.userData, ...state.inputUser];
                                                                  state.inputData = "";
                                                                  state.status = "succeeded";
                                                              
                                                                localStorage.setItem("data", JSON.stringify(state.inputUser));
                                                              }
                                                      },
                },

                      extraReducers(builder) {
                        builder
                        .addCase(fetchUsers.pending, (state) => { state.status = "pending"})
                        .addCase(fetchUsers.fulfilled, (state, action) => {
                                                                            state.status = "succeeded"
                                                                            state.userData = [...action.payload]
                                                                          })
                        .addCase(fetchUsers.rejected, (state, action) => {
                                                                            state.status = "failed"
                                                                            state.apiError = action.error.message
                                                                         })
                            
                },
                
      });

export const selectUserData = (state) => state.addUser.userData;

export const selectInputData = (state) => state.addUser.inputData;

export const selectInputUser = (state) => state.addUser.inputUser;

export const selectActiveTab = (state) => state.addUser.activeTab;

export const selectApiError = (state) => state.addUser.apiError;

export const selectStatus = (state) => state.addUser.status;

export const { inputRequest, addUserData, addNewUser } = addUserSlice.actions;

export const UserContext = createContext();

export default addUserSlice.reducer;
