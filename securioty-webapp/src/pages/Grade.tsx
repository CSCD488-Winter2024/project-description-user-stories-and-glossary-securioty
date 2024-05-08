import React, { useState } from 'react';

const InstructorPage = () => {
  const [courseCode, setCourseCode] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [labId, setLabId] = useState('');

  const courseCodeOptions = ['All Courses', 'CSCD499', 'CSCD303', 'CYBR410'];
  const schoolYearOptions = ['Fall 2024', 'Winter 2024', 'Spring 2024']; // Example school year options

  const handleApplyFilters = () => {
    // Apply filters based on selected options
    console.log('Selected options:', { courseCode, schoolYear, labId });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Instructor Page</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {courseCode ? courseCode : 'Select Course Code...'}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {courseCodeOptions.map((option, index) => (
                  <li key={index}><button className="dropdown-item" onClick={() => setCourseCode(option)}>{option}</button></li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {schoolYear ? schoolYear : 'Select School Year...'}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {schoolYearOptions.map((option, index) => (
                  <li key={index}><button className="dropdown-item" onClick={() => setSchoolYear(option)}>{option}</button></li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Lab ID
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {/* Options for lab ID dropdown */}
              </ul>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default InstructorPage;
