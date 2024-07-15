import React, { useEffect, useMemo, useState } from 'react'; 
import './style/Table.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { User } from '../types/user';
import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../utils/query.keys';

interface TableProps {
  tableData: User[];
}

const Table = ({ tableData }: TableProps) => {
    const [data, setData] = useState<User[]>(tableData);
    const [ isDeleting, setIsDeleting ] = useState(false);
  
    useEffect(() => {
      setData(tableData);
    }, [tableData]);
    
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
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        {
          id: 'delete',
          header: 'Delete',
          cell: (info: any) => (
            <div className='delete-container'>
                <button className="delete-btn" onClick={() => mutate(info.row.original.id)}>{isDeleting ? 'Deleting...' : 'Delete'}</button></div>
          ),
          footer: (info: any) => info.column.id,
        },
      ];
  }, [data, isDeleting]);


  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.deleteUser],
    mutationFn: async (userId: string) => {
        setIsDeleting(true);
        await fetch(`http://localhost:4000/api/users/delete/${userId}` ,{
            method: 'DELETE',
        });
        return userId;
    },
      onSuccess: (userId: string) => {
        setIsDeleting(false);
        const dataCopy = data.filter(user => user.id != +userId);
        setData(dataCopy);
      }
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
        { table.getRowCount() > 0 ?
        <div className="table-container">
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
      </div>
        :
        <div className='no-results'><h2>No Results</h2></div>
        }
    </>
    
  );
};

export default Table;

