import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Course } from '../types';

interface Props {
  initialCourses: Course[];
  onUpdate: (courses: Course[]) => void;
}

export default function CourseManager({ initialCourses, onUpdate }: Props) {
  const [newCourseName, setNewCourseName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newCourseName.trim()) return;
    onUpdate([...initialCourses, { id: crypto.randomUUID(), name: newCourseName }]);
    setNewCourseName('');
  };

  const handleEdit = (id: string, newName: string) => {
    onUpdate(initialCourses.map(course => 
      course.id === id ? { ...course, name: newName } : course
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onUpdate(initialCourses.filter(course => course.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="New course name"
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <ul className="space-y-2">
        {initialCourses.map(course => (
          <li key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            {editingId === course.id ? (
              <input
                type="text"
                defaultValue={course.name}
                onBlur={(e) => handleEdit(course.id, e.target.value)}
                autoFocus
                className="px-2 py-1 border rounded"
              />
            ) : (
              <span>{course.name}</span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setEditingId(course.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}