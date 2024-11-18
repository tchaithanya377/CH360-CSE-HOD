import React, { useState } from 'react';

const ApprovalWorkflow = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            type: 'Leave Request',
            requestedBy: 'Alice Johnson',
            details: 'Leave from 15th Nov to 20th Nov due to personal reasons.',
            status: 'Pending',
        },
        {
            id: 2,
            type: 'Project Approval',
            requestedBy: 'Bob Smith',
            details: 'Final Year Project Proposal: AI-Based Chat Application',
            status: 'Pending',
        },
    ]);

    const [noDuesRequests, setNoDuesRequests] = useState([
        {
            id: 1,
            studentName: 'Alice Johnson',
            rollNumber: 'CSE21A001',
            department: 'CSE',
            year: '4th Year',
            status: 'Pending',
        },
        {
            id: 2,
            studentName: 'Bob Smith',
            rollNumber: 'CSE21A002',
            department: 'CSE',
            year: '4th Year',
            status: 'Approved',
        },
    ]);

    const handleApproval = (id, type) => {
        if (type === 'request') {
            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
            );
        } else if (type === 'noDues') {
            setNoDuesRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
            );
        }
    };

    const handleRejection = (id, type) => {
        if (type === 'request') {
            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
            );
        } else if (type === 'noDues') {
            setNoDuesRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
            );
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Approval Workflow</h1>

            {/* Approval Requests Section */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Request Type</th>
                        <th className="border border-gray-300 p-2">Requested By</th>
                        <th className="border border-gray-300 p-2">Details</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{req.type}</td>
                            <td className="border border-gray-300 p-2">{req.requestedBy}</td>
                            <td className="border border-gray-300 p-2">{req.details}</td>
                            <td className="border border-gray-300 p-2">{req.status}</td>
                            <td className="border border-gray-300 p-2">
                                {req.status === 'Pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleApproval(req.id, 'request')}
                                            className="bg-green-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejection(req.id, 'request')}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* No Dues Requests Section */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">No Dues Clearance</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Student Name</th>
                        <th className="border border-gray-300 p-2">Roll Number</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {noDuesRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{req.studentName}</td>
                            <td className="border border-gray-300 p-2">{req.rollNumber}</td>
                            <td className="border border-gray-300 p-2">{req.department}</td>
                            <td className="border border-gray-300 p-2">{req.year}</td>
                            <td className="border border-gray-300 p-2">{req.status}</td>
                            <td className="border border-gray-300 p-2">
                                {req.status === 'Pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleApproval(req.id, 'noDues')}
                                            className="bg-green-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejection(req.id, 'noDues')}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovalWorkflow;
