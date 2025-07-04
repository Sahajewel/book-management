import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Book management library. All rights reserved.
        </p>
        <p className="text-sm mt-2 md:mt-0">
          Made  by{"  "}
          <Link
            to="https://sahajewel.com"
            className="text-blue-400 hover:underline"
          >
            Saha Jewel
          </Link>
        </p>
      </div>
    </footer>
  );
}
