import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-200 bg-gradient-to-r from-purple-500 to-green-700 min-h-screen">
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default Layout;
