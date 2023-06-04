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
            {loadingUserData? (<center>Loading...</center>):(
                <ul>
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
                </ul>
            )}
            {apiError && (<p>Error: {apiError} </p>)}
            </>
    );
};

export default Users;