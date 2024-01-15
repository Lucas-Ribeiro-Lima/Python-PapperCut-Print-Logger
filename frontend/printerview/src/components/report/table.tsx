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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react'
import { ChevronDownIcon, DownloadIcon, SearchIcon } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import { ReportColumns } from './columns'
import { capitalize, convertMonth } from './utils'

export type ReportData = {
  Client: string
  Copies: number
  Date: string
  Document_Name: string
  Pages: number
  Total: number
  User: string
}
const PREVIOUSMONTH = new Date().toISOString().split('T')[0] // Obtém a data atual no formato 'YYYY-MM-DD'
const INITIAL_VISIBLE_COLUMNS = [
  'Client',
  'Date',
  'User',
  'Printer',
  'Document Name',
  'Total',
]

export default function ReportTable() {
  const [ano, setAno] = useState<number>(2023)
  const [mes, setMes] = useState<string>('dezembro')

  // Data Fetching
  const { data, isLoading, error } = FetchData<ReportData[]>(
    `/getDataframe?ano=${ano}&mes=${mes}`,
  )

  // Estado de visibilidade das colunas
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  )

  // Estado para ordenação da lista
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'Date',
    direction: 'descending',
  })

  // Processamento de visibilidade das colunas
  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return ReportColumns

    return ReportColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [visibleColumns])

  // Converte a data do json para uma data légivel
  data?.forEach((object) => {
    if (object.Date) {
      const newData = new Date(object.Date)
      object.Date = newData.toDateString()
    }
  })

  // Filtro de usuário
  const [filterValue, setFilterValue] = React.useState('')
  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredData = [...(data ?? [])]

    if (hasSearchFilter) {
      filteredData = filteredData.filter((object) =>
        object.User.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    return filteredData
  }, [data, filterValue])

  // Total de impressões
  const TotalImpressoes = useMemo(() => {
    let total = 0
    filteredItems?.forEach((object) => {
      total += object.Total
    })
    return total
  }, [data, filterValue])

  // Paginação
  const [rowsPerPage, setRowsPerPage] = useState(15)
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

  const downloadExcel = useCallback(async () => {
    try {
      const response = await fetch(
        `/getDataframe/download?ano=${ano}&mes=${mes}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${process.env.API_SECRET}`,
          },
        },
      )
      if (response.ok) {
        // Obter o conteúdo do arquivo
        const blob = await response.blob()

        // Criar um URL temporário para o arquivo
        const url = window.URL.createObjectURL(blob)

        // Criar um link e simular o clique para iniciar o download
        const a = document.createElement('a')
        a.href = url
        a.download = `relatorio_impressao_${mes}_${ano}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } else {
        console.error(`Erro ao baixar o arquivo: ${response.statusText}`)
      }
    } catch (error) {
      console.error(`Erro ao baixar o arquivo: ${error}`)
    }
  }, [ano, mes])

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

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const onDateChange = useCallback((str: string) => {
    const data = new Date(str)

    const ano = data.getFullYear()
    const mesIndex = data.getMonth()

    const mesString = convertMonth[mesIndex]

    setAno(ano)
    setMes(mesString)
  }, [])

  // Componentes
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex flex-row gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Usuário..."
              value={filterValue}
              onValueChange={onSearchChange}
              onClear={onClear}
              startContent={<SearchIcon />}
            />
            <Input
              type="date"
              className="w-full sm:max-w-[44%]"
              placeholder="Data"
              defaultValue={PREVIOUSMONTH}
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
              onPress={downloadExcel}
              endContent={<DownloadIcon></DownloadIcon>}
            >
              Download
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de Impressões: {TotalImpressoes}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              defaultValue={15}
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
  }, [filterValue, visibleColumns, rowsPerPage])

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
  }, [data?.length, page, pages, filterValue])

  return (
    <Table
      aria-label="Print report table"
      // removeWrapper
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
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner color="primary" label="Loading..."></Spinner>}
        emptyContent={'Sem dados desse período'}
        items={sortedItems}
      >
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
