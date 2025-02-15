/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLAttributes } from 'react'


export interface ColumnProps<T> {
    field: string;
    label?: string;
    props?: HTMLAttributes<HTMLTableCellElement>;
    render?: (value: T) => React.ReactNode;

}


interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
    data?: T[];
    columns: ColumnProps<T>[];
}

const Table = <T extends object>({ data, columns,...props }: TableProps<T>) => {
  return (
    <table className="table w-full" {...props}>
      <thead>
        <tr>
            <th>#</th>
          {columns.map((column, index) => (
            <th key={index} {...column.props}>
              {column.label || column.field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th>{rowIndex + 1}</th>
            {columns.map((column, colIndex) => (
              <td key={colIndex} {...column.props}>
                {column.render ? column.render(row) : (row as Record<string, any>)[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table