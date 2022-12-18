import React from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrAlarm } from 'react-icons/gr';

export default function AlarmsCreate({ property_id }) {

    var alarmId2 = "";
    var type2 = "";
    var name2 = "";
    var activated2 = "";
    var propertyId2 = "";

    const handleSubmitCreateAlarm = (event) => {
        event.preventDefault();
        type2 = document.getElementById("typeSelect").value;
        propertyId2 = document.getElementById("propertyIdSelect").value;
        name2 = document.getElementById("alarmName").value;
        activated2 = document.getElementById("activatedSelect").value;
        axios
            .post("http://localhost:8050/SitesManagementAPI/alarms/", {
                "name": name2,
                "type": type2,
                "activated": activated2,
                "property_id": propertyId2
            })
            .then((response) => {
                alert(`Alarm ${name2} created with success for property ${propertyId2} `)
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div id='CreateAlarmForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginBottom: '4%' }}>Create new alarm <GrAlarm style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitCreateAlarm} style={{ textAlign: 'left'}}>
                    <label style={{ marginRight: '3%' }}>Property's ID: </label>
                    <select id="propertyIdSelect">
                        <option>{property_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="alarmName"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Activated: </label>
                    <select id="activatedSelect">
                        <option>----</option>
                        <option>Activated</option>
                        <option>Deactivated</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Type: </label>
                    <select id="typeSelect">
                        <option>----</option>
                        <option>Sound</option>
                        <option>Light</option>
                    </select>
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Create</Button>
                </form>
            </div>
        </>
    );
}