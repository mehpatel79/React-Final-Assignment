import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, fetchUsers, selectApiError, selectStatus } from "../adduser/addUserSlice";
import UsersUI from "./UsersUI";

const Users = () => {

    let userDataSlice =  useSelector(selectUserData);
    const apiError = useSelector(selectApiError)
    const userStatus = useSelector(selectStatus)
    const dispatch = useDispatch();

    useEffect(() => {dispatch(fetchUsers())}, []);

    const fetchData = () => {
                                let data = localStorage.getItem("data");
                                let data2 = JSON.parse(data);
                                if (data2 === null) { return []}
                                else {   return data2}
                            }
      
      let data3 = fetchData();
      userDataSlice = [...userDataSlice, ...data3];

    return (
            <UsersUI userStatus = {userStatus} userDataSlice = {userDataSlice} apiError={apiError}  />
            );
};

export default Users;