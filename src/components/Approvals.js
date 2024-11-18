import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';

const Approvals = () => {
    const [requests, setRequests] = useState([
        { id: 'R001', name: 'Alice Johnson', type: 'Leave Request', status: 'Pending', details: 'Leave for personal reasons' },
        { id: 'R002', name: 'Bob Smith', type: 'Course Change', status: 'Approved', details: 'Switching from CSE101 to CSE102' },
        { id: 'R003', name: 'Charlie Brown', type: 'Leave Request', status: 'Rejected', details: 'Leave for travel' },
        // Add more initial requests if needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleApprove = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Approved' } : req
            )
        );
    };

    const handleReject = (id) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: 'Rejected' } : req
            )
        );
    };

    const filteredRequests = requests.filter((request) => {
        return (
            (!filterType || request.type === filterType) &&
            (!filterStatus || request.status === filterStatus) &&
            (request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approvals</h1>
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-lg mr-4"
                />
                <select
                    value={filterType}
                    onChange={handleFilterTypeChange}
                    className="p-2 border border-gray-300 rounded-lg mr-4"
                >
                    <option value="">All Types</option>
                    <option value="Leave Request">Leave Request</option>
                    <option value="Course Change">Course Change</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={handleFilterStatusChange}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Request List</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Request ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Type</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{request.id}</td>
                            <td className="border border-gray-300 p-2">{request.name}</td>
                            <td className="border border-gray-300 p-2">{request.type}</td>
                            <td className={`border border-gray-300 p-2 ${request.status === 'Pending' ? 'text-yellow-500' : request.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                                {request.status}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {request.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(request.id)}
                                            className="text-green-500 hover:text-green-700 mr-4"
                                        >
                                            <FontAwesomeIcon icon={faCheck} /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(request.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FontAwesomeIcon icon={faTimes} /> Reject
                                        </button>
                                    </>
                                )}
                                <button className="text-blue-500 hover:text-blue-700 ml-4">
                                    <FontAwesomeIcon icon={faEye} /> View Details
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

export default Approvals;
