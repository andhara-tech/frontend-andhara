
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardPage from "../features/dashboard/DashboardPage.tsx";
import MarketingPage from "../features/marketing/MarketingPage.tsx";
import Page404 from "../features/notFound/NotFoundPage.tsx";
import AuthPage from "@/features/auth/AuthPage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketingPage/>} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </Router>
  );
};

export default App;
