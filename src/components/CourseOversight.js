// src/pages/CourseOversight.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher,
  faTasks,
  faFileAlt,
  faClipboardList,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const CourseOversight = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Course Oversight</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/hod/manage-courses" className="text-xl font-bold">Manage Courses</Link>
            <p className="text-gray-600">Add, update, and delete courses</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faTasks} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Course Progress</h2>
            <p className="text-gray-600">Track course progress and assignments</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faFileAlt} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Course Materials</h2>
            <p className="text-gray-600">Upload and manage course materials</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to='/assessments' className="text-xl font-bold">Assessments</Link>
            <p className="text-gray-600">Manage quizzes and exams</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/student-enrollment" className="text-xl font-bold">Student Enrollment</Link>
            <p className="text-gray-600">View and manage student enrollments</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">Course Details</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Course ID</th>
              <th className="border border-gray-300 p-2">Course Name</th>
              <th className="border border-gray-300 p-2">Faculty</th>
              <th className="border border-gray-300 p-2">Enrolled Students</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">CSE101</td>
              <td className="border border-gray-300 p-2">Introduction to Computer Science</td>
              <td className="border border-gray-300 p-2">Dr. Smith</td>
              <td className="border border-gray-300 p-2">150</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">View</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2">Edit</button>
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

export default CourseOversight;
