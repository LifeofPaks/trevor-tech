import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import DemoPage from "./pages/demo/DemoPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import DashboardPage from "./pages/demo/DashboardPage";
import MessagesPage from "./pages/messages/MessagesPage";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Demo Section */}
        <Route path="/demo" element={<DemoPage />}>
          {/* Redirect /demo → /demo/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="general/messages" element={<MessagesPage />} />
        </Route>
      </Routes>

      <ScrollToTop />
    </>
  );
}

export default App;
