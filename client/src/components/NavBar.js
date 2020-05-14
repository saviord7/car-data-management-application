import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
      <nav>
        <div className="nav-wrapper blue"
             style={{
               padding: '0 2rem'
             }}>
          <ul id="nav-mobile"
              className="right hide-on-med-and-down">
            <li><NavLink to={"/home"}>HOME</NavLink></li>
            <li><NavLink to={"/trip/list"}>YOUR TRIPS</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>SIGN OUT</a></li>
          </ul>
        </div>
      </nav>
  );
};
