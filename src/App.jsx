import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import DemoPage from "./pages/demo/DemoPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import DashboardPage from "./pages/demo/DashboardPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
}


export default App;
