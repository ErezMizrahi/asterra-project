import React, { useMemo, useState } from 'react'; 
import './style/Table.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { User } from '../types/user';





interface TableProps {
  tableData: User[];
}

const Table = ({ tableData }: TableProps) => {
  const [data, _setData] = useState<User[]>(tableData);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<User>();
    return [
        columnHelper.accessor('firstName', {
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor('lastName', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
          }),
        columnHelper.accessor('address', {
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor('phoneNumber', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('hobbies', {
            cell: (info) => info.getValue().join(', '),
            footer: (info) => info.column.id,
        }),
        {
          id: 'delete',
          header: 'Delete',
          cell: (info: any) => (
            <button onClick={() => console.log(info.row.original.id)}>Delete</button>
          ),
          footer: (info: any) => info.column.id,
        },
      ];
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container p-2">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="table-header">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       
      </table>
      <div className="spacer" />
    </div>
  );
};

export default Table;

