import React, {useState, useMemo} from "react";

import Table from '../Layout/table';
import '../Background.css';

export const TransactionHistory = props => {
    
    const [orders] = useState([]);

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
    
    return (
        <div className="background4" style ={{alignItems:"center", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    
          
                
            <div style ={{alignItems:"center", display:"flex", 
            flexDirection:"column", justifyContent:"center"}}>
                <Table columns={orderCols} data={orders} />
                <div type = "button" className="btn btn-info btn-block mt-4"> Download</div>
                <p style={{color:"white"}}>Transactions as CSV</p>
            </div>
                  
            
          
        </div>
    );
  
}
export default TransactionHistory;