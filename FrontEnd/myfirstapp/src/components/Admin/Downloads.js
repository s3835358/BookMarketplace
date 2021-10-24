import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import store from "../../store";
import classnames from "classnames";
import { useUserContext } from '../UserManagement/UserContext';



export const Downloads = props => {

  const [logged, setLogged] = useState(false);
  const { user } = useUserContext();
  const [phrase, setPhrase] = useState("Sell");
  const [Users, setUsers] = useState([]);
  const [Orders, setOrders] = useState([]);


  useEffect(() => {
    if ((user === "") && (localStorage.getItem("user") === null)) {
      setLogged(false);
    } else {
      setLogged(true);
      if (store.getState().security.user.userType.match("admin")) {
        setPhrase("Add");
      }
    }

  }, [user]);


  const objectToCsv = function (data) {
    const csvRows = [];

    //get the headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    //loop over the rows
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  const download = function (data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    a.click();
  };



// Downloads Books 
  const getReportBooks = async function () {
    const jsonUrl = 'https://salty-caverns-05675.herokuapp.com/books/getBooks';
    const res = await fetch(jsonUrl);
    const json = await res.json();

    const data = json.map(row => ({
      id: row.id,
      title: row.title,
      author: row.author,
      isbn: row.isbn,
      publisher: row.publisher,
      year: row.year,
      category: row.category,
      shop: row.shop,
      user: row.user,
      qty: row.qty,
      price: row.price,
      condition: row.condition,
    }));

    const csvData = objectToCsv(data);
    download(csvData);

  };


// Download Users

  /*const getReportUsers = async function () {
  const jsonUrl = 'https://sept-login-service.herokuapp.com/api/users/getAll';
  const res = await fetch(jsonUrl);
  const json = await res.json();

  const data = json.map(row => ({
    id: row.id,
    title: row.title,
    author: row.author,
    isbn: row.isbn,
    publisher: row.publisher,
    year: row.year,
    category: row.category,
    shop: row.shop,
    user: row.user,
    qty: row.qty,
    price: row.price,
    condition: row.condition,
  }));

  const csvData = objectToCsv(data);
  download(csvData); 
  

};*/

const getReportUsers = function () {
  var req = {
    "token": localStorage.jwtToken
  }
  axios.post("https://sept-login-service.herokuapp.com/api/users/getAll", req).then((response) => {         

          console.log(response);

          if(response.data.length > 0) {
            
            const data = response.data.map(row => ({
              id: row.id,
              username: row.username,
              fullName: row.fullName,
              password: row.password,
              confirmPassword: row.confirmPassword,
              
            }));
          
            const csvData = objectToCsv(data);
            download(csvData); 
  
          }
  });
}

// Download Orders
/*const getReportOrders = async function () {
  const jsonUrl = 'https://sept-orders.herokuapp.com/orders/getAll';
  const res = await fetch(jsonUrl);
  const json = await res.json();

  const data = json.map(row => ({
    id: row.id,
    seller: row.seller,
    buyer: row.buyer,
    qty: row.qty,
    price: row.price,
    title: row.title,
  }));

  const csvData = objectToCsv(data);
  download(csvData);

};*/


const getReportOrders = function () {
  var req = {
    "token": localStorage.jwtToken
  }
  axios.post("https://sept-orders.herokuapp.com/orders/getAll", req).then((response) => {         

          console.log(response);

          if(response.data.length > 0) {
            
            const data = response.data.map(row => ({
              id: row.id,
              seller_id: row.seller_id,
              buyer_id: row.buyer_id,
              qty: row.qty,
              price: row.price,
              
            }));
          
            const csvData = objectToCsv(data);
            download(csvData); 
  
          }
  });
}


  return (
    <>
      <div>
        <h3> Download CSV about Books </h3>

        <button onClick={getReportBooks} id="myButton" className="btn btn-info btn-block mt-4"> Download </button>
      </div>
      
      <div>
        <h3> Download CSV about Users </h3>
        <button onClick={getReportUsers} className="btn btn-info btn-block mt-4"> Download </button>

      </div>
      <div>
        <h3> Download CSV about Orders </h3>
        <button onClick={getReportOrders} className="btn btn-info btn-block mt-4"> Download </button>

      </div>
    </>



  );


}
export default Downloads;