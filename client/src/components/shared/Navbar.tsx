export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-lg font-semibold">StreamCM</div>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="hover:text-primary">Home</a>
          <a href="/login" className="hover:text-primary">Login</a>
        </nav>
      </div>
    </header>
  );
}
