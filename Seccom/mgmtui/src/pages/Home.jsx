import React, { Component } from 'react';
import CardList from "./CardList";
import axios from "axios";

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
        return (
            <div>
                <CardList clients={this.state.clients}/>
            </div>
        )
    }
}

export default Home;