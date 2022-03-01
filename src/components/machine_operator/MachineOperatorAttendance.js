import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Header from '../../Header'
import Menu from '../../Menu'
function MachineOperatorAttendance() {
    return (
        <>
        <Header />
        <Menu />
        <div className='content-wrapper'>
        <div className="row">
            <div className='col-md-4'>
            <Card>
            <Card.Body>
                <Card.Title>Attendance</Card.Title><br /><br />
                <Button className="btn btn-primary">Check In</Button><br /><br />
                <Card.Text>
                    <h4>01:18:04 Hrs</h4><br />
                    <h6>7 Jan 2022</h6>
                    <h6 style={{ color: 'red' }}>Late by 1:00</h6>
                </Card.Text>
            </Card.Body>
        </Card>
            </div>
            <div className='col-md-4'>
            <Card>
            <Card.Body>
                <Card.Title>Announcement</Card.Title><br /><br />
                <Card.Text><br /><br />
                   <h4>New recruitments</h4><br />
                   <h6>Upcoming Meeting</h6><br />
                   <h6>Production</h6><br />
                </Card.Text>
            </Card.Body>
        </Card>
            </div>
            <div className='col-md-4'>
            <Card>
            <Card.Body>
                <Card.Title>Leave Report</Card.Title><br /><br />
                <Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
            </div>
        
        </div>
        
    </div></>
    )
}

export default MachineOperatorAttendance
