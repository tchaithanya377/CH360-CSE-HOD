import React, { useState } from 'react';

const StudentPerformance = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'Alice Johnson',
            rollNumber: 'CSE21A001',
            year: '1st Year',
            semester: '1st Semester',
            section: 'A',
            grades: { midTerm: 85, finalExam: 90 },
            attendance: 92,
            assessments: 88,
        },
        {
            id: 2,
            name: 'Bob Smith',
            rollNumber: 'CSE21A002',
            year: '1st Year',
            semester: '1st Semester',
            section: 'A',
            grades: { midTerm: 78, finalExam: 84 },
            attendance: 88,
            assessments: 75,
        },
    ]);

    const [filter, setFilter] = useState({
        year: '',
        semester: '',
        section: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const filteredStudents = students.filter((student) => {
        return (
            (!filter.year || student.year === filter.year) &&
            (!filter.semester || student.semester === filter.semester) &&
            (!filter.section || student.section === filter.section)
        );
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Student Performance</h1>

            {/* Filter Section */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">Filter Students</h2>
                <div className="grid grid-cols-3 gap-4">
                    <select
                        name="year"
                        value={filter.year}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                    <select
                        name="semester"
                        value={filter.semester}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Semester</option>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                    </select>
                    <select
                        name="section"
                        value={filter.section}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
            </div>

            {/* Student Performance Table */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Performance Details</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Roll Number</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Semester</th>
                        <th className="border border-gray-300 p-2">Section</th>
                        <th className="border border-gray-300 p-2">Grades</th>
                        <th className="border border-gray-300 p-2">Attendance (%)</th>
                        <th className="border border-gray-300 p-2">Assessment Score (%)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{student.rollNumber}</td>
                            <td className="border border-gray-300 p-2">{student.name}</td>
                            <td className="border border-gray-300 p-2">{student.year}</td>
                            <td className="border border-gray-300 p-2">{student.semester}</td>
                            <td className="border border-gray-300 p-2">{student.section}</td>
                            <td className="border border-gray-300 p-2">
                                Midterm: {student.grades.midTerm}%, Final: {student.grades.finalExam}%
                            </td>
                            <td className="border border-gray-300 p-2">{student.attendance}%</td>
                            <td className="border border-gray-300 p-2">{student.assessments}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {filteredStudents.length === 0 && (
                    <p className="mt-4 text-center text-gray-500">No students found for the selected criteria.</p>
                )}
            </div>
        </div>
    );
};

export default StudentPerformance;
