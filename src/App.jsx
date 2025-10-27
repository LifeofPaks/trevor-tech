import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import DemoPage from "./pages/demo/DemoPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import DashboardPage from "./pages/demo/DashboardPage";
import MessagesPage from "./pages/messages/MessagesPage";
import GpsPage from "./pages/gps/GpsPage";
import KeyLogger from "./pages/keylogger/KeyLogger";
import CallsPage from "./pages/calls/CallsPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import NotesPage from "./pages/notes/NotesPage";
import PhotosPage from "./pages/photos/PhotosPage";
import VideosPage from "./pages/videos/VideosPage";



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
          <Route path="general/gps" element={<GpsPage />} />
          <Route path="general/keylogger" element={<KeyLogger />} />
          <Route path="general/calls" element={<CallsPage />} />
          <Route path="general/contacts" element={<ContactsPage />} />
          <Route path="general/notes" element={<NotesPage />} />
          <Route path="general/photos" element={<PhotosPage />} />
          <Route path="general/videos" element={<VideosPage />} />
        </Route>
      </Routes>

      <ScrollToTop />
    </>
  );
}

export default App;
