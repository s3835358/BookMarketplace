import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';


export const UserList = props => {
    
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    
    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }
       
    }, [user]);

    

    

    return (
        <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?
                
                  <div>
                    
                    <a className="nav-link " href="register">
                        Add User (inc Admin)
                    </a>
                    
                  </div>
                  
              :
                <div></div>
            :
              <div></div>
          }
        </div>
    );
  
}
export default UserList;