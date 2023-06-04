import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

function getUsers() {
    return axiosInstance.get("/users");
}


export const API = {
    getUsers,
};