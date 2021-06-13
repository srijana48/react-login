// functional component
import React from 'react'
import './Header.component.css'
import { NavLink, withRouter } from 'react-router-dom'


const logout = (history) => {
    // localstorage clear
    localStorage.clear();
    history.push('/')
    // navigate to Login page
}

const HeaderComponent = (props) => {
    console.log('props in header>>', props)

    let content = props.isLoggedIn
        ? <ul className="nav_list">
            <li className="nav_item">
                <NavLink to="/home/pramesh" activeClassName="selected">Home</NavLink>
            </li>
            <li className="nav_item">
                <NavLink to="/dashboard" activeClassName="selected">Dashboard</NavLink></li>

            <li className="nav_item">
                <NavLink to="/about" activeClassName="selected">About</NavLink></li>


            <li className="nav_item">
                <NavLink to="/settings" activeClassName="selected">Setting</NavLink></li>

            <li className="nav_item">
                <button
                    className="btn btn-success logout"
                    onClick={() => logout(props.history)}
                >
                    Logout
                </button>

            </li>




        </ul>
        : <ul className="nav_list">
            <li className="nav_item">Home</li>
            <li className="nav_item">Login</li>
            <li className="nav_item">Register</li>
        </ul>

    return (
        <div className="nav_bar">
            {content}

        </div>

    )
}
export const Header = withRouter(HeaderComponent);
// once we wrap component with withROuter we will have props(history,match and location) in props