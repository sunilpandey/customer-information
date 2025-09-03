import type { Customer } from "../../../domain/customer";
import { TableCell } from "@mui/material";

interface CustomerTableCellProps {
    item: Customer;
    columnKey: keyof Customer;
}
export function CustomerTableCell({ item, columnKey }: CustomerTableCellProps) {
  if (columnKey === "status") {
    return (
      <TableCell className="text-left m-auto w-30">
        <div
          className={`p-1 ${
            item[columnKey] === "Active" ? "bg-green-200" : "bg-red-200"
          } rounded-md text-center border-1 ${
            item[columnKey] === "Active" ? "border-green-400" : "border-red-400"
          }
          ${item[columnKey] === "Active" ? "text-green-900" : "text-red-900"}`}
        >
          {item[columnKey] === "Active" ? "Active" : "Inactive"}
        </div>
      </TableCell>
    );
  }
  return <TableCell className="text-left">{item[columnKey]}</TableCell>;
}
