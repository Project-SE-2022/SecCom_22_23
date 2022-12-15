import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrHome } from 'react-icons/gr';

export default function PropertiesUpdate({ property_id, clientId }) {

    var clientId2 = "";
    var name2 = "";
    var propertyId2 = "";

    const loadDataProperty = () => {
        axios
            .get("http://localhost:8050/SitesManagementAPI/property/" + property_id)
            .then((response) => {
                document.getElementById("propertyNameUpdate").value = response.data["name"];
            })
            .catch((err) => console.log(err));
    }

    const handleSubmitUpdateProperty = (event) => {
        event.preventDefault();
        propertyId2 = document.getElementById("propertyIdSelectedUpdate").value;
        clientId2 = document.getElementById("clientIdSelectedUpdate").value;
        name2 = document.getElementById("propertyNameUpdate").value;
        axios
            .put("http://localhost:8050/SitesManagementAPI/property/" + propertyId2, {
                "id": propertyId2,
                "clientID": clientId2,
                "name": name2
            })
            .then((response) => {
                alert(`Property ${name2} updated `)
            })
            .catch((err) => console.log(err));
    }

    const updateLabels = () => {
        propertyId2 = document.getElementById("propertyIdSelectedUpdate").value;
        if (propertyId2 !== '----') {
            axios
                .get("http://localhost:8050/SitesManagementAPI/property/" + propertyId2)
                .then((response) => {
                    document.getElementById("clientIdSelectedUpdate").value = response.data["clientID"];
                    document.getElementById("propertyNameUpdate").value = response.data["name"];
                })
                .catch((err) => console.log(err));
        } else {
            document.getElementById("clientIdSelectedUpdate").value = '----';
            document.getElementById("propertyNameUpdate").value = '';
        }

    }

    loadDataProperty();
    

    return (
        <>
            <div id='UpdatePropertyForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update property <GrHome style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateProperty} style={{ textAlign: 'left' }} >
                    <label style={{ marginRight: '3%' }}>Select Property ID: </label>
                    <select id="propertyIdSelectedUpdate" onChange={() => updateLabels()}>
                        <option>{property_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's ID: </label>
                    <select id="clientIdSelectedUpdate">
                        <option>{clientId}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="propertyNameUpdate"
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