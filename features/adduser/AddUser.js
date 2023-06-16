import { useDispatch, useSelector } from 'react-redux';
import { addUserData, addNewUser, inputRequest, selectInputData, selectActiveTab, selectUserData, selectApiError, selectStatus, fetchUsers, selectInputUser } from "./addUserSlice";
import styles from './AddUser.module.css';
import UsersUI from "../users/UsersUI";
import { useEffect } from "react";

/*
const RedirectPage = () => {
  const history = useHistory();
  history.push("/Users"); 
};
*/
  
const AddUser = () => { useEffect(() => { dispatch(fetchUsers())}, []);

  const inputSlice = useSelector(selectInputData);
  const activeTabSlice = useSelector(selectActiveTab);
  const apiError = useSelector(selectApiError);
  const userStatus = useSelector(selectStatus);
  let userDataSlice = useSelector(selectUserData);  
  const dispatch = useDispatch();
  
  const addUser = (input) => {
                                let data = localStorage.getItem("data");
                                let data2 = JSON.parse(data);
                                if (data2 === null) {dispatch(addNewUser(input))}
                                else {dispatch(addUserData(data2));}
                              }  

    return (
            <>
            <center>
            {activeTabSlice?
              (<>
                <input  className={styles.textbox} aria-label="Enter New User" value={inputSlice} 
                        onChange={(e) => dispatch(inputRequest(e.target.value))} />
                <button className={styles.button} onClick={() => addUser(inputSlice)}>Add User</button>
              </>)
            :
              <UsersUI userStatus = {userStatus} userDataSlice = {userDataSlice} apiError={apiError}/>
            //  RedirectPage()
            }
            {apiError && (<p><b>Error :</b>&nbsp; {apiError} </p>)}
                        
            </center>
            </>
            
    );
};


export default AddUser;