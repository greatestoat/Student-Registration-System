import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Student, CourseOffering, CourseType } from '../types';
import RegistrationForm from './RegistrationForm';
import StudentList from './StudentList';

interface Props {
  courseOfferings: CourseOffering[];
  courseTypes: CourseType[];
}

export default function StudentRegistration({ courseOfferings, courseTypes }: Props) {
  const [students, setStudents] = useLocalStorage<Student[]>('registered-students', []);
  const [selectedOffering, setSelectedOffering] = useState('');

  const handleRegister = (student: Student) => {
    setStudents([...students, student]);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">New Registration</h2>
        <RegistrationForm
          courseOfferings={courseOfferings}
          courseTypes={courseTypes}
          onRegister={handleRegister}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Registered Students</h2>
          <select
            value={selectedOffering}
            onChange={(e) => setSelectedOffering(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-md"
          >
            <option value="">All Courses</option>
            {courseOfferings.map(offering => (
              <option key={offering.id} value={offering.id}>{offering.name}</option>
            ))}
          </select>
        </div>
        
        <StudentList
          students={students}
          courseOfferings={courseOfferings}
          selectedOffering={selectedOffering}
        />
      </div>
    </div>
  );
}