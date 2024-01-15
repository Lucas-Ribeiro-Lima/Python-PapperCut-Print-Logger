import { PrinterIcon } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex flex-row gap-2 text-2xl bg-gradient-to-r font-semibold from-slate-800 via-sky-700 to-sky-400 bg-clip-text text-transparent ">
      <PrinterIcon className="text-sky-800"></PrinterIcon>
      <div>PrinterView</div>
    </div>
  )
}
