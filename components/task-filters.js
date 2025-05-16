import { motion } from "framer-motion";

export function TaskFilters({ onFilterChange, onSortChange, activeFilter }) {
  const filters = ["ALL", "HIGH", "MEDIUM", "LOW"];
  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "progress", label: "Progress" },
  ];

  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 backdrop-blur-sm bg-white/30 rounded-2xl shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex gap-2">
        {filters.map((filter, index) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className={`px-6 py-2 rounded-xl transition-all duration-200 font-medium ${
              activeFilter === filter
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/50 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-gray-700 font-medium">Sort by:</span>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </motion.div>
    </motion.div>
  );
}
