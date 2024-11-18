import React, { useState } from 'react';

const ExamManagement = () => {
    const [exams, setExams] = useState([
        {
            id: 1,
            name: 'Midterm Exam',
            date: '2024-11-20',
            time: '10:00 AM',
            duration: '2 hours',
            subject: 'Mathematics',
            year: 'First Year',
            semester: 'First Semester',
            section: 'A',
        },
        {
            id: 2,
            name: 'Final Exam',
            date: '2024-12-15',
            time: '2:00 PM',
            duration: '3 hours',
            subject: 'Physics',
            year: 'Second Year',
            semester: 'Third Semester',
            section: 'B',
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        date: '',
        time: '',
        duration: '',
        subject: '',
        year: '',
        semester: '',
        section: '',
    });

    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddExam = () => {
        if (
            !formData.name ||
            !formData.date ||
            !formData.time ||
            !formData.duration ||
            !formData.subject ||
            !formData.year ||
            !formData.semester ||
            !formData.section
        ) {
            alert('Please fill out all fields!');
            return;
        }
        setExams((prevExams) => [
            ...prevExams,
            { id: exams.length + 1, ...formData },
        ]);
        setFormData({
            id: null,
            name: '',
            date: '',
            time: '',
            duration: '',
            subject: '',
            year: '',
            semester: '',
            section: '',
        });
    };

    const handleEditExam = (exam) => {
        setFormData(exam);
        setEditing(true);
    };

    const handleSaveEdit = () => {
        setExams((prevExams) =>
            prevExams.map((exam) =>
                exam.id === formData.id ? { ...formData } : exam
            )
        );
        setFormData({
            id: null,
            name: '',
            date: '',
            time: '',
            duration: '',
            subject: '',
            year: '',
            semester: '',
            section: '',
        });
        setEditing(false);
    };

    const handleDeleteExam = (id) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            setExams((prevExams) => prevExams.filter((exam) => exam.id !== id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Exam Management</h1>

            {/* Form for Adding/Editing Exams */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Exam' : 'Create New Exam'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Exam Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration (e.g., 2 hours)"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
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
                        <option value="Third Semester">Third Semester</option>
                        <option value="Fourth Semester">Fourth Semester</option>
                    </select>
                    <input
                        type="text"
                        name="section"
                        placeholder="Section (e.g., A)"
                        value={formData.section}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button
                    onClick={editing ? handleSaveEdit : handleAddExam}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {editing ? 'Save Changes' : 'Add Exam'}
                </button>
                {editing && (
                    <button
                        onClick={() => {
                            setFormData({
                                id: null,
                                name: '',
                                date: '',
                                time: '',
                                duration: '',
                                subject: '',
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

            {/* Exam List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Department Exams</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Time</th>
                        <th className="border border-gray-300 p-2">Duration</th>
                        <th className="border border-gray-300 p-2">Subject</th>
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Semester</th>
                        <th className="border border-gray-300 p-2">Section</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{exam.id}</td>
                            <td className="border border-gray-300 p-2">{exam.name}</td>
                            <td className="border border-gray-300 p-2">{exam.date}</td>
                            <td className="border border-gray-300 p-2">{exam.time}</td>
                            <td className="border border-gray-300 p-2">{exam.duration}</td>
                            <td className="border border-gray-300 p-2">{exam.subject}</td>
                            <td className="border border-gray-300 p-2">{exam.year}</td>
                            <td className="border border-gray-300 p-2">{exam.semester}</td>
                            <td className="border border-gray-300 p-2">{exam.section}</td>
                            <td className="border border-gray-300 p-2 flex gap-2">
                                <button
                                    onClick={() => handleEditExam(exam)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteExam(exam.id)}
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

export default ExamManagement;
