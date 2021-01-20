import React, { useContext, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="yellow">
      <Menu.Item name={user.username} active as={Link} to="/" 
            >
        <Icon name='user' />
        {user.username} 
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} >
        <Icon color="yellow" name='log out' />
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="red">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        <Icon name='home' color="yellow" />
        Home
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          <Icon name='sign in' color="yellow" />
          Login
          </Menu.Item>
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
        <Icon name='add' color="yellow" />
        Register
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;