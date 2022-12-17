import React, { Component } from 'react';
import CardList from "./CardList";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ClientsCreate from '../Components/ClientsCreate';
import ClientsUpdate from '../Components/ClientsUpdate';

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

        const createClient = () => {
            if (document.getElementById("clientsCreateModal").style.display === "block") {
                document.getElementById("clientsCreateModal").style.display = "none";
            } else {
                document.getElementById("clientsCreateModal").style.display = "block";
            }
        }

        return (
            <div>
                {clients.length > 1 ?
                    <div>
                        <Button variant="outline-primary" type="submit" onClick={() => createClient()}
                            style={{ marginTop: '25px', marginLeft: '1655px' }}> Add new client
                        </Button>
                        <CardList clients={clients}/>
                    </div>
                    :
                    <h1 style={{ paddingLeft: '4%', paddingTop: '4%' }}>
                        Loading clients...
                    </h1>

                }
                <div id='clientsCreateModal' className="Modal" style={{ display: 'none' }}>
                    <div onClick={() => createClient()} className="overlay"></div>
                    <ClientsCreate clients={clients} />
                    <Button variant="outline-dark" type="submit" className='modal-contentClientCreate' onClick={() => createClient()}>X</Button>
                </div>
            </div>
        )
    }
}

export default Home;