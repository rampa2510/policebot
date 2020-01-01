import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const EmployeeAttendance = ()=>{
    const [loaded,setLoaded] = useState(false);
    useEffect(()=>{
        if(sessionStorage['username']!=null)
            setLoaded(true);
        else
            window.location='/'
    },[])

    const loadPage = ()=>{
        if(loaded)
            return(
                <React.Fragment>
                    <div id="employeefilter">
                        <form className="col-10 offset-1">
                            <div className="row">
                                <div className="col-8">
                                    <input type="text" placeholder="Complaint Number" className="form-control"></input>
                                </div>
                                <div className="col-4">
                                    <button id="searchbutton" type="submit" className="btn btn-primary form-control">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 text-center">
                        <Table responsive striped bordered hover>
                            {/* <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2nd Jan</td>
                                    <td style={{color:"green"}}>Present</td>
                                </tr>
                                <tr>
                                    <td>3rd Jan</td>
                                    <td style={{color:"red"}}>Absent</td>
                                </tr>
                                <tr>
                                    <td>4th Jan</td>
                                    <td style={{color:"green"}}>Present</td>
                                </tr>
                                <tr>
                                    <td>5th Jan</td>
                                    <td style={{color:"Green"}}>Present</td>
                                </tr>
                            </tbody> */}
                        </Table>
                    </div>
                </React.Fragment>
            );
        else
            return;
    }

    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );
}

export default EmployeeAttendance;