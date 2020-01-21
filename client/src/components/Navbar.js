import React, { useState } from 'react'

import { Menu, Dropdown } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const Navbar = () => {

    const [activeItem, setActiveItem] = useState('home')

    let handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return(
        <Menu color="blue" size="large" pointing secondary>
            <Menu.Item header>Online Store</Menu.Item>
            <Link to="/">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
            </Link>
            <Menu.Menu position='right'>
                <Link to="/signin">
                    <Menu.Item
                        name='sign in'
                        active={activeItem === 'sign in'}
                        onClick={handleItemClick}
                    />
                </Link>
                <Link to="/signup">
                    <Menu.Item
                        name='sign up'
                        active={activeItem === 'sign up'}
                        onClick={handleItemClick}
                    />
                </Link>
                <Dropdown item text='Profile'>
                    <Dropdown.Menu>
                        <Dropdown.Header>My profile</Dropdown.Header>
                        <Link to="/profile/myoffers">
                            <Dropdown.Item>
                                My Offers
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Item>Medium</Dropdown.Item>
                        <Dropdown.Item>Large</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;