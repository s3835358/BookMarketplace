import React, {useState, useEffect, Component} from "react";
import axios from "axios";
import store from "../../store";
import classnames from "classnames";
import {useUserContext} from '../UserManagement/UserContext';



export const Downloads = props => {

    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [phrase, setPhrase] = useState("Sell");

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
          if(store.getState().security.user.userType.match("admin")){
            setPhrase("Add");
          }
      }

    }, [user]);



             function handleBook() {



    }



    return(
 

          
    <>
          <div>
            <h3> Download CSV about Books </h3>

            <input type="Download" onClick={handleBook} className="btn btn-info btn-block mt-4" />

        </div>
        <div> 
                <h3> Download CSV about Users </h3>
                <input type="Download" onClick={handleUser} className="btn btn-info btn-block mt-4" />

            </div>
            <div>
                <h3> Download CSV about Orders </h3>
                <input type="Download" onClick={handleOrder} className="btn btn-info btn-block mt-4" />

            </div>
    </>

   

            );


}
export default Downloads;











    
    

