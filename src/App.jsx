import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import DemoPage from "./pages/demo/DemoPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
<ScrollToTop />
    </>
  );
}


export default App;
