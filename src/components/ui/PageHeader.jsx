// Reusable full-width page hero header with badge, gradient title, and description.
// Usage:
//   <PageHeader
//     badge="Curriculum Directory"
//     badgeColor="primary"
//     title="Explore Supported"
//     highlight="Syllabuses"
//     description="Select your academic curriculum..."
//   />

export default function PageHeader({
    badge,
    badgeColor = "primary",
    title,
    highlight,
    description,
}) {
    const badgeColors = {
        primary:   "text-primary bg-primary/10",
        primary: "text-primary bg-primary/10",
    };

    return (
        <div className="max-w-3xl mb-16 space-y-4">
            {badge && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColors[badgeColor] || badgeColors.primary}`}>
                    {badge}
                </span>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                {title}{" "}
                {highlight && (
                    <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                        {highlight}
                    </span>
                )}
            </h1>

            {description && (
                <p className="text-gray-500 text-lg leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
