import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import './css/dashboard.css';
import Switch from '@mui/material/Switch';
import { GrFormTrash, GrSettingsOption, GrDownload } from 'react-icons/gr';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			alarmData: [],
			client_id: "",
			dataProperties: [],
			camerasByProperty: [],
			alarmsByProperty: [],
			camsIntrusions: []
		}
	}

	// Intrusion table updated every second (1000ms)
	componentDidMount() {
		this.interval = setInterval(() => this.getProperties({ time: Date.now() }), 1000);

		this.setState({
			client_id: this.props.client_id,
			name: this.props.name
		})
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	// To get the client's properties
	getProperties = () => {
		axios
			.get("http://localhost:8050/SitesManagementAPI/properties/")
			.then((resp) => {
				var array = [];
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["clientID"] == this.state.client_id) {
						array.push(resp.data[i]);
					}
				}
				this.setState({
					dataProperties: array,
				})
			})
			.catch((err) => console.log(err));
	}

	// To download an intrusion video
	download_video = (intrusion_id) => {
		axios
			.get("http://35.180.204.162:8060/IntrusionManagementAPI/intrusion/video/"+intrusion_id)
			.then((resp) => {
				window.open(resp.data["url"]);
			})
			.catch((err) => console.log(err));
	}

	// Get camera and alarms by property
	getCamsAlarms = (property_id) => {
		// Get cameras
		axios
			.get("http://localhost:8050/SitesManagementAPI/cameras/")
			.then((resp) => {
				var array = [];
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["property_id"] == property_id) {
						array.push(resp.data[i]);
					}
				}
				this.setState({
					camerasByProperty: array,
				})
			})
			.catch((err) => console.log(err));

		// Get alarms
		axios
			.get("http://localhost:8050/SitesManagementAPI/alarms/")
			.then((resp) => {
				var array = [];
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["property_id"] == property_id) {
						array.push(resp.data[i]);
					}
				}
				this.setState({
					alarmsByProperty: array,
				})
			})
			.catch((err) => console.log(err));

		this.setState({
			camsIntrusions: [],
		})
	}

	// To get the camera intrusions
	getCamsIntrusions = (camera_id) => {
		axios
			.get("http://35.180.204.162:8060/IntrusionManagementAPI/intrusions/")
			.then((resp) => {
				var array = [];
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["camera_id"] == camera_id) {
						array.push(resp.data[i]);
					}
				}
				this.setState({
					camsIntrusions: array,
				})
			})
			.catch((err) => console.log(err));
	}

	// To activate or deactivate the cameras
	onOffCam = (e, camera_id, name, ip, property_id) => {
		e.stopPropagation()

		var value = ""
		if (document.getElementById("camera_" + camera_id).checked == true) {
			value = "Activated"
		}
		else {
			value = "Deactivated"
		}

		axios
			.put("http://localhost:8050/SitesManagementAPI/camera/" + camera_id, {
				"name": name,
				"ip": ip,
				"activated": value,
				"property_id": property_id
			})
			.then((response) => {
				if (value === "Activated") {
					document.getElementById("camera_" + camera_id).checked = true
				}
				else {
					document.getElementById("camera_" + camera_id).checked = false
				}

				// Refresh cams data
				axios
					.get("http://localhost:8050/SitesManagementAPI/cameras/")
					.then((resp) => {
						var array = [];
						for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
							if (resp.data[i]["property_id"] == property_id) {
								array.push(resp.data[i]);
							}
						}
						this.setState({
							camerasByProperty: array,
						})
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}

	// To activate or deactivate alarm
	onOffAlarm = (e, alarm_id, property_id, type, name) => {
		e.stopPropagation()

		var value = ""
		if (document.getElementById("alarm_" + alarm_id).checked == true) {
			value = "Activated"
		}
		else {
			value = "Deactivated"
		}

		axios
			.put("http://localhost:8050/SitesManagementAPI/alarm/" + alarm_id, {
				"name": name,
				"type": type,
				"activated": value,
				"property_id": property_id
			})
			.then((response) => {
				if (value === "Activated") {
					document.getElementById("alarm_" + alarm_id).checked = true
				}
				else {
					document.getElementById("alarm_" + alarm_id).checked = false
				}

				// Refresh alarms data
				axios
					.get("http://localhost:8050/SitesManagementAPI/alarms/")
					.then((resp) => {
						var array = [];
						for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
							if (resp.data[i]["property_id"] == property_id) {
								array.push(resp.data[i]);
							}
						}
						this.setState({
							alarmsByProperty: array,
						})
					})
					.catch((err) => console.log(err));

			})
			.catch((err) => console.log(err));
	}

	render() {
		var alarmData = this.state.alarmData
		var dataProperties = this.state.dataProperties
		var camerasByProperty = this.state.camerasByProperty
		var alarmsByProperty = this.state.alarmsByProperty
		var camsIntrusions = this.state.camsIntrusions
		var name = this.state.name

		return (
			<main className="Container">
				<Navbar collapseOnSelect expand="lg" style={{ backgroundColor: 'rgba(39,170,226,255)' }} variant="light">
					<Navbar.Brand style={{ paddingLeft: '4%' }}>
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
							<img
								alt=""
								src="/profile.png"
								width="47"
								height="47"
								className="d-inline-block align-top"
							/>
						</Nav>
						<Nav style={{ paddingRight: '5px', color: 'white', fontWeight: 'bold', fontSize: '18px', paddingLeft: '5px' }}>
							{name}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<div>
					<Row>
						<Col style={{ paddingLeft: '4%', textAlign: 'center' }}>
							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Properties</h4>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '4%' }}>ID</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Property</th>
											</tr>
										</thead>
										<tbody>
											{dataProperties.length ?
												dataProperties.map(property => (
													<tr id="table_row" key={property.id} onClick={() => this.getCamsAlarms(property.id)}>
														<td style={{ paddingLeft: '4%' }} >{property.id}</td>
														<td style={{ paddingLeft: '2%' }} >{property.name}</td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '4%' }} >-------</td>
														<td style={{ paddingLeft: '2%' }} >------------</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>

							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Manage notifications</h4>
								<div id="table_container" style={{ maxHeight: '110px' }}>
									<table style={{ maxHeight: '100px' }}>
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
						</Col>
						<Col style={{ textAlign: 'left' }}>
							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Cameras</h4>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '4%' }}>ID</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Camera</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingRight: '7%' }} >IP</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Off/On</th>
											</tr>
										</thead>
										<tbody>
											{camerasByProperty.length ?
												camerasByProperty.map(camera => (
													<tr id="table_row" key={camera.id} onClick={() => this.getCamsIntrusions(camera.id)}>
														<td style={{ paddingLeft: '4%' }} >{camera.id}</td>
														<td style={{ paddingLeft: '7%' }} >{camera.name}</td>
														<td >{camera.ip}</td>
														<td style={{ paddingLeft: '2%' }} >
															{
																camera.activated === 'Activated' ?
																	<Switch inputProps={{ 'aria-label': 'controlled' }} id={"camera_" + camera.id} checked={true}
																		onClick={(e) => this.onOffCam(e, camera.id, camera.name, camera.ip, camera.property_id)} />
																	:
																	<Switch inputProps={{ 'aria-label': 'controlled' }} id={"camera_" + camera.id} checked={false}
																		onClick={(e) => this.onOffCam(e, camera.id, camera.name, camera.ip, camera.property_id)} />
															}
														</td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '4%' }} >---</td>
														<td style={{ paddingLeft: '7%' }} >------------</td>
														<td>------------</td>
														<td style={{ paddingLeft: '5%' }}>---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>

							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Alarms</h4>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '3%' }}>ID</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Alarm</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Type</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Off/On</th>
											</tr>
										</thead>
										<tbody>
											{alarmsByProperty.length ?
												alarmsByProperty.map(alarm => (
													<tr id="table_row" key={alarm.id}>
														<td style={{ paddingLeft: '3%' }} >{alarm.id}</td>
														<td style={{ paddingLeft: '2%' }} >{alarm.name}</td>
														<td style={{ paddingLeft: '2%' }} >{alarm.type}</td>
														<td style={{ paddingLeft: '2%', textAlign: 'center' }} >
															{
																alarm.activated === 'Activated' ?
																	<Switch inputProps={{ 'aria-label': 'controlled' }} id={"alarm_" + alarm.id} checked={true}
																		onClick={(e) => this.onOffAlarm(e, alarm.id, alarm.property_id, alarm.type, alarm.name)} />
																	:
																	<Switch inputProps={{ 'aria-label': 'controlled' }} id={"alarm_" + alarm.id} checked={false}
																		onClick={(e) => this.onOffAlarm(e, alarm.id, alarm.property_id, alarm.type, alarm.name)} />
															}
														</td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '3%' }} >------------</td>
														<td style={{ paddingLeft: '2%' }} >-------</td>
														<td style={{ paddingLeft: '2%' }} >-----</td>
														<td style={{ paddingLeft: '2%', textAlign: 'center' }} >---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>
						</Col>

						<Col style={{ textAlign: 'center', paddingRight: '4%' }}>
							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Camera intrusion history</h4>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '6.5%' }}>Intrusion ID</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Date</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingRight: '7%' }} >Video Clip</th>
											</tr>
										</thead>
										<tbody>
											{camsIntrusions.length ?
												camsIntrusions.map(camera => (
													<tr id="table_row" key={camera.id}>
														<td style={{ paddingLeft: '6.5%' }} >{camera.id}</td>
														<td style={{ paddingLeft: '7%' }} >{camera.intrusion_timestamp}</td>
														<td className="icon" style={{ paddingLeft: '4%' }} onClick={() => this.download_video(camera.id)} >
															<GrDownload style={{ width: '17%', height: '17%' }} />
														</td>
													</tr>
												))
												:
												(
													<tr>
														<td style={{ paddingLeft: '6.5%' }} >---</td>
														<td style={{ paddingLeft: '7%' }}>-------</td>
														<td style={{ paddingLeft: '5%' }}>---</td>
													</tr>
												)
											}
										</tbody>
									</table>
								</div>
							</Row>

							<Row style={{ textAlign: 'left', marginTop: '5%', marginLeft: '0.4%', marginRight: '0.4%' }}>
								<h4 style={{ paddingLeft: '0px' }}>Alarms intrusion history</h4>
								<div id="table_container">
									<table>
										<thead>
											<tr>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '6.5%' }}>Alarm</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Type</th>
												<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}>Date</th>
											</tr>
										</thead>
										<tbody>
											{alarmData.length ?
												alarmData.map(alarm => (
													<tr id="table_row" key={alarm.id}>
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
					</Row>
				</div>
			</main>
		);
	}
}

export default App;
