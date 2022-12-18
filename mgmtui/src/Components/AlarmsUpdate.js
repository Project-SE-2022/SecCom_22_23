import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { GrAlarm } from 'react-icons/gr';

export default function AlarmsUpdate({ property_id, alarm_id }) {

    var alarmId2 = "";
    var type2 = "";
    var name2 = "";
    var activated2 = "";
    var propertyId2 = "";

    const [alarmUse, setAlarmUse] = useState(0);

    const loadDataAlarm = () => {
        if (alarmUse!==alarm_id){
            axios
                .get("http://localhost:8050/SitesManagementAPI/alarm/" + alarm_id)
                .then((response) => {
                    document.getElementById("typeSelectedUpd").value = response.data["type"];
                    document.getElementById("alarmNameUpd").value = response.data["name"];
                    document.getElementById("activatedSelectedUpd").value = response.data["activated"];
                })
                .catch((err) => console.log(err));
            setAlarmUse(alarm_id);
        }
    }

    const handleSubmitUpdateAlarm = (event) => {
        event.preventDefault();
        alarmId2 = document.getElementById("alarmIdSelectedUpd").value;
        type2 = document.getElementById("typeSelectedUpd").value;
        propertyId2 = document.getElementById("propertyIdSelectedUpd").value;
        name2 = document.getElementById("alarmNameUpd").value;
        activated2 = document.getElementById("activatedSelectedUpd").value;
        axios
            .put("http://localhost:8050/SitesManagementAPI/alarm/" + alarmId2, {
                "id": alarmId2,
                "name": name2,
                "type": type2,
                "activated": activated2,
                "property_id": propertyId2
            })
            .then((response) => {
                alert(`Alarm ${name2} updated `)
            })
            .catch((err) => console.log(err));
    }

    const updateLabels = () => {
        alarmId2 = document.getElementById("alarmIdSelectedUpd").value;
        if (alarmId2 !== '----') {
            axios
                .get("http://localhost:8050/SitesManagementAPI/alarm/" + alarmId2)
                .then((response) => {
                    document.getElementById("typeSelectedUpd").value = response.data["type"];
                    document.getElementById("propertyIdSelectedUpd").value = response.data["property_id"];
                    document.getElementById("alarmNameUpd").value = response.data["name"];
                    document.getElementById("activatedSelectedUpd").value = response.data["activated"];
                })
                .catch((err) => console.log(err));
        } else {
            document.getElementById("propertyIdSelectedUpd").value = '----';
            document.getElementById("alarmNameUpd").value = '';
            document.getElementById("typeSelectedUpd").value = '----';
            document.getElementById("activatedSelectedUpd").value = '----';
        }

    }

    loadDataAlarm();

    return (
        <>
            <div id='UpdateAlarmForms' className="modal-content">
                <h5 style={{ textAlign: 'left', marginTop: '1%', marginBottom: '4%' }}>Update alarm <GrAlarm style={{ minHeight: '25px', minWidth: '25px' }} /></h5>
                <form onSubmit={handleSubmitUpdateAlarm} style={{ textAlign: 'left' }}>
                    <label style={{ marginRight: '3%' }}>Select Alarm ID: </label>
                    <select id="alarmIdSelectedUpd" onChange={() => updateLabels()}>
                    <option>{alarm_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Property's ID: </label>
                    <select id="propertyIdSelectedUpd">
                        <option>{property_id}</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Name: </label>
                    <input style={{ marginRight: '3%' }}
                        id="alarmNameUpd"
                        type="text"
                    />
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Activated: </label>
                    <select id="activatedSelectedUpd">
                        <option>----</option>
                        <option>Activated</option>
                        <option>Deactivated</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label style={{ marginRight: '3%' }}>Alarm's Type: </label>
                    <select id="typeSelectedUpd">
                        <option>----</option>
                        <option>Sound</option>
                        <option>Light</option>
                    </select>
                    <br></br>
                    <br></br>
                    <Button variant="outline-secondary" type="submit">Update</Button>
                </form>
            </div>
        </>
    );
}