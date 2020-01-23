import React, { useState } from 'react'

import { Menu, Dropdown } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const Navbar = () => {

    const [activeItem, setActiveItem] = useState(window.location.pathname)
    
    let handleItemClick = (e, { to }) => {
        setActiveItem(to)
    }   

    return(
        <Menu color="blue" size="large" pointing secondary>
            <Menu.Item header>Online Store</Menu.Item>
            <Menu.Item
                as={Link}
                to="/"
                name='home'
                active={activeItem === '/'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    as={Link}
                    to="/signin"
                    name='sign in'
                    active={activeItem === '/signin'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    as={Link}                    
                    to="/signup"
                    name='sign up'
                    active={activeItem === '/signup'}
                    onClick={handleItemClick}
                />
                <Dropdown item text='Profile'>
                    <Dropdown.Menu>
                        <Dropdown.Header>My profile</Dropdown.Header>
                            <Dropdown.Item as={Link} to="/profile/myoffers" onClick={handleItemClick}>
                                My Offers
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/profile/purchasedoffers" onClick={handleItemClick}>
                                Purchased Items
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    as={Link}
                    to="/signin"
                    name='log out'
                    active={activeItem === '/signin'}
                    onClick={handleItemClick}
                />
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;