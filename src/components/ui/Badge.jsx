// Reusable badge/pill component for labels, tags, and status indicators.
// Usage:
//   <Badge>University Student</Badge>
//   <Badge color="secondary" size="lg">Verified</Badge>
//   <Badge color="green">Beginner</Badge>
//   <Badge color="amber">Intermediate</Badge>
//   <Badge color="red">Advanced</Badge>

const colorMap = {
    primary:   "text-primary bg-primary/10 border-primary/10",
    secondary: "text-secondary bg-secondary/10 border-secondary/10",
    green:     "text-green-700 bg-green-50 border-green-100",
    amber:     "text-amber-700 bg-amber-50 border-amber-100",
    red:       "text-red-700 bg-red-50 border-red-100",
    gray:      "text-gray-500 bg-gray-100 border-gray-200",
    purple:    "text-purple-700 bg-purple-50 border-purple-100",
};

const sizeMap = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
};

export default function Badge({ children, color = "primary", size = "md", className = "" }) {
    return (
        <span className={`
            inline-flex items-center gap-1 font-bold rounded-full border
            ${colorMap[color] || colorMap.primary}
            ${sizeMap[size]  || sizeMap.md}
            ${className}
        `}>
            {children}
        </span>
    );
}
