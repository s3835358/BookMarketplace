import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';
import '../Background.css'

export const BlackList = props => {
    
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [users, setUsers] = useState([]);
    

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }

      var req = {
        "token": localStorage.jwtToken
      }

      axios.post("https://sept-login-service.herokuapp.com/api/users/getBlacklist", req).then((response) => {         

        console.log(response);

        if(response.data.length > 0) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      
      });

    }, [user]);

    
    
    return (
      <div className="background2">
                    
        {
          logged && 'userType' in store.getState().security.user?
            store.getState().security.user.userType.match("admin")?
              
                <div style ={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                  
                  
                  <div style ={{display:"block", marginLeft:"30%", alignContent:"center", justifyContent:"center"}}>
                    {users.map((user, i) =>{
                        return (

                          <div style={{display:"flex", flexDirection:"column", 
                          border:"2px groove black", borderRadius: "10px", backgroundColor:"white",
                          alignItems:"center", justifyContent:"center", margin:"1%", width:"50%"}}>
                            
                            <div className = "user" key = {user.id} style={{textAlign:"center"}} >
                            User: <b>{user.fullName}</b>, type: {user.userType}</div>
                            
                          </div>
                        )
                    })}
                  </div>

                </div>
                
            :
              <div></div>
          :
            <div></div>
        }
      </div>
    );
  
}
export default BlackList;