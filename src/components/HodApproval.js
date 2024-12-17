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
          const mentorName = mentors.length > 0 ? mentors[0]?.name || "Unknown" : "N/A";

          const hod = student.hod || { name: "N/A", status: "Pending" };

          const coordinators = await Promise.all(
            (student.coordinators || []).map(async (c) => ({
              ...c,
              name: await fetchNameById("faculty", c.id),
            }))
          );

          const coursesFaculty = await Promise.all(
            (student.courses_faculty || []).map(async (cf) => ({
              ...cf,
              courseName: await fetchNameById(`courses/${year}/${section}/${semester}/courseDetails`, cf.courseId),
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

  const updateHODStatus = async (studentId, newStatus) => {
    try {
      const noDuesPath = `noDues/${year}/${section}/${semester}`;
      const noDuesDocRef = doc(db, noDuesPath);
      const docSnap = await getDoc(noDuesDocRef);

      if (docSnap.exists()) {
        const noDuesData = docSnap.data();
        const updatedStudents = noDuesData.students.map((student) =>
          student.id === studentId
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

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-2 py-2">Roll No</th>
              <th className="border px-2 py-2">Name</th>
              <th className="border px-2 py-2">Courses Faculty</th>
              <th className="border px-2 py-2">Coordinators</th>
              <th className="border px-2 py-2">Mentor</th>
              <th className="border px-2 py-2">HOD Status</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
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
                <td className="border px-2 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => updateHODStatus(student.id, "Accepted")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => updateHODStatus(student.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HODApproval;
