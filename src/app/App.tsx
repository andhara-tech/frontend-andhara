
import { useAuthCheck } from "@/app/stores/authStore";
import { RouterProvider } from "react-router-dom";
import router from "@/app/routes/routes.tsx";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  useAuthCheck()

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        expand={false}
        position="bottom-right"
      />
    </>
  );
};

export default App;
