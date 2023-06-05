import { useDispatch, useSelector } from 'react-redux';
import { addUserData, inputRequest, selectInputData, selectActiveTab } from "./addUserSlice";
import styles from './AddUser.module.css';
import { API } from "../../apiService";
import { useState, useTransition } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RedirectPage = () => {
  const history = useHistory();
  history.push("/Users"); 
};

  
const AddUser = () => {

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

            RedirectPage()}
            {apiError && (<p><b>Error :</b>&nbsp; {apiError} </p>)}
                        
            </center>
            </>
    );
};


export default AddUser;