import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { CourseType } from '../types';

interface Props {
  initialTypes: CourseType[];
  onUpdate: (types: CourseType[]) => void;
}

export default function CourseTypeManager({ initialTypes, onUpdate }: Props) {
  const [newTypeName, setNewTypeName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newTypeName.trim()) return;
    onUpdate([...initialTypes, { id: crypto.randomUUID(), name: newTypeName }]);
    setNewTypeName('');
  };

  const handleEdit = (id: string, newName: string) => {
    onUpdate(initialTypes.map(type => 
      type.id === id ? { ...type, name: newName } : type
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onUpdate(initialTypes.filter(type => type.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Course Types</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          placeholder="New course type name"
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
        {initialTypes.map(type => (
          <li key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            {editingId === type.id ? (
              <input
                type="text"
                defaultValue={type.name}
                onBlur={(e) => handleEdit(type.id, e.target.value)}
                autoFocus
                className="px-2 py-1 border rounded"
              />
            ) : (
              <span>{type.name}</span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setEditingId(type.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(type.id)}
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