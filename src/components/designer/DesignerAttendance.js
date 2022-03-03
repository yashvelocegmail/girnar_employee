import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Card, Button } from 'react-bootstrap'
import Header from '../../Header'
import Menu from '../../Menu'
// import Timer from './Timer/Timer';

function DesignerAttendance() {
    //timer settings
    const [time, setTime] = useState({hour: "00", minutes: "00", seconds: "00"});

    // useEffect(() => {
    //   start()
    // }, [time])
    //timer settings
    const [employeeAttendance,setEmployeeAttendance] = useState();
    const [checkOutButton, setCheckOutButton] = useState("none");
    const [checkInButton, setCheckInButton] = useState("none");
    const [checkIn, setCheckIn] = useState();
    const [todaydate, setTodaydate] = useState();
    const [timer,setTimer] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every minute');
            var todaydate = new Date();
        setTodaydate(todaydate.getDate() + '-' + (todaydate.getMonth() + 1) + '-' + todaydate.getFullYear());
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        axios.post("http://localhost/girnar_backend/api/read_check_approval.php", { date: date, employee: localStorage.getItem('employee_id') })
            .then((res) => {
                setEmployeeAttendance(res.data)
                //console.log(res.data.data[0].check_out)
                if (res.data.itemcount === 0) {
                    localStorage.setItem("check_in", "inline")
                    localStorage.setItem("check_out", "none")
                    if (localStorage.getItem("check_in") === "inline") {
                        setCheckInButton("inline");
                    }
                }
                else {
                    if (res.data.data[0].check_in_approval === "not_approved") {
                        localStorage.setItem("check_out", "none")
                        localStorage.setItem("check_in", "none")
                        if (localStorage.getItem("check_in") === "none") {
                            setCheckInButton("none");
                        }
                    }
                    else if (res.data.data[0].check_in_approval === "approved" && res.data.data[0].check_out===null) {
                        localStorage.setItem("check_out", "inline")
                        localStorage.setItem("check_in", "none")
                        if (localStorage.getItem("check_out") === "inline") {
                            setCheckOutButton("inline");
                        }
                    }
                    else if (res.data.data[0].check_out_approval === "not_approved" && res.data.data[0].check_out!==null) {
                        localStorage.setItem("check_out", "none")
                        localStorage.setItem("check_in", "none")
                        if (localStorage.getItem("check_out") === "none") {
                            setCheckOutButton("none");
                        }
                    }
                    else if (res.data.data[0].check_out_approval === "approved") {
                        localStorage.setItem("check_out", "none")
                        localStorage.setItem("check_in", "inline")
                        if (localStorage.getItem("check_in") === "inline") {
                            setCheckInButton("inline");
                        }
                    }
                }
                setCheckIn(res.data.data[0]===undefined?"":res.data.data[0].check_in);
            })
          }, 1000);
        
          return () => clearInterval(interval);
        
    },[employeeAttendance])
    
    const onCheckIn = (e) => {
        
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var check_in = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
        var employee = localStorage.getItem('employee_id');
        axios.post("http://localhost/girnar_backend/api/employee_check_in.php", { date: date, check_in: check_in, employee: employee })
            .then((res) => {
                const obj = new Date();
                localStorage.seconds = obj.getHours() * 60 * 60 + obj.getMinutes() * 60 + obj.getSeconds()
                //timer
                // setIsStartTimer(true);
                // setIsStopTimer(false);
                //timer
                
                //new timer
                // setInterval(function () {
                //     const obj1 = new Date()
                //     const secs = obj1.getHours() * 60 * 60 + obj1.getMinutes() * 60 + obj1.getSeconds()
                //     var n = secs - localStorage.seconds
                //     var hour = parseInt(n / 3600);
                //     if(hour < 10){
                //       hour = "0" + hour
                //     }
              
                //     n %= 3600;
                //     var minutes = parseInt(n / 60);
                //     if(minutes < 10){
                //       minutes = "0" + parseInt(minutes)
                //     }
              
                //     n %= 60;
                //     var seconds = parseInt(n);
                //     if(seconds < 10){
                //       seconds = "0" + parseInt(seconds)
                //     }
                //     setTime({hour: hour+"", minutes: minutes+"", seconds: seconds+""})
                //   }, 1000);
                
            })
        console.log(time)
    }
    
    const onCheckOut = (e) => {
        //console.log(checkIn)
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var check_out = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var employee = localStorage.getItem('employee_id');
        axios.post("http://localhost/girnar_backend/api/employee_check_out.php", { date: date, check_in:checkIn, check_out: check_out, employee: employee })
            .then((res) => {
                //timer
                // setIsStopTimer(true);
                // setIsStartTimer(false);
                // setIsPauseTimer(false);
                // setIsResumeTimer(false);
                //timer

                // localStorage.setItem("check_out","none")
                // localStorage.setItem("check_in","inline")
                // if(localStorage.getItem("check_in")==="inline")
                // {
                //     setCheckInButton("inline");
                // }
                clearInterval()
            })
    }
    
    // useEffect(()=>{
    //     axios.post("http://localhost/girnar_backend/api/read_check_approval.php",{date:date,check_in:checkIn})
    //     .then(()=>{
    //         localStorage.setItem("check_out","none")
    //         localStorage.setItem("check_in","inline")
    //         if(localStorage.getItem("check_in")==="inline")
    //         {
    //             setCheckInButton("inline");
    //         }
    //     })
    // })
    //Timer
    // var interval = 3240000;

    //             function reset()
    //             {
    //                 localStorage.endTime = +new Date + interval;
    //             }
                
    //             if(!localStorage.endTime)
    //             {
    //                 reset();
    //             }
                
    //             setInterval(function()
    //             {
    //                 var remaining = localStorage.endTime - new Date;
    //                 if( remaining >= 0 )
    //                 {
    //                     setTimer(Math.floor( remaining / 1000 ));
    //                 } else
    //                 {
    //                     reset();
    //                 }
    //             }, 100);
              
    //   const [renderedStreamDuration, setRenderedStreamDuration] = useState(
    //     "00:00:00"
    //   ),
    //   streamDuration = useRef(0),
    //   previousTime = useRef(0),
    //   requestAnimationFrameId = useRef(null),
    //   [isStartTimer, setIsStartTimer] = useState(false),
    //   [isStopTimer, setIsStopTimer] = useState(false),
    //   [isPauseTimer, setIsPauseTimer] = useState(false),
    //   [isResumeTimer, setIsResumeTimer] = useState(false)

    // const updateTimer = useCallback(() => {
    //   let now = performance.now();
    //   let dt = now - previousTime.current;

    //   if (dt >= 1000) {
    //     streamDuration.current = streamDuration.current + Math.round(dt / 1000);     
    //     const formattedStreamDuration = new Date(streamDuration.current * 1000)
    //       .toISOString()
    //       .substr(11, 8);
    //     setRenderedStreamDuration(formattedStreamDuration);
    //     previousTime.current = now;
    //   }
    //   requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
    // }, []);

    // const startTimer = useCallback(() => {
    //   previousTime.current = performance.now();
    //   requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
    // }, [updateTimer]);

    // useEffect(() => {
    //   if (isStartTimer && !isStopTimer) {
    //     startTimer();
    //   }
    //   if (isStopTimer && !isStartTimer) {
    //     streamDuration.current = 0;
    //     cancelAnimationFrame(requestAnimationFrameId.current);
    //     setRenderedStreamDuration("00:00:00");
    //   }
    // }, [isStartTimer, isStopTimer, startTimer]);


    //New timer
    
    return (
        <>
            <Header />
            <Menu />
            <div className='content-wrapper'>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>HRMS Portal</h1>
                            </div>

                        </div>
                    </div>
                </section>
                <section class="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-md-4'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Attendance</Card.Title><br /><br />
                                        <Button className="btn btn-primary" onClick={onCheckIn} style={{ display: checkInButton }}>Check In</Button><br /><br />
                                        <Button className="btn btn-danger" onClick={onCheckOut} style={{ display: checkOutButton }}>Check Out</Button><br /><br />
                                        <Card.Text>
                                            {/* <h4>1:23:23</h4> */}
                                            {/* <h4>{time.seconds}</h4> */}
                                            {/* <Timer/> */}
                                            {/* <h4>{renderedStreamDuration}</h4><br /> */}
                                            <h6>{todaydate}</h6>
                                            {/* <h6 style={{ color: 'red' }}>Late by 1:00</h6> */}
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

                    </div>
                </section>
            </div>


        </>
    )
}

export default DesignerAttendance
