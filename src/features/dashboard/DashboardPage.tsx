import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const DashboardPage = () => { 
  return (
    <div>
      <Button
        onClick={() => toast.success("Button clicked!")}
      >Click me</Button>
    </div>
  );
}

export default DashboardPage;
