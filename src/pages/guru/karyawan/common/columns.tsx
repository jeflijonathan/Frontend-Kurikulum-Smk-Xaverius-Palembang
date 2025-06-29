import { Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { KaryawanModel } from "@api/karyawan/model";
import useUpdateKaryawanForm from "../Update/hook/useUpdateKaryawanForm";
import CardUpdateKaryawan from "../partials/CardUpdateKaryawan";

const KaryawanColumn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedKdKaryawan, setSelectedKdKaryawan] = useState<string | null>(
    null
  );

  const { KaryawanUpdatereqForm } = useUpdateKaryawanForm();

  const handleOpenDialog = (kd_karyawan: string) => {
    setSelectedKdKaryawan(kd_karyawan);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedKdKaryawan(null);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<KaryawanModel>[] = [
    {
      accessorKey: "kd_karyawan",
      header: "Kd Karyawan",
    },
    {
      accessorKey: "niy",
      header: "NIY",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role.name",
      header: "Role",
    },
    {
      accessorKey: "name",
      header: "Nama Karyawan",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: KaryawanModel } }) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${
            !row.original.status ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {!row.original.status ? "Disable" : "Active"}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }: { row: { original: KaryawanModel } }) =>
        format(new Date(row?.original?.created_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "update_at",
      header: "Update At",
      cell: ({ row }: { row: { original: KaryawanModel } }) =>
        format(new Date(row?.original?.updated_at), "MMM dd, yyyy"),
      meta: { hideOnMobile: true },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: KaryawanModel } }) => (
        <>
          <button
            className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
            onClick={() => handleOpenDialog(row.original.kd_karyawan)}
          >
            <Edit />
          </button>

          {isDialogOpen && selectedKdKaryawan === row.original.kd_karyawan && (
            <FormProvider {...KaryawanUpdatereqForm}>
              <CardUpdateKaryawan
                isOpen={isDialogOpen}
                kd_karyawan={selectedKdKaryawan}
                onClose={handleCloseDialog}
              />
            </FormProvider>
          )}
        </>
      ),
    },
  ];

  return columns;
};

export default KaryawanColumn;
