import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function UserCard({ nameUser, email, createdOn }) {
    const navigate = useNavigate();
    const clientInfo = (id) => {
        navigate('/client-info', { state: { client_id: id, name: 'sabaoon' } });
    }

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
                            <b>Created on: </b><span>{createdOn}</span>
                        </Card.Text>
                        <Button variant="primary" onClick={() => clientInfo("client_id")}>Info</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}