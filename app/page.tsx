import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-orange-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
          AT Sale Application
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Your complete sales management solution
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth"
            className="px-6 py-3 bg-[#EA580C] text-white rounded-lg hover:bg-[#c2410c] transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
