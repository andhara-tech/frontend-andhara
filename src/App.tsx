import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "@/pages/admin";
import MarketingPage from "./pages/marketing";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketingPage/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Router>
  );
};

export default App;
