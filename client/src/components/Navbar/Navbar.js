import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";


const Navbar = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <nav activeKey={window.location.pathname} className="navbar navbar-expand-lg bg-body-tertiary bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="home"> <img src="/cube.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={`home`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`about`}>About</Link>
                        </li>
                        {
                            isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link" to={`profile`}>Profile</Link>
                                </li>
                            )
                        }   
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <LoginButton className="ms-3" />
                    <LogoutButton className="ms-3" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;