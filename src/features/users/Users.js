import { useEffect } from "react";
import { API } from "../../apiService";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, fetchUserRequest } from "../adduser/addUserSlice";



const Users = () => {

    const [apiError, setApiError] = useState("");
    const [loadingUserData, setLoadingUserData] = useState(false);
    const userDataSlice =  useSelector(selectUserData);

    const dispatch = useDispatch();


    useEffect(() => {
        getUsersData();
    }, []);


async function getUsersData() {
    
    try{
        setLoadingUserData(true);
        setApiError("");
        const response = await API.getUsers();
        if(userDataSlice.length < 10) {
        dispatch(fetchUserRequest(response.data))};
        setLoadingUserData(false);        
    }
    catch(error){
        setLoadingUserData(false);
        setApiError(error.message);
    }

}
    return (
            <>
            <center>
            {loadingUserData? (<center>Loading...</center>):(
                    <>
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
                    </>
            )}
            <br />
            {apiError && (<p><b>Error :</b>&nbsp; {apiError} </p>)}
            <hr />
            <br />
            {<h3>For Addition of new User click to : <a href="/AddUser">Add User</a></h3>}
            </center>
            </>
    );
};

export default Users;