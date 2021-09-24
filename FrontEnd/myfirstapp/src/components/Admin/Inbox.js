import React, {useState, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';


export const Inbox = props => {
    
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [shops, setShops] = useState([]);

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }

      var req = {
        "token": localStorage.jwtToken
      }

      axios.post("https://sept-login-service.herokuapp.com/api/users/shopRequests", req).then((response) => {         

        console.log(response);
        if(response.data.length > 0) {
          setShops(response.data);
        }
        
      });
       
    }, [user]);
    
    return (
        <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?
                
                  <div>
                    {
                      shops.map((shop, i) =>{
                          return <div className = "shop" key = {shop.id}>{shop.fullName} </div>
                      })
                    }
                    
                  </div>
                  
              :
                <div></div>
            :
              <div></div>
          }
        </div>
    );
  
}
export default Inbox;