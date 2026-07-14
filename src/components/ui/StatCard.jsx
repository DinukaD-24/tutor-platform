// Reusable statistic display card with gradient number, label, and description.
// Usage:
//   <StatCard number="500+" label="Subjects Offered" description="Local & International" />

export default function StatCard({ number, label, description }) {
    return (
        <div className="
            relative
            bg-white
            rounded-3xl
            border
            border-gray-100/80
            p-8
            text-center
            shadow-[0_8px_30px_rgb(0,0,0,0.015)]
            hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)]
            hover:-translate-y-1
            transition-all
            duration-300
        ">
            <h3 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                {number}
            </h3>
            <p className="text-dark font-bold text-base mt-3">
                {label}
            </p>
            {description && (
                <p className="text-gray-400 text-xs mt-1.5 font-medium">
                    {description}
                </p>
            )}
        </div>
    );
}
