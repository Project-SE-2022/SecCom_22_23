import React, { Component } from 'react';
import CardList from "./CardList";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Clients from '../Components/Clients';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clients: [{}]
        }
    }

    // Chargers information updated every second (1000ms)
    componentDidMount() {
        this.interval = setInterval(() => this.getClients({ time: Date.now() }), 1000);
    }

    getClients = () => {
        axios.get("http://localhost:8050/SitesManagementAPI/users/", { crossDomain: true })
            .then((response) => {
                this.setState({
                    clients: response.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        var clients = this.state.clients

        const updateClient = () => {
            if (document.getElementById("clientsModal").style.display === "block") {
                document.getElementById("clientsModal").style.display = "none";
            } else {
                document.getElementById("clientsModal").style.display = "block";
            }
        }

        return (
            <div>
                {clients.length > 1 ?
                    <div>
                        <Button variant="outline-primary" type="submit" onClick={() => updateClient()}
                            style={{ marginTop: '25px', marginLeft: '1655px' }}> Add new client
                        </Button>
                        <CardList clients={clients} />
                    </div>
                    :
                    <h1 style={{ paddingLeft: '4%', paddingTop: '4%' }}>
                        Loading clients...
                    </h1>

                }
                <div id='clientsModal' className="Modal" style={{ display: 'none' }}>
                    <div onClick={() => updateClient()} className="overlay"></div>
                    <Clients clients={clients} />
                    <Button variant="outline-dark" type="submit" className='modal-contentClient' onClick={() => updateClient()}>X</Button>
                </div>
            </div>
        )
    }
}

export default Home;