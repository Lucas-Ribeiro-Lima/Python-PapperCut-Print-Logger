'use client'

import { FetchData } from '@/hooks/FetchData'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react'
import {
  ChevronDownIcon,
  DownloadIcon,
  Loader2,
  PrinterIcon,
  SearchIcon,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { ReportColumns } from './columns'
import { INITIAL_VISIBLE_COLUMNS } from './filters'
import {
  DEFAULTDATA,
  DEFAULTMONTH,
  DEFAULTYEAR,
  capitalize,
  convertData,
  convertMonth,
  downloadExcel,
} from './utils'

export type ReportData = {
  Client: string
  Copies: number
  Date: string
  Document_Name: string
  Pages: number
  Printer: string
  Total: number
  User: string
}

export default function ReportTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ano = searchParams.get('ano') || DEFAULTYEAR.toString()
  const mes = searchParams.get('mes') || DEFAULTMONTH
  // Estado de visibilidade das colunas

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  )

  // Estado para ordenação da lista
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'Date',
    direction: 'descending',
  })

  // Data Fetching
  const { data } = FetchData<ReportData[]>(
    `/getDataframe?ano=${ano}&mes=${mes}`,
  )

  const reportData = useMemo(() => {
    return convertData(data ?? [])
  }, [data])

  // Processamento de visibilidade das colunas
  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return ReportColumns

    return ReportColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [visibleColumns])

  // Filtro de usuário
  const [filterValue, setFilterValue] = React.useState('')
  const [printerValue, setPrinterValue] = useState('')
  const [downloading, setDownloading] = useState(false)
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredData = [...(data ?? [])]

    if (hasSearchFilter) {
      filteredData = filteredData.filter((object) =>
        object.User.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    if (printerValue) {
      filteredData = filteredData.filter((object) =>
        object.Printer.toLocaleLowerCase().includes(
          printerValue.toLocaleLowerCase(),
        ),
      )
    }
    return filteredData
  }, [reportData, filterValue, printerValue])

  // Total de impressões
  const TotalImpressoes = useMemo(() => {
    let total = 0
    filteredItems?.forEach((object) => {
      total += object.Total
    })
    return total
  }, [reportData, filterValue, printerValue])

  // Paginação
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const pages = Math.ceil((filteredItems || []).length / rowsPerPage)

  // Processamento dos itens exibidos
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  // Processamento de ordenação das colunas
  const sortedItems = useMemo(() => {
    const itemsToSort = items ?? []

    return [...itemsToSort].sort((a: ReportData, b: ReportData) => {
      const first = a[sortDescriptor.column as keyof ReportData] as number
      const second = b[sortDescriptor.column as keyof ReportData] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  // Funções de paginação
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    [],
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onPrinterChange = useCallback((value?: string) => {
    if (value) {
      setPrinterValue(value)
      setPage(1)
    } else {
      setPrinterValue('')
    }
  }, [])

  const onClearUser = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const onClearPrinter = useCallback(() => {
    setPrinterValue('')
    setPage(1)
  }, [])

  const onDateChange = useCallback((str: string) => {
    const data = new Date(str)

    const ano = data.getFullYear().toString()
    const mesIndex = data.getMonth()
    const mesString = convertMonth[mesIndex]

    router.push(
      `?${new URLSearchParams({
        ano,
        mes: mesString,
      })}`,
    )
  }, [])

  async function handleDownloadExcel() {
    setDownloading(true)
    const anoParams = searchParams.get('ano')
    const mesParams = searchParams.get('mes')
    downloadExcel(anoParams, mesParams).finally(() => {
      setDownloading(false)
    })
  }

  // Componentes
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Usuário..."
              value={filterValue}
              onValueChange={onSearchChange}
              onClear={onClearUser}
              startContent={<SearchIcon />}
            />
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Impressora..."
              value={printerValue}
              onValueChange={onPrinterChange}
              onClear={onClearPrinter}
              startContent={<PrinterIcon />}
            />
            <Input
              type="date"
              className="w-full sm:max-w-[44%]"
              placeholder="Data"
              defaultValue={DEFAULTDATA}
              onValueChange={onDateChange}
            />
          </div>
          <div className="flex flex-row gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Colunas"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {ReportColumns.map((ReportColumns) => (
                  <DropdownItem
                    key={ReportColumns.uid}
                    className="capitalize text-white"
                  >
                    {capitalize(ReportColumns.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              onPress={handleDownloadExcel}
              className="hidden sm:flex"
              endContent={!downloading ? <DownloadIcon></DownloadIcon> : null}
              disabled={downloading}
            >
              {!downloading ? (
                'Download'
              ) : (
                <Loader2 className="animate-spin">Downloading...</Loader2>
              )}
            </Button>
          </div>
        </div>
        <div className="hidden sm:flex  justify-between items-center">
          <div className="flex-1"></div>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={5}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [filterValue, printerValue, visibleColumns, rowsPerPage])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="bg-zinc-900 pl-2 pr-2 rounded-3xl text-white/80 text-2xl font-semibold">
          <span className="bg-gradient-to-r font-semibold from-sky-500 via-sky-700 to-sky-400 bg-clip-text text-transparent text-lg ">
            {'Total de Impressões: '}
          </span>
          <span className="text-lg">{TotalImpressoes}</span>
        </div>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }, [reportData?.length, page, pages, filterValue])

  return (
    <Table
      aria-label="Print report table"
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'Sem dados desse período'} items={sortedItems}>
        {(item) => (
          <TableRow key={data?.indexOf(item)}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
