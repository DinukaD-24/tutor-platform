// Reusable section heading with badge label, bold title, and optional subtitle.
// Usage:
//   <SectionHeading
//     badge="Educators"
//     badgeColor="secondary"        // "primary" | "secondary" (default: "primary")
//     title="Meet Our Featured Tutors"
//     subtitle="Browse top-rated educators..."
//     align="center"               // "left" | "center" (default: "center")
//   />

export default function SectionHeading({
    badge,
    badgeColor = "primary",
    title,
    subtitle,
    align = "center",
}) {
    const alignClass  = align === "left" ? "text-left" : "text-center mx-auto";
    const badgeColors = {
        primary:   "text-primary bg-primary/10",
        secondary: "text-secondary bg-secondary/10",
    };

    return (
        <div className={`max-w-2xl space-y-4 ${alignClass}`}>
            {badge && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColors[badgeColor] || badgeColors.primary}`}>
                    {badge}
                </span>
            )}

            <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-500 leading-relaxed text-base">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
