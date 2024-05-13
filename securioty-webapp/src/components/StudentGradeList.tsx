import React from 'react';
interface Student {
    courseCode: string;
    schoolYear: string;
    firstName: string;
    lastName: string;
    labId: string;
    score: string;
}

interface Props {
    students: Student[];
    filtersApplied: boolean;
}

const StudentGradeList: React.FC<Props> = ({ students, filtersApplied }) => {
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

    const StudentGradesDisplay = () => {
        return (
            <div className="container text-center">
                {students.map((student, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {Object.values(student).map((item, colIndex) => (
                            <div key={colIndex} className="col" style={{ backgroundColor: 'lightgray', color: 'black', padding: '10px' }}>
                                {colIndex === Object.values(student).length - 1 ? (
                                    <span className="badge rounded-pill" style={{ width: '80px', color: 'black', ...getBadgeColor(item.toString()) }}>{item}%</span>
                                ) : (
                                    item
                                )}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        );
    }

    return (
        <div className="container">
            {filtersApplied && <StudentGradesDisplay />}
        </div>
    );
}

export default StudentGradeList;
