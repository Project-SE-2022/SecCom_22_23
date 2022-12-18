import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrVideo } from 'react-icons/gr';

export default function Cameras({ property_id, camera_id }) {

    var ip2 = "";
    var name2 = "";
    var propertyId2 = "";
    var cameraId2 = "";
    var activated2 = "Deactivated";

    const [cameraUse, setCameraUse] = useState(0);

    const loadDataCamera = () => {
        if (cameraUse!==camera_id){
            axios
                .get("http://localhost:8050/SitesManagementAPI/camera/" + camera_id)
                .then((response) => {
                    document.getElementById("cameraNameUpdate").value = response.data["name"];
                    document.getElementById("cameraIpUpdate").value = response.data["ip"];
                    document.getElementById("activatedSelectUpdate").value = response.data["activated"];
                })
                .catch((err) => console.log(err));
            setCameraUse(camera_id);
        }
    }

    const handleSubmitUpdateCamera = (event) => {
        event.preventDefault();
        cameraId2 = document.getElementById("cameraIdSelectedUpdate").value;
        ip2 = document.getElementById("cameraIpUpdate").value;
        propertyId2 = document.getElementById("propertyIdSelectedUp").value;
        name2 = document.getElementById("cameraNameUpdate").value;
        activated2 = document.getElementById("activatedSelectUpdate").value;
        axios
            .put("http://localhost:8050/SitesManagementAPI/camera/" + cameraId2, {
                "id": cameraId2,
                "name": name2,
                "ip": ip2,
                "property_id": propertyId2,
                "activated": activated2
            })
            .then((response) => {
                alert(`Camera ${name2} updated `)
            })
            .catch((err) => console.log(err));
    }

    const updateLabels = () => {
        cameraId2 = document.getElementById("cameraIdSelectedUpdate").value;
        if (cameraId2 !== '----') {
            axios
                .get("http://localhost:8050/SitesManagementAPI/camera/" + cameraId2)
                .then((response) => {
                    document.getElementById("cameraNameUpdate").value = response.data["name"];
                    document.getElementById("cameraIpUpdate").value = response.data["ip"];
                    document.getElementById("propertyIdSelectedUp").value = response.data["property_id"];
                    document.getElementById("activatedSelectUpdate").value = response.data["activated"];
                })
                .catch((err) => console.log(err));
        } else {
            document.getElementById("propertyIdSelectedUp").value = '----';
            document.getElementById("cameraNameUpdate").value = '';
            document.getElementById("cameraIpUpdate").value = '';
            document.getElementById("activatedSelectUpdate").value = '----';
        }

    }

    loadDataCamera();

    return (
        <>
            <div id='UpdateCameraForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update camera <GrVideo style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateCamera} style={{ textAlign: 'left'}}>
                    <label style={{ marginRight: '3%' }}>Select Camera ID: </label>
                    <select id="cameraIdSelectedUpdate" onChange={() => updateLabels()}>
                        <option>{camera_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's ID: </label>
                    <select id="propertyIdSelectedUp">
                        <option>{property_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="cameraNameUpdate"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's IP: </label>
                    <input style={{ marginRight: '3%' }}
                        id="cameraIpUpdate"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Camera's Activated: </label>
                    <select id="activatedSelectUpdate">
                        <option>----</option>
                        <option>Activated</option>
                        <option>Deactivated</option>
                    </select>
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}