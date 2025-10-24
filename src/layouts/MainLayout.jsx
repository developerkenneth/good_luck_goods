import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import MobileBottomNav from "../components/MobileBottomNav";
import TopNavbar from "../components/TopNavBar";
import { Toaster } from "react-hot-toast";
import PromoPopup from "../components/PromoPopup";
import PromoContainer from "../components/PromoContainer";
import ShowAnnouncement from "../components/ShowAnnouncement";


const MainLayout = () => {
  return (
    <>
    <ShowAnnouncement />
      <div className="flex min-h-screen text-gray-800 dark:bg-gray-900 dark:text-white font-p">
        <Toaster position="top-right" reverseOrder={false} />
        {/* include side bar component */}
        <SideBar />
        <MobileBottomNav />
        {/* Main content */}
        <main className="flex-1 p-6 mb-20 lg:mb-0">
          <TopNavbar />
          {<Outlet />}
        </main>
      </div>
      <PromoContainer />
    </>
  );
};

export default MainLayout;
