import React, { useState } from 'react';

const AssessmentsManagement = () => {
    const [assessments, setAssessments] = useState([
        {
            id: 1,
            title: 'Assignment 1',
            description: 'Complete the questions on Chapter 2.',
            date: '2024-11-20',
            subject: 'Mathematics',
            year: 'First Year',
            semester: 'First Semester',
            section: 'A',
        },
        {
            id: 2,
            title: 'Project Proposal',
            description: 'Submit a detailed project proposal.',
            date: '2024-12-01',
            subject: 'Computer Science',
            year: 'Second Year',
            semester: 'Third Semester',
            section: 'B',
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        title: '',
        description: '',
        date: '',
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

    const handleAddAssessment = () => {
        if (
            !formData.title ||
            !formData.description ||
            !formData.date ||
            !formData.subject ||
            !formData.year ||
            !formData.semester ||
            !formData.section
        ) {
            alert('Please fill out all fields!');
            return;
        }
        setAssessments((prevAssessments) => [
            ...prevAssessments,
            { id: assessments.length + 1, ...formData },
        ]);
        setFormData({
            id: null,
            title: '',
            description: '',
            date: '',
            subject: '',
            year: '',
            semester: '',
            section: '',
        });
    };

    const handleEditAssessment = (assessment) => {
        setFormData(assessment);
        setEditing(true);
    };

    const handleSaveEdit = () => {
        setAssessments((prevAssessments) =>
            prevAssessments.map((assessment) =>
                assessment.id === formData.id ? { ...formData } : assessment
            )
        );
        setFormData({
            id: null,
            title: '',
            description: '',
            date: '',
            subject: '',
            year: '',
            semester: '',
            section: '',
        });
        setEditing(false);
    };

    const handleDeleteAssessment = (id) => {
        if (window.confirm('Are you sure you want to delete this assessment?')) {
            setAssessments((prevAssessments) =>
                prevAssessments.filter((assessment) => assessment.id !== id)
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Assessments Management</h1>

            {/* Form for Adding/Editing Assessments */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    {editing ? 'Edit Assessment' : 'Create New Assessment'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Assessment Title"
                        value={formData.title}
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
                    <textarea
                        name="description"
                        placeholder="Assessment Description"
                        value={formData.description}
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
                    onClick={editing ? handleSaveEdit : handleAddAssessment}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {editing ? 'Save Changes' : 'Add Assessment'}
                </button>
                {editing && (
                    <button
                        onClick={() => {
                            setFormData({
                                id: null,
                                title: '',
                                description: '',
                                date: '',
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

            {/* Assessment List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Department Assessments</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Title</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Subject</th>
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Semester</th>
                        <th className="border border-gray-300 p-2">Section</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assessments.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{assessment.id}</td>
                            <td className="border border-gray-300 p-2">{assessment.title}</td>
                            <td className="border border-gray-300 p-2">{assessment.date}</td>
                            <td className="border border-gray-300 p-2">{assessment.description}</td>
                            <td className="border border-gray-300 p-2">{assessment.subject}</td>
                            <td className="border border-gray-300 p-2">{assessment.year}</td>
                            <td className="border border-gray-300 p-2">{assessment.semester}</td>
                            <td className="border border-gray-300 p-2">{assessment.section}</td>
                            <td className="border border-gray-300 p-2 flex gap-2">
                                <button
                                    onClick={() => handleEditAssessment(assessment)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteAssessment(assessment.id)}
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

export default AssessmentsManagement;
