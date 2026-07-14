// Reusable empty state block shown when a list has no results.
// Usage:
//   <EmptyState
//     icon={<Video size={32} />}
//     title="No videos yet"
//     description="Check back soon for new lessons."
//     action={{ label: "Reset Filters", onClick: handleReset }}   // optional
//   />

export default function EmptyState({ icon, title, description, action }) {
    return (
        <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center bg-gray-50/50 space-y-3">
            {icon && (
                <div className="flex justify-center text-gray-300 mb-1">
                    {icon}
                </div>
            )}
            <p className="font-bold text-sm text-gray-500">{title}</p>
            {description && (
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    {description}
                </p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-2 text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
