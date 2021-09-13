import React, {useState, useEffect} from 'react';

const UserContext = React.createContext();

export function UserContextProvider(props) {

    const [userType, setUserType] = useState("");

    const [user, setUser] = useState("");
    
    useEffect (() => {
        console.log("hello again: ")
        console.log(user);
        var us = localStorage.getItem("user");
        if(us != null) {
            setUser(us);
        }

    }, [user]);
  
  return (
    <UserContext.Provider value = {{userType,user,setUser,setUserType}}>
        {props.children}
    </UserContext.Provider>
  );

}

export const useUserContext = () => React.useContext(UserContext);