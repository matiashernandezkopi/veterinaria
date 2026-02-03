import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen w-screen flex justify-center p-5 dark:text-white">
      <Header />
      <main className="w-full mt-12">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
