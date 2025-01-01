import React from 'react';
import { Student, CourseOffering } from '../types';
import { Mail, GraduationCap } from 'lucide-react';

interface Props {
  students: Student[];
  courseOfferings: CourseOffering[];
  selectedOffering: string;
}

export default function StudentList({ students, courseOfferings, selectedOffering }: Props) {
  const filteredStudents = selectedOffering
    ? students.filter(student => student.registeredCourseIds.includes(selectedOffering))
    : students;

  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students registered for this course yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredStudents.map(student => (
        <div key={student.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-lg mb-2">{student.name}</h3>
          <div className="text-sm text-gray-600 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              {student.email}
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={16} />
              {student.registeredCourseIds.map(id => 
                courseOfferings.find(o => o.id === id)?.name
              ).join(', ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}