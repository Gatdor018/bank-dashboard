export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-zinc-200 py-6 text-center text-sm text-white dark:border-zinc-700 dark:text-zinc-400">
      <p>
        Gatdor Reat · Plaiced
      </p>
      <p className="mt-1 text-xs text-white dark:text-white">
        © {year} · Bank Dashboard Demo — mock data only, no real money movement.
      </p>
    </footer>
  );
}