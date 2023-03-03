import { formatCurrency } from 'lib/helpers';
import { useEffect } from 'react'
import { useTable, usePagination } from "react-table";
import { Button, PageButton } from "../shared/Button";
import { DOTS, useCustomPagination } from '/lib/useCustomPagination';

const TransactionTable = ({ transactions }) => {
  const columns = [
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Category",
      accessor: "category",
    }
  ]

  function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state
      } =
      useTable({
        columns,
        data,
      },
        usePagination
      );

    const {pageIndex} = state;
    const paginationRange = useCustomPagination({
      totalPageCount: pageCount,
      currentPage: pageIndex
    });

    useEffect(() => {
        setPageSize(5);
      }, [setPageSize]);

    return (
      <>
        <div className="pt-10 mt-2 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow border-b border-gray-200 sm:rounded-lg">
                  <table {...getTableProps()} className="min-w-full divide-y divide-gray-300">
                    <thead className="">
                      {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th key={headerGroup } {...column.getHeaderProps()}
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                      ))}
                  </thead>
                  <tbody {...getTableBodyProps()}
                  className="divide-y divide-gray-20">
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr key={row} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          if (cell.column['Header'] === 'Category') {
                            if (cell.value === 'Income') {
                              return <td key={cell} {...cell.getCellProps()} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">{cell.render("Cell")}</span>
                              </td>
                            } else {
                              return <td key={cell} {...cell.getCellProps()} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">{cell.render("Cell")}
                                </span>
                              </td>
                            }
                          } else if(cell.column['Header'] === 'Amount') {
                            return <td key={cell} {...cell.getCellProps()} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency.format(cell.value)}</span>
                            </td>
                          } else {
                            return <td key={cell} {...cell.getCellProps()} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cell.render("Cell")}</td>
                          }
                        })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 flex items-center text-center justify-center">
          <div className="flex-1 flex justify-between md:hidden">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" aria-label="Pagination">
            <div className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10" aria-label="Pagination">
              {paginationRange?.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                  return (
                    <PageButton key={index}>...</PageButton>
                  );
                }

                if ((pageNumber - 1) === pageIndex) {
                  return (
                    <PageButton
                      key={index}
                      classes='active:bg-gray-500 active:border-gray-300'
                      onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}
                    </PageButton>
                  );
                }

                return (
                  <PageButton
                    key={index}
                    classes='active:bg-gray-500 active:border-gray-300'
                    onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}
                  </PageButton>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  return ( <>
     <Table columns={columns} data={transactions} />
  </> );
}

export default TransactionTable;
