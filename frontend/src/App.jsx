import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./Components/Context/AuthContext";
import ScrollToTop from "react-scroll-to-top";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import Footer from "./Components/Custom/Footer/Footer";
import { Toaster } from "react-hot-toast";

// components
import Nav from "./Components/Custom/Nav/Nav";
import NotFound from "./Components/App/404/NotFound";
import BuggyComponent from "./Components/Error/Bug";
import Home from "./Components/App/Home/Home";
import Register from "./Components/App/Authentication/Register";
import Login from "./Components/App/Authentication/Login";
import Dashboard from "./Components/App/Dashboard/Dashboard";
import { useUserData } from "./Components/Hooks/useQueryFetch/useQueryData";
import PageLoader from "./Components/Animations/PageLoader";
import ManageUsers from "./Components/App/Dashboard/Roles/Admin/ManageUsers";
import Analytics from "./Components/App/Dashboard/Roles/Admin/Analytics";
import Announcements from "./Components/App/Dashboard/Roles/Admin/Announcements";
import Notifications from "./Components/App/Notifications/Notifications";

function App() {
  const { user } = useAuthContext();

  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};
  const isAdmin = role === "admin";

  if (isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="app-div">
          <Nav />

          {/* routing */}
          <Routes>
            {/* home */}
            <Route
              path="/"
              exact
              element={!user ? <Home /> : <Navigate to="/dashboard" />}
            />

            {/* authentication */}
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />

            {/* notifications route */}
            <Route
              path="/notifications"
              element={user ? <Notifications /> : <Navigate to="/login" />}
            />

            {/* dashboard */}
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            {/* admin routes */}
            <Route
              path="/admin/users"
              element={
                user && isAdmin ? <ManageUsers /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin/analytics"
              element={
                user && isAdmin ? <Analytics /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin/announcements"
              element={
                user && isAdmin ? <Announcements /> : <Navigate to="/login" />
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />

            {/* Buggy Route */}
            <Route path="/buggy" element={<BuggyComponent />} />
          </Routes>
        </div>

        {/* scroll to top BTN */}
        <ScrollToTop
          color="black"
          smooth
          width="20"
          height="20"
          className="scrollToTopBtn"
        />

        {/* footer */}
        <Footer />

        {/* custom components */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;
