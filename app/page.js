
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TaskCard } from "../components/task-card";
import { TaskFilters } from "../components/task-filters";
import FloatingBackground from "../components/floating-background";
import { BackgroundGrid } from "../components/ui/background-grid";
import { Button3D } from "../components/ui/button-3d";
import { mockTasks } from "../lib/mock-data";
import { getTaskSuggestions, getPriorityRecommendation } from "../lib/ai";

export default function Home() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("dueDate");
  const [isLoading, setIsLoading] = useState(false);

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;
    if (filter !== "ALL") {
      filtered = tasks.filter(task => task.priority === filter);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          const priority = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priority[b.priority] - priority[a.priority];
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });
  };

  const handleNewTaskSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;

    setIsLoading(true);
    try {
      const [suggestions, priorityData] = await Promise.all([
        getTaskSuggestions(newTaskInput),
        getPriorityRecommendation(newTaskInput)
      ]);

      const newTask = {
        id: Date.now(),
        title: newTaskInput,
        description: priorityData.reason || "AI-assisted task",
        priority: priorityData.priority,
        progress: 0,
        subtasks: suggestions,
        completedSubtasks: new Array(suggestions.length).fill(false),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };

      setTasks(prevTasks => [newTask, ...prevTasks]);
      setNewTaskInput("");
      setAiSuggestions([]);
    } catch (error) {
      console.error("Error creating task:", error);
      const newTask = {
        id: Date.now(),
        title: newTaskInput,
        description: "Task created without AI assistance",
        priority: "MEDIUM",
        progress: 0,
        subtasks: ["Plan the task", "Execute the task", "Review the task"],
        completedSubtasks: [false, false, false],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setNewTaskInput("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <BackgroundGrid className="fixed inset-0" />
      <FloatingBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-6xl mx-auto px-8 py-12"
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
            animate={{ 
              backgroundPosition: ["0%", "100%"],
              transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            Task Manager
          </motion.h1>
          <p className="text-xl text-gray-600">Organize your work with AI-powered efficiency</p>
        </motion.div>

        <form onSubmit={handleNewTaskSubmit} className="mb-12">
          <div className="flex gap-4 backdrop-blur-sm bg-white/30 p-4 rounded-2xl shadow-xl">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="Enter a new task..."
              className="flex-1 p-4 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              disabled={isLoading}
            />
            <Button3D
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Adding..." : "Add Task"}
            </Button3D>
          </div>
        </form>

        <TaskFilters
          onFilterChange={setFilter}
          onSortChange={setSortBy}
          activeFilter={filter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {getFilteredAndSortedTasks().map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <TaskCard
                  task={task}
                  onSelect={setSelectedTask}
                  onUpdate={handleTaskUpdate}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {getFilteredAndSortedTasks().length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-12 p-8 backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                transition: { duration: 2, repeat: Infinity, }
              }}
              className="mb-4 text-6xl opacity-50"
            >
              🎯
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              Try changing the filter or add a new task to get started!
            </p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
