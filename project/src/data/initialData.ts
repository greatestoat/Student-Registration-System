export const initialCourseTypes = [
  { id: '1', name: 'Individual' },
  { id: '2', name: 'Group' },
  { id: '3', name: 'Special' },
  { id: '4', name: 'Weekend' },
  { id: '5', name: 'Evening' }
];

export const initialCourses = [
  { id: '1', name: 'English Speaking' },
  { id: '2', name: 'Business Hindi' },
  { id: '3', name: 'Creative Writing' },
  { id: '4', name: 'French for Beginners' },
  { id: '5', name: 'Spanish Conversation' },
  { id: '6', name: 'German A1' },
  { id: '7', name: 'Japanese Basics' },
  { id: '8', name: 'Mandarin Level 1' }
];

// Pre-populated course offerings for better UX
export const initialOfferings = [
  { 
    id: '1', 
    courseId: '1', 
    courseTypeId: '1',
    name: 'Individual - English Speaking'
  },
  { 
    id: '2', 
    courseId: '2', 
    courseTypeId: '2',
    name: 'Group - Business Hindi'
  },
  { 
    id: '3', 
    courseId: '3', 
    courseTypeId: '3',
    name: 'Special - Creative Writing'
  },
  { 
    id: '4', 
    courseId: '4', 
    courseTypeId: '4',
    name: 'Weekend - French for Beginners'
  },
  { 
    id: '5', 
    courseId: '5', 
    courseTypeId: '5',
    name: 'Evening - Spanish Conversation'
  },
  { 
    id: '6', 
    courseId: '6', 
    courseTypeId: '2',
    name: 'Group - German A1'
  },
  { 
    id: '7', 
    courseId: '7', 
    courseTypeId: '4',
    name: 'Weekend - Japanese Basics'
  },
  { 
    id: '8', 
    courseId: '8', 
    courseTypeId: '5',
    name: 'Evening - Mandarin Level 1'
  }
];