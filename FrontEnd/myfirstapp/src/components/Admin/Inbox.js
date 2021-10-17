import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';
import Table from '../Layout/table';
import { customStyles } from "../Layout/selectStyle";
import Select from 'react-select';


export const Inbox = props => {
    
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [shops, setShops] = useState([]);
    const [shopSelected, setShopSelected] = useState({});
    const [shopOpts, setShopOpts] = useState([]);
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

      axios.post("https://sept-login-service.herokuapp.com/api/users/shopRequests", req).then((response) => {         

        console.log(response);
        if(response.data.length > 0) {
          setShops(response.data);
          fillDropDown(response.data);
        } else {
          setShops([]);
          setShopOpts([]);
        }
      
      });
       
    }, [user, refresh]);

    function fillDropDown(res){
      var len = res.length;
      var arr = [];
      for(var i = 0; i < len;i++){
          
          arr.push({
            value : res[i].id, 
            label: res[i].fullName
          });
          
      };
     
      setShopOpts(arr);
      
    }

    // Approves a specific account request as selected by the dropdown menu
    function approve(){
      
      var req = {
        "token": localStorage.jwtToken,
        "id": shopSelected.value,
        "accept": true
      }

      console.log(req);

      axios.post(`https://sept-login-service.herokuapp.com/api/users/approveRejectShop`,
      req).then(res => {
        console.log(res);
        setShopSelected({});
        setRefresh(res);
      }).catch(err =>{
        alert(err);
      })
    }

  // Rejects a specific account request as selected by the dropdown menu
    function reject(){

      var req = {
        "token": localStorage.jwtToken,
        "id": shopSelected.value,
        "accept": false
      }

      axios.post(`https://sept-login-service.herokuapp.com/api/users/approveRejectShop`,
      req).then(res => {
        console.log(res);
        setShopSelected({});
        setRefresh(res);  

      }).catch(err =>{
        alert(err);
      })
    }

    const shopCols = useMemo(
      () => [
        {Header: 'Name', accessor: 'fullName',},
        {Header: 'Username', accessor: 'username',},
        {Header: 'Phone', accessor: 'phone',},
        {Header: 'Address', accessor: 'address',},
        {Header: 'ABN', accessor: 'abn',},
        {Header: 'Business', accessor: 'busName',},
      ],
      []
    ); 
    
    return (
        <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
          {
            logged && 'userType' in store.getState().security.user?
              store.getState().security.user.userType.match("admin")?
                
                  <div>
                    <Table columns={shopCols} data={shops} />
                    <div className="Admin-Form">
                      <Select
                          styles={customStyles}
                          placeholder="Select Shop/User"
                          options={shopOpts}
                          value = {shopSelected}
                          onChange={opt => setShopSelected(opt)}
                      />
                      <br/>
                      <input
                          className="Admin-Submit"
                          type="submit"
                          onClick={approve}
                          value="APPROVE"
                      />
                      <input
                          className="Admin-Submit"
                          type="submit"
                          onClick={reject}
                          value="REJECT"
                      />
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
export default Inbox;