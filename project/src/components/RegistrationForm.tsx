import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { CourseOffering, CourseType, Student } from '../types';

interface Props {
  courseOfferings: CourseOffering[];
  courseTypes: CourseType[];
  onRegister: (student: Student) => void;
}

export default function RegistrationForm({ courseOfferings, courseTypes, onRegister }: Props) {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseId: ''
  });

  const filteredOfferings = selectedType
    ? courseOfferings.filter(offering => offering.courseTypeId === selectedType)
    : courseOfferings;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.courseId) return;

    const student: Student = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      registeredCourseIds: [formData.courseId]
    };

    onRegister(student);
    setFormData({ name: '', email: '', courseId: '' });
    setSelectedType('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Student Name"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Course Type</option>
          {courseTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        
        <select
          value={formData.courseId}
          onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Course Offering</option>
          {filteredOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>{offering.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 justify-center"
      >
        <UserPlus size={20} /> Register Student
      </button>
    </form>
  );
}