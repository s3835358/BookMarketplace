import React, {useContext, useEffect, useState} from 'react'
import {useUserContext} from '../UserManagement/UserContext';
import store from "../../store";

export const Header = () => {
    
    const {userType, setUserType} = useUserContext();
    const {user, setUser} = useUserContext();
    const [logged, setLogged] = useState(false);

    useEffect (() => {
        if(user == "" && localStorage.getItem("user") == null) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }, [user]);

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark mb-4" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        BOOKEROO
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/catalogue">
                                    Catalogue
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto" >
                            {logged?
                                <div style = {{display:"flex", flexDirection:"row"}}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout">
                                            Log Out
                                        </a>
                                    </li>
                                    
                                </div>
                            :
                                
                                <div style = {{display:"flex", flexDirection:"row", color:"white"}}>
                                    <li className="nav-item">
                                        <a className="nav-link " href="register">
                                            Sign Up
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="login">
                                            Login
                                        </a>
                                    </li>   
                                </div>
                            }
                            
                        </ul>
                    

                    </div>
                </div>
            </nav>
        </div>
    )
    
}
export default Header;