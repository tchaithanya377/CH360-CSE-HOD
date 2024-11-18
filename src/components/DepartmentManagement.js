// src/pages/DepartmentManagement.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChalkboardTeacher, 
  faUserGraduate, 
  faClipboardList, 
  faUsers, 
  faBook, 
  faTasks 
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const DepartmentManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Department Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to='/hod/course-oversight' className="text-xl font-bold">Manage Courses</Link>
            <p className="text-gray-600">Add, update, and delete courses</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faUserGraduate} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/hod/students" className="text-xl font-bold">Manage Students</Link>
            <p className="text-gray-600">Add, update, and track student performance</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/assessments" className="text-xl font-bold">Assignments</Link>
            <p className="text-gray-600">Manage student assignments</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/hod/faculty" className="text-xl font-bold">Manage Faculty</Link>
            <p className="text-gray-600">Add, update, and track faculty performance</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faBook} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Library Resources</h2>
            <p className="text-gray-600">Manage department library resources</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faTasks} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/resource" className="text-xl font-bold">Resource Allocation</Link>
            <p className="text-gray-600">Manage classroom and lab allocations</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">Course Management</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Course ID</th>
              <th className="border border-gray-300 p-2">Course Name</th>
              <th className="border border-gray-300 p-2">Faculty</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">CSE101</td>
              <td className="border border-gray-300 p-2">Introduction to Computer Science</td>
              <td className="border border-gray-300 p-2">Dr. Smith</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentManagement;
