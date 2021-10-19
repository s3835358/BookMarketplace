import React, {useEffect, useState} from 'react'
import {useUserContext} from '../UserManagement/UserContext';
import store from "../../store";

export const Header = () => {
    
    const {user} = useUserContext();
    const [logged, setLogged] = useState(false);

    useEffect (() => {
        if((user === "") && (localStorage.getItem("user") === null)) {
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
                                <a className="nav-link" href="/catalogue/:book">
                                    Catalogue
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/aboutContact">
                                    About Us/Contact
                                </a>
                            </li>
                        </ul>
                        {
                            logged && 'userType' in store.getState().security.user?
                                store.getState().security.user.userType.match("admin")?

                                <ul className="navbar-nav mr-auto" >
                                    <li className="nav-item" style={{display:"flex", flexDirection:"row"}}>
                                        <a className="nav-link" href="/addBook">
                                            Add Book
                                        </a>
                                        <a className="nav-link" href="/editBook">
                                            Edit Book
                                        </a>
                                        <a className="nav-link" href="/userList">
                                            User List
                                        </a>
                                        <a className="nav-link" href="/blackList">
                                            BlackList
                                        </a>
                                        <a className="nav-link" href="/inbox">
                                            Inbox
                                        </a>
                                    </li>
                                </ul>
                                :
                                <div>
                                    {store.getState().security.user.userType.match("shop")?
                                        <ul className="navbar-nav mr-auto" >
                                            <li className="nav-item" style={{display:"flex", flexDirection:"row"}}>
                                                <a className="nav-link" href="/addBook">
                                                    Sell Books
                                                </a>
                                            </li>
                                        </ul>
                                    :
                                        <div/>
                                    }
                                </div>
                            :
                            <div></div>
                        }
                        

                        <ul className="navbar-nav ml-auto" >
                            {logged?
                                <div style = {{display:"flex", flexDirection:"row"}}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/transactionHistory">
                                            Transaction History
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/currentOrders">
                                            Current Orders
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/settings">
                                            Settings
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout">
                                            Log Out
                                        </a>
                                    </li>
                                    
                                </div>
                            :
                                
                                <div style = {{display:"flex", flexDirection:"row", color:"white"}}>
                                    <li className="nav-item">
                                        <a className="nav-link " href="/register">
                                            Sign Up
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
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