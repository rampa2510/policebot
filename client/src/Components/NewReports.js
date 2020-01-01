import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/ManagePolicemen.css';

const NewReports = ()=>{
    const [loaded,setLoaded] = useState(false);
    useState(()=>{
        if(sessionStorage['username']!=null && sessionStorage['role']==='policeman')
            setLoaded(true);
        else
            window.location='/'
    },[])

    const loadPage = ()=>{
        if(loaded){
            return(
            <div className="text-center" id="manageemployees">
                <h1 id="manageheading">New Reports</h1>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Complaint No.</th>
                            <th>Accused Name</th>
                            <th>Start Investigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </Table>
            </div>
            );
        }
    }
    return(
        <React.Fragment>
            {loadPage()}
        </React.Fragment>
    );
}

export default NewReports;