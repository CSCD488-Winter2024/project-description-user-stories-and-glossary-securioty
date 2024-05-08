import React, { useState, useEffect } from 'react';

const InstructorPage = () => {
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [labId, setLabId] = useState('');



    const courseCodeOptions = ['All Courses', 'CSCD499', 'CSCD303', 'CYBR410'];
    const schoolYearOptions = ['All Quarters','Fall 2024', 'Winter 2024', 'Spring 2024'];
    const labIDOptions = ['All Labs','Lab 1', 'Lab 2', 'Lab 3','Lab 4'];



    /*
        localStorage.removeItem('courseCode');
        localStorage.removeItem('schoolYear');
        localStorage.removeItem('labId');
    */

    useEffect(() => {
        const storedCourseCode = localStorage.getItem('courseCode');
        if (storedCourseCode) setCourseCode(storedCourseCode);

        const storedSchoolYear = localStorage.getItem('schoolYear');
        if (storedSchoolYear) setSchoolYear(storedSchoolYear);

        const storedLabId = localStorage.getItem('labId');
        if (storedLabId) setLabId(storedLabId);
    }, []);

    const students = [
        ['CSCD499', 'Winter 2024', 'Russell', 'Wilson', 'Lab1', '50'],
        ['CSCD499', 'Winter 2024', 'Josh', 'Allen', 'Lab1', '60'],
        ['CSCD499', 'Winter 2024', 'Lamar', 'Jackson', 'Lab1', '70'],
        ['CSCD499', 'Winter 2024', 'Patrick', 'Mahomes', 'Lab1', '80'],
        ['CSCD499', 'Winter 2024', 'Geno', 'Smith', 'Lab1', '90'],
    ]

    useEffect(() => {
        localStorage.setItem('courseCode', courseCode);
    }, [courseCode]);

    useEffect(() => {
        localStorage.setItem('schoolYear', schoolYear);
    }, [schoolYear]);

    useEffect(() => {
        localStorage.setItem('labId', labId);
    }, [labId]);

    const handleApplyFilters = () => {
        setFiltersApplied(true);
    };

    const getBadgeColor = (score: string) => {
        const numericScore = parseInt(score);
        if (numericScore < 60) {
            return { backgroundColor: '#f73d20' }; // Red
        } else if (numericScore < 70) {
            return { backgroundColor: '#f7b320' }; // Orange
        } else if (numericScore < 80) {
            return { backgroundColor: '#f7f020' }; // Yellow
        } else if (numericScore < 90) {
            return { backgroundColor: '#c8f720' }; // Greenish yellow
        } else {
            return { backgroundColor: '#20f74f' }; // Green
        }
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Display Grades For...</span>
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
                                    {schoolYear ? schoolYear : 'Select Quarter...'}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    {schoolYearOptions.map((option, index) => (
                                        <li key={index}><button className="dropdown-item" onClick={() => setSchoolYear(option)}>{option}</button></li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {labId ? labId : 'Select Lab ID...'}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    {labIDOptions.map((option, index) => (
                                        <li key={index}><button className="dropdown-item" onClick={() => setLabId(option)}>{option}</button></li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                {filtersApplied && (
                    <div className="container text-center">
                        {students.map((subArray, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {subArray.map((item, colIndex) => (
                                    <div key={colIndex} className="col" style={{ backgroundColor: 'lightgray', color: 'black', padding: '10px' }}>
                                        {colIndex === subArray.length - 1 ? (
                                            <span className="badge rounded-pill" style={{ width: '80px', color: 'black', ...getBadgeColor(item) }}>{item}%</span>
                                        ) : (
                                            item
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InstructorPage;
