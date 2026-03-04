import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { SetCell } from "./SetCell";

interface Props {
  data: any[];
  workoutSessionId: string;
  onPostSet: (payload: any) => Promise<void>;
}

const columnHelper = createColumnHelper<any>();

export const TrainingTable: React.FC<Props> = ({
  data,
  workoutSessionId,
  onPostSet,
}) => {
  const columns = [
    columnHelper.accessor("name", {
      header: "Ejercicio",
      cell: (info: any) => (
        <div
          style={{ fontWeight: "900", color: "#1e293b", padding: "12px 16px" }}
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("target", {
      header: "Objetivo",
      cell: (info: any) => (
        <span
          style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold" }}
        >
          {info.getValue()}
        </span>
      ),
    }),
    ...[1, 2, 3, 4].map((sNum) =>
      columnHelper.accessor(`sets.${sNum - 1}`, {
        header: `S${sNum}`,
        cell: (info: any) => {
          const exerciseName = info.row.original.name;
          const existingSets = info.row.original.sets;
          const existingSet = existingSets.find(
            (s: any) => s.setNumber === sNum,
          );

          return (
            <SetCell
              workoutSessionId={workoutSessionId}
              exerciseName={exerciseName}
              setNumber={sNum}
              existingSet={existingSet}
              onSave={onPostSet}
            />
          );
        },
      }),
    ),
    columnHelper.display({
      id: "status",
      header: "Estado",
      cell: (info: any) => {
        const completedCount = info.row.original.sets.length;
        const targetCount = info.row.original.targetSets;
        const isDone = completedCount >= targetCount;
        return (
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "9px",
                fontWeight: "bold",
                background: isDone ? "#22c55e" : "#f1f5f9",
                color: isDone ? "white" : "#64748b",
                padding: "4px 10px",
                borderRadius: "6px",
                letterSpacing: "0.05em",
              }}
            >
              {isDone ? "COMPLETADO" : `${completedCount}/${targetCount}`}
            </span>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        background: "white",
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead
          style={{
            background: "#f8fafc",
            fontSize: "10px",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "2px solid #f1f5f9",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr
              key={row.id}
              style={{
                borderBottom: "1px solid #f8fafc",
                transition: "background 0.2s ease",
              }}
            >
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} style={{ padding: "8px 12px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
