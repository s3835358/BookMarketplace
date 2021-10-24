import React from 'react'
import './Background.css'


function AboutContact() {

    
    return (
        <div className="background4" style={{textAlign:"center", 
        display:"flex", alignItems:"center"}}>
            <div style ={{backgroundColor:"white", width:"70%", 
            padding:"5% 5%", borderRadius: "10px"}}>
                <h2>Bookeroo</h2>
                <p></p>
                <p>Bookeroo is an online book selling service. We are a platform for publishers and book sellers of all sizes.</p>

                <h2>Contact us at:</h2>
                <p></p>
                <p>Email: bookeroo@admin.com</p>
                <p>Ph: +61 490 123 456</p>
                <p>Address: 1 Collins Street, Melbourne</p>
            </div>
        </div>
    )
    
}
export default AboutContact;