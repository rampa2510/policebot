// import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
// import intereptor from '../Services/Interceptor';

// const EmployeeAttendance = () => {
//   const [loaded, setLoaded] = useState(false);
//   const [crimeNumber, setCrimeNumber] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('Token') != null) setLoaded(true);
//     else window.location = '/';
//   }, []);

//   const handleSubmit=async e=>{
//     e.preventDefault();

//     try {
//       const response = await intereptor(`/crime-register/${crimeNumber}`);
//       console.log(response)
//     } catch (error) {
//       console.log(error);
//       alert(error);
//     }
//   }

//   const loadPage = () => {
//     if (loaded)
//       return (
//         <>
//           <div id="employeefilter">
//             <form onSubmit={handleSubmit} className="col-10 offset-1">
//               <div className="row">
//                 <div className="col-8">
//                   <input type="number" placeholder="Complaint Number" onChange={e=>setCrimeNumber(e.target.value)} className="form-control" />
//                 </div>
//                 <div className="col-4">
//                   <button id="searchbutton" type="submit" className="btn btn-primary form-control">
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="col-12 text-center">
//             <Table responsive striped bordered hover>
//               {/* <thead>
//                                 <tr>
//                                     <th>Date</th>
//                                     <th>Attendance</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>2nd Jan</td>
//                                     <td style={{color:"green"}}>Present</td>
//                                 </tr>
//                                 <tr>
//                                     <td>3rd Jan</td>
//                                     <td style={{color:"red"}}>Absent</td>
//                                 </tr>
//                                 <tr>
//                                     <td>4th Jan</td>
//                                     <td style={{color:"green"}}>Present</td>
//                                 </tr>
//                                 <tr>
//                                     <td>5th Jan</td>
//                                     <td style={{color:"Green"}}>Present</td>
//                                 </tr>
//                             </tbody> */}
//             </Table>
//           </div>
//         </>
//       );
//   };

//   return <>{loadPage()}</>;
// };

// export default EmployeeAttendance;
