import React, { Component } from "react";

class AppNoPermissions extends Component {
    render() {
        return (
            <div className="Row" style={{backgroundColor: "#27aae2"}}>
                <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-black vh-100">
                    <p style={{color: "white", fontSize: "100px"}}>401</p>
                    <p style={{color: "white", fontSize: "40px"}}>Unauthorized Page</p>
                    <p style={{color: "white", fontSize: "30px"}}>Oops! It looks like you do not have permission to access this site.</p>
                    <img
                        alt=""
                        src="/Logo.png"
                        className="d-inline-block align-top"
                    />
                </div>
            </div>
        );
    }
}

export default AppNoPermissions;