import { useEffect } from "react";
import { API } from "../../apiService";
import { useState } from "react";

const Users = () => {

    const [userData, setUserData] = useState([]);
    const [apiError, setApiError] = useState("");
    const [loadingUserData, setLoadingUserData] = useState(false);

    useEffect(() => {
        getUsersData();
    }, []);


async function getUsersData() {
    
    try{
        setLoadingUserData(true);
        setApiError("");
        const response = await API.getUsers();
        setUserData(response.data);
        setLoadingUserData(false);        
    }
    catch(error){
        setLoadingUserData(false);
        setUserData([]);
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
                        {userData.map((user) =>
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