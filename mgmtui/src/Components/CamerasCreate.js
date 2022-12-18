import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrVideo } from 'react-icons/gr';

export default function CamerasCreate({ property_id }) {

    var ip2 = "";
    var name2 = "";
    var propertyId2 = "";
    var cameraId2 = "";
    var activated2 = "Deactivated";

    const handleSubmitCreateCamera = (event) => {
        event.preventDefault();
        ip2 = document.getElementById("cameraIp").value;
        propertyId2 = document.getElementById("propertyIdSelected").value;
        name2 = document.getElementById("cameraName").value;
        activated2 = document.getElementById("activatedSelect").value;
        axios
            .post("http://localhost:8050/SitesManagementAPI/cameras/", {
                "name": name2,
                "ip": ip2,
                "property_id": propertyId2,
                "activated": activated2
            })
            .then((response) => {
                alert(`Camera ${name2} created with success for property ${propertyId2} `)
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div id='CreateCameraForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new camera <GrVideo style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateCamera} style={{ textAlign: 'left' }}>
                    <label style={{ marginRight: '3%' }}>Property's ID: </label>
                    <select id="propertyIdSelected">
                        <option>{property_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="cameraName"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's IP: </label>
                    <input style={{ marginRight: '3%' }}
                        id="cameraIp"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's Activated: </label>
                    <select id="activatedSelect">
                        <option>----</option>
                        <option>Activated</option>
                        <option>Deactivated</option>
                    </select>
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Create</Button>
                </form>
            </div>
        </>
    );
}