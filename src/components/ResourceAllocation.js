import React, { useState } from 'react';

const ResourceAllocation = () => {
    const [resources, setResources] = useState([
        {
            id: 1,
            resourceType: 'Classroom',
            resourceName: 'Room 101',
            allocatedTo: 'First Year - Section A',
            timeSlot: '9:00 AM - 11:00 AM',
            day: 'Monday',
        },
        {
            id: 2,
            resourceType: 'Lab',
            resourceName: 'Computer Lab 1',
            allocatedTo: 'Second Year - Section B',
            timeSlot: '2:00 PM - 4:00 PM',
            day: 'Wednesday',
        },
    ]);

    const [formData, setFormData] = useState({
        id: null,
        resourceType: '',
        resourceName: '',
        allocatedTo: '',
        timeSlot: '',
        day: '',
    });

    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddResource = () => {
        if (
            !formData.resourceType ||
            !formData.resourceName ||
            !formData.allocatedTo ||
            !formData.timeSlot ||
            !formData.day
        ) {
            alert('Please fill out all fields!');
            return;
        }
        setResources((prevResources) => [
            ...prevResources,
            { id: resources.length + 1, ...formData },
        ]);
        setFormData({
            id: null,
            resourceType: '',
            resourceName: '',
            allocatedTo: '',
            timeSlot: '',
            day: '',
        });
    };

    const handleEditResource = (resource) => {
        setFormData(resource);
        setEditing(true);
    };

    const handleSaveEdit = () => {
        setResources((prevResources) =>
            prevResources.map((resource) =>
                resource.id === formData.id ? { ...formData } : resource
            )
        );
        setFormData({
            id: null,
            resourceType: '',
            resourceName: '',
            allocatedTo: '',
            timeSlot: '',
            day: '',
        });
        setEditing(false);
    };

    const handleDeleteResource = (id) => {
        if (window.confirm('Are you sure you want to delete this allocation?')) {
            setResources((prevResources) =>
                prevResources.filter((resource) => resource.id !== id)
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Resource Allocation Management</h1>

            {/* Form for Adding/Editing Allocations */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    {editing ? 'Edit Allocation' : 'Allocate Resource'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <select
                        name="resourceType"
                        value={formData.resourceType}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Resource Type</option>
                        <option value="Classroom">Classroom</option>
                        <option value="Lab">Lab</option>
                    </select>
                    <input
                        type="text"
                        name="resourceName"
                        placeholder="Resource Name (e.g., Room 101)"
                        value={formData.resourceName}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="allocatedTo"
                        placeholder="Allocated To (e.g., First Year - Section A)"
                        value={formData.allocatedTo}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="timeSlot"
                        placeholder="Time Slot (e.g., 9:00 AM - 11:00 AM)"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <select
                        name="day"
                        value={formData.day}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                </div>
                <button
                    onClick={editing ? handleSaveEdit : handleAddResource}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {editing ? 'Save Changes' : 'Allocate Resource'}
                </button>
                {editing && (
                    <button
                        onClick={() => {
                            setFormData({
                                id: null,
                                resourceType: '',
                                resourceName: '',
                                allocatedTo: '',
                                timeSlot: '',
                                day: '',
                            });
                            setEditing(false);
                        }}
                        className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Resource Allocation List */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Current Allocations</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Resource Type</th>
                        <th className="border border-gray-300 p-2">Resource Name</th>
                        <th className="border border-gray-300 p-2">Allocated To</th>
                        <th className="border border-gray-300 p-2">Time Slot</th>
                        <th className="border border-gray-300 p-2">Day</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{resource.id}</td>
                            <td className="border border-gray-300 p-2">{resource.resourceType}</td>
                            <td className="border border-gray-300 p-2">{resource.resourceName}</td>
                            <td className="border border-gray-300 p-2">{resource.allocatedTo}</td>
                            <td className="border border-gray-300 p-2">{resource.timeSlot}</td>
                            <td className="border border-gray-300 p-2">{resource.day}</td>
                            <td className="border border-gray-300 p-2 flex gap-2">
                                <button
                                    onClick={() => handleEditResource(resource)}
                                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteResource(resource.id)}
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

export default ResourceAllocation;
