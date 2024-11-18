// src/pages/Dashboard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGraduate,
  faChalkboardTeacher,
  faUsers,
  faTasks,
  faClipboardList,
  faCalendarAlt,
  faEnvelope,
  faBell,
  faChartLine,
  faBook,
  faRupeeSign,
  faLightbulb,
  faCommentDots,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {Link} from "react-router-dom";

// Register the necessary components
Chart.register(...registerables);

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Attendance',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">HOD Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faUserGraduate} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/hod/students" className="text-xl font-bold">Students</Link>
            <p className="text-gray-600">Manage student performance</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/course-progress" className="text-xl font-bold">Courses</Link>
            <p className="text-gray-600">Oversee courses</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/hod/faculty" className="text-xl font-bold">Faculty</Link>
            <p className="text-gray-600">Coordinate faculty</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faTasks} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/approvals" className="text-xl font-bold">Approvals</Link>
            <p className="text-gray-600">Manage approval workflows</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/attendances" className="text-xl font-bold">Attendance</Link>
            <p className="text-gray-600">Track attendance</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl text-gray-600" />
          <div className="ml-4">
            <Link to="/exam" className="text-xl font-bold">Exams</Link>
            <p className="text-gray-600">Schedule exams</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
          <p>Total Students: 200</p>
          <p>Total Faculty: 30</p>
          <p>Total Courses: 50</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <ul>
            <li>Event 1 - Date</li>
            <li>Event 2 - Date</li>
            <li>Event 3 - Date</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ul>
            <li>Activity 1</li>
            <li>Activity 2</li>
            <li>Activity 3</li>
          </ul>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold mb-4">Performance Charts</h2>
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Tasks and Approvals</h2>
          <ul>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Approval 1</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <ul>
            <li>Message 1</li>
            <li>Message 2</li>
            <li>Message 3</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Library Management</h2>
          <p>Books Issued: 150</p>
          <p>Books Returned: 120</p>
          <p>Books Available: 1000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
          <p>Budget Allocated: ₹5,00,000</p>
          <p>Expenses: ₹3,00,000</p>
          <p>Remaining Budget: ₹2,00,000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Faculty Development</h2>
          <ul>
            <li>Program 1</li>
            <li>Program 2</li>
            <li>Program 3</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Feedback System</h2>
          <ul>
            <li>Feedback 1</li>
            <li>Feedback 2</li>
            <li>Feedback 3</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Resource Management</h2>
          <p>Classrooms Available: 20</p>
          <p>Labs Available: 5</p>
          <p>Equipment Usage: 75%</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-xl font-bold mb-4">Alumni Network</h2>
          <ul>
            <li>Alumni 1</li>
            <li>Alumni 2</li>
            <li>Alumni 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
