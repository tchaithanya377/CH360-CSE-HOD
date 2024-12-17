import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DepartmentManagement from './components/DepartmentManagement';
import CourseOversight from './components/CourseOversight';
import ManageCourses from './components/ManageCourses';
import Students from './components/Students';
import StudentProfilePage from './components/StudentProfilePage';
import CourseProgress from './components/CourseProgress';
import Faculty from "./components/Faculty";
import Approvals from "./components/Approvals";
import Attendance from "./components/Attendance";
import ExamManagement from "./components/ExamManagement";
import AssessmentsManagement from "./components/AssessmentsManagement";
import ResourceAllocation from "./components/ResourceAllocation";
import StudentEnrollment from "./components/StudentEnrollment";
import FacultyCoordination from "./components/FacultyCoordination";
import StudentPerformance from "./components/StudentPerformance";
import ApprovalWorkflow from "./components/ApprovalWorkflow copy";
import Announcements from "./components/Announcements";
import LeaveManagement from "./components/LeaveManagement";
import ProfilePage from "./components/ProfilePage";
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';
import FacultyCourseApproal from './components/FacultyCourseApproval';
import CoordinatorDashboard from './components/CoordinatorApproval';
import MentorApproval from './components/MentorApproval copy';
import Login from './components/Login';
import HodApprobsl from './components/HodApproval';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <ToastContainer position="top-center" /> */}
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

function MainLayout() {
  return (
    // <div className="App flex flex-col md:flex-row h-screen">
    //   <Navbar />
    //   <div className="flex-1 overflow-auto">
    //     <Routes>
    //       <Route path="/hod/home" element={<Dashboard />} />
    //       <Route path="/hod/department-management" element={<DepartmentManagement />} />
    //       <Route path="/hod/course-oversight" element={<CourseOversight />} />
    //       <Route path="/hod/manage-courses" element={<ManageCourses />} />
    //       <Route path="/hod/students" element={<Students />} />
    //       <Route path="/hod/faculty" element={<Faculty />} />
    //       <Route path="/students/:id" element={<StudentProfilePage />} />
    //       <Route path="/course-progress" element={<CourseProgress />} />
    //       <Route path="/approvals" element={<Approvals />} />
    //       <Route path="/attendances" element={<Attendance />} />
    //       <Route path="/exam" element={<ExamManagement />} />
    //       <Route path="/assessments" element={<AssessmentsManagement />} />
    //       <Route path="/resource" element={<ResourceAllocation />} />
    //       <Route path='/student-enrollment' element={<StudentEnrollment />} />
    //       <Route path="/hod/faculty-coordination" element={<FacultyCoordination />} />
    //       <Route path='/hod/student-performance' element={<StudentPerformance />} />
    //       <Route path='/hod/approval-workflow' element={<ApprovalWorkflow />} />
    //       <Route path='/hod/announcements' element={<Announcements />} />
    //       <Route path='/hod/leave' element={<LeaveManagement />} />
    //       <Route path='/hod/profile' element={<ProfilePage />} />
    //       {/* Fallback Route */}
    //       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    //     </Routes>
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row h-screen">
      {/* <Navbar /> */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/approval"
            element={
              <ProtectedRoute>
                <ApprovalWorkflow />
              </ProtectedRoute>
            }/>
           <Route
            path="/courses-approval"
            element={
              <ProtectedRoute>
                <FacultyCourseApproal />
              </ProtectedRoute>
            }
          />
           <Route
            path="/coordinators-approval"
            element={
              <ProtectedRoute>
                <CoordinatorDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/mentors-approval"
            element={
              <ProtectedRoute>
                <MentorApproval />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hod-approval"
            element={
              <ProtectedRoute>
                <HodApprobsl />
              </ProtectedRoute>
            }
          />
        </Routes>
        

        </div>
    </div>
  );
}

export default App;
