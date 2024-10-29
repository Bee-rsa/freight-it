import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/UserRegister";
import SignIn from "./pages/SignIn";
import AddServices from "./pages/AddServices";
import { useAppContext } from "./contexts/AppContext";
import MyServices from "./pages/MyServices";
import EditServices from "./pages/EditServices";
import Search from "./pages/Search";
import Detail from "./components/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions"; 
import AboutFreightIt from "./pages/AboutFreightIt"; // Import the About Freight iT page
import Policy from "./pages/Policy"; 
import Operator from "./pages/OperatorSignIn" // Import the Policy page 
import Registers from "./pages/OperatorRegister"
import OperatorHome from "./pages/OperatorHome"
import UserHome from "./pages/UserHome"
import OperatorLayout from "./layouts/OperatorLayout";
import Pricing from "./pages/Pricing";
import Trucking from "./pages/Trucking"
import Blog from "./pages/Blog"
import OperatorSignIn from "./pages/OperatorSignIn";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/user-home"
          element={
            <Layout>
              <UserHome />
            </Layout>
          }
        />
        <Route
          path="/operator-home"
          element={
            <OperatorLayout>
              <OperatorHome />
            </OperatorLayout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/operator-sign-in"
          element={
            <Layout>
              <Operator />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <Pricing />
            </Layout>
          }
        />
        <Route
          path="/trucking"
          element={
            <Layout>
              <Trucking />
            </Layout>
          }
        />
        <Route
          path="/registers"
          element={
            <OperatorLayout>
              <Registers />
            </OperatorLayout>
          }
        />
        <Route
          path="/detail/:servicesId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/operator-sign-in"
          element={
            <Layout>
              <OperatorSignIn />
            </Layout>
          }
        />
        {/* Add Terms and Conditions Route */}
        <Route
          path="/terms-and-conditions"
          element={
            <Layout>
              <TermsAndConditions />
            </Layout>
          }
        />
        {/* Add About Freight iT Route */}
        <Route
          path="/about-freight-it"
          element={
            <Layout>
              <AboutFreightIt />
            </Layout>
          }
        />
        {/* Add Policy Route */}
        <Route
          path="/policy"
          element={
            <Layout>
              <Policy />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/services/:servicesId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-services"
              element={
                <Layout>
                  <AddServices />
                </Layout>
              }
            />
            <Route
              path="/edit-services/:servicesId"
              element={
                <Layout>
                  <EditServices />
                </Layout>
              }
            />
            <Route
              path="/my-services"
              element={
                <Layout>
                  <MyServices />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
