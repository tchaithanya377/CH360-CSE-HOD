// src/pages/StudentProfilePage.js
import React from 'react';

const StudentProfilePage = () => {
  const userInfo = {
    personalDetails: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
    },
    familyDetails: {
      fatherName: 'John Doe',
      motherName: 'Jane Smith',
      siblings: '2',
    },
    currentCourses: [
      { id: 1, name: 'Math 101', progress: 75 },
      { id: 2, name: 'Science 102', progress: 85 },
    ],
    professionalExperience: [
      {
        id: 1,
        jobTitle: 'Software Engineer',
        company: 'Tech Company',
        duration: '2020-2023',
        description: 'Developed web applications using React and Node.js.',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js'],
    projects: [
      {
        id: 1,
        title: 'Project One',
        description: 'Developed a full-stack web application.',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Computer Science',
        university: 'XYZ University',
        year: '2024',
      },
    ],
    mentorDetails: {
      mentorName: 'Dr. John Smith',
      email: 'john.smith@xyzuniversity.com',
      phone: '987-654-3210',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
        <p className="text-gray-600"><strong>Name:</strong> {userInfo.personalDetails.name}</p>
        <p className="text-gray-600"><strong>Email:</strong> {userInfo.personalDetails.email}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {userInfo.personalDetails.phone}</p>
        <p className="text-gray-600"><strong>Address:</strong> {userInfo.personalDetails.address}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Family Details</h2>
        <p className="text-gray-600"><strong>Father's Name:</strong> {userInfo.familyDetails.fatherName}</p>
        <p className="text-gray-600"><strong>Mother's Name:</strong> {userInfo.familyDetails.motherName}</p>
        <p className="text-gray-600"><strong>Siblings:</strong> {userInfo.familyDetails.siblings}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Current Courses</h2>
        {userInfo.currentCourses.map(course => (
          <div key={course.id} className="mb-4">
            <h3 className="text-xl font-bold">{course.name}</h3>
            <p className="text-gray-600">Progress: {course.progress}%</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
        {userInfo.professionalExperience.map(experience => (
          <div key={experience.id} className="mb-4">
            <h3 className="text-xl font-bold">{experience.jobTitle}</h3>
            <p className="text-gray-600"><strong>Company:</strong> {experience.company}</p>
            <p className="text-gray-600"><strong>Duration:</strong> {experience.duration}</p>
            <p className="text-gray-600"><strong>Description:</strong> {experience.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <ul className="list-disc list-inside">
          {userInfo.skills.map((skill, index) => (
            <li key={index} className="text-gray-600">{skill}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {userInfo.projects.map(project => (
          <div key={project.id} className="mb-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        {userInfo.education.map(edu => (
          <div key={edu.id} className="mb-4">
            <h3 className="text-xl font-bold">{edu.degree}</h3>
            <p className="text-gray-600"><strong>University:</strong> {edu.university}</p>
            <p className="text-gray-600"><strong>Year:</strong> {edu.year}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Mentor Details</h2>
        <p className="text-gray-600"><strong>Mentor Name:</strong> {userInfo.mentorDetails.mentorName}</p>
        <p className="text-gray-600"><strong>Email:</strong> {userInfo.mentorDetails.email}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {userInfo.mentorDetails.phone}</p>
      </div>
    </div>
  );
};

export default StudentProfilePage;
