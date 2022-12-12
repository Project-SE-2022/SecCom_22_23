import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrUser } from 'react-icons/gr';

export default function Clients({clients}) {

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
            <div id='CreateUpdateClientForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new client <GrUser style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateClient}>
                    <label style={{ marginRight: '3%' }}>Client's Username: </label>
                    <input style={{ marginRight: '3%' }}
                        id="usernameLabel"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's First Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="firstnameLabel"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Last Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="lastnameLabel"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Email: </label>
                    <input style={{ marginRight: '3%' }}
                        id="emailLabel"
                        type="text"
                    />
                    <Button variant="outline-secondary" type="submit">Create</Button>
                </form>
                <hr style={{ marginTop: '7%' }} />
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update client <GrUser style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateClient}>
                    <label style={{ marginRight: '3%' }}>Select Client ID: </label>
                    <select id="clientIdSelectedUpdate" onChange={() => updateLabels()}>
                        <option>----</option>
                        {clients.length ?
                            clients.map(client => (
                                <option>{client.id}</option>
                            ))
                            :
                            (
                                <option>None</option>
                            )
                        }
                    </select>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Username: </label>
                    <input style={{ marginRight: '3%' }}
                        id="usernameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's First Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="firstnameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Last Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="lastnameLabelUp"
                        type="text"
                    />
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's Email: </label>
                    <input style={{ marginRight: '3%' }}
                        id="emailLabelUp"
                        type="text"
                    />
                    <Button variant="outline-secondary" type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}