import { Outlet } from "react-router-dom";
import Navbar from "./customComponents/Navbar";
import Footer from "./customComponents/Footer";
import { Toaster } from "sonner";
import RouteTitleSetter from "./routeTitleSetter/RouteTitleSetter";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <RouteTitleSetter></RouteTitleSetter>
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
