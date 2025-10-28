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
import WifiPage from "./pages/wifi/WifiPage";
import Keywords from "./pages/keywords/Keywords";
import AppsPage from "./pages/appsPage/AppsPage";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";
import HistoryPage from "./pages/history/HistoryPage";
import EmailPage from "./pages/email/EmailPage";
import SimPage from "./pages/sim/SimPage";
import ScreenshotsPage from "./pages/screenshots/ScreenshotsPage";
import GeofencePage from "./pages/geofence/GeofencePage";
import WebsiteBlockPage from "./pages/websiteBlock/WebsiteBlockPage";
import WifiBlockPage from "./pages/wifiBlock/WifiBlockPage";
import AppBlockPage from "./pages/appBlock/AppBlockPage";
import WhatsAppPage from "./pages/whatsApp/WhatsAppPage";
import FacebookPage from "./pages/facebook/FacebookPage";
import MessengerPage from "./pages/messenger/MessengerPage";
import InstagramPage from "./pages/instagram/InstagramPage";
import XPage from "./pages/x/XPage";
import TiktokPage from "./pages/tiktok/TiktokPage";
import SnapchatPage from "./pages/snapchat/SnapchatPage";
import LinkedInPage from "./pages/linkedin/LinkedInPage";
import ZoomPage from "./pages/zoom/ZoomPage";
import ViberPage from "./pages/viber/ViberPage";



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
          <Route path="general/wifi" element={<WifiPage />} />
          <Route path="general/wifi" element={<WifiPage />} />
          <Route path="general/keywords" element={<Keywords />} />
          <Route path="general/apps" element={<AppsPage />} />
          <Route path="general/bookmarks" element={<BookmarksPage />} />
          <Route path="general/history" element={<HistoryPage />} />
          <Route path="general/email" element={<EmailPage />} />
          <Route path="general/sim" element={<SimPage />} />
          <Route path="captures/screenshots" element={<ScreenshotsPage />} />
          <Route path="controls/geofence" element={<GeofencePage />} />
          <Route path="controls/website-block" element={<WebsiteBlockPage />} />
          <Route path="controls/wifi-block" element={<WifiBlockPage />} />
          <Route path="controls/app-block" element={<AppBlockPage />} />
          <Route path="social/whatsapp" element={<WhatsAppPage />} />
          <Route path="social/facebook" element={<FacebookPage />} />
          <Route path="social/messenger" element={<MessengerPage />} />
          <Route path="social/instagram" element={<InstagramPage />} />
          <Route path="social/x" element={<XPage />} />
          <Route path="social/tiktok" element={<TiktokPage />} />
          <Route path="social/snapchat" element={<SnapchatPage />} />
          <Route path="social/linkedin" element={<LinkedInPage />} />
          <Route path="social/zoom" element={<ZoomPage />} />
          <Route path="social/viber" element={<ViberPage />} />
        </Route>
      </Routes>

      <ScrollToTop />
    </>
  );
}

export default App;

