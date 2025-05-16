import { motion } from "framer-motion";

export function TaskFilters({ onFilterChange, onSortChange, activeFilter }) {
  const filters = ["ALL", "HIGH", "MEDIUM", "LOW"];
  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "progress", label: "Progress" },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white/50 backdrop-blur-lg rounded-lg shadow-lg">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === filter
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 hover:bg-purple-50"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sort by:</span>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
