import React, { useState, useEffect } from 'react';

const AddEmployee = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    if (localStorage.getItem('Token') != null && userData.userType === 'admin') setLoaded(true);
    else window.location = '/';
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    window.location = '/managepolicemen';
  };

  const loadPage = () => {
    if (loaded) {
      return (
        <div className="container-fluid">
          <div className="markattendance row text-center">
            <div className="col-12 col-md-6 col-lg-4" id="login">
              <div id="loginform" className="col-12 text-center">
                <div className="jumbotron">
                  <h2>Add Policeman</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" className="form-control" required />
                    <input type="text" placeholder="Username" className="form-control" required />
                    <input type="text" placeholder="City" className="form-control" required />
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      required
                    />
                    <input type="submit" className="btn btn-success text-center form-control" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{loadPage()}</>;
};

export default AddEmployee;
