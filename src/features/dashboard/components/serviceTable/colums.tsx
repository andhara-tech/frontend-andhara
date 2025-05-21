import { ColumnDef } from "@tanstack/react-table";
import { CustomerService } from "@/features/dashboard/types/purchaseTypes";
import { Button } from "@/components/ui/button";
import { formaterDate, getDaysRemainingColor } from "@/lib/utils";
import { ServiceActions } from "./serviceActions";
import { TooltipComment } from "./serviceTooltipcomment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getTooltipContent } from "./alertTooltip";

export const getColumns = (): ColumnDef<CustomerService>[] => {
  return [
    {
      id: "status_color",
      cell: ({ row }) =>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={`w-4 h-4 rounded-full border border-white bg-${getDaysRemainingColor(
                  row.original.days_remaining
                )}`}
              />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} align="end" alignOffset={-5} className={`bg-${getDaysRemainingColor(row.original.days_remaining)} text-white`}>
              {getTooltipContent(row.original.days_remaining)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    },
    {
      id: "branch_name",
      accessorFn: row => row.branch_name,
      header: () => <Button variant="ghost">Sucursal</Button>,
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.branch_name}
        </div>
    },
    {
      id: "customer_full_name",
      accessorFn: row => row.customer_full_name,
      header: () => <Button variant="ghost">Cliente</Button>,
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.customer_full_name}
        </div>
    },
    {
      accessorKey: "phone_number",
      header: () => <Button variant="ghost">Teléfono</Button>,
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.phone_number}
        </div>
    },
    {
      accessorKey: "service_date",
      header: () => <Button variant="ghost">Fecha</Button>,
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {formaterDate(row.original.service_date)}
        </div>
    },
    {
      id: "days_remaining",
      header: () => <Button variant="ghost">Dias restantes</Button>,
      cell: ({ row }) =>
        <div className="text-center max-w-[100px]">
          <span
            className={`
            bg-${getDaysRemainingColor(row.original.days_remaining)} 
            text-white px-2 py-1 rounded border border-white
          `}
          >
            {row.original.days_remaining} días
          </span>
        </div>
    },
    {
      id: "warning",
      cell: ({ row }) =>
        <div className="text-center max-w-[50px]">
          {row.original.isComment && (
            <TooltipComment row={row} />
          )}
        </div>
    },
    {
      id: "actions",
      cell: ({ row }) =>
        <div className="sticky right-0 bg-transparent ">
          <ServiceActions row={row} />
        </div>,
      size: 100,
      enableSorting: false,
      enableColumnFilter: false
    }
  ];
};
