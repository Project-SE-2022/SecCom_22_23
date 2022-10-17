import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
    return (
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
            <Col style={{ textAlign: 'center' }}>
                Column 2
                <Row style={{ textAlign: 'center' }}>
                    <p>Row 1</p>
                </Row>
                <Row style={{ textAlign: 'center' }}>
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
    );
}
export default Dashboard;