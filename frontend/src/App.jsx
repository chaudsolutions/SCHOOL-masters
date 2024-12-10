import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./Components/Context/AuthContext";
import ScrollToTop from "react-scroll-to-top";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import Footer from "./Components/Custom/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useUserData } from "./Components/Hooks/useQueryFetch/useQueryData";

// components
import PageLoader from "./Components/Animations/PageLoader";
import Nav from "./Components/Custom/Nav/Nav";
import NotFound from "./Components/App/404/NotFound";
import BuggyComponent from "./Components/Error/Bug";
import Home from "./Components/App/Home/Home";
import Register from "./Components/App/Authentication/Register";
import Login from "./Components/App/Authentication/Login";
import Dashboard from "./Components/App/Dashboard/Dashboard";
import ManageUsers from "./Components/App/Dashboard/Roles/Admin/ManageUsers";
import Analytics from "./Components/App/Dashboard/Roles/Admin/Analytics";
import Announcements from "./Components/App/Dashboard/Roles/Admin/Announcements";
import Notifications from "./Components/App/Notifications/Notifications";
import CreateSurveys from "./Components/App/Dashboard/Roles/Admin/CreateSurveys";
import Survey from "./Components/App/Survey/Survey";
import SurveyId from "./Components/App/Survey/SurveyId";
import ResourcesManagement from "./Components/App/Dashboard/Roles/Admin/ResourcesManagement";
import Resources from "./Components/App/Resources/Resources";
import Messages from "./Components/App/Messages/Messages";
import Profile from "./Components/App/Profile/Profile";
import Overview from "./Components/App/Dashboard/Roles/Teacher/Overview";
import Assignments from "./Components/App/Dashboard/Roles/Teacher/Assignments";
import AssignmentsId from "./Components/App/Assignments/AssignmentId";
import StudentAssignment from "./Components/App/Dashboard/Roles/Student/StudentAssignment";
import Individuals from "./Components/App/Dashboard/Roles/Teacher/Individuals";
import ViewIndividuals from "./Components/App/Dashboard/Roles/Teacher/ViewIndividuals";
import MessageIndividual from "./Components/App/Dashboard/Roles/Teacher/MessageIndividual";
import PersonalizedDashboard from "./Components/App/Dashboard/Roles/Student/PersonalizedDashboard";
import Exams from "./Components/App/Dashboard/Roles/Teacher/Exams";
import Goals from "./Components/App/Dashboard/Roles/Student/Goals";
import GroupChat from "./Components/App/Dashboard/Roles/Student/GroupChat";
import ParentOverview from "./Components/App/Dashboard/Roles/Parent/ParentOverview";
import About from "./Components/App/About/About";

function App() {
  const { user } = useAuthContext();

  const { userData, isUserDataLoading } = useUserData();

  const { role } = userData || {};
  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isStudent = role === "student";
  const isParent = role === "parent";

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
            <Route path="/" exact element={<Home />} />

            {/* about */}
            <Route path="/about" element={<About />} />

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

            {/* profile route */}
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            {/* messages route */}
            <Route
              path="/messages"
              element={
                user && (isAdmin || isTeacher) ? (
                  <Messages />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* surveys route */}
            <Route
              path="/surveys"
              element={user ? <Survey /> : <Navigate to="/login" />}
            />
            {/* survey ID route */}
            <Route
              path="/survey/:surveyId"
              element={user ? <SurveyId /> : <Navigate to="/login" />}
            />

            {/* resources route */}
            <Route
              path="/:role/resources"
              element={user ? <Resources /> : <Navigate to="/login" />}
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
            <Route
              path="/admin/surveys"
              element={
                user && isAdmin ? <CreateSurveys /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/admin/resources-management"
              element={
                user && isAdmin ? (
                  <ResourcesManagement />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* teachers route */}
            <Route
              path="/teacher/overview"
              element={
                user && isTeacher ? <Overview /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/teacher/assignments"
              element={
                user && isTeacher ? <Assignments /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/assignment/:assignmentId"
              element={
                user && (isTeacher || isStudent) ? (
                  <AssignmentsId />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/teacher/individuals"
              element={
                user && isTeacher ? <Individuals /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/view/:userRole/:userId"
              element={
                user && (isTeacher || isParent) ? (
                  <ViewIndividuals />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/teacher/message/:userId"
              element={
                user && (isTeacher || isStudent || isParent) ? (
                  <MessageIndividual />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/teacher/exams"
              element={user && isTeacher ? <Exams /> : <Navigate to="/login" />}
            />

            {/* students route */}
            <Route
              path="/student/assignments"
              element={
                user && isStudent ? (
                  <StudentAssignment />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student/personalized-dashboard"
              element={
                user && isStudent ? (
                  <PersonalizedDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/student/goals"
              element={user && isStudent ? <Goals /> : <Navigate to="/login" />}
            />
            <Route
              path="/student/chatroom"
              element={
                user && (isStudent || isTeacher) ? (
                  <GroupChat />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* parents route */}
            <Route
              path="/parent/overview"
              element={
                user && isParent ? <ParentOverview /> : <Navigate to="/login" />
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
