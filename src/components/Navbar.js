import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faHome, 
  faChalkboardTeacher, 
  faUserGraduate, 
  faClipboardList, 
  faCalendarAlt, 
  faFileAlt, 
  faCog, 
  faSignOutAlt, 
  faUser, 
  faEnvelope, 
  faBell, 
  faUsers, 
  faTasks,
  faSitemap
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-between items-center px-4 py-3 md:hidden">
        <h2 className="text-2xl font-bold">CampusHub360 HOD</h2>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl" />
        </button>
      </div>
      <aside className={`fixed inset-0 bg-gray-900 text-white z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0 md:w-64`}>
        <div className="py-6 px-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">HOD Management</h2>
          <button onClick={toggleMenu} className="md:hidden">
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/hod/home" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
          </Link>
          <Link to="/hod/department-management" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faSitemap} className="mr-3" /> Department Management
          </Link>
          <Link to="/hod/course-oversight" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-3" /> Course Oversight
          </Link>
          <Link to="/hod/faculty-coordination" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faUsers} className="mr-3" /> Faculty Coordination
          </Link>
          <Link to="/hod/student-performance" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faUserGraduate} className="mr-3" /> Student Performance
          </Link>
          <Link to="/hod/approval-workflow" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faTasks} className="mr-3" /> Approval Workflow
          </Link>
          <Link to="/hod/leave" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faTasks} className="mr-3" /> Leave
          </Link>
          <Link to="/hod/announcements" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-3" /> Announcements
          </Link>
          <Link to="/hod/profile" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
          </Link>
          <Link to="/hod/settings" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
          </Link>
          <Link to="/logout" className="block py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" /> Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
