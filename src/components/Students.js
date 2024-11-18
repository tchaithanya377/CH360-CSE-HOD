// src/pages/Students.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([
    { id: 'S001', name: 'John Doe', year: '1', section: 'A', course: 'CSE101', performance: 'A' },
    { id: 'S002', name: 'Jane Smith', year: '2', section: 'B', course: 'CSE102', performance: 'B' },
    // Add more initial students as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSection, setFilterSection] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleFilterSectionChange = (e) => {
    setFilterSection(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    return (
      (!filterYear || student.year === filterYear) &&
      (!filterSection || student.section === filterSection) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       student.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg mr-4"
        />
        <select value={filterYear} onChange={handleFilterYearChange} className="p-2 border border-gray-300 rounded-lg mr-4">
          <option value="">All Years</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
        <select value={filterSection} onChange={handleFilterSectionChange} className="p-2 border border-gray-300 rounded-lg">
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Student ID</th>
              <th className="border border-gray-300 p-2">Student Name</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Section</th>
              <th className="border border-gray-300 p-2">Course</th>
              <th className="border border-gray-300 p-2">Performance</th>
              <th className="border border-gray-300 p-2">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{student.id}</td>
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">{student.year}</td>
                <td className="border border-gray-300 p-2">{student.section}</td>
                <td className="border border-gray-300 p-2">{student.course}</td>
                <td className="border border-gray-300 p-2">{student.performance}</td>
                <td className="border border-gray-300 p-2">
                  <Link to={`/students/${student.id}`} className="text-blue-500 hover:text-blue-700">
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

export default Students;
