import React, { Component } from 'react'
import Person from './Persons/Person'
import CreatePersonButton from './Persons/CreatePersonButton';


function Dashboard() {
    
    const handleC = async () => {
        try {
            const req = await fetch("http://localhost:8080/api/users/test", {mode: 'cors'});
            const data = req.json();
            console.log({ data });
        }
        catch (e) {
            console.log(e);
        }
      
    }

    
    return (
        <div className="Persons">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Persons</h1>
                        <br />
                        <button onClick={handleC}>HERE</button>
                        <CreatePersonButton />
                        <br />
                        <hr />
                        <Person/>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
export default Dashboard;
