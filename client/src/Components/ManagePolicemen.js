import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/ManagePolicemen.css';
import { Link } from 'react-router-dom';

const ManagePolicemen = () => {
  const [loaded, setLoaded] = useState(false);
  useState(() => {
    if (sessionStorage.username != null && sessionStorage.role === 'admin') setLoaded(true);
    else window.location = '/';
  }, []);

  const loadPage = () => {
    if (loaded) {
      return (
        <div className="text-center" id="manageemployees">
          <h1 id="manageheading">Manage Policemen</h1>
          <Link to="/addpoliceman">
            <button className="btn btn-success" id="addbutton">
              Add Policeman
            </button>
          </Link>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                            <td>Abc</td>
                            <td style={{color:"green"}}>76%</td>
                            <td><button className="btn btn-info">Edit</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                        <tr>
                            <td>Def</td>
                            <td style={{color:"red"}}>64%</td>
                            <td><button className="btn btn-info">Edit</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                        <tr>
                            <td>Xyz</td>
                            <td style={{color:"green"}}>83%</td>
                            <td><button className="btn btn-info">Edit</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                        <tr>
                            <td>Pqr</td>
                            <td style={{color:"Green"}}>90%</td>
                            <td><button className="btn btn-info">Edit</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr> */}
            </tbody>
          </Table>
        </div>
      );
    }
  };
  return <>{loadPage()}</>;
};

export default ManagePolicemen;
