import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

const localizer = momentLocalizer(moment);

const LeaveManagement = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Faculty Leave: Dr. Smith",
            start: new Date(2024, 10, 15), // November 15, 2024
            end: new Date(2024, 10, 15),
            type: "faculty",
            description: "Personal Leave",
            color: "#FF5733",
        },
        {
            id: 2,
            title: "Student Leave: John Doe",
            start: new Date(2024, 10, 16), // November 16, 2024
            end: new Date(2024, 10, 16),
            type: "student",
            description: "Medical Leave",
            color: "#33B5FF",
        },
    ]);

    const [modalData, setModalData] = useState(null);

    const handleSelectEvent = (event) => {
        setModalData(event);
    };

    const closeModal = () => {
        setModalData(null);
    };

    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: "12px",
                border: "none",
                color: "white",
                fontSize: "0.85rem",
                padding: "5px",
                cursor: "pointer",
            },
        };
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
                Leave Management
            </h1>

            {/* Calendar */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                />
            </div>

            {/* Modal */}
            {modalData && (
                <Modal
                    isOpen={!!modalData}
                    onRequestClose={closeModal}
                    contentLabel="Event Details"
                    className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto animate-fade-in"
                    overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">
                            {modalData.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                            <strong>Date:</strong>{" "}
                            {moment(modalData.start).format("MMMM Do, YYYY")}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            <strong>Description:</strong> {modalData.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            <strong>Type:</strong>{" "}
                            {modalData.type === "faculty" ? "Faculty" : "Student"}
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default LeaveManagement;
