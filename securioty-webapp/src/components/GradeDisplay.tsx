import React, { useState, useEffect } from 'react';
import StudentGradeList from './StudentGradeList';
import GradeFilterBar from './GradeFilterBar';
import axios from 'axios';

interface Student {
    //courseCode: string;
    //schoolYear: string;
    user_id: string;
    labId: string;
    score: string;
}

interface Lab {
    title: string;
}


const ProgressDisplay = () => {

    const accountData = localStorage.getItem("ACCOUNT");
    const account = accountData !== null ? JSON.parse(accountData) : "";
    const h = { Authorization: `Bearer ${account.token.access_token}` };
    console.log(account)
    console.log(h)

    const [filtersApplied, setFiltersApplied] = useState(false);
    //const [courseCode, setCourseCode] = useState('');
    //const [schoolYear, setSchoolYear] = useState('');
    const [labId, setLabId] = useState('');

    const [students, setStudents] = useState<Student[]>([]);
    //const [courseCodeOptions, setCourseCodeOptions] = useState([]);
    //const [schoolYearOptions, setSchoolYearOptions] = useState([]);
    const [labIDOptions, setLabIDOptions] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get<Lab[]>('/labs/grade_options', {
                    headers: h
                });
                //console.log(response.data)
                const title_list = response.data;
                console.log(title_list)
                //setCourseCodeOptions(courseCodeOptions);
                //setSchoolYearOptions(schoolYearOptions);
                setLabIDOptions(title_list.map(lab => lab.title));
                console.log(labIDOptions)
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        
        fetchOptions();
    }, []);


    /*
    useEffect(() => {
        localStorage.setItem('courseCode', courseCode);
    }, [courseCode]);

    useEffect(() => {
        localStorage.setItem('schoolYear', schoolYear);
    }, [schoolYear]);
    */
    useEffect(() => {
        localStorage.setItem('labId', labId);
    }, [labId]);


    const handleApplyFilters = async () => {
        try {
            const response = await axios.post('/labs/get_students', {
                //courseCode,
                //schoolYear,
                labId
            },{
                headers: h
            });
            setStudents(response.data);
            console.log(students)
            setFiltersApplied(true);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    return (
        <div className="container">
            <GradeFilterBar
                //courseCodeOptions={courseCodeOptions}
                //schoolYearOptions={schoolYearOptions}
                labIDOptions={labIDOptions}
                //courseCode={courseCode}
                //setCourseCode={setCourseCode}
                //schoolYear={schoolYear}
                //setSchoolYear={setSchoolYear}
                labId={labId}
                setLabId={setLabId}
                handleApplyFilters={handleApplyFilters}
            />
            <StudentGradeList students={students} filtersApplied={filtersApplied} />
        </div>
    );
}

export default ProgressDisplay;


