export const mockTasks = [
  {
    id: 1,
    title: "Design System Implementation",
    description: "Create a cohesive design system for the project",
    priority: "HIGH",
    progress: 75,
    subtasks: ["Color palette", "Typography", "Components"],
    dueDate: "2025-05-20",
  },
  {
    id: 2,
    title: "AI Integration Features",
    description: "Implement smart task suggestions and priority recommendations",
    priority: "MEDIUM",
    progress: 30,
    subtasks: ["API setup", "UI integration", "Testing"],
    dueDate: "2025-05-22",
  },
  {
    id: 3,
    title: "Animation Polish",
    description: "Add smooth transitions and micro-interactions",
    priority: "LOW",
    progress: 0,
    subtasks: ["List animations", "Progress bar effects", "Hover states"],
    dueDate: "2025-05-23",
  },
];

export const priorityColors = {
  LOW: "bg-blue-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
};

export const priorityAnimations = {
  LOW: {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    transition: { duration: 0.2 },
  },
  MEDIUM: {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    transition: { duration: 0.3 },
  },
  HIGH: {
    initial: { scale: 0.95 },
    animate: { scale: 1, y: [0, -5, 0] },
    transition: {
      duration: 0.4,
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
      },
    },
  },
};
