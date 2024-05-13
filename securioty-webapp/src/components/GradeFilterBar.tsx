import React from 'react';

interface GradeFilterBarProps {
    courseCodeOptions: string[];
    schoolYearOptions: string[];
    labIDOptions: string[];
    courseCode: string;
    setCourseCode: React.Dispatch<React.SetStateAction<string>>;
    schoolYear: string;
    setSchoolYear: React.Dispatch<React.SetStateAction<string>>;
    labId: string;
    setLabId: React.Dispatch<React.SetStateAction<string>>;
    handleApplyFilters: () => void;
}

const GradeFilterBar: React.FC<GradeFilterBarProps> = ({ 
    courseCodeOptions, 
    schoolYearOptions, 
    labIDOptions, 
    courseCode, 
    setCourseCode, 
    schoolYear, 
    setSchoolYear, 
    labId, 
    setLabId, 
    handleApplyFilters 
}) => {
    const FilterDropdown: React.FC<{ 
        options: string[]; 
        currentValue: string; 
        setCurrentValue: React.Dispatch<React.SetStateAction<string>>; 
    }> = ({ options, currentValue, setCurrentValue }) => {
        return (
            <li className="nav-item dropdown">
                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {currentValue ? currentValue : 'Select...'}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    {options.map((option, index) => (
                        <li key={index}><button className="dropdown-item" onClick={() => setCurrentValue(option)}>{option}</button></li>
                    ))}
                </ul>
            </li>
        );
    };
    const ApplyFiltersButton = () => {
        return (
            <li className="nav-item">
                <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">Display Grades For...</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                        <FilterDropdown options={courseCodeOptions} currentValue={courseCode} setCurrentValue={setCourseCode} />
                        <FilterDropdown options={schoolYearOptions} currentValue={schoolYear} setCurrentValue={setSchoolYear} />
                        <FilterDropdown options={labIDOptions} currentValue={labId} setCurrentValue={setLabId} />
                        <ApplyFiltersButton />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default GradeFilterBar;
