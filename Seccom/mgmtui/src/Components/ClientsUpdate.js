import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrUser } from 'react-icons/gr';

export default function ClientsUpdate({client_id}) {

    var username2 = "";
    var firstname2 = "";
    var lastname2 = "";
    var email2 = "";
    var clientId2 = "";

    const [ClientUse, setClientUse] = useState(0);

    const handleSubmitUpdateClient = (event) => {
        event.preventDefault();
        clientId2 = document.getElementById("clientIdSelectedUpdate").value;
        username2 = document.getElementById("usernameLabelUp").value;
        firstname2 = document.getElementById("firstnameLabelUp").value;
        lastname2 = document.getElementById("lastnameLabelUp").value;
        email2 = document.getElementById("emailLabelUp").value;
        axios
            .put("http://localhost:8050/SitesManagementAPI/user/" + clientId2, {
                "id": clientId2,
                "username": username2,
                "firstname": firstname2,
                "lastname": lastname2,
                "email": email2
            })
            .then((response) => {
                alert(`Client ${firstname2} ${lastname2} updated `)
            })
            .catch((err) => console.log(err));
    }

    const updateLabels = () => {
        clientId2 = document.getElementById("clientIdSelectedUpdate").value;
        if (clientId2 !== '----') {
            axios
                .get("http://localhost:8050/SitesManagementAPI/user/" + clientId2)
                .then((response) => {
                    document.getElementById("usernameLabelUp").value = response.data["username"];
                    document.getElementById("firstnameLabelUp").value = response.data["firstName"];
                    document.getElementById("lastnameLabelUp").value = response.data["lastName"];
                    document.getElementById("emailLabelUp").value = response.data["email"];
                })
                .catch((err) => console.log(err));
        } else {
            document.getElementById("usernameLabelUp").value = "";
            document.getElementById("firstnameLabelUp").value = "";
            document.getElementById("lastnameLabelUp").value = "";
            document.getElementById("emailLabelUp").value = "";
        }

    }

    return (
        <>
            <div id='UpdateClientForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update client <GrUser style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateClient} style={{ textAlign: 'left'}}>
                    <label style={{ marginRight: '3%' }}>Select Client ID: </label>
                    <select id="clientIdSelectedUpdate" onChange={() => updateLabels()}>
                        <option>{client_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Username: </label>
                    <input style={{ marginRight: '3%' }}
                        id="usernameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's First Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="firstnameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Last Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="lastnameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Email: </label>
                    <input style={{ marginRight: '3%' }}
                        id="emailLabelUp"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}