import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore configuration
import { useAuth } from "../auth"; // Authentication hook for logged-in HOD


const HODApproval = () => {
  const { user } = useAuth(); // Logged-in HOD
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Status filter (Pending, Accepted, Rejected)


  const loggedInHodId = user?.uid;


  const years = ["I", "II", "III", "IV"];
  const sections = ["A", "B", "C", "D", "E", "F"];
  const semesters = ["sem1", "sem2"];


  const fetchNameById = async (collectionName, id) => {
    if (!id) return "Unknown";
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().name || "Unknown" : "Unknown";
  };


  const fetchData = async () => {
    if (!year || !section || !semester) return;


    setLoading(true);
    try {
      const noDuesPath = `noDues/${year}/${section}/${semester}`;
      const noDuesDocRef = doc(db, noDuesPath);
      const docSnap = await getDoc(noDuesDocRef);


      if (!docSnap.exists()) {
        console.error("No noDues document found.");
        setStudents([]);
        return;
      }


      const noDuesData = docSnap.data();
      const studentList = await Promise.all(
        noDuesData.students.map(async (student) => {
          const studentRef = doc(db, `students/${year}/${section}`, student.id);
          const studentSnap = await getDoc(studentRef);
          const studentData = studentSnap.exists() ? studentSnap.data() : {};


          const mentors = student.mentors || [];
          const mentorName = mentors.length > 0 ? await fetchNameById("faculty", mentors[0]?.id) : "N/A"; // Fetch mentor's name from faculty collection


          const hod = student.hod || { name: "N/A", status: "Pending" };


          const coordinators = await Promise.all(
            (student.coordinators || []).map(async (c) => ({
              ...c,
              name: await fetchNameById("faculty", c.id),
            }))
          );


          const fetchCourseNameById = async (courseId) => {
            if (!courseId) return "Unknown";
            try {
              // First try to fetch from the specific year/section/semester path
              const courseDocRef = doc(db, "courses", year, section, semester, "courseDetails", courseId);
              let docSnap = await getDoc(courseDocRef);

              // If not found in specific path, try the general courses collection
              if (!docSnap.exists()) {
                const generalCourseRef = doc(db, "courses", courseId);
                docSnap = await getDoc(generalCourseRef);
              }

              if (docSnap.exists()) {
                return docSnap.data().courseName || "Unknown";
              } else {
                console.error("Course not found for ID:", courseId);
                console.log("Attempted paths:", 
                  `courses/${year}/${section}/${semester}/courseDetails/${courseId}`,
                  `courses/${courseId}`
                );
                return "Unknown";
              }
            } catch (error) {
              console.error("Error fetching course name:", error);
              return "Unknown";
            }
          };


          const coursesFaculty = await Promise.all(
            (student.courses_faculty || []).map(async (cf) => ({
              ...cf,
              courseName: await fetchCourseNameById(cf.courseId),
              facultyName: await fetchNameById("faculty", cf.facultyId),
            }))
          );


          return {
            ...student,
            rollNo: studentData.rollNo || "N/A",
            studentName: studentData.name || "N/A",
            mentorName,
            hod,
            coordinators,
            coursesFaculty,
          };
        })
      );


      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const updateHODStatus = async (studentIds, newStatus) => {
    try {
      const noDuesPath = `noDues/${year}/${section}/${semester}`;
      const noDuesDocRef = doc(db, noDuesPath);
      const docSnap = await getDoc(noDuesDocRef);


      if (docSnap.exists()) {
        const noDuesData = docSnap.data();
        const updatedStudents = noDuesData.students.map((student) =>
          studentIds.includes(student.id)
            ? { ...student, hod: { ...student.hod, status: newStatus, id: loggedInHodId } }
            : student
        );


        await updateDoc(noDuesDocRef, { students: updatedStudents });
        fetchData();
      }
    } catch (error) {
      console.error("Error updating HOD status:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [year, section, semester]);


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedStudents(students.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };


  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };


  // Filter students based on status and search query
  const filteredStudents = students
    .filter((student) => {
      const isStatusMatch = statusFilter ? student.hod.status === statusFilter : true;
      const isSearchMatch =
        student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.includes(searchQuery);
      return isStatusMatch && isSearchMatch;
    })
    .sort((a, b) => {
      // Extract numbers from roll numbers for proper sorting
      const numA = parseInt(a.rollNo.replace(/\D/g, ''));
      const numB = parseInt(b.rollNo.replace(/\D/g, ''));
      return numA - numB;
    });


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          HOD Approval Dashboard
        </h1>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Year</label>
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Year</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Section</label>
              <select 
                value={section} 
                onChange={(e) => setSection(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Section</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Semester</label>
              <select 
                value={semester} 
                onChange={(e) => setSemester(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Search Students</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or roll number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span>Select All</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses & Faculty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinators</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {student.coursesFaculty.map((cf, i) => (
                          <div key={i} className="mb-1 p-2 bg-gray-50 rounded">
                            <span className="font-medium">{cf.courseName}</span>
                            <br />
                            <span className="text-gray-600">{cf.facultyName}</span>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              cf.status === "Accepted" ? "bg-green-100 text-green-800" :
                              cf.status === "Rejected" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {cf.status}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {student.coordinators.map((c, i) => (
                          <div key={i} className="mb-1 p-2 bg-gray-50 rounded">
                            <span className="font-medium">{c.name}</span>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              c.status === "Accepted" ? "bg-green-100 text-green-800" :
                              c.status === "Rejected" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {c.status}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.mentorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          student.hod.status === "Accepted" ? "bg-green-100 text-green-800" :
                          student.hod.status === "Rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {student.hod.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {selectedStudents.length > 0 && (
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => updateHODStatus(selectedStudents, "Accepted")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Approve Selected
            </button>
            <button
              onClick={() => updateHODStatus(selectedStudents, "Rejected")}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Reject Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default HODApproval;
