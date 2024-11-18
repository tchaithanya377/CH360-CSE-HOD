// src/pages/Faculty.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Faculty = () => {
    const [facultyList, setFacultyList] = useState([
        { id: 'F001', name: 'Dr. Alice Johnson', department: 'Computer Science', designation: 'Professor', courses: 'CSE101, CSE202', performance: 'Excellent' },
        { id: 'F002', name: 'Mr. Bob Williams', department: 'Mathematics', designation: 'Assistant Professor', courses: 'MATH101, MATH102', performance: 'Good' },
        // Add more initial faculty as needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterDepartmentChange = (e) => {
        setFilterDepartment(e.target.value);
    };

    const filteredFaculty = facultyList.filter(faculty => {
        return (
            (!filterDepartment || faculty.department === filterDepartment) &&
            (faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faculty.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Faculty</h1>

            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search faculty..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-lg mr-4"
                />
                <select value={filterDepartment} onChange={handleFilterDepartmentChange} className="p-2 border border-gray-300 rounded-lg">
                    <option value="">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    {/* Add more departments as needed */}
                </select>
            </div>

            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Faculty List</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Faculty ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Designation</th>
                        <th className="border border-gray-300 p-2">Courses</th>
                        <th className="border border-gray-300 p-2">Performance</th>
                        <th className="border border-gray-300 p-2">Profile</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredFaculty.map((faculty) => (
                        <tr key={faculty.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{faculty.id}</td>
                            <td className="border border-gray-300 p-2">{faculty.name}</td>
                            <td className="border border-gray-300 p-2">{faculty.department}</td>
                            <td className="border border-gray-300 p-2">{faculty.designation}</td>
                            <td className="border border-gray-300 p-2">{faculty.courses}</td>
                            <td className="border border-gray-300 p-2">{faculty.performance}</td>
                            <td className="border border-gray-300 p-2">
                                <Link to={`/faculty/${faculty.id}`} className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faEye} /> View Profile
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Faculty;
