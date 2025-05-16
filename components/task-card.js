import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";
import { priorityColors, priorityAnimations } from "../lib/mock-data";

export function TaskCard({ task, onSelect, onUpdate }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);const handleProgressChange = (e) => {
    const newProgress = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    onUpdate({ ...task, progress: newProgress });
  };

  const handleSubtaskToggle = (index) => {
    const updatedTask = { ...task };
    if (!updatedTask.completedSubtasks) {
      updatedTask.completedSubtasks = new Array(task.subtasks.length).fill(false);
    }
    updatedTask.completedSubtasks[index] = !updatedTask.completedSubtasks[index];
    
    // Update progress based on completed subtasks
    const completedCount = updatedTask.completedSubtasks.filter(Boolean).length;
    updatedTask.progress = Math.round((completedCount / task.subtasks.length) * 100);
    
    onUpdate(updatedTask);
  };
  return (
    <>
      <motion.div
        layout
        initial="initial"
        animate="animate"
        variants={priorityAnimations[task.priority]}
        className="group cursor-pointer transform-gpu bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all"
        onClick={() => setIsModalOpen(true)}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4 }}
        style={{
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        }}
      >        <div className="relative overflow-hidden rounded-lg">
          {/* Spotlight effect */}
          <div 
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(120,119,198,0.1), transparent 40%)"
            }}
          />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <motion.span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                priorityColors[task.priority]
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {task.priority}
            </motion.span>
          </div>
          
          <p className="text-gray-600 mb-4">{task.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <Progress value={task.progress} color={priorityColors[task.priority]} />
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      </motion.div>      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />          <Dialog.Content 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-lg shadow-xl border border-white/20 backdrop-blur-sm"
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            aria-describedby="task-modal-description">            <Dialog.Title className="text-2xl font-bold mb-2">{task.title}</Dialog.Title>
            <p id="task-modal-description" className="text-gray-600 mb-4">
              {task.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Progress</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Subtasks</label>
                <div className="mt-2 space-y-2">                  {task.subtasks.map((subtask, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <input
                        type="checkbox"
                        checked={task.completedSubtasks?.[index] || false}
                        onChange={() => handleSubtaskToggle(index)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span 
                        className={`transition-all ${
                          task.completedSubtasks?.[index] 
                            ? "line-through text-gray-400" 
                            : "text-gray-700"
                        }`}
                      >
                        {subtask}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
