// Layout.tsx
import Header from "../components/Header"; // Import Header

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode; // Added prop for custom header
}

const Layout = ({ children, header }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Render Header always */}
      {header || <Header />}
      {/* Render the main content (children) */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
