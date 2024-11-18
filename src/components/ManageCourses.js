import React, { useState } from 'react';

const ManageCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      year: 'First Year',
      semester: 'First Semester',
      section: 'A',
      faculty: 'Dr. John Doe',
    },
    {
      id: 2,
      courseCode: 'CS102',
      courseName: 'Data Structures',
      year: 'Second Year',
      semester: 'First Semester',
      section: 'B',
      faculty: 'Prof. Jane Smith',
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    courseCode: '',
    courseName: '',
    year: '',
    semester: '',
    section: '',
    faculty: '',
  });

  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCourse = () => {
    if (
        !formData.courseCode ||
        !formData.courseName ||
        !formData.year ||
        !formData.semester ||
        !formData.section ||
        !formData.faculty
    ) {
      alert('Please fill out all fields!');
      return;
    }
    setCourses((prevCourses) => [
      ...prevCourses,
      { id: courses.length + 1, ...formData },
    ]);
    setFormData({
      id: null,
      courseCode: '',
      courseName: '',
      year: '',
      semester: '',
      section: '',
      faculty: '',
    });
  };

  const handleEditCourse = (course) => {
    setFormData(course);
    setEditing(true);
  };

  const handleSaveEdit = () => {
    setCourses((prevCourses) =>
        prevCourses.map((course) =>
            course.id === formData.id ? { ...formData } : course
        )
    );
    setFormData({
      id: null,
      courseCode: '',
      courseName: '',
      year: '',
      semester: '',
      section: '',
      faculty: '',
    });
    setEditing(false);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== id)
      );
    }
  };

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

        {/* Form for Adding/Editing Courses */}
        <div className="bg-white shadow rounded-lg p-5 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editing ? 'Edit Course' : 'Add Course'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
                type="text"
                name="courseCode"
                placeholder="Course Code (e.g., CS101)"
                value={formData.courseCode}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            />
            <input
                type="text"
                name="courseName"
                placeholder="Course Name (e.g., Data Structures)"
                value={formData.courseName}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            />
            <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
            <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Semester</option>
              <option value="First Semester">First Semester</option>
              <option value="Second Semester">Second Semester</option>
            </select>
            <input
                type="text"
                name="section"
                placeholder="Section (e.g., A, B)"
                value={formData.section}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            />
            <input
                type="text"
                name="faculty"
                placeholder="Faculty (e.g., Dr. John Doe)"
                value={formData.faculty}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
              onClick={editing ? handleSaveEdit : handleAddCourse}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            {editing ? 'Save Changes' : 'Add Course'}
          </button>
          {editing && (
              <button
                  onClick={() => {
                    setFormData({
                      id: null,
                      courseCode: '',
                      courseName: '',
                      year: '',
                      semester: '',
                      section: '',
                      faculty: '',
                    });
                    setEditing(false);
                  }}
                  className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
          )}
        </div>

        {/* Courses List */}
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-2xl font-bold mb-4">Courses List</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Course Code</th>
              <th className="border border-gray-300 p-2">Course Name</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Semester</th>
              <th className="border border-gray-300 p-2">Section</th>
              <th className="border border-gray-300 p-2">Faculty</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
            </thead>
            <tbody>
            {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{course.id}</td>
                  <td className="border border-gray-300 p-2">{course.courseCode}</td>
                  <td className="border border-gray-300 p-2">{course.courseName}</td>
                  <td className="border border-gray-300 p-2">{course.year}</td>
                  <td className="border border-gray-300 p-2">{course.semester}</td>
                  <td className="border border-gray-300 p-2">{course.section}</td>
                  <td className="border border-gray-300 p-2">{course.faculty}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                        onClick={() => handleEditCourse(course)}
                        className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ManageCourses;
