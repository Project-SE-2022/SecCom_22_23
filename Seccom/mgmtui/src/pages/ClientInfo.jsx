import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import '../css/dashboard.css';
import Button from 'react-bootstrap/Button';
import '../App.css';
import '../Components/Modal.css';
import { GrFormTrash, GrSettingsOption } from 'react-icons/gr';
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
			dataPropertiesId: [],
			dataClientId: [],
			dataCameras: [],
			dataAlarms: [],
			dataCameraIntrusion: [],
			dataAlarmIntrusion: [],
			dataAlarmsOnOff: [],

			clientID: "",
			name: "",
			email: "",
		}
	}

	// Intrusion table updated every second (1000ms)
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

	getProperties = () => {
		axios
			.get("http://localhost:8050/SitesManagementAPI/properties/")
			.then((resp) => {
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["clientID"] == this.state.clientID) {
						this.setState({
							dataProperties: resp.data,
						})
					}
				}
			})
			.catch((err) => console.log(err));
	}

	getAlarms = () => {
		axios
			.get("http://localhost:8050/SitesManagementAPI/alarms/")
			.then((resp) => {
				this.setState({
					dataAlarms: resp.data
				})
			})
			.catch((err) => console.log(err));
	}

	getCameraIntrusion = () => {
		axios
			.get("http://localhost:8060/IntrusionManagementAPI/intrusions/")
			.then((resp) => {
				this.setState({
					dataCameraIntrusion: resp.data
				})
			})
			.catch((err) => console.log(err));
	}

	updateChecked = () => {
		var alarmsOnOff = [];
		alarmsOnOff = this.state.dataAlarms;
		if ((alarmsOnOff !== undefined) && (alarmsOnOff.length >= 0)) {
			for (let i = 0, len = alarmsOnOff.length, id = "", activated = ""; i < len; i++) {
				activated = alarmsOnOff[i]["activated"];
				if (activated === "Activated") {
					alarmsOnOff[i]["activated"] = true;
				} else {
					alarmsOnOff[i]["activated"] = false;
				}

			}
			this.state.dataAlarmsOnOff = alarmsOnOff;
		}
	}

	getPropertyInfo = (property_id) => {
		console.log("clicked on row: " + property_id)
		this.getCameras(property_id)
		// this.getAlarms(property_id)
	}

	// TODO -> The method gets the correct data of the property but some way all the cameras are being showed
	getCameras = (property_id) => {
		console.log("CAMERAS")
		console.log(this.state.dataCameras)

		axios
			.get("http://localhost:8050/SitesManagementAPI/cameras/")
			.then((resp) => {
				console.log(property_id)
				for (let i = 0, len = resp.data.length, id = ""; i < len; i++) {
					if (resp.data[i]["property_id"] == property_id) {
						console.log("ENTROU")
						console.log(resp.data[i])

						this.setState({
							dataCameras: resp.data,
						})
					}
				}
			})
			.catch((err) => console.log(err));		
	}

	render() {
		const { dataProperties = [], dataPropertiesId = [], dataClientId = [], dataCameras = [], dataAlarms = [],
			dataCameraIntrusion = [], dataAlarmIntrusion = [], dataAlarmsOnOff = [] } = this.state;

		var activated2 = '';

		const deleteProperty = (id, name) => {
			axios
				.delete("http://localhost:8050/SitesManagementAPI/property/" + id)
				.then((response) => {
					alert(`Property ${name} deleted with success `)
				})
				.catch((err) => console.log(err));
		}

		const deleteCamera = (id, name) => {
			axios
				.delete("http://localhost:8050/SitesManagementAPI/camera/" + id)
				.then((response) => {
					alert(`Camera ${name} deleted with success `)
				})
				.catch((err) => console.log(err));
		}

		const deleteAlarm = (id, name) => {
			axios
				.delete("http://localhost:8050/SitesManagementAPI/alarm/" + id)
				.then((response) => {
					alert(`Alarm ${name} deleted with success `)
				})
				.catch((err) => console.log(err));
		}

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

		const onChangeChecked = (alarmId, activated, propertyId, type, name) => {
			if (activated == true) {
				activated2 = 'Deactivated';
			} else {
				activated2 = 'Activated';
			}
			axios
				.put("http://localhost:8050/SitesManagementAPI/alarm/" + alarmId, {
					"name": name,
					"type": type,
					"activated": activated2,
					"property_id": propertyId
				})
				.then((response) => {
					if (activated2 == 'Activated') {
						document.getElementById("switch_" + alarmId).checked = true;
					} else {
						document.getElementById("switch_" + alarmId).checked = false;
					}
					alert(`Alarm ${alarmId} ${activated2} `)
				})
				.catch((err) => console.log(err));
		}

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
								<span className="h4" style={{ float: 'left' }}>Properties</span>
							</div>
							<div id="table_container" style={{ height: '612px' }}>
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>ID</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Name</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '2%', textAlign: 'center' }}>Delete</th>

										</tr>
									</thead>
									<tbody>
										{dataProperties.length ?
											dataProperties.map(property => (
												<tr key={property.id} onClick={() => this.getPropertyInfo(property.id)} id="properties_table_row">
													<td style={{ paddingLeft: '5%' }} >{property.id}</td>
													<td style={{ paddingLeft: '5%' }} >{property.name}</td>
													<td onClick={() => updateProperty()} className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} > <GrSettingsOption style={{ minHeight: '20px', minWidth: '20px' }} /> </td>
													<td onClick={() => deleteProperty(property.id, property.name)} className="icon" style={{ paddingLeft: '2%', textAlign: 'center' }} > <GrFormTrash style={{ minHeight: '40px', minWidth: '30px' }} /> </td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '5%' }} >------------</td>
													<td style={{ paddingLeft: '5%' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '0%', textAlign: 'center' }} >-------</td>
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
								<span className="h4" style={{ float: 'left' }}>Cameras</span>
							</div>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Camera</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>IP</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Property</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Delete</th>
										</tr>
									</thead>
									<tbody>
										{dataCameras.length ?
											dataCameras.map(camera => (
												<tr key={camera.id} >
													<td style={{ paddingLeft: '5%' }} >{camera.name}</td>
													<td style={{ paddingLeft: '5%' }} >{camera.ip}</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >{camera.property_id}</td>
													<td onClick={() => updateCamera()} className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} > <GrSettingsOption style={{ minHeight: '20px', minWidth: '20px' }} /> </td>
													<td onClick={() => deleteCamera(camera.id, camera.name)} className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} > <GrFormTrash style={{ minHeight: '40px', minWidth: '30px' }} /> </td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '5%' }} >------------</td>
													<td style={{ paddingLeft: '5%' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</Row>
						<Row style={{ textAlign: 'left', marginTop: '10%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<div style={{ display: 'inline-block', paddingLeft: '0px' }}>
								<span className="h4" style={{ float: 'left' }}>Alarms</span>
							</div>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Alarm</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Type</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>On/Off</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Property</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Configure</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%', textAlign: 'center' }}>Delete</th>
											{/*<td style={{ paddingLeft: '2%' }} ><Switch inputProps={{ 'aria-label': 'controlled' }}/></td>*/}
										</tr>
									</thead>
									<tbody>
										{dataAlarmsOnOff.length ?
											dataAlarmsOnOff.map(alarm => (
												<tr key={alarm.id} >
													<td style={{ paddingLeft: '5%' }} >{alarm.name}</td>
													<td style={{ paddingLeft: '5%' }} >{alarm.type}</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} ><Switch id={"switch_" + alarm.id} checked={alarm.activated} onChange={() => onChangeChecked(alarm.id, alarm.activated, alarm.property_id, alarm.type, alarm.name)} inputProps={{ 'aria-label': 'controlled' }} /></td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >{alarm.property_id}</td>
													<td onClick={() => updateAlarm()} className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} > <GrSettingsOption style={{ minHeight: '20px', minWidth: '20px' }} /> </td>
													<td onClick={() => deleteAlarm(alarm.id, alarm.name)} className="icon" style={{ paddingLeft: '5%', textAlign: 'center' }} > <GrFormTrash style={{ minHeight: '40px', minWidth: '30px' }} /> </td>
													<td>
													</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '5%' }} >------------</td>
													<td style={{ paddingLeft: '5%' }} >-------</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >---</td>
													<td style={{ paddingLeft: '5%', textAlign: 'center' }} >-------</td>
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
					<Col style={{ paddingRight: '4%', textAlign: 'left' }}>
						<Row style={{ textAlign: 'left', marginTop: '4%', marginLeft: '0.4%', marginRight: '0.4%' }}>
							<h4 style={{ paddingLeft: '0px' }}>Camera Intrusion</h4>
							<div id="table_container">
								<table>
									<thead>
										<tr style={{ height: '50px' }}>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Camera</th>
											<th style={{ borderBottom: '2px solid #b7b7b7', paddingLeft: '5%' }}>Date</th>
										</tr>
									</thead>
									<tbody>
										{dataCameraIntrusion.length ?
											dataCameraIntrusion.map(cameraIntrusion => (
												<tr key={cameraIntrusion.id} >
													<td style={{ paddingLeft: '5%' }} >{cameraIntrusion.camera_id}</td>
													<td style={{ paddingLeft: '5%' }} >{cameraIntrusion.intrusion_timestamp}</td>
												</tr>
											))
											:
											(
												<tr>
													<td style={{ paddingLeft: '6.5%' }} >------------</td>
													<td style={{ paddingLeft: '7%' }} >-------</td>
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