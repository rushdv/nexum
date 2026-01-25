import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
            {/* Top Navbar */}
            <Navbar />
            {/* Mobile Navbar (Bottom or Top? User said: Bottom nav on mobile) */}
            {/* We'll handle mobile nav visibility inside Sidebar component usually, or here. 
                Let's keep a top spacer or distinct mobile header if needed, but for now focus on the desktop layout structure. 
            */}

            <div className="container mx-auto max-w-[1600px] px-4">
                <div className="flex justify-center gap-8 pt-6">

                    {/* LEFT ZONE: Context / Trends (Formerly RightPanel) */}
                    {/* Order 1 on Desktop */}
                    <RightPanel />

                    {/* CENTER ZONE: Feed */}
                    {/* Order 2 on Desktop */}
                    <main className="flex-1 max-w-[640px] min-w-0 pb-24 md:pb-0">
                        {children}
                    </main>

                    {/* RIGHT ZONE: Navigation (Formerly Sidebar) */}
                    {/* Order 3 on Desktop */}
                    <Sidebar />

                </div>
            </div>

            {/* Mobile Bottom Nav Spacer ensures content isn't hidden behind fixed bottom nav if we implement it that way */}
            <div className="h-16 md:hidden"></div>
        </div>
    );
};

export default MainLayout;
