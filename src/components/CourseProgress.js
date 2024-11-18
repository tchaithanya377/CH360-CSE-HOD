// src/pages/CourseProgress.js
import React from 'react';

const CourseProgress = () => {
  const courses = [
    { id: 1, name: 'Math 101', progress: 75 },
    { id: 2, name: 'Science 102', progress: 85 },
    { id: 3, name: 'History 201', progress: 65 },
    { id: 4, name: 'Art 301', progress: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Course Progress</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{course.name}</h2>
            <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
              <div
                className="bg-blue-600 h-6 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600">{course.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
