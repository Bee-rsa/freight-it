import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Layout from "./layouts/OperatorLayout";
  import Registers from "./pages/OperatorRegister";
  import SignIn from "./pages/OperatorSignIn";
  import AddServices from "./pages/AddServices";
  import { useAppContext } from "./contexts/OperatorAppContext";
  import MyServices from "./pages/MyServices";
  import EditServices from "./pages/EditServices";
  import Search from "./pages/Search";
  import Detail from "./components/Details";
  import Booking from "./pages/Booking";
  import MyBookings from "./pages/MyBooking";
  import Home from "./pages/Home";
  import TermsAndConditions from "./pages/TermsAndConditions"; 
  import AboutFreightIt from "./pages/AboutFreightIt"; // Import the About Freight iT page
  import Policy from "./pages/Policy"; // Import the Policy page
  
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
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
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
            path="/registers"
            element={
              <Layout>
                <Registers />
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
  