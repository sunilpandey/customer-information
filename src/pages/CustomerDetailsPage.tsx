import { CustomerTable } from "../components/customers/table";
import { Header } from "../components/customers/Header";
export function CustomerDetailsPage() {
  return <div className="flex-1 p-10 h-screen overflow-y-scroll">
    <Header />
    <CustomerTable />
  </div>;
}