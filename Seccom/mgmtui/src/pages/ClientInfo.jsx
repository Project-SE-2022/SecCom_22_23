import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import '../css/dashboard.css';
import Button from 'react-bootstrap/Button';
import '../App.css';
import '../Components/Modal.css';
import { GrFormTrash, GrSettingsOption, GrDownload } from 'react-icons/gr';
import Properties from '../Components/Properties';
import Cameras from '../Components/Cameras';
import Alarms from '../Components/Alarms';
import Switch from '@mui/material/Switch';
import { useLocation } from 'react-router-dom';

class ClientInfo extends Component {
	constructor(props) {
		super(props)

		// TODO -> some of the vars bellow are not needed (review this)
		this.state = {
			dataProperties: [],
			camerasByProperty: [],
			alarmsByProperty: [],
			camsIntrusions: [],

			dataPropertiesId: [],
			dataClientId: [],
			dataCameras: [],
			dataAlarms: [],
			dataCameraIntrusion: [],
			dataAlarmIntrusion: [],
			dataAlarmsOnOff: [],
			dataCamerasOnOff: [],

			clientID: "",
			name: "",
			email: "",
			propertySelected: "All"
		}
	}

	// Properties table updated every second (1000ms)
	componentDidMount() {
		this.interval = setInterval(() => this.getProperties({ time: Date.now() }), 1000);

		this.setState({
			clientID: this.props.location.state["client_id"],
			name: this.props.location.state["name"],
			email: this.props.location.state["email"],
		})
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	// To get the properties
	getProperties = () => {
		axios
			.get("http://localhost:8050/SitesManagementAPI/properties/")
			.then((resp) => {
				var array = [];

				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["clientID"] == this.state.clientID) {
						array.push(resp.data[i]);
					}
				}
				this.setState({
					dataProperties: array,
				})
			})
			.catch((err) => console.log(err));
	}

	// To get the cameras and alarms
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
			.get("http://localhost:8060/IntrusionManagementAPI/intrusions/")
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

	// To download the intrusion clipe
	download_video = (intrusion_id) => {
		axios
			.get("http://localhost:8060/IntrusionManagementAPI/intrusion/video")
			.then((resp) => {
				window.open(resp.data["url"]);
			})
			.catch((err) => console.log(err));
	}

	// To activate or deactivate a camera
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
				this.refreshCameras(property_id)
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
				this.refreshAlarms(property_id)
			})
			.catch((err) => console.log(err));
	}

	// To delete a property
	deleteProperty = (e, id) => {
		e.stopPropagation()

		axios
			.delete("http://localhost:8050/SitesManagementAPI/property/" + id)
			.then((response) => {
			})
			.catch((err) => console.log(err));
	}

	// To delete a camera
	deleteCamera = (e, id, property_id) => {
		e.stopPropagation()

		axios
			.delete("http://localhost:8050/SitesManagementAPI/camera/" + id)
			.then((response) => {
				this.refreshCameras(property_id)
			})
			.catch((err) => console.log(err));

	}

	// To refresh the cameras data of a property
	refreshCameras = (property_id) => {
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
	}

	// To delete a alarm
	deleteAlarm = (e, id, property_id) => {
		e.stopPropagation()

		axios
			.delete("http://localhost:8050/SitesManagementAPI/alarm/" + id)
			.then((response) => {
				this.refreshAlarms(property_id)
			})
			.catch((err) => console.log(err));
	}

	// To refresh the alarms data of a property 
	refreshAlarms = (property_id) => {
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
	}

	render() {
		const { dataPropertiesId = [], dataClientId = [], dataCameras = [], dataAlarms = [] } = this.state;

		const updateProperty = () => {
			if (document.getElementById("propertiesModal").style.display === "block") {
				document.getElementById("propertiesModal").style.display = "none";
			} else {
				document.getElementById("propertiesModal").style.display = "block";
			}
		}

		const updateCamera = () => {
			if (document.getElementById("camerasModal").style.display == "block") {
				document.getElementById("camerasModal").style.display = "none";
			} else {
				document.getElementById("camerasModal").style.display = "block";
			}
		}

		const updateAlarm = () => {
			if (document.getElementById("alarmsModal").style.display == "block") {
				document.getElementById("alarmsModal").style.display = "none";
			} else {
				document.getElementById("alarmsModal").style.display = "block";
			}
		}

		var dataProperties = this.state.dataProperties
		var camerasByProperty = this.state.camerasByProperty
		var alarmsByProperty = this.state.alarmsByProperty
		var camsIntrusions = this.state.camsIntrusions

		return (
			<div>
				<Row id='mainRow'>
					<Col style={{ paddingLeft: '4%', textAlign: 'left' }}>
						<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<h4 style={{ marginBottom: '14px', paddingLeft: '0px' }}>Client</h4>
							<div style={{ float: 'left', display: 'inline-block', paddingLeft: '0px' }}>
								<Row>
									<Col xs={2}>
										<img
											alt=""
											src="/profile.png"
											width="75px"
											height="75px"
											className="d-inline-block align-top" />
									</Col>

									<Col style={{ paddingTop: '6px', paddingLeft: '0px' }}>
										<p>
											<span style={{ fontSize: '22px' }}>{this.props.location.state["name"]}</span>
											<br />
											<span style={{ fontSize: '18px' }}>{this.props.location.state["email"]}</span>
										</p>
									</Col>
								</Row>
							</div>

						</Row>
						<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<div style={{ display: 'inline-block', paddingLeft: '0px' }}>
								<span className="h4" style={{ float: 'left' }} onClick={() => updateProperty()}>Properties</span>
								<Button style={{ marginLeft: '360px', marginBottom: '10px' }}>Add Property</Button>
							</div>

							<div id="table_container" style={{ height: '600px' }}>
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>ID</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Name</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Delete</th>

										</tr>
									</thead>
									<tbody>
										{dataProperties.length ?
											dataProperties.map(property => (
												<tr key={property.id} onClick={() => this.getCamsAlarms(property.id)} id="table_row">
													<td style={{ paddingLeft: '5%' }}>{property.id}</td>
													<td style={{ paddingLeft: '5%' }}>{property.name}</td>
													<td className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} >
														<GrSettingsOption onClick={() => updateProperty()} style={{ minHeight: '20px', minWidth: '20px' }} />
													</td>
													<td className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} >
														<GrFormTrash onClick={(e) => this.deleteProperty(e, property.id)}
															style={{ minHeight: '40px', minWidth: '30px' }} />
													</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '5%' }} >------------</td>
													<td style={{ paddingLeft: '5%' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</Row>
					</Col>
					<Col style={{ textAlign: 'left' }}>
						<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<div style={{ display: 'inline-block', paddingLeft: '0px' }}>
								<span className="h4" style={{ float: 'left' }} onClick={() => updateCamera()}>Cameras</span>
								<Button style={{ marginLeft: '391px', marginBottom: '10px' }}>Add Camera</Button>
							</div>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Camera</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>IP</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '1%', textAlign: 'center' }}>Off/On</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '1%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '1%', textAlign: 'center' }}>Delete</th>
										</tr>
									</thead>
									<tbody>
										{camerasByProperty.length ?
											camerasByProperty.map(camera => (
												<tr key={camera.id} id="table_row" onClick={() => this.getCamsIntrusions(camera.id)}>
													<td style={{ paddingLeft: '2%' }} >{camera.name}</td>
													<td style={{ paddingLeft: '2%' }} >{camera.ip}</td>
													<td style={{ paddingLeft: '1%' }} >
														{
															camera.activated === 'Activated' ?
																<Switch inputProps={{ 'aria-label': 'controlled' }} id={"camera_" + camera.id} checked={true}
																	onClick={(e) => this.onOffCam(e, camera.id, camera.name, camera.ip, camera.property_id)} />
																:
																<Switch inputProps={{ 'aria-label': 'controlled' }} id={"camera_" + camera.id} checked={false}
																	onClick={(e) => this.onOffCam(e, camera.id, camera.name, camera.ip, camera.property_id)} />
														}
													</td>
													<td className="icon" style={{ paddingLeft: '1%', textAlign: 'center' }} > <GrSettingsOption onClick={() => updateCamera()} style={{ minHeight: '20px', minWidth: '20px' }} /> </td>
													<td className="icon" style={{ paddingLeft: '1%', textAlign: 'center' }} >
														<GrFormTrash onClick={(e) => this.deleteCamera(e, camera.id, camera.property_id)}
															style={{ minHeight: '40px', minWidth: '30px' }} />
													</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '2%' }} >------------</td>
													<td style={{ paddingLeft: '2%' }} >-------</td>
													<td style={{ paddingLeft: '1%', textAlign: 'center' }} >---</td>
													<td style={{ paddingLeft: '1%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '1%', textAlign: 'center' }} >-------</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</Row>
						<Row style={{ textAlign: 'left', marginTop: '6%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<div style={{ display: 'inline-block', paddingLeft: '0px' }}>
								<span className="h4" style={{ float: 'left' }} onClick={() => updateAlarm()}>Alarms</span>
								<Button style={{ marginLeft: '421px', marginBottom: '10px' }}>Add Alarm</Button>
							</div>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Alarm</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Type</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '1%', textAlign: 'center' }}>Off/On</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '1%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Delete</th>
										</tr>
									</thead>
									<tbody>
										{alarmsByProperty.length ?
											alarmsByProperty.map(alarm => (
												<tr key={alarm.id} id="table_row" >
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
													<td className="icon" style={{ paddingLeft: '1%', textAlign: 'center' }} > <GrSettingsOption onClick={() => updateAlarm()} style={{ minHeight: '20px', minWidth: '20px' }} /> </td>
													<td className="icon" style={{ paddingLeft: '2%', textAlign: 'center' }} >
														<GrFormTrash onClick={(e) => this.deleteAlarm(e, alarm.id, alarm.property_id)}
															style={{ minHeight: '40px', minWidth: '30px' }} />
													</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '2%' }} >------------</td>
													<td style={{ paddingLeft: '2%' }} >-------</td>
													<td style={{ paddingLeft: '1%', textAlign: 'center' }} >---</td>
													<td style={{ paddingLeft: '1%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '2%', textAlign: 'center' }} >-------</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</Row>
					</Col>
					<Col style={{ paddingRight: '4%', textAlign: 'left' }}>
						<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<h4 style={{ paddingLeft: '0px' }}>Camera Intrusion</h4>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Camera</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Date</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingRight: '7%' }} >Video Clip</th>
										</tr>
									</thead>
									<tbody>
										{camsIntrusions.length ?
											camsIntrusions.map(intrusion => (
												<tr key={intrusion.id} >
													<td style={{ paddingLeft: '5%' }} >{intrusion.camera_id}</td>
													<td style={{ paddingLeft: '5%' }} >{intrusion.intrusion_timestamp}</td>
													<td className="icon" style={{ paddingLeft: '4%' }} onClick={() => this.download_video(intrusion.id)} >
														<GrDownload style={{ width: '17%', height: '17%' }} />
													</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '6.5%' }} >------------</td>
													<td style={{ paddingLeft: '7%' }} >-------</td>
													<td style={{ paddingLeft: '5%' }}>---</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</Row>
						<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<h4 style={{ paddingLeft: '0px' }}>Alarm Intrusion</h4>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%' }}>Alarm</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '15%' }}>Activated on</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '7%' }}></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={{ paddingLeft: '2%' }} >------------</td>
											<td style={{ paddingLeft: '15%' }} >-------</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Row>
					</Col>
				</Row >
				<div id='propertiesModal' className="Modal" style={{ display: 'none' }}>
					<div onClick={() => updateProperty()} className="overlay"></div>
					<Properties dataClientId={dataClientId} dataProperties={dataProperties} />
					<Button variant="outline-dark" type="submit" className='modal-contentProperty' onClick={() => updateProperty()}>X</Button>
				</div>
				<div id='camerasModal' className="Modal" style={{ display: 'none' }}>
					<div onClick={() => updateCamera()} className="overlay"></div>
					<Cameras dataPropertiesId={dataPropertiesId} dataCameras={dataCameras} />
					<Button variant="outline-dark" type="submit" className='modal-contentCamera' onClick={() => updateCamera()}>X</Button>
				</div>
				<div id='alarmsModal' className="Modal" style={{ display: 'none' }}>
					<div onClick={() => updateAlarm()} className="overlay"></div>
					<Alarms dataPropertiesId={dataPropertiesId} dataAlarms={dataAlarms} />
					<Button variant="outline-dark" type="submit" className='modal-contentAlarm' onClick={() => updateAlarm()}>X</Button>
				</div>
			</div >
		);
	}
}

const LocationComponent = props => {
	const location = useLocation()
	return <ClientInfo location={location} {...props} />
}

export default LocationComponent;