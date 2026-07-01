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
        default: "text-zinc-900",
        warning: "text-yellow-600",
        danger: "text-red-600",
    };
    return (
        <div className="p-5 rounded-xl border border-zinc-200 bg-white shadow-md">
            <p className="text-sm font-medium text-zinc-500">{label}</p>
            <p className={`mt-2 text-2xl font-semibold ${toneClasses[tone]}`}>{value}</p>
            {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
        </div>
    );
}