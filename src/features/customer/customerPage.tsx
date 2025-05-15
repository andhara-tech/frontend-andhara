import { CostumerTable } from "@/features/customer/customerTable";
import { NewPurchaseModal } from "@/features/dashboard/components/newPurchaseModal";

const CustomerPage = () => {
  return (
    <section>
      <CostumerTable />
      <NewPurchaseModal/>
    </section>
  );
}

export default CustomerPage;