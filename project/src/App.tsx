import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import Navbar from './components/Navbar';
import CourseTypeManager from './components/CourseTypeManager';
import CourseManager from './components/CourseManager';
import CourseOfferingManager from './components/CourseOfferingManager';
import StudentRegistration from './components/StudentRegistration';
import { Course, CourseType, CourseOffering } from './types';
import { initialCourseTypes, initialCourses, initialOfferings } from './data/initialData';

function App() {
  const [activeSection, setActiveSection] = useState('courses');
  const [courseTypes, setCourseTypes] = useState<CourseType[]>(initialCourseTypes);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [offerings, setOfferings] = useState<CourseOffering[]>(initialOfferings);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="text-blue-500" size={32} />
            Student Registration System
          </h1>
        </div>
      </header>

      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {activeSection === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseTypeManager initialTypes={courseTypes} onUpdate={setCourseTypes} />
            <CourseManager initialCourses={courses} onUpdate={setCourses} />
          </div>
        )}
        
        {activeSection === 'offerings' && (
          <CourseOfferingManager 
            courses={courses}
            courseTypes={courseTypes}
            offerings={offerings}
            onUpdate={setOfferings}
          />
        )}
        
        {activeSection === 'registration' && (
          <StudentRegistration 
            courseOfferings={offerings}
            courseTypes={courseTypes}
          />
        )}
      </main>
    </div>
  );
}

export default App;