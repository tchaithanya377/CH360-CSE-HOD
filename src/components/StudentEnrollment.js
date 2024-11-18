import React, { useState } from 'react';

const StudentEnrollment = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: 'John Doe',
            rollNumber: '2024001',
            year: 'First Year',
            semester: 'First Semester',
            section: 'A',
        },
        {
            id: 2,
            name: 'Jane Smith',
            rollNumber: '2024002',
            year: 'First Year',
            semester: 'First Semester',
            section: 'B',
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        rollNumber: '',
        year: '',
        semester: '',
        section: '',
    });

    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddStudent = () => {
        if (
            !formData.name ||
            !formData.rollNumber ||
            !formData.year ||
            !formData.semester ||
            !formData.section
        ) {
            alert('Please fill out all fields!');
            return;
        }
        setStudents((prevStudents) => [
            ...prevStudents,
            { id: students.length + 1, ...formData },
        ]);
        setFormData({
            id: null,
            name: '',
            rollNumber: '',
            year: '',
            semester: '',
            section: '',
        });
    };

    const handleEditStudent = (student) => {
        setFormData(student);
        setEditing(true);
    };

    const handleSaveEdit = () => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === formData.id ? { ...formData } : student
            )
        );
        setFormData({
            id: null,
            name: '',
            rollNumber: '',
            year: '',
            semester: '',
            section: '',
        });
        setEditing(false);
    };

    const handleDeleteStudent = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== id)
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Student Enrollment</h1>

            {/* Form for Adding/Editing Students */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    {editing ? 'Edit Student' : 'Add Student'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="rollNumber"
                        placeholder="Roll Number"
                        value={formData.rollNumber}
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
                </div>
                <button
                    onClick={editing ? handleSaveEdit : handleAddStudent}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {editing ? 'Save Changes' : 'Add Student'}
                </button>
                {editing && (
                    <button
                        onClick={() => {
                            setFormData({
                                id: null,
                                name: '',
                                rollNumber: '',
                                year: '',
                                semester: '',
                                section: '',
                            });
                            setEditing(false);
                        }}
                        className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Students List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Students List</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Roll Number</th>
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Semester</th>
                        <th className="border border-gray-300 p-2">Section</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{student.id}</td>
                            <td className="border border-gray-300 p-2">{student.name}</td>
                            <td className="border border-gray-300 p-2">{student.rollNumber}</td>
                            <td className="border border-gray-300 p-2">{student.year}</td>
                            <td className="border border-gray-300 p-2">{student.semester}</td>
                            <td className="border border-gray-300 p-2">{student.section}</td>
                            <td className="border border-gray-300 p-2 flex gap-2">
                                <button
                                    onClick={() => handleEditStudent(student)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteStudent(student.id)}
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

export default StudentEnrollment;
