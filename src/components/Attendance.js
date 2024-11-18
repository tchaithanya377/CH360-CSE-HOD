import React, { useState } from 'react';

const Attendance = () => {
    const [activeTab, setActiveTab] = useState('students'); // Tabs for students and faculty
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');

    const students = [
        { id: 'S001', name: 'Alice Johnson', year: '1', semester: '1', section: 'A', attendance: '85%' },
        { id: 'S002', name: 'Bob Smith', year: '1', semester: '1', section: 'B', attendance: '78%' },
        { id: 'S003', name: 'Charlie Brown', year: '2', semester: '2', section: 'A', attendance: '88%' },
        { id: 'S004', name: 'Daisy Miller', year: '3', semester: '5', section: 'C', attendance: '91%' },
        // Add more student data
    ];

    const faculty = [
        { id: 'F001', name: 'Dr. Sarah Lee', department: 'Computer Science', attendance: '92%' },
        { id: 'F002', name: 'Prof. John Carter', department: 'Electronics', attendance: '88%' },
        { id: 'F003', name: 'Dr. Emily Davis', department: 'Mechanical', attendance: '95%' },
        { id: 'F004', name: 'Prof. Mark Brown', department: 'Mathematics', attendance: '89%' },
        // Add more faculty data
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setYear('');
        setSemester('');
        setSection('');
    };

    const filteredStudents = students.filter((student) => {
        return (
            (!year || student.year === year) &&
            (!semester || student.semester === semester) &&
            (!section || student.section === section)
        );
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

            {/* Tab Selection */}
            <div className="flex gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleTabChange('students')}
                >
                    Students
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'faculty' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleTabChange('faculty')}
                >
                    Faculty
                </button>
            </div>

            {/* Students Attendance */}
            {activeTab === 'students' && (
                <div>
                    {/* Filter Section */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Years</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>

                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Semesters</option>
                            <option value="1">1st Semester</option>
                            <option value="2">2nd Semester</option>
                            <option value="3">3rd Semester</option>
                            <option value="4">4th Semester</option>
                            <option value="5">5th Semester</option>
                            <option value="6">6th Semester</option>
                            <option value="7">7th Semester</option>
                            <option value="8">8th Semester</option>
                        </select>

                        <select
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Sections</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                        </select>
                    </div>

                    {/* Attendance Table */}
                    <div className="bg-white shadow rounded-lg p-5">
                        <h2 className="text-2xl font-bold mb-4">Filtered Student Attendance</h2>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Year</th>
                                <th className="border border-gray-300 p-2">Semester</th>
                                <th className="border border-gray-300 p-2">Section</th>
                                <th className="border border-gray-300 p-2">Attendance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{student.id}</td>
                                        <td className="border border-gray-300 p-2">{student.name}</td>
                                        <td className="border border-gray-300 p-2">{student.year}</td>
                                        <td className="border border-gray-300 p-2">{student.semester}</td>
                                        <td className="border border-gray-300 p-2">{student.section}</td>
                                        <td className="border border-gray-300 p-2">{student.attendance}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border border-gray-300 p-4 text-center text-gray-500">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Faculty Attendance */}
            {activeTab === 'faculty' && (
                <div>
                    <div className="bg-white shadow rounded-lg p-5">
                        <h2 className="text-2xl font-bold mb-4">Faculty Attendance</h2>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Department</th>
                                <th className="border border-gray-300 p-2">Attendance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {faculty.length > 0 ? (
                                faculty.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{member.id}</td>
                                        <td className="border border-gray-300 p-2">{member.name}</td>
                                        <td className="border border-gray-300 p-2">{member.department}</td>
                                        <td className="border border-gray-300 p-2">{member.attendance}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border border-gray-300 p-4 text-center text-gray-500">
                                        No records found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendance;
