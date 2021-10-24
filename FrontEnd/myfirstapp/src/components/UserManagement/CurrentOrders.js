import React, {useState, useMemo, useEffect} from "react";
import Select from 'react-select';
import axios from "axios";
import store from '../../store';
import {useUserContext} from './UserContext';
import Table from '../Layout/table';
import { customStyles } from "../Layout/selectStyle";
import '../Background.css';

export const CurrentOrders = props => {
    
    const [logged, setLogged] = useState(false);
    const {user} = useUserContext();
    const [orders] = useState([]);
    const [orderOpts, setOrderOpts] = useState([]);
    const [orderSelected, setOrderSelected] = useState({
        id:"",
        book_title:"",
        buyer_id:"",
        seller_id:""
    });

    function fillDropDown(res){
        var len = res.length;
        var arr = [];
        for(var i = 0; i < len;i++){
            var val = res[i].id;
            
            // Based on https://stackoverflow.com/questions/55938200/intl-datetimeformat-returns-incorrect-date-for-utc
            var display_time = new Intl.DateTimeFormat('en-AU', 
                {year: 'numeric', timeZone: 'UTC', month: '2-digit',
                day: '2-digit', hour12:false, hour: '2-digit', minute: '2-digit', 
                second: '2-digit'}).format(res[i].ordered_at);
            
            arr.push({
                value : val, 
                label: res[i].book_title + " - " + display_time, 
                book_title: res[i].book_title,
                buyer_id: res[i].buyer_id,
                seller_id: res[i].seller_id
            });
            
        };
        
        setOrderOpts(arr);
        
    }

    useEffect (() => {
        if((user === "") && (localStorage.getItem("user") === null)) {
            setLogged(false);
        } else {
            setLogged(true);
        }
        
        var req = {
            "id": store.getState().security.user.id,
        }

        axios.post(`https://sept-orders.herokuapp.com/orders/getRecent`, req).then(res => {
          
          fillDropDown(res.data);

        }).catch(err =>{
            alert("Incorrect values");
        })

    }, [user]);

    const orderCols = useMemo(
      () => [
        {Header: 'Order ID', accessor: 'id',},
        {Header: 'Seller', accessor: 'sellerId',},
        {Header: 'Buyer', accessor: 'buyerId',},
        {Header: 'Qty', accessor: 'qty',},
        {Header: 'Price', accessor: 'price',},
        {Header: 'Title', accessor: 'bookTitle',},
      ],
      []
    ); 
    
    function cancelOrder() {

        // Checks password and confirm password fields match
        
        var req = {
            "id": orderSelected.id
        }
        // Post request to register account
        axios.post(`https://sept-orders.herokuapp.com/orders/cancelOrder`,req).then(res => {
            
            if(res.status === 200) {
              alert(orderSelected.book_title + " has been canceled..");
            } else {
              alert(orderSelected.book_title + " was not canceled..");
            }
            
        }).catch(err =>{
            alert("Incorrect values");
        })
        
    };

    return (
        <div className="background" style ={{alignItems:"center", 
        display:"flex", flexDirection:"column", justifyContent:"center"}}>
            {
            logged && 'userType' in store.getState().security.user?     
                <div>
                    <Select 
                        styles={customStyles}
                        placeholder="Select Order to cancel.."
                        options={orderOpts}
                        onChange={opt => setOrderSelected({...orderSelected, 
                            id:opt.value,
                            book_title:opt.book_title,
                            buyer_id:opt.buyer_id,
                            seller_id:opt.seller_id
                        })}
                    />
                    <div style={{paddingLeft:"35%"}}>
                        <div type="button" onClick={cancelOrder} 
                        className="btn btn-info btn-block mt-4"
                        style={{backgroundColor:"black", color:"white",
                        borderColor:"black"}}>Cancel Order</div>
                    </div>

                    <div style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        <Table columns={orderCols} data={orders} />
                    </div>
                </div>
            :
            <div/>    
            }      
            
          
        </div>
    );
  
}
export default CurrentOrders;