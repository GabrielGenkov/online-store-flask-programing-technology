import React, { useState, useEffect } from 'react'

import { Logout } from './Logout'
import { Menu, Dropdown } from 'semantic-ui-react';

import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const [activeItem, setActiveItem] = useState("asdasd")
    const [media, setMedia] = useState(false)
    const location = useLocation()
    
    useEffect(() => {
        setActiveItem(location.pathname)
        setMedia(window.matchMedia('(max-width: 485px)').matches)
        window.matchMedia('(max-width: 485px)').addListener(refreshMedia)
    }, [location])

    const refreshMedia = () => {
        setMedia(window.matchMedia('(max-width: 485px)').matches)
    }

    return(
        <Menu className="navbar" fluid vertical={media} color="blue" size="large" pointing secondary>
            <Menu.Item header>Online Store</Menu.Item>
            <Menu.Item
                as={Link}
                to="/"
                name='home'
                active={activeItem === '/'}
            />
            <Menu.Menu position='right'>
                {!sessionStorage.getItem("access_token") &&
                    <>
                        <Menu.Item
                            as={Link}
                            to="/signin"
                            name='sign in'
                            active={activeItem === '/signin'}
                        />
                        <Menu.Item
                            as={Link}                    
                            to="/signup"
                            name='sign up'
                            active={activeItem === '/signup'}
                        />
                    </>
                }
                {sessionStorage.getItem("access_token") &&
                    <>
                        <Menu.Item
                            as={Link}                    
                            to="/add_offer"
                            name='add offer'
                            active={activeItem === '/add_offer'}
                        />
                        <Dropdown direction={media ? "left" : null} item text='Profile'>
                            <Dropdown.Menu>
                                <Dropdown.Header>My profile</Dropdown.Header>
                                    <Dropdown.Item as={Link} to="/profile/myoffers" >
                                        My Offers
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/profile/purchasedoffers" >
                                        Purchased Items
                                    </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Logout />
                    </>
                }
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;