import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Course, CourseType, CourseOffering } from '../types';

interface Props {
  courses: Course[];
  courseTypes: CourseType[];
  offerings: CourseOffering[];
  onUpdate: (offerings: CourseOffering[]) => void;
}

export default function CourseOfferingManager({ courses, courseTypes, offerings, onUpdate }: Props) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!selectedCourse || !selectedType) return;
    
    const course = courses.find(c => c.id === selectedCourse);
    const type = courseTypes.find(t => t.id === selectedType);
    
    if (!course || !type) return;

    const newOffering: CourseOffering = {
      id: crypto.randomUUID(),
      courseId: selectedCourse,
      courseTypeId: selectedType,
      name: `${type.name} - ${course.name}`
    };

    onUpdate([...offerings, newOffering]);
    setSelectedCourse('');
    setSelectedType('');
  };

  const handleEdit = (id: string) => {
    if (!selectedCourse || !selectedType) return;
    
    const course = courses.find(c => c.id === selectedCourse);
    const type = courseTypes.find(t => t.id === selectedType);
    
    if (!course || !type) return;

    onUpdate(offerings.map(offering =>
      offering.id === id
        ? {
            ...offering,
            courseId: selectedCourse,
            courseTypeId: selectedType,
            name: `${type.name} - ${course.name}`
          }
        : offering
    ));
    setEditingId(null);
    setSelectedCourse('');
    setSelectedType('');
  };

  const handleDelete = (id: string) => {
    onUpdate(offerings.filter(offering => offering.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Course Offerings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Select Type</option>
          {courseTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>

        {editingId ? (
          <button
            onClick={() => handleEdit(editingId)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 justify-center"
          >
            <Pencil size={20} /> Update Offering
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 justify-center"
          >
            <Plus size={20} /> Create Offering
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offerings.map(offering => (
          <div key={offering.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="font-medium mb-2">{offering.name}</div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingId(offering.id);
                  setSelectedCourse(offering.courseId);
                  setSelectedType(offering.courseTypeId);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(offering.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}