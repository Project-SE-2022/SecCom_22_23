import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrHome } from 'react-icons/gr';

export default function Properties({ dataClientId, dataProperties }) {

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

    return (
        <>
            <div id='CreateUpdatePropertyForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new property <GrHome style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateProperty}>
                    <label style={{ marginRight: '3%' }}>Client's ID: </label>
                    <select id="clientIdSelected">
                        <option>----</option>
                        {dataClientId.length ?
                            dataClientId.map(clientId => (
                                <option>{clientId}</option>
                            ))
                            :
                            (
                                <option>None</option>
                            )
                        }
                    </select>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="propertyName"
                        type="text"
                    />
                    <Button variant="outline-secondary" type="submit">Create</Button>
                </form>
                <hr style={{ marginTop: '7%' }} />
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update property <GrHome style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateProperty}>
                    <label style={{ marginRight: '3%' }}>Select Property ID: </label>
                    <select id="propertyIdSelectedUpdate" onChange={() => updateLabels()}>
                        <option>----</option>
                        {dataProperties.length ?
                            dataProperties.map(property => (
                                <option>{property.id}</option>
                            ))
                            :
                            (
                                <option>None</option>
                            )
                        }
                    </select>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Client's ID: </label>
                    <select id="clientIdSelectedUpdate">
                        <option>----</option>
                        {dataClientId.length ?
                            dataClientId.map(clientId => (
                                <option>{clientId}</option>
                            ))
                            :
                            (
                                <option>None</option>
                            )
                        }
                    </select>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="propertyNameUpdate"
                        type="text"
                    />
                    <Button variant="outline-secondary" type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}