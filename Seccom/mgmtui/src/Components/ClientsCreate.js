import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrUser } from 'react-icons/gr';

export default function ClientsCreate({clients}) {

    var username2 = "";
    var firstname2 = "";
    var lastname2 = "";
    var email2 = "";
    var clientId2 = "";

    const handleSubmitCreateClient = (event) => {
        event.preventDefault();
        username2 = document.getElementById("usernameLabel").value;
        firstname2 = document.getElementById("firstnameLabel").value;
        lastname2 = document.getElementById("lastnameLabel").value;
        email2 = document.getElementById("emailLabel").value;
        axios
            .post("http://localhost:8050/SitesManagementAPI/users/", {
                "username": username2,
                "firstname": firstname2,
                "lastname": lastname2,
                "email": email2
            })
            .then((response) => {
                alert(`Client ${firstname2} ${lastname2} created with success `)
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div id='CreateClientForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new client <GrUser style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateClient} style={{ textAlign: 'left'}}>
                    <label style={{ marginRight: '3%' }}>Client's Username: </label>
                    <input style={{ marginRight: '3%' }}
                        id="usernameLabel"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's First Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="firstnameLabel"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Last Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="lastnameLabel"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Email: </label>
                    <input style={{ marginRight: '3%' }}
                        id="emailLabel"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Create</Button>
                </form>
            </div>
        </>
    );
}