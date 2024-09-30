import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";

import usersService from "../services/userSevice";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService.getUsers().then( users => {
            setUsers(users)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return <UsersList items={users}/>
}

export default Users