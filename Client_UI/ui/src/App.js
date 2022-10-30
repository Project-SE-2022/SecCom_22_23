import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import './css/dashboard.css';
import { GrDownload } from 'react-icons/gr';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: []
		}
	}

	// Intrusion table updated every second (1000ms)
	componentDidMount() {
		this.interval = setInterval(() => this.getIntrusions({ time: Date.now() }), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getIntrusions = () => {
		axios
			.get("http://localhost:8060/IntrusionManagementAPI/intrusions/")
			.then((resp) => {
				this.setState({
					data: resp.data
				})
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { data = [] } = this.state

		return (
			<main className="Container">
				<Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgba(39,170,226,255)' }} variant="light">
					<Navbar.Brand href="#home" style={{ paddingLeft: '4%' }}>
						<img
							alt=""
							src="/Logo.png"
							width="199"
							height="54"
							className="d-inline-block align-top"
						/>
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav" style={{ paddingRight: '4%' }}>
						<Nav className="me-auto"></Nav>
						<Nav>
							<Nav.Link href="#profile">
								<img
									alt=""
									src="/profile.png"
									width="47"
									height="47"
									className="d-inline-block align-top"
								// onClick={() => keycloak.login()}
								/>
							</Nav.Link>
						</Nav>
						<Nav style={{ paddingRight: '5px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
							SecCom user
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<div>
					<Row>
						<Col style={{ paddingLeft: '4%', textAlign: 'center' }}>
							Column 1
							<Row style={{ textAlign: 'center' }}>
								<p>Row 1</p>
							</Row>
							<Row style={{ textAlign: 'center' }}>
								<p>Row 2</p>
							</Row>
						</Col>
						<Col style={{ textAlign: 'left', marginTop: '2%' }}>
							<h5>Camera intrusion history</h5>
							<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%'}}>
								<table>
									<thead>
										<tr>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '6.5%' }}>Camera</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Date</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Video Clip</th>
										</tr>
									</thead>
									<tbody>
										{data.length ?
											data.map(camera => (
												<tr key={camera.id}>
													<td style={{paddingLeft:'6.5%'}} >{camera.camera_id}</td>
													<td style={{paddingLeft:'7%'}} >{camera.intrusion_timestamp}</td>
													<td className="icon" style={{paddingLeft:'7%'}} > <GrDownload /> </td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{paddingLeft:'6.5%'}} >------------</td>
													<td style={{paddingLeft:'7%'}} >-------</td>
													<td style={{paddingLeft:'7%'}} >---</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</Row>
							<Row style={{ textAlign: 'center', marginTop: '10%' }}>
								<p>Row 2</p>
							</Row>
						</Col>
						<Col style={{ paddingRight: '4%', textAlign: 'center' }}>
							Column 3
							<Row style={{ textAlign: 'center' }}>
								<p>Row 1</p>
							</Row>
							<Row style={{ textAlign: 'center' }}>
								<p>Row 2</p>
							</Row>
						</Col>
					</Row>
				</div>
			</main>
		);
	}
}

export default App;