import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrHome } from 'react-icons/gr';

export default function PropertiesCreate({ clientId }) {

    var clientId2 = "";
    var name2 = "";
    var propertyId2 = "";

    const handleSubmitCreateProperty = (event) => {
        event.preventDefault();
        clientId2 = document.getElementById("clientIdSelected").value;
        name2 = document.getElementById("propertyName").value;
        axios
            .post("http://localhost:8050/SitesManagementAPI/properties/", {
                "clientID": clientId2,
                "name": name2
            })
            .then((response) => {
                alert(`Property ${name2} created with success for client ${clientId2} `)
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div id='CreatePropertyForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new property <GrHome style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateProperty} style={{ textAlign: 'left' }}>
                    <label style={{ marginRight: '3%' }}>Client's ID: </label>
                    <select id="clientIdSelected">
                        <option>{clientId}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="propertyName"
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