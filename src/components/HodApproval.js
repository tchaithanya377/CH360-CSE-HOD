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
              const courseDocRef = doc(db, `/courses/III/A/sem1/courseDetails/${courseId}`);
              const docSnap = await getDoc(courseDocRef);
              return docSnap.exists() ? docSnap.data().courseName || "Unknown" : "Unknown";
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
  const filteredStudents = students.filter((student) => {
    const isStatusMatch = statusFilter ? student.hod.status === statusFilter : true;
    const isSearchMatch =
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery);
    return isStatusMatch && isSearchMatch;
  });


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">HOD Approval</h1>


      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select value={year} onChange={(e) => setYear(e.target.value)} className="border p-2 rounded">
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
        <select value={section} onChange={(e) => setSection(e.target.value)} className="border p-2 rounded">
          <option value="">Select Section</option>
          {sections.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
        <select value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2 rounded">
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>


      {/* Status Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>


      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or roll number"
          className="border p-2 rounded w-full"
        />
      </div>


      {/* Select All */}
      <div className="mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <label>Select All</label>
      </div>


      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table-auto w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-2 py-2">Select</th>
                <th className="border px-2 py-2">Roll No</th>
                <th className="border px-2 py-2">Name</th>
                <th className="border px-2 py-2">Courses Faculty</th>
                <th className="border px-2 py-2">Coordinators</th>
                <th className="border px-2 py-2">Mentor</th>
                <th className="border px-2 py-2">HOD Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentSelect(student.id)}
                    />
                  </td>
                  <td className="border px-2 py-2">{student.rollNo}</td>
                  <td className="border px-2 py-2">{student.studentName}</td>
                  <td className="border px-2 py-2">
                    {student.coursesFaculty.map((cf, i) => (
                      <div key={i} className="text-sm">
                        {cf.courseName} - {cf.facultyName} ({cf.status})
                      </div>
                    ))}
                  </td>
                  <td className="border px-2 py-2">
                    {student.coordinators.map((c, i) => (
                      <div key={i} className="text-sm">
                        {c.name} - {c.status}
                      </div>
                    ))}
                  </td>
                  <td className="border px-2 py-2">{student.mentorName}</td>
                  <td className="border px-2 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        student.hod.status === "Accepted"
                          ? "bg-green-500"
                          : student.hod.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {student.hod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* Accept/Reject Actions */}
          {selectedStudents.length > 0 && (
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => updateHODStatus(selectedStudents, "Accepted")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => updateHODStatus(selectedStudents, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};


export default HODApproval;