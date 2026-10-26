import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  TrendingUp,
  Wrench,
} from "lucide-react";

type ReportPeriod = "7d" | "30d" | "90d" | "year";
type ReportPoint = { label: string; revenue: number; workOrders: number };

const reportSeries: Record<ReportPeriod, ReportPoint[]> = {
  "7d": [
    { label: "Mon", revenue: 2850, workOrders: 8 },
    { label: "Tue", revenue: 3420, workOrders: 11 },
    { label: "Wed", revenue: 3180, workOrders: 9 },
    { label: "Thu", revenue: 4270, workOrders: 14 },
    { label: "Fri", revenue: 3650, workOrders: 12 },
    { label: "Sat", revenue: 4980, workOrders: 16 },
    { label: "Sun", revenue: 3920, workOrders: 10 },
  ],
  "30d": [
    { label: "Week 1", revenue: 18200, workOrders: 48 },
    { label: "Week 2", revenue: 21900, workOrders: 55 },
    { label: "Week 3", revenue: 19750, workOrders: 51 },
    { label: "Week 4", revenue: 24600, workOrders: 63 },
  ],
  "90d": [
    { label: "Week 1", revenue: 42100, workOrders: 112 },
    { label: "Week 2", revenue: 48750, workOrders: 128 },
    { label: "Week 3", revenue: 45300, workOrders: 119 },
    { label: "Week 4", revenue: 53200, workOrders: 143 },
    { label: "Week 5", revenue: 50600, workOrders: 136 },
    { label: "Week 6", revenue: 58700, workOrders: 157 },
  ],
  year: [
    { label: "Jan", revenue: 132000, workOrders: 345 },
    { label: "Feb", revenue: 145000, workOrders: 372 },
    { label: "Mar", revenue: 139000, workOrders: 361 },
    { label: "Apr", revenue: 158000, workOrders: 408 },
    { label: "May", revenue: 151000, workOrders: 394 },
    { label: "Jun", revenue: 172000, workOrders: 443 },
    { label: "Jul", revenue: 165000, workOrders: 421 },
    { label: "Aug", revenue: 181000, workOrders: 468 },
    { label: "Sep", revenue: 174000, workOrders: 452 },
    { label: "Oct", revenue: 193000, workOrders: 491 },
    { label: "Nov", revenue: 187000, workOrders: 479 },
    { label: "Dec", revenue: 211000, workOrders: 536 },
  ],
};

const periodLabels: Record<ReportPeriod, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  year: "This year",
};

const statusData = [
  { label: "Completed", value: 68, count: 42, color: "completed" },
  { label: "In Progress", value: 19, count: 12, color: "in-progress" },
  { label: "Awaiting Parts", value: 8, count: 5, color: "awaiting" },
  { label: "Ready for Delivery", value: 5, count: 3, color: "ready" },
];

const mechanicPerformance = [
  { name: "Ali Hassan", role: "Engine Specialist", initials: "AH", jobs: 32, rating: 4.9, completion: 96 },
  { name: "M. Khan", role: "Brake Specialist", initials: "MK", jobs: 28, rating: 4.8, completion: 93 },
  { name: "Ahmed Raza", role: "Electrical", initials: "AR", jobs: 25, rating: 4.7, completion: 91 },
  { name: "Bilal Khan", role: "AC Specialist", initials: "BK", jobs: 21, rating: 4.6, completion: 89 },
];

const recentInvoices = [
  { id: "INV-00152", customer: "Sheikh Ahmed", date: "14 Apr 2025", amount: 930, status: "Pending" },
  { id: "INV-00151", customer: "Muhammad Muddasir", date: "13 Apr 2025", amount: 650, status: "Paid" },
  { id: "INV-00150", customer: "Ali Shah", date: "12 Apr 2025", amount: 400, status: "Pending" },
  { id: "INV-00149", customer: "Khalid Al Marri", date: "11 Apr 2025", amount: 820, status: "Paid" },
];

const formatMoney = (value: number) =>
  `QAR ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

function Reports({ notify }: { notify: (message: string) => void }) {
  const [period, setPeriod] = useState<ReportPeriod>("30d");
  const series = reportSeries[period];
  const summary = useMemo(() => {
    const revenue = series.reduce((total, point) => total + point.revenue, 0);
    const workOrders = series.reduce((total, point) => total + point.workOrders, 0);
    const invoices = Math.round(workOrders * 0.91);
    return { revenue, workOrders, invoices, averageInvoice: invoices ? revenue / invoices : 0 };
  }, [series]);
  const maxRevenue = Math.ceil(Math.max(...series.map((point) => point.revenue)) / 1000) * 1000;
  const chartWidth = Math.max(440, series.length * 74);
  const chartHeight = 196;
  const points = series.map((point, index) => ({
    x: series.length === 1 ? chartWidth / 2 : 82 + (index * (chartWidth - 96)) / (series.length - 1),
    y: chartHeight - 18 - (point.revenue / maxRevenue) * (chartHeight - 36),
  }));
  const revenuePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  const downloadReport = () => {
    try {
      const rows = [
        ["Period", "Label", "Revenue (QAR)", "Work Orders"],
        ...series.map((point) => [periodLabels[period], point.label, String(point.revenue), String(point.workOrders)]),
      ];
      const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\r\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `garage-report-${period}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      notify("Report CSV downloaded.");
    } catch {
      notify("The report could not be downloaded in this browser.");
    }
  };

  return (
    <main className="reports-page">
      <header className="reports-heading">
        <div className="reports-title">
          <span><TrendingUp size={24} /></span>
          <div><h1>Reports & Analytics</h1><p>Track workshop performance, revenue, invoices, and team productivity.</p></div>
        </div>
        <div className="reports-toolbar">
          <label className="reports-period"><CalendarDays size={16} /><select value={period} onChange={(event) => setPeriod(event.target.value as ReportPeriod)} aria-label="Report date range">{Object.entries(periodLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown size={14} /></label>
          <button className="reports-export" onClick={downloadReport}><Download size={16} />Export CSV</button>
        </div>
      </header>
      <div className="reports-demo-note"><Clock3 size={15} /> Report figures are sample data for the selected period and are not connected to live transactions.</div>
      <section className="reports-kpis" aria-label="Report summary">
        <article><span className="reports-kpi-icon revenue"><CircleDollarSign size={20} /></span><div><small>Total Revenue</small><strong>{formatMoney(summary.revenue)}</strong><em><TrendingUp size={13} />12.8% <span>vs previous period</span></em></div></article>
        <article><span className="reports-kpi-icon work"><Wrench size={19} /></span><div><small>Work Orders</small><strong>{summary.workOrders.toLocaleString()}</strong><em><TrendingUp size={13} />8.4% <span>vs previous period</span></em></div></article>
        <article><span className="reports-kpi-icon invoices"><FileText size={19} /></span><div><small>Invoices Issued</small><strong>{summary.invoices.toLocaleString()}</strong><em><Check size={13} />91% <span>work order conversion</span></em></div></article>
        <article><span className="reports-kpi-icon average"><TrendingUp size={19} /></span><div><small>Average Invoice</small><strong>{formatMoney(summary.averageInvoice)}</strong><em><TrendingUp size={13} />4.2% <span>vs previous period</span></em></div></article>
      </section>
      <section className="reports-main-grid">
        <article className="report-card revenue-report">
          <header><div><h2>Revenue Overview</h2><p>{periodLabels[period]} · QAR</p></div><span className="report-legend"><i /> Revenue</span></header>
          <div className="revenue-chart-scroll">
            <svg className="revenue-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label={`Revenue chart for ${periodLabels[period]}`}>
              {[0, 1, 2, 3].map((index) => {
                const y = 14 + index * ((chartHeight - 36) / 3);
                return <g key={index}><line x1="80" y1={y} x2={chartWidth - 12} y2={y} /><text x="0" y={y + 3}>{`QAR ${Math.round((maxRevenue * (1 - index / 3)) / 1000)}k`}</text></g>;
              })}
              <path className="revenue-area" d={`${revenuePath} L ${points[points.length - 1].x} ${chartHeight - 18} L ${points[0].x} ${chartHeight - 18} Z`} />
              <path className="revenue-line" d={revenuePath} />
              {points.map((point, index) => <g key={series[index].label}><circle cx={point.x} cy={point.y} r="4" /><text className="revenue-label" x={point.x} y={chartHeight - 2} textAnchor="middle">{series[index].label}</text></g>)}
            </svg>
          </div>
          <footer><span>Period revenue</span><strong>{formatMoney(summary.revenue)}</strong></footer>
        </article>
        <article className="report-card work-orders-report">
          <header><div><h2>Work Order Status</h2><p>Current workshop breakdown</p></div><button aria-label="More work order report options" onClick={() => notify("Work order report options are not available in this preview.")}>•••</button></header>
          <div className="status-summary"><strong>62</strong><span>Work orders</span><small>Across all statuses</small></div>
          <div className="status-bars">{statusData.map((status) => <div className="status-bar-row" key={status.label}><div><span>{status.label}</span><strong>{status.count}</strong></div><div className="status-track"><i className={status.color} style={{ width: `${status.value}%` }} /></div></div>)}</div>
        </article>
      </section>
      <section className="reports-lower-grid">
        <article className="report-card mechanic-report">
          <header><div><h2>Mechanic Performance</h2><p>Top technicians by completed jobs</p></div><span className="report-period-chip">{periodLabels[period]}</span></header>
          <div className="report-table-scroll"><table><thead><tr><th>Mechanic</th><th>Completed Jobs</th><th>Rating</th><th>Completion</th></tr></thead><tbody>{mechanicPerformance.map((mechanic) => <tr key={mechanic.initials}><td><span className="report-mechanic"><i>{mechanic.initials}</i><span><strong>{mechanic.name}</strong><small>{mechanic.role}</small></span></span></td><td>{mechanic.jobs}</td><td><span className="report-rating">★ {mechanic.rating.toFixed(1)}</span></td><td><span className="completion-value">{mechanic.completion}%</span><span className="completion-track"><i style={{ width: `${mechanic.completion}%` }} /></span></td></tr>)}</tbody></table></div>
        </article>
        <article className="report-card invoice-report">
          <header><div><h2>Recent Invoices</h2><p>Latest billing activity</p></div><FileText size={18} /></header>
          <div className="invoice-report-list">{recentInvoices.map((invoice) => <div className="invoice-report-row" key={invoice.id}><span className="invoice-report-icon"><FileText size={15} /></span><span className="invoice-report-info"><strong>{invoice.id}</strong><small>{invoice.customer} · {invoice.date}</small></span><span className="invoice-report-amount"><strong>{formatMoney(invoice.amount)}</strong><small className={invoice.status.toLowerCase()}>{invoice.status}</small></span></div>)}</div>
        </article>
      </section>
    </main>
  );
}

export default Reports;
