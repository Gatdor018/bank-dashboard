

export default function Loading() {
    return (
    <main className="min-h-screen bg-[#061411] p-6 text-slate-100">
        <div className="h-4 w-32 animate-pulse rounded bg-[#164d33]"/>
        <div className="mt-6 h-8 w-48 animate-pulse rounded bg-[#164d33]"/>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded bg-[#164d33]"/>
            ))}
        </div>
    </main>

    );
}   