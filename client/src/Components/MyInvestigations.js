import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/ManagePolicemen.css';
import { Link } from 'react-router-dom';

const MyInvestigations = () => {
  const [loaded, setLoaded] = useState(false);
  useState(() => {
    if (sessionStorage.username != null && sessionStorage.role === 'policeman') setLoaded(true);
    else window.location = '/';
  }, []);

  const loadPage = () => {
    if (loaded) {
      return (
        <div className="text-center" id="manageemployees">
          <h1 id="manageheading">My Investigations</h1>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Complaint No.</th>
                <th>Accused Name</th>
                <th>Close Case</th>
              </tr>
            </thead>
            <tbody />
          </Table>
        </div>
      );
    }
  };
  return <>{loadPage()}</>;
};

export default MyInvestigations;
