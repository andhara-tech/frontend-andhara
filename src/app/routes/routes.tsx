import { createBrowserRouter } from 'react-router-dom'

import DashboardPage from "../../features/dashboard/DashboardPage.tsx";
import MarketingPage from "../../features/marketing/MarketingPage.tsx";
import Page404 from "../../features/notFound/NotFoundPage.tsx";
import AuthPage from "@/features/auth/AuthPage.tsx";

import { ProtectedRoute } from "../../shared/protectedRoute.tsx"


const router = createBrowserRouter ([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <DashboardPage /> },
    ]
  },
  {path: "/login", element: <AuthPage />},
  {path: "/marketing", element: <MarketingPage />},
  {path: "*", element: <Page404 />},
])

export default router
