import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Database, Brain, Trophy, User, Menu, X, CheckCircle, Circle, Lock, Play, Clock, Star } from 'lucide-react';

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
      color: 'from-purple-500 to-pink-500',
      description: 'Master DSA from basics to advanced topics with 450+ problems',
      modules: [
        {
          name: 'Arrays & Hashing',
          topics: ['Introduction to Arrays', 'Two Pointer Technique', 'Sliding Window', 'Prefix Sum', 'Hash Maps'],
          lessons: 25
        },
        {
          name: 'Linked Lists',
          topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Fast & Slow Pointers'],
          lessons: 18
        },
        {
          name: 'Stacks & Queues',
          topics: ['Stack Implementation', 'Queue Implementation', 'Monotonic Stack', 'Priority Queue'],
          lessons: 20
        },
        {
          name: 'Trees & Graphs',
          topics: ['Binary Trees', 'BST', 'AVL Trees', 'Graph Traversals', 'Shortest Path Algorithms'],
          lessons: 35
        },
        {
          name: 'Dynamic Programming',
          topics: ['1D DP', '2D DP', 'DP on Trees', 'DP on Graphs', 'Optimization Techniques'],
          lessons: 40
        },
        {
          name: 'Advanced Topics',
          topics: ['Segment Trees', 'Trie', 'Disjoint Set Union', 'Advanced Graph Algorithms'],
          lessons: 42
        }
      ]
    },
    {
      id: 'cpp',
      title: 'C++ Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '80+ hours',
      lessons: 95,
      color: 'from-blue-500 to-cyan-500',
      description: 'Complete C++ mastery from syntax to STL and OOP',
      modules: [
        {
          name: 'C++ Basics',
          topics: ['Syntax & Variables', 'Control Flow', 'Functions', 'Arrays & Strings', 'Pointers'],
          lessons: 20
        },
        {
          name: 'Object Oriented Programming',
          topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
          lessons: 25
        },
        {
          name: 'STL (Standard Template Library)',
          topics: ['Vectors', 'Maps & Sets', 'Algorithms', 'Iterators', 'Function Objects'],
          lessons: 30
        },
        {
          name: 'Advanced C++',
          topics: ['Templates', 'Smart Pointers', 'Move Semantics', 'Lambda Functions', 'Multithreading'],
          lessons: 20
        }
      ]
    },
    {
      id: 'java',
      title: 'Java Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '75+ hours',
      lessons: 90,
      color: 'from-orange-500 to-red-500',
      description: 'Java fundamentals to enterprise-level development',
      modules: [
        {
          name: 'Java Fundamentals',
          topics: ['Syntax Basics', 'Data Types', 'Control Structures', 'Methods', 'Arrays'],
          lessons: 18
        },
        {
          name: 'OOP in Java',
          topics: ['Classes & Objects', 'Inheritance', 'Interfaces', 'Packages', 'Exception Handling'],
          lessons: 22
        },
        {
          name: 'Collections Framework',
          topics: ['Lists', 'Sets', 'Maps', 'Queue', 'Comparators'],
          lessons: 25
        },
        {
          name: 'Advanced Java',
          topics: ['Streams API', 'Multithreading', 'JDBC', 'Generics', 'Annotations'],
          lessons: 25
        }
      ]
    },
    {
      id: 'python',
      title: 'Python Programming',
      icon: <Code className="w-8 h-8" />,
      difficulty: 'Beginner to Advanced',
      duration: '70+ hours',
      lessons: 85,
      color: 'from-green-500 to-teal-500',
      description: 'Python for programming, data science, and automation',
      modules: [
        {
          name: 'Python Basics',
          topics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Tuples', 'Dictionaries'],
          lessons: 20
        },
        {
          name: 'OOP & Modules',
          topics: ['Classes', 'Inheritance', 'Modules', 'Packages', 'File Handling'],
          lessons: 18
        },
        {
          name: 'Advanced Python',
          topics: ['Decorators', 'Generators', 'Context Managers', 'Threading', 'Async Programming'],
          lessons: 22
        },
        {
          name: 'Python Libraries',
          topics: ['NumPy', 'Pandas', 'Matplotlib', 'Requests', 'BeautifulSoup'],
          lessons: 25
        }
      ]
    },
    {
      id: 'dbms',
      title: 'Database Management',
      icon: <Database className="w-8 h-8" />,
      difficulty: 'Beginner to Intermediate',
      duration: '50+ hours',
      lessons: 65,
      color: 'from-indigo-500 to-purple-500',
      description: 'SQL, NoSQL, and database design principles',
      modules: [
        {
          name: 'SQL Fundamentals',
          topics: ['SELECT Queries', 'JOINs', 'Aggregations', 'Subqueries', 'Indexes'],
          lessons: 25
        },
        {
          name: 'Database Design',
          topics: ['Normalization', 'ER Diagrams', 'Schema Design', 'Constraints', 'Transactions'],
          lessons: 20
        },
        {
          name: 'NoSQL Databases',
          topics: ['MongoDB', 'Redis', 'Document Stores', 'Key-Value Stores', 'Graph Databases'],
          lessons: 20
        }
      ]
    },
    {
      id: 'system-design',
      title: 'System Design',
      icon: <BookOpen className="w-8 h-8" />,
      difficulty: 'Intermediate to Advanced',
      duration: '60+ hours',
      lessons: 55,
      color: 'from-yellow-500 to-orange-500',
      description: 'Design scalable systems and ace technical interviews',
      modules: [
        {
          name: 'Fundamentals',
          topics: ['Scalability', 'Load Balancing', 'Caching', 'CAP Theorem', 'Consistency Patterns'],
          lessons: 15
        },
        {
          name: 'System Components',
          topics: ['Databases', 'Message Queues', 'CDN', 'API Design', 'Microservices'],
          lessons: 20
        },
        {
          name: 'Case Studies',
          topics: ['Design Twitter', 'Design YouTube', 'Design Uber', 'Design WhatsApp', 'Design Netflix'],
          lessons: 20
        }
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
    <div className="space-y-12">
      <div className="text-center space-y-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Master Programming & DSA
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Structured learning path from basics to advanced. Join thousands of learners achieving their coding goals.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            onClick={() => setActiveSection('courses')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Explore Courses
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all">
            View Roadmap
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
          <Trophy className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">450+ Problems</h3>
          <p className="text-gray-600">Curated problem sets covering all DSA topics</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500">
          <Star className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Expert Content</h3>
          <p className="text-gray-600">Learn from industry experts and crack interviews</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-500">
          <Clock className="w-12 h-12 text-pink-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Self-Paced</h3>
          <p className="text-gray-600">Learn at your own pace with lifetime access</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map(course => (
            <div 
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setActiveSection('course-detail');
              }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`bg-gradient-to-r ${course.color} p-4 rounded-lg text-white mb-4 inline-block`}>
                {course.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CoursesPage = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">All Courses</h1>
        <p className="text-gray-600">Choose your learning path and start your journey</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id}
            onClick={() => {
              setSelectedCourse(course);
              setActiveSection('course-detail');
            }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-200"
          >
            <div className={`bg-gradient-to-r ${course.color} p-4 rounded-lg text-white mb-4 inline-block`}>
              {course.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>{course.difficulty}</span>
              </div>
            </div>
            {userProgress[course.id] > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-blue-600">{userProgress[course.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${course.color} h-2 rounded-full transition-all`}
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
      <div className="space-y-8">
        <button 
          onClick={() => setActiveSection('courses')}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedCourse.color} p-8 text-white`}>
            <div className="flex items-center gap-4 mb-4">
              {selectedCourse.icon}
              <h1 className="text-4xl font-bold">{selectedCourse.title}</h1>
            </div>
            <p className="text-lg opacity-90 mb-6">{selectedCourse.description}</p>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{selectedCourse.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>{selectedCourse.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {userProgress[selectedCourse.id] > 0 && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Your Progress</h3>
                  <span className="text-2xl font-bold text-blue-600">{userProgress[selectedCourse.id]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${selectedCourse.color} h-3 rounded-full transition-all`}
                    style={{ width: `${userProgress[selectedCourse.id]}%` }}
                  />
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
            <div className="space-y-6">
              {selectedCourse.modules.map((module, moduleIdx) => (
                <div key={moduleIdx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{module.name}</h3>
                    <span className="text-sm text-gray-500">{module.lessons} lessons</span>
                  </div>
                  <div className="space-y-2">
                    {module.topics.map((topic, topicIdx) => {
                      const isCompleted = completedLessons[`${selectedCourse.id}-${moduleIdx}-${topicIdx}`];
                      return (
                        <div 
                          key={topicIdx}
                          onClick={() => toggleLesson(selectedCourse.id, moduleIdx, topicIdx)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                            isCompleted ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={isCompleted ? 'text-green-700 font-medium' : 'text-gray-700'}>
                            {topic}
                          </span>
                          <Play className="w-4 h-4 text-blue-600 ml-auto flex-shrink-0" />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnToDo
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`font-semibold transition-colors ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveSection('courses')}
                className={`font-semibold transition-colors ${activeSection === 'courses' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Courses
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  setActiveSection('home');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left font-semibold text-gray-600 hover:text-blue-600 py-2"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  setActiveSection('courses');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left font-semibold text-gray-600 hover:text-blue-600 py-2"
              >
                Courses
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && <HomePage />}
        {activeSection === 'courses' && <CoursesPage />}
        {activeSection === 'course-detail' && <CourseDetailPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="font-semibold mb-2">LearnToDo - Master Programming & DSA</p>
            <p className="text-sm">© 2025 LearnToDo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearnToDo;
