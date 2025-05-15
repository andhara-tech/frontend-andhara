import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <h2 className="text-[200px] font-bold text-primary">404</h2>
      <div className="h-[150px] w-[250px]">
      <p className="mb-4 text-3xl uppercase">Pagína no encontrada</p>
      <Link to="/">
        <Button className="w-full">
          Ir al dashboard
        </Button>
      </Link>

      </div>
    </div>
  );
};

export default Page404;

