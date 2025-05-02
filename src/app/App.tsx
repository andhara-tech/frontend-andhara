
import { RouterProvider } from "react-router-dom";
import router from "@/app/routes/routes.tsx";
import { Toaster } from "@/components/ui/sonner";
import { useAuthCheck } from "@/app/stores/authStore";

const App = () => {
  useAuthCheck()

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        richColors 
        expand={false}
        position="bottom-right"
      />
    </>
  );
};

export default App;
