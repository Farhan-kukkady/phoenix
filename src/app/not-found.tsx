import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(15,23,66)]">
      <div className="text-center text-white">
        <div
          className="text-8xl font-bold text-gradient mb-4"
          style={{
            background: "linear-gradient(135deg, #C41E3A, #581C87)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
        <p className="text-white/60 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
