import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans">
            <Navbar />
            <div className="container mx-auto max-w-7xl px-0 md:px-4">
                <div className="flex justify-center">
                    <Sidebar />
                    <main className="flex-1 w-full max-w-2xl min-w-0">
                        {children}
                    </main>
                    <RightPanel />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
