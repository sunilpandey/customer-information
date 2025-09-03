import { CustomerDetailsPage } from "../pages/CustomerDetailsPage";
import { UnderConstruction } from "../pages/UnderConstruction";
export const routes = [
  {
    path: "customers",
    element: <CustomerDetailsPage />,
  },
  {
    path: "under-construction",
    element: <UnderConstruction />,
  }
];