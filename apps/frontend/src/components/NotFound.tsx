import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="bg-red-100 p-4 rounded-full mb-6 dark:bg-red-900/20">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or deleted.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform active:scale-95"
      >
        Return Home
      </Link>
    </div>
  );
}
