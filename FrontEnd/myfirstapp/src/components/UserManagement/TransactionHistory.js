import React, {useState, useMemo, useEffect} from "react";
import axios from 'axios';
import store from "../../store";
import {useUserContext} from '../UserManagement/UserContext';
import Table from '../Layout/table';
import '../Background.css';

export const TransactionHistory = props => {
    
    const [history, setHistory] = useState([]);
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();

    useEffect (() => {
      if((user === "") && (localStorage.getItem("user") === null)) {
          setLogged(false);
      } else {
          setLogged(true);
      }

      var req = {}
      
      if(logged){
        req = {
          "id": store.getState().security.user.id
        }
      }
      

      if(store.getState().security.user.userType.match("admin")) {
        
        axios.post("https://sept-orders.herokuapp.com/orders/getAll", req).then((response) => {         

          console.log(response);

          if(response.data.length > 0) {
            setHistory(response.data);
          }
      
        });

      } else if (logged) {
        axios.post("https://sept-orders.herokuapp.com/orders/getOrders", req).then((response) => {         

          console.log(response);

          if(response.data.length > 0) {
            setHistory(response.data);
          }
      
        });
      }
      

    }, [user]);


  
    const historyCols = useMemo(
      () => [
        {Header: 'Order ID', accessor: 'id',},
        {Header: 'Seller ID', accessor: 'seller_id',},
        {Header: 'Buyer ID', accessor: 'buyer_id',},
        {Header: 'Qty', accessor: 'qty',},
        {Header: 'Price', accessor: 'price',},
        {Header: 'Book ID', accessor: 'book_id',},
        {Header: 'Title', accessor: 'book_title',},
        {Header: 'Date', accessor: 'ordered_at',},
      ],
      []
    ); 
    
    return (
        <div className="background4" style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
            <div style ={{alignItems:"center", display:"flex", 
            flexDirection:"column", justifyContent:"center"}}>
                <Table columns={historyCols} data={history} />
                <div type = "button" className="btn btn-info btn-block mt-4"> Download</div>
                <p style={{color:"white"}}>Transactions as CSV</p>
            </div>
                  
            
          
        </div>
    );
  
}
export default TransactionHistory;