import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import DemoPage from "./pages/demo/DemoPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </>
  );
}


export default App;
