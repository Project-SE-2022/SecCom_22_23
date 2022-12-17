import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import './css/dashboard.css';
import { GrDownload } from 'react-icons/gr';
import { GrSettingsOption } from 'react-icons/gr';

import Switch from '@mui/material/Switch';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cameraData: [],
			alarmData: []
		}
	}

	// Intrusion table updated every second (1000ms)
	componentDidMount() {
		this.interval = setInterval(() => this.getIntrusions({ time: Date.now() }), 1000);
		this.interval = setInterval(() => this.getAlarms({ time: Date.now() }), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getIntrusions = () => {
		axios
			.get("http://localhost:8060/IntrusionManagementAPI/intrusions/")
			.then((resp) => {
				this.setState({
					cameraData: resp.data
				})
			})
			.catch((err) => console.log(err));
	}

	getAlarms = () => {
		axios
			.get("http://localhost:8050/SitesManagementAPI/alarms/")
			.then((resp) => {
				this.setState({
					alarmData: resp.data
				})
			})
			.catch((err) => console.log(err));
	}

	download_video = () => {
		axios
			.get("http://localhost:8060/IntrusionManagementAPI/intrusion/video")
			.then((resp) => {
				window.open(resp.data["url"]);
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { cameraData = [], alarmData = [] } = this.state

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
								Row 1
							</Row>
							<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h5>Alarms</h5>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Alarm</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Type</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Off/On</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Property</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Data</th>
											</tr>
										</thead>
										<tbody>
											{alarmData.length ?
												alarmData.map(alarm => (
													<tr key={alarm.id}>
														<td style={{ paddingLeft: '2%' }} >{alarm.name}</td>
														<td style={{ paddingLeft: '2%' }} >{alarm.type}</td>
														<td style={{ paddingLeft: '2%', textAlign: 'center' }} ><Switch inputProps={{ 'aria-label': 'controlled' }}/></td>
														<td className="icon" style={{ paddingLeft: '2%', textAlign: 'center' }} >{alarm.property_id}</td>
														<td className="icon" style={{ paddingLeft: '2%', textAlign: 'center' }} > <GrDownload /> </td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '2%' }} >------------</td>
														<td style={{ paddingLeft: '2%' }} >-------</td>
														<td style={{ paddingLeft: '2%' }} >---</td>
														<td style={{ paddingLeft: '2%' }} >---</td>
														<td style={{ paddingRight: '2%' }} >---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>
						</Col>
						<Col style={{ textAlign: 'left', marginTop: '2%' }}>
							<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h5>Camera intrusion history</h5>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '6.5%' }}>Camera</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Date</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingRight: '7%' }} >Video Clip</th>
											</tr>
										</thead>
										<tbody>
											{cameraData.length ?
												cameraData.map(camera => (
													<tr key={camera.id}>
														<td style={{ paddingLeft: '6.5%' }} >{camera.camera_id}</td>
														<td style={{ paddingLeft: '7%' }} >{camera.intrusion_timestamp}</td>
														<td className="icon" style={{ paddingRight: '7%' }} onClick={this.download_video}> <GrDownload /> </td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '6.5%' }} >------------</td>
														<td style={{ paddingLeft: '7%' }} >-------</td>
														<td style={{ paddingLeft: '7%' }} >---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>
							<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h5>Alarms intrusion history</h5>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '6.5%' }}>Alarm</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Type</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Property ID</th>
											</tr>
										</thead>
										<tbody>
											{alarmData.length ?
												alarmData.map(alarm => (
													<tr key={alarm.id}>
														<td style={{ paddingLeft: '6.5%' }} >{alarm.name}</td>
														<td style={{ paddingLeft: '7%' }} >{alarm.type}</td>
														<td style={{ paddingLeft: '7%' }} >{alarm.property_id}</td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '6.5%' }} >------------</td>
														<td style={{ paddingLeft: '7%' }} >-------</td>
														<td style={{ paddingLeft: '7%' }} >---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>
						</Col>
						<Col style={{textAlign: 'center', marginTop: '2%', paddingRight:'4%'}}>
							<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h5>Manage notifications</h5>
								<div id="table_container" style={{maxHeight: '110px'}}>
									<table style={{maxHeight: '100px'}}>
										<tbody>
											<tr>
												<td style={{ paddingLeft: '5%' }}><input type="checkbox" /></td>
												<td style={{ paddingLeft: '5%' }}>Receive notifications via sms</td>
											</tr>
											<tr>
												<td style={{ paddingLeft: '5%' }}><input type="checkbox" /></td>
												<td style={{ paddingLeft: '5%' }}>Receive notifications via email</td>
											</tr>
											<tr>
												<td style={{ paddingLeft: '5%' }}><input type="checkbox" /></td>
												<td style={{ paddingLeft: '5%' }}>Receive notifications via phone call</td>
											</tr>
										</tbody>
									</table>
								</div>
							</Row>
							<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h5>Statistics</h5>
							</Row>
						</Col>
					</Row>
				</div>
			</main>
		);
	}
}

export default App;