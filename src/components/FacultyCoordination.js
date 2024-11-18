import React, { useState } from 'react';

const FacultyCoordination = () => {
    const [facultyList, setFacultyList] = useState([
        {
            id: 1,
            name: 'Dr. John Smith',
            email: 'john.smith@university.com',
            department: 'Computer Science',
            courses: ['Data Structures', 'Algorithms'],
        },
        {
            id: 2,
            name: 'Dr. Emily Johnson',
            email: 'emily.johnson@university.com',
            department: 'Mathematics',
            courses: ['Calculus', 'Linear Algebra'],
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        department: '',
        courses: '',
    });

    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddFaculty = () => {
        if (!formData.name || !formData.email || !formData.department || !formData.courses) {
            alert('Please fill out all fields!');
            return;
        }
        const newFaculty = {
            id: facultyList.length + 1,
            ...formData,
            courses: formData.courses.split(',').map((course) => course.trim()),
        };
        setFacultyList([...facultyList, newFaculty]);
        setFormData({
            id: null,
            name: '',
            email: '',
            department: '',
            courses: '',
        });
    };

    const handleEditFaculty = (faculty) => {
        setFormData({
            ...faculty,
            courses: faculty.courses.join(', '),
        });
        setEditing(true);
    };

    const handleSaveEdit = () => {
        setFacultyList((prevList) =>
            prevList.map((faculty) =>
                faculty.id === formData.id
                    ? {
                        ...formData,
                        courses: formData.courses.split(',').map((course) => course.trim()),
                    }
                    : faculty
            )
        );
        setFormData({
            id: null,
            name: '',
            email: '',
            department: '',
            courses: '',
        });
        setEditing(false);
    };

    const handleDeleteFaculty = (id) => {
        if (window.confirm('Are you sure you want to delete this faculty member?')) {
            setFacultyList((prevList) => prevList.filter((faculty) => faculty.id !== id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Faculty Coordination</h1>

            {/* Add/Edit Faculty Form */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    {editing ? 'Edit Faculty' : 'Add Faculty'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Faculty Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Faculty Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="courses"
                        placeholder="Courses (comma-separated)"
                        value={formData.courses}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button
                    onClick={editing ? handleSaveEdit : handleAddFaculty}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {editing ? 'Save Changes' : 'Add Faculty'}
                </button>
                {editing && (
                    <button
                        onClick={() => {
                            setFormData({
                                id: null,
                                name: '',
                                email: '',
                                department: '',
                                courses: '',
                            });
                            setEditing(false);
                        }}
                        className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Faculty List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Faculty List</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Courses</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {facultyList.map((faculty) => (
                        <tr key={faculty.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{faculty.id}</td>
                            <td className="border border-gray-300 p-2">{faculty.name}</td>
                            <td className="border border-gray-300 p-2">{faculty.email}</td>
                            <td className="border border-gray-300 p-2">{faculty.department}</td>
                            <td className="border border-gray-300 p-2">
                                {faculty.courses.join(', ')}
                            </td>
                            <td className="border border-gray-300 p-2 flex gap-2">
                                <button
                                    onClick={() => handleEditFaculty(faculty)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteFaculty(faculty.id)}
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

export default FacultyCoordination;
