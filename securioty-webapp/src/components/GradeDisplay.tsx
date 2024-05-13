import React, { useState, useEffect } from 'react';
import StudentGradeList from './StudentGradeList';
import GradeFilterBar from './GradeFilterBar';
import axios from 'axios';

interface Student {
    courseCode: string;
    schoolYear: string;
    firstName: string;
    lastName: string;
    labId: string;
    score: string;
}


const ProgressDisplay = () => {
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [labId, setLabId] = useState('');

    const [students, setStudents] = useState([]);
    const [courseCodeOptions, setCourseCodeOptions] = useState([]);
    const [schoolYearOptions, setSchoolYearOptions] = useState([]);
    const [labIDOptions, setLabIDOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const courseCodeResponse = await axios.get('/api/courseCodeOptions');
                setCourseCodeOptions(courseCodeResponse.data);

                const schoolYearResponse = await axios.get('/api/schoolYearOptions');
                setSchoolYearOptions(schoolYearResponse.data);

                const labIDResponse = await axios.get('/api/labIDOptions');
                setLabIDOptions(labIDResponse.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        localStorage.setItem('courseCode', courseCode);
    }, [courseCode]);

    useEffect(() => {
        localStorage.setItem('schoolYear', schoolYear);
    }, [schoolYear]);

    useEffect(() => {
        localStorage.setItem('labId', labId);
    }, [labId]);


    const handleApplyFilters = async () => {
        try {
            const response = await axios.post('/api/students', {
                courseCode,
                schoolYear,
                labId
            });
            setStudents(response.data);
            setFiltersApplied(true);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    return (
        <div className="container">
            <GradeFilterBar
                courseCodeOptions={courseCodeOptions}
                schoolYearOptions={schoolYearOptions}
                labIDOptions={labIDOptions}
                courseCode={courseCode}
                setCourseCode={setCourseCode}
                schoolYear={schoolYear}
                setSchoolYear={setSchoolYear}
                labId={labId}
                setLabId={setLabId}
                handleApplyFilters={handleApplyFilters}
            />
            <StudentGradeList students={students} filtersApplied={filtersApplied} />
        </div>
    );
}

export default ProgressDisplay;


