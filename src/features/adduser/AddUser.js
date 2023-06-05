import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, addUserData, inputRequest, selectInputData, selectActiveTab } from "./addUserSlice";
import styles from './AddUser.module.css';
import { API } from "../../apiService";
import Users from "../users/Users";
import { useState } from 'react';

const AddUser = () => {


  const userDataSlice =  useSelector(selectUserData);
  const inputSlice = useSelector(selectInputData);
  const activeTabSlice = useSelector(selectActiveTab);
  const [apiError, setApiError] = useState("");

    const dispatch = useDispatch();
        
    async function getUsersData() {
    
      try{
          const response = await API.getUsers();
          dispatch(addUserData(response.data));
          }
      catch(error){
          setApiError(error.message);
      }
  }



    return (
            <>
            <center>
            {activeTabSlice?(<>
            <input  className={styles.textbox} 
                        aria-label="Enter New User" 
                        value={inputSlice} 
                        onChange={(e) => dispatch(inputRequest(e.target.value))} />
    
                      <button className={styles.button} onClick={() => getUsersData()}>Add User</button>
                      </>)
            :

         <Users />}
            {/*
                    <h2>List of Users </h2>
                    <table border={"1px solid black"}>
                        <thead>
                        <tr>
                        <th style={{padding:"5px"}}>ID</th>
                        <th style={{padding:"5px"}}>NAME</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userDataSlice.map((user) =>
                            <tr key={user.id} >
                            <td style={{padding:"5px"}}>{user.id}</td>
                            <td style={{padding:"5px"}}>{user.name}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    

            
            <hr />
            <br />
            {apiError && (<p><b>Error :</b>&nbsp; {apiError} </p>)}*/
                        }
            </center>
            </>
    );
};


export default AddUser;