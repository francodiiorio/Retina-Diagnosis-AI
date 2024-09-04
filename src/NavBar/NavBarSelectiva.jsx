import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const NavBarSelectiva = ({ children }) => {

    const location = useLocation();

    const [mostrarNavBar, setMostrarNavBar] = useState(false)

    useEffect(() => {
        console.log('Location' + location.pathname);
        if (location.pathname === '/Login'
            || location.pathname === '/'
        ) {
            setMostrarNavBar(false)
        } else {
            setMostrarNavBar(true)
        }
    }, [location.pathname])

    return (
        <div>
            {mostrarNavBar && children}
        </div>
    )
}

export default NavBarSelectiva
