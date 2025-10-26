import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Database, Brain, Trophy, Menu, X, CheckCircle, Circle, Play, Clock, Zap, Target, Award } from 'lucide-react';

const LearnToDo = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({});
  const [userProgress, setUserProgress] = useState({});

  const courses = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: <Brain className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '150+ hours',
      lessons: 180,
      gradient: 'from-purple-100 to-pink-100',
      iconColor: 'text-purple-600',
      description: 'Master DSA from basics to advanced topics with 450+ problems',
      modules: [
        { name: 'Arrays & Hashing', topics: ['Introduction to Arrays', 'Two Pointer Technique', 'Sliding Window', 'Prefix Sum', 'Hash Maps'], lessons: 25 },
        { name: 'Linked Lists', topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Fast & Slow Pointers'], lessons: 18 },
        { name: 'Stacks & Queues', topics: ['Stack Implementation', 'Queue Implementation', 'Monotonic Stack', 'Priority Queue'], lessons: 20 },
        { name: 'Trees & Graphs', topics: ['Binary Trees', 'BST', 'AVL Trees', 'Graph Traversals', 'Shortest Path Algorithms'], lessons: 35 },
        { name: 'Dynamic Programming', topics: ['1D DP', '2D DP', 'DP on Trees', 'DP on Graphs', 'Optimization Techniques'], lessons: 40 },
        { name: 'Advanced Topics', topics: ['Segment Trees', 'Trie', 'Disjoint Set Union', 'Advanced Graph Algorithms'], lessons: 42 }
      ]
    },
    {
      id: 'cpp',
      title: 'C++ Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '80+ hours',
      lessons: 95,
      gradient: 'from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600',
      description: 'Complete C++ mastery from syntax to STL and OOP',
      modules: [
        { name: 'C++ Basics', topics: ['Syntax & Variables', 'Control Flow', 'Functions', 'Arrays & Strings', 'Pointers'], lessons: 20 },
        { name: 'Object Oriented Programming', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], lessons: 25 },
        { name: 'STL (Standard Template Library)', topics: ['Vectors', 'Maps & Sets', 'Algorithms', 'Iterators', 'Function Objects'], lessons: 30 },
        { name: 'Advanced C++', topics: ['Templates', 'Smart Pointers', 'Move Semantics', 'Lambda Functions', 'Multithreading'], lessons: 20 }
      ]
    },
    {
      id: 'java',
      title: 'Java Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '75+ hours',
      lessons: 90,
      gradient: 'from-orange-100 to-red-100',
      iconColor: 'text-orange-600',
      description: 'Java fundamentals to enterprise-level development',
      modules: [
        { name: 'Java Fundamentals', topics: ['Syntax Basics', 'Data Types', 'Control Structures', 'Methods', 'Arrays'], lessons: 18 },
        { name: 'OOP in Java', topics: ['Classes & Objects', 'Inheritance', 'Interfaces', 'Packages', 'Exception Handling'], lessons: 22 },
        { name: 'Collections Framework', topics: ['Lists', 'Sets', 'Maps', 'Queue', 'Comparators'], lessons: 25 },
        { name: 'Advanced Java', topics: ['Streams API', 'Multithreading', 'JDBC', 'Generics', 'Annotations'], lessons: 25 }
      ]
    },
    {
      id: 'python',
      title: 'Python Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '70+ hours',
      lessons: 85,
      gradient: 'from-green-100 to-teal-100',
      iconColor: 'text-green-600',
      description: 'Python for programming, data science, and automation',
      modules: [
        { name: 'Python Basics', topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Tuples', 'Dictionaries'], lessons: 20 },
        { name: 'OOP & Modules', topics: ['Classes', 'Inheritance', 'Modules', 'Packages', 'File Handling'], lessons: 18 },
        { name: 'Advanced Python', topics: ['Decorators', 'Generators', 'Context Managers', 'Threading', 'Async Programming'], lessons: 22 },
        { name: 'Python Libraries', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Requests', 'BeautifulSoup'], lessons: 25 }
      ]
    },
    {
      id: 'dbms',
      title: 'Database Management',
      icon: <Database className="w-8 h-8" />,
      difficulty: 'Beginner to Intermediate',
      duration: '50+ hours',
      lessons: 65,
      gradient: 'from-indigo-100 to-purple-100',
      iconColor: 'text-indigo-600',
      description: 'SQL, NoSQL, and database design principles',
      modules: [
        { name: 'SQL Fundamentals', topics: ['SELECT Queries', 'JOINs', 'Aggregations', 'Subqueries', 'Indexes'], lessons: 25 },
        { name: 'Database Design', topics: ['Normalization', 'ER Diagrams', 'Schema Design', 'Constraints', 'Transactions'], lessons: 20 },
        { name: 'NoSQL Databases', topics: ['MongoDB', 'Redis', 'Document Stores', 'Key-Value Stores', 'Graph Databases'], lessons: 20 }
      ]
    },
    {
      id: 'system-design',
      title: 'System Design',
      icon: <BookOpen className="w-8 h-8" />,
      difficulty: 'Intermediate to Advanced',
      duration: '60+ hours',
      lessons: 55,
      gradient: 'from-yellow-100 to-orange-100',
      iconColor: 'text-yellow-600',
      description: 'Design scalable systems and ace technical interviews',
      modules: [
        { name: 'Fundamentals', topics: ['Scalability', 'Load Balancing', 'Caching', 'CAP Theorem', 'Consistency Patterns'], lessons: 15 },
        { name: 'System Components', topics: ['Databases', 'Message Queues', 'CDN', 'API Design', 'Microservices'], lessons: 20 },
        { name: 'Case Studies', topics: ['Design Twitter', 'Design YouTube', 'Design Uber', 'Design WhatsApp', 'Design Netflix'], lessons: 20 }
      ]
    }
  ];

  const toggleLesson = (courseId, moduleIdx, topicIdx) => {
    const key = `${courseId}-${moduleIdx}-${topicIdx}`;
    setCompletedLessons(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const progress = {};
    courses.forEach(course => {
      const totalTopics = course.modules.reduce((sum, mod) => sum + mod.topics.length, 0);
      const completedTopics = course.modules.reduce((sum, mod, modIdx) => {
        return sum + mod.topics.filter((_, topicIdx) => 
          completedLessons[`${course.id}-${modIdx}-${topicIdx}`]
        ).length;
      }, 0);
      progress[course.id] = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    });
    setUserProgress(progress);
  }, [completedLessons]);

  const HomePage = () => (
    <div>
      <header className="text-center mt-20">
        <h1 className="text-6xl font-black mb-4">All-in-One<br />Learning Platform.</h1>
        <p className="text-2xl text-gray-700 mb-12">Master programming, DSA, and system design to ace tech interviews.</p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-7 h-7 text-blue-600" />
            <h2 className="font-bold text-2xl">450+ Problems</h2>
          </div>
          <p className="text-gray-700 text-lg">Curated problem sets covering all data structures and algorithms topics.</p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-7 h-7 text-purple-600" />
            <h2 className="font-bold text-2xl">Structured Path</h2>
          </div>
          <p className="text-gray-700 text-lg">Follow a clear roadmap from beginner to interview-ready engineer.</p>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-red-100 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-7 h-7 text-orange-600" />
            <h2 className="font-bold text-2xl">Expert Content</h2>
          </div>
          <p className="text-gray-700 text-lg">Learn from industry experts who've cracked FAANG interviews.</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-7 h-7 text-yellow-600" />
            <h2 className="font-bold text-2xl">Self-Paced</h2>
          </div>
          <p className="text-gray-700 text-lg">Study at your own pace with lifetime access to all content.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-black text-center mb-12">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.slice(0, 3).map(course => (
            <div 
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setActiveSection('course-detail');
              }}
              className={`bg-gradient-to-r ${course.gradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer`}
            >
              <div className={`${course.iconColor} mb-4`}>
                {course.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
              <p className="text-gray-700 mb-6">{course.description}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button 
            onClick={() => setActiveSection('courses')}
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg"
          >
            View All Courses →
          </button>
        </div>
      </section>
    </div>
  );

  const CoursesPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">All Courses</h1>
        <p className="text-xl text-gray-700">Choose your learning path and start your journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {courses.map(course => (
          <div 
            key={course.id}
            onClick={() => {
              setSelectedCourse(course);
              setActiveSection('course-detail');
            }}
            className={`bg-gradient-to-r ${course.gradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-gray-300`}
          >
            <div className={`${course.iconColor} mb-4`}>
              {course.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
            <p className="text-gray-700 mb-6">{course.description}</p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="font-medium">{course.difficulty}</span>
              </div>
            </div>
            {userProgress[course.id] > 0 && (
              <div className="pt-4 border-t border-gray-300">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-bold text-gray-900">{userProgress[course.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gray-900 h-2.5 rounded-full transition-all"
                    style={{ width: `${userProgress[course.id]}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const CourseDetailPage = () => {
    if (!selectedCourse) return null;

    return (
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => setActiveSection('courses')}
          className="text-blue-600 hover:underline font-bold text-lg mb-8 inline-flex items-center gap-2"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
          <div className={`bg-gradient-to-r ${selectedCourse.gradient} p-12`}>
            <div className={`flex items-center gap-4 mb-4 ${selectedCourse.iconColor}`}>
              {selectedCourse.icon}
              <h1 className="text-5xl font-black">{selectedCourse.title}</h1>
            </div>
            <p className="text-xl text-gray-800 mb-8">{selectedCourse.description}</p>
            <div className="flex gap-8 flex-wrap text-gray-700">
              <div className="flex items-center gap-2 font-medium">
                <BookOpen className="w-5 h-5" />
                <span>{selectedCourse.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Clock className="w-5 h-5" />
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Trophy className="w-5 h-5" />
                <span>{selectedCourse.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="p-12">
            {userProgress[selectedCourse.id] > 0 && (
              <div className="mb-10 p-6 bg-gray-100 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Your Progress</h3>
                  <span className="text-3xl font-black text-gray-900">{userProgress[selectedCourse.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gray-900 h-4 rounded-full transition-all"
                    style={{ width: `${userProgress[selectedCourse.id]}%` }}
                  />
                </div>
              </div>
            )}

            <h2 className="text-3xl font-black mb-8">Course Modules</h2>
            <div className="space-y-6">
              {selectedCourse.modules.map((module, moduleIdx) => (
                <div key={moduleIdx} className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-400 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">{module.name}</h3>
                    <span className="text-sm text-gray-500 font-medium">{module.lessons} lessons</span>
                  </div>
                  <div className="space-y-3">
                    {module.topics.map((topic, topicIdx) => {
                      const isCompleted = completedLessons[`${selectedCourse.id}-${moduleIdx}-${topicIdx}`];
                      return (
                        <div 
                          key={topicIdx}
                          onClick={() => toggleLesson(selectedCourse.id, moduleIdx, topicIdx)}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                            isCompleted ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={`flex-grow text-lg ${isCompleted ? 'text-green-800 font-semibold' : 'text-gray-800'}`}>
                            {topic}
                          </span>
                          <Play className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 relative">
      {/* Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 overflow-hidden">
        <svg className="absolute" style={{top: '20%', left: '10%', width: '100px', height: '100px'}} viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="28" fill="#6366f1" className="animate-pulse" />
        </svg>
        <svg className="absolute" style={{top: '60%', right: '15%', width: '80px', height: '80px'}} viewBox="0 0 96 96">
          <polygon points="48 17.28 86.4 80.11584 9.6 80.11584" fill="#ec4899" className="animate-bounce" />
        </svg>
        <svg className="absolute" style={{bottom: '20%', left: '20%', width: '60px', height: '60px'}} viewBox="0 0 96 96">
          <rect width="48" height="48" x="24" y="24" fill="#8b5cf6" className="animate-spin" style={{animationDuration: '8s'}} />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="px-8 py-5 flex justify-between items-center border-b sticky top-0 bg-white z-50">
        <div 
          className="text-3xl font-black cursor-pointer"
          onClick={() => setActiveSection('home')}
        >
          LearnToDo
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => setActiveSection('home')}
            className={`font-bold hover:underline ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-900'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveSection('courses')}
            className={`font-bold hover:underline ${activeSection === 'courses' ? 'text-blue-600' : 'text-gray-900'}`}
          >
            Courses
          </button>
          <a href="#" className="text-blue-600 hover:underline font-bold">Docs</a>
          <a href="#" className="text-purple-600 hover:underline font-bold">GitHub</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b relative z-40">
          <div className="px-8 py-6 space-y-4">
            <button 
              onClick={() => {
                setActiveSection('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-bold text-gray-900 hover:text-blue-600 py-2"
            >
              Home
            </button>
            <button 
              onClick={() => {
                setActiveSection('courses');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-bold text-gray-900 hover:text-blue-600 py-2"
            >
              Courses
            </button>
            <a href="#" className="block text-blue-600 hover:underline font-bold py-2">Docs</a>
            <a href="#" className="block text-purple-600 hover:underline font-bold py-2">GitHub</a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-8 py-12 relative z-10">
        {activeSection === 'home' && <HomePage />}
        {activeSection === 'courses' && <CoursesPage />}
        {activeSection === 'course-detail' && <CourseDetailPage />}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-8 border-t relative z-10">
        <p className="text-lg">© 2025 LearnToDo Team. Master your coding journey.</p>
      </footer>
    </div>
  );
};

export default LearnToDo;
