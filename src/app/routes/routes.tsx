import { createBrowserRouter } from 'react-router-dom'

import DashboardPage from "../../features/dashboard/DashboardPage.tsx";
import Page404 from "../../features/notFound/NotFoundPage.tsx";
import AuthPage from "@/features/auth/AuthPage.tsx";

import { ProtectedRoute } from "../../shared/protectedRoute.tsx"
import MainLayout from '../layout/MainLayout.tsx';
import ClientPage from '@/features/clients/customerPage.tsx';
import ProductsPage from '@/features/products/productsPage.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/clientes", element: <ClientPage /> },
          { path: "/productos", element: <ProductsPage /> },
        ]
      }
    ]
  },
  { path: "/login", element: <AuthPage /> },
  { path: "*", element: <Page404 /> },
])

export default router
