import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from "axios";
import ClientsUpdate from '../Components/ClientsUpdate';

export default function UserCard({ nameUser, email, createdOn, client_id }) {
    const navigate = useNavigate();
    const clientInfo = (id, nameUser, emailUser) => {
        navigate('/client-info', { state: { client_id: id, name: nameUser, email: emailUser } });
    }

    var date = new Date(createdOn);
    var formattedDate = moment(date).format("").split("+");

    const deleteClient = (id) => {
        axios
            .delete("http://localhost:8050/SitesManagementAPI/user/" + id, {
            })
            .then((response) => {
                alert(`Client deleted `)
            })
            .catch((err) => console.log(err));
    }

    /*const updateClient = () => {
        if (document.getElementById("clientsUpdateModal").style.display == "block") {
            document.getElementById("clientsUpdateModal").style.display = "none";
        } else {
            document.getElementById("clientsUpdateModal").style.display = "block";
        }
    }*/

    return (
        <>
            <div>
                <Card style={{ width: '20rem', height: '20rem', marginTop: '10px', marginRight: '10px', marginBottom: '10px', marginLeft: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Card.Img variant="top" src="/profile.png" style={{
                            paddingTop: '2%', height: '100px',
                            width: '100px', position: 'center'
                        }} />
                    </div>
                    <Card.Body>
                        <Card.Title>{nameUser}</Card.Title>
                        <Card.Text>{email}</Card.Text>
                        <Card.Text>
                            <p>
                                <b>Created on: </b>
                                <br />
                                <span>{formattedDate[0].replace("T", " ")}</span>
                            </p>
                        </Card.Text>
                        <Button variant="primary" onClick={() => clientInfo(client_id, nameUser, email)}>Info</Button>
                        <span> </span>
                        <Button variant="primary" onClick={() => deleteClient(client_id)}>Delete</Button>
                        <span> </span>
                        {/*<Button variant="primary" onClick={() => updateClient()}>Update</Button>*/}
                    </Card.Body>
                </Card>
                {/*<div id='clientsUpdateModal' className="Modal" style={{ display: 'none' }}>
					<div onClick={() => updateClient()} className="overlay"></div>
					<ClientsUpdate  />
					<Button variant="outline-dark" type="submit" className='modal-contentAlarmUpdate' onClick={() => updateClient()}>X</Button>
                    </div>*/}
            </div>
        </>
    );
}