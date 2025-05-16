import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "./ui/progress";
import { priorityColors, priorityAnimations } from "../lib/mock-data";

export function TaskCard({ task, onSelect, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);  const handleProgressChange = (e) => {
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
        className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
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
      </motion.div>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-4">{task.title}</Dialog.Title>
            
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
                <div className="mt-2 space-y-2">
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completedSubtasks?.[index] || false}
                        onChange={() => handleSubtaskToggle(index)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className={task.completedSubtasks?.[index] ? "line-through text-gray-400" : ""}>
                        {subtask}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
