import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../css/Dashboard.css';
import report from '../images/report.png';
import star from '../images/star.png';
import exam from '../images/exam.png';
import student from '../images/student.png';
import question from '../images/question.png';


const Dashboard = () => {
  // Checks if loaded
  const [loaded, setLoaded] = useState(false);

  // get userdata with all info see registration handleSubmit method
  // to view model for this storage
  let userData = localStorage.getItem('userData');
  userData = JSON.parse(userData);
  // checks if user is logged in
  useEffect(() => {
    if (userData === null) window.location = '/';
    else setLoaded(true);
  }, []);

  // Loads dashboard based on if user is student or admin
  const loadPage = () => {
    if (loaded) {
      if (userData.userType === 'citizen') {
        return (
          <>
            <Card img={student} link="/crimeregistration" buttonText="Register Complaint" />
            <Card img={star} link="/crimeawareness" buttonText="Crime Awareness" />
            <Card img={question} link="/tracking" buttonText="Complaint Tracking" />
          </>
        );
      }
      if (userData.userType === 'policeman') {
        return (
          <>
            <Card img={exam} link="/newreports" buttonText="New Reports" />
            <Card img={star} link="/myinvestigations" buttonText="My Investigations" />
            <Card img={report} link="/tracking" buttonText="Complaint Tracking" />
          </>
        );
      }

      return (
        <>
          <Card img={exam} link="/addpoliceman" buttonText="Add Policeman" />
          <Card img={exam} link="/managepolicemen" buttonText="Manage Policemen" />
          <Card img={report} link="/tracking" buttonText="Complaint Tracking" />
        </>
      );
    }
    };
  return <div id="dashboard">{loadPage()}</div>;
};

export default Dashboard;
