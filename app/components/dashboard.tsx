// create an interface for the dashboard component props
export interface DashboardProps {
    label: string;
    value: string;
    hint?: string;
    tone?: "default" | "warning" | "danger";
}

// destructuring the props in the dashboard component
export default function Dashboard({ label, value, hint, tone = "default" }: DashboardProps) {
    const toneClasses = {
        default: "text-[#d8f8e7]",
        warning: "text-[#fb923c]",
        danger: "text-[#fda4af]",
    };
    return (
        <div className="p-6 rounded-3xl border border-[#164d33] bg-[#0d2f23] shadow-xl shadow-black/20">
            <p className="text-sm font-medium text-white">{label}</p>
            <p className={`mt-2 text-3xl font-semibold ${toneClasses[tone]}`}>{value}</p>
            {hint ? <p className="mt-1 text-xs text-white">{hint}</p> : null}
        </div>
    );
}