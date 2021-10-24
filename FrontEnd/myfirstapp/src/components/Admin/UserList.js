import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';
import Register from "../UserManagement/Register";
import '../Background.css'

export const UserList = props => {
    
    var EMPTY_USER = -1;
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(EMPTY_USER);
    const [refresh, setRefresh] = useState();

    
    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }
      
      var req = {
        "token": localStorage.jwtToken
      }

      axios.post("https://sept-login-service.herokuapp.com/api/users/getUsers", req).then((response) => {         

        console.log(response);

        if(response.data.length > 0) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      
      });
      
    }, [user, refresh]);

    function block(id) {
      
      var req = {
        "token": localStorage.jwtToken,
        "id": id
      }

      axios.post("https://sept-login-service.herokuapp.com/api/users/blockUser", req).then((response) => {         

        setRefresh(response);    
      });
    }
    

    return (
        <div className="background2">
                    
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?
                
                  <div style ={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
                    <a className="btn btn-info btn-block mt-4" href="register" 
                    style ={{color:"white", backgroundColor:"black", 
                    borderColor:"black",width:"15%", marginLeft:"41%"}}>
                        Add User (inc Admin)
                    </a>

                    <div style ={{display:"block", marginLeft:"30%", alignContent:"center", justifyContent:"center"}}>
                      {users.map((user, i) =>{
                          return (

                            <div style={{display:"flex", flexDirection:"column", backgroundColor:"#edf6f9",
                            border:"2px groove black", borderRadius: "10px", 
                            alignItems:"center", justifyContent:"center", margin:"1%", width:"50%"}}>
                              
                              <div className = "user" key = {user.id} style={{textAlign:"center"}} 
                              >User: <b>{user.fullName}</b>, type: {user.userType}</div>

                              <div style={{display:"flex", flexDirection:"row"}}>

                                <div className="btn btn-info btn-block mt-4" onClick={e=> 
                                {edit == user.id? setEdit(EMPTY_USER) : setEdit(user.id)}}
                                type ="button" style={{color:"white", backgroundColor:"black", 
                                borderColor:"black", margin:"0% 0% 5% 0%"}}>Edit</div>

                                <div className="btn btn-info btn-block mt-4" onClick={e=> 
                                {block(user.id)}}
                                type ="button" style={{color:"white", backgroundColor:"black", 
                                borderColor:"black", margin:"0% 0% 5% 5%"}}>Block</div>

                              </div>
                              {edit == user.id?

                                <Register toEdit = {user}></Register>
                                :
                                <div/>
                              }
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
export default UserList;