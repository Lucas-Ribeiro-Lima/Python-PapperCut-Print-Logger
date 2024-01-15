import ReportTable from '../report/table'
import Header from './Header'

export default function Main() {
  return (
    <div className="flex flex-col w-screen h-screen text-white">
      <div className="h-16 bg-gradient-to-r from-slate-800 via-gray-700 to-slate-900">
        <Header></Header>
      </div>
      <div className="flex-1 p-12">
        <ReportTable></ReportTable>
      </div>
    </div>
  )
}
