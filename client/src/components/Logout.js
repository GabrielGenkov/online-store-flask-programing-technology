import React from 'react'
import { useHistory } from 'react-router-dom'
import { Item } from 'semantic-ui-react'

export const Logout = () => {
    const history = useHistory()

    const handleLogout = () => {
        sessionStorage.clear()
        history.push("/")
    }
    return <Item style={{cursor: "pointer"}} onClick={handleLogout}>Log Out</Item>
}