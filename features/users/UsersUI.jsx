import React from "react";

const UsersUI = ({userStatus, userDataSlice, apiError}) =>{

    return(
        <>
        <center>
        {(userStatus !== "succeeded")? (<center>Loading...</center>):(
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

export default UsersUI;