import React from "react";
import store from "../../store";


export const Admin = props => {
    
    console.log("Next: ");
    console.log(store.getState());

    console.log(store.getState().security.user.userType);

    return (
        <div className="login">
        
        </div>
    );
  
}
export default Admin;