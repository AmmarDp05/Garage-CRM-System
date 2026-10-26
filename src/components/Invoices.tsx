import { useMemo, useState } from "react";
import {
  AlertCircle,
  Activity,
  BellRing,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  Eye,
  FileText,
  MoreVertical,
  Pencil,
  Plus,
  Printer,
  Search,
  Share2,
  UserRound,
  Wrench,
} from "lucide-react";

type InvoiceStatus = "Pending" | "Paid" | "Overdue" | "Partial";
type InvoiceItem = { name: string; quantity: number; unitPrice: number };
type Invoice = {
  id: string;
  customer: string;
  phone: string;
  email: string;
  vehicle: string;
  year: string;
  plate: string;
  workOrder: string;
  service: string;
  detail: string;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  amount: number;
  discount: number;
  advisor: string;
  items: InvoiceItem[];
};

const initialInvoices: Invoice[] = [
  { id: "INV-00152", customer: "Sheikh Ahmed", phone: "770781", email: "sheikh.ahmed@example.com", vehicle: "Toyota Land Cruiser", year: "2020", plate: "770781", workOrder: "WO-00012", service: "Full polish", detail: "Exterior detail and body polish", status: "Pending", date: "14 Apr 2025", dueDate: "21 Apr 2025", amount: 930, discount: 46.5, advisor: "Ali Hassan", items: [{ name: "Full Body Polish", quantity: 1, unitPrice: 350 }, { name: "Wax & Protect", quantity: 1, unitPrice: 200 }, { name: "Interior Vacuum", quantity: 1, unitPrice: 150 }, { name: "Tire Dressing", quantity: 1, unitPrice: 230 }] },
  { id: "INV-00151", customer: "Muhammad Muddasir", phone: "360730", email: "m.muddasir@example.com", vehicle: "Nissan Patrol", year: "2019", plate: "660401", workOrder: "WO-00015", service: "Brake service", detail: "Brake pads replacement", status: "Paid", date: "13 Apr 2025", dueDate: "20 Apr 2025", amount: 650, discount: 0, advisor: "M. Khan", items: [{ name: "Brake Pads", quantity: 1, unitPrice: 450 }, { name: "Brake Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00150", customer: "Ali Shah", phone: "55345678", email: "ali.shah@example.com", vehicle: "Lexus ES", year: "2021", plate: "1234", workOrder: "WO-00003", service: "Oil change", detail: "Oil and filter replacement", status: "Pending", date: "12 Apr 2025", dueDate: "19 Apr 2025", amount: 400, discount: 0, advisor: "Ali Hassan", items: [{ name: "Engine Oil 5W-30", quantity: 1, unitPrice: 280 }, { name: "Oil Filter", quantity: 1, unitPrice: 70 }, { name: "Labour", quantity: 1, unitPrice: 50 }] },
  { id: "INV-00149", customer: "Khalid Al Marri", phone: "55167890", email: "khalid.marri@example.com", vehicle: "Renault Duster", year: "2018", plate: "360730", workOrder: "WO-00006", service: "AC service", detail: "AC service and gas refill", status: "Paid", date: "11 Apr 2025", dueDate: "18 Apr 2025", amount: 820, discount: 0, advisor: "M. Khan", items: [{ name: "AC Gas Refill", quantity: 1, unitPrice: 450 }, { name: "AC Filter", quantity: 1, unitPrice: 170 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00148", customer: "Ahmed Raza", phone: "55223344", email: "ahmed.raza@example.com", vehicle: "BMW X6", year: "2019", plate: "556677", workOrder: "WO-00013", service: "Brake pads", detail: "Front brake pads replacement", status: "Overdue", date: "10 Apr 2025", dueDate: "17 Apr 2025", amount: 720, discount: 0, advisor: "Ali Hassan", items: [{ name: "Brake Pads (Front)", quantity: 1, unitPrice: 520 }, { name: "Brake Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00147", customer: "Fahad Khan", phone: "55556677", email: "fahad.khan@example.com", vehicle: "Lexus RX 350", year: "2020", plate: "Q 1", workOrder: "WO-00002", service: "Tire alignment", detail: "Alignment and wheel balancing", status: "Paid", date: "9 Apr 2025", dueDate: "16 Apr 2025", amount: 480, discount: 0, advisor: "M. Khan", items: [{ name: "Wheel Alignment", quantity: 1, unitPrice: 280 }, { name: "Wheel Balancing", quantity: 4, unitPrice: 50 }] },
  { id: "INV-00146", customer: "Zara Noor", phone: "55778899", email: "zara.noor@example.com", vehicle: "Toyota Corolla", year: "2021", plate: "112233", workOrder: "WO-00010", service: "AC service", detail: "AC service and inspection", status: "Partial", date: "8 Apr 2025", dueDate: "15 Apr 2025", amount: 510, discount: 0, advisor: "Ali Hassan", items: [{ name: "AC Service", quantity: 1, unitPrice: 350 }, { name: "Cabin Filter", quantity: 1, unitPrice: 160 }] },
  { id: "INV-00145", customer: "Bilal Khan", phone: "55112233", email: "bilal.khan@example.com", vehicle: "Toyota Yaris", year: "2021", plate: "778879", workOrder: "WO-00009", service: "Electrical repair", detail: "Battery and charging check", status: "Paid", date: "7 Apr 2025", dueDate: "14 Apr 2025", amount: 280, discount: 0, advisor: "M. Khan", items: [{ name: "Electrical Inspection", quantity: 1, unitPrice: 180 }, { name: "Labour", quantity: 1, unitPrice: 100 }] },
  { id: "INV-00144", customer: "Sara Mohammed", phone: "55445566", email: "sara.mohammed@example.com", vehicle: "Honda Civic", year: "2020", plate: "556677", workOrder: "WO-00011", service: "General service", detail: "Scheduled vehicle service", status: "Pending", date: "6 Apr 2025", dueDate: "13 Apr 2025", amount: 600, discount: 0, advisor: "Ali Hassan", items: [{ name: "Service Parts", quantity: 1, unitPrice: 400 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00143", customer: "Omar Saeed", phone: "55889900", email: "omar.saeed@example.com", vehicle: "Mitsubishi Pajero", year: "2018", plate: "998877", workOrder: "WO-00014", service: "Engine diagnostic", detail: "Engine inspection and diagnostics", status: "Overdue", date: "5 Apr 2025", dueDate: "12 Apr 2025", amount: 950, discount: 0, advisor: "M. Khan", items: [{ name: "Diagnostic Scan", quantity: 1, unitPrice: 350 }, { name: "Sensor Replacement", quantity: 1, unitPrice: 400 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00142", customer: "Nasser Ali", phone: "55101010", email: "nasser.ali@example.com", vehicle: "Toyota Camry", year: "2022", plate: "445566", workOrder: "WO-00008", service: "Oil change", detail: "Oil and filter replacement", status: "Pending", date: "4 Apr 2025", dueDate: "11 Apr 2025", amount: 320, discount: 0, advisor: "Ali Hassan", items: [{ name: "Engine Oil", quantity: 1, unitPrice: 250 }, { name: "Oil Filter", quantity: 1, unitPrice: 70 }] },
  { id: "INV-00141", customer: "Mariam Saeed", phone: "55667788", email: "mariam.saeed@example.com", vehicle: "BMW 5 Series", year: "2021", plate: "889900", workOrder: "WO-00007", service: "Brake service", detail: "Brake pad replacement", status: "Overdue", date: "3 Apr 2025", dueDate: "10 Apr 2025", amount: 780, discount: 0, advisor: "M. Khan", items: [{ name: "Brake Pads", quantity: 1, unitPrice: 580 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00140", customer: "Hassan Omar", phone: "55221100", email: "hassan.omar@example.com", vehicle: "Nissan Altima", year: "2020", plate: "221144", workOrder: "WO-00005", service: "AC service", detail: "Cooling system performance check", status: "Pending", date: "2 Apr 2025", dueDate: "9 Apr 2025", amount: 450, discount: 0, advisor: "Ali Hassan", items: [{ name: "AC Inspection", quantity: 1, unitPrice: 150 }, { name: "Refrigerant Refill", quantity: 1, unitPrice: 300 }] },
  { id: "INV-00139", customer: "Aisha Khan", phone: "55770011", email: "aisha.khan@example.com", vehicle: "Lexus RX 350", year: "2022", plate: "665544", workOrder: "WO-00004", service: "Full polish", detail: "Exterior paint correction", status: "Overdue", date: "1 Apr 2025", dueDate: "8 Apr 2025", amount: 900, discount: 0, advisor: "M. Khan", items: [{ name: "Paint Correction", quantity: 1, unitPrice: 700 }, { name: "Protective Wax", quantity: 1, unitPrice: 200 }] },
  { id: "INV-00138", customer: "Yousef Rahman", phone: "55334455", email: "yousef.rahman@example.com", vehicle: "Ford Explorer", year: "2019", plate: "113355", workOrder: "WO-00001", service: "Engine diagnostic", detail: "Warning light diagnosis", status: "Paid", date: "31 Mar 2025", dueDate: "7 Apr 2025", amount: 550, discount: 0, advisor: "Ali Hassan", items: [{ name: "Diagnostic Scan", quantity: 1, unitPrice: 250 }, { name: "Labour", quantity: 1, unitPrice: 300 }] },
  { id: "INV-00137", customer: "Fatima Noor", phone: "55998877", email: "fatima.noor@example.com", vehicle: "Honda Accord", year: "2021", plate: "778811", workOrder: "WO-00016", service: "Tire alignment", detail: "Alignment and balancing", status: "Paid", date: "30 Mar 2025", dueDate: "6 Apr 2025", amount: 360, discount: 0, advisor: "M. Khan", items: [{ name: "Wheel Alignment", quantity: 1, unitPrice: 240 }, { name: "Wheel Balancing", quantity: 1, unitPrice: 120 }] },
  { id: "INV-00136", customer: "Khalid Hassan", phone: "55118899", email: "khalid.hassan@example.com", vehicle: "Toyota Prado", year: "2018", plate: "442266", workOrder: "WO-00017", service: "Major service", detail: "Scheduled full vehicle service", status: "Paid", date: "29 Mar 2025", dueDate: "5 Apr 2025", amount: 1250, discount: 0, advisor: "Ali Hassan", items: [{ name: "Service Parts", quantity: 1, unitPrice: 850 }, { name: "Labour", quantity: 1, unitPrice: 400 }] },
  { id: "INV-00135", customer: "Noor Ahmed", phone: "55661122", email: "noor.ahmed@example.com", vehicle: "Mercedes C-Class", year: "2020", plate: "990011", workOrder: "WO-00018", service: "Full polish", detail: "Interior and exterior detail", status: "Paid", date: "28 Mar 2025", dueDate: "4 Apr 2025", amount: 680, discount: 0, advisor: "M. Khan", items: [{ name: "Exterior Polish", quantity: 1, unitPrice: 430 }, { name: "Interior Detail", quantity: 1, unitPrice: 250 }] },
  { id: "INV-00134", customer: "Rashid Salem", phone: "55440011", email: "rashid.salem@example.com", vehicle: "Toyota Hilux", year: "2019", plate: "889911", workOrder: "WO-00019", service: "General service", detail: "Oil and filter service", status: "Paid", date: "27 Mar 2025", dueDate: "3 Apr 2025", amount: 420, discount: 0, advisor: "Ali Hassan", items: [{ name: "Engine Oil", quantity: 1, unitPrice: 300 }, { name: "Filter and Labour", quantity: 1, unitPrice: 120 }] },
  { id: "INV-00133", customer: "Layla Omar", phone: "55109988", email: "layla.omar@example.com", vehicle: "Kia Sportage", year: "2022", plate: "223344", workOrder: "WO-00020", service: "AC service", detail: "Air conditioning service", status: "Paid", date: "26 Mar 2025", dueDate: "2 Apr 2025", amount: 390, discount: 0, advisor: "M. Khan", items: [{ name: "AC Service", quantity: 1, unitPrice: 290 }, { name: "Cabin Filter", quantity: 1, unitPrice: 100 }] },
  { id: "INV-00132", customer: "Tariq Mansoor", phone: "55220033", email: "tariq.mansoor@example.com", vehicle: "Hyundai Tucson", year: "2021", plate: "556699", workOrder: "WO-00021", service: "Brake service", detail: "Brake inspection and service", status: "Paid", date: "25 Mar 2025", dueDate: "1 Apr 2025", amount: 530, discount: 0, advisor: "Ali Hassan", items: [{ name: "Brake Inspection", quantity: 1, unitPrice: 180 }, { name: "Brake Service", quantity: 1, unitPrice: 350 }] },
  { id: "INV-00131", customer: "Sana Khalid", phone: "55990022", email: "sana.khalid@example.com", vehicle: "Audi Q5", year: "2020", plate: "667788", workOrder: "WO-00022", service: "Electrical repair", detail: "Battery charging system repair", status: "Paid", date: "24 Mar 2025", dueDate: "31 Mar 2025", amount: 760, discount: 0, advisor: "M. Khan", items: [{ name: "Battery", quantity: 1, unitPrice: 520 }, { name: "Electrical Labour", quantity: 1, unitPrice: 240 }] },
  { id: "INV-00130", customer: "Majid Rahman", phone: "55332211", email: "majid.rahman@example.com", vehicle: "Chevrolet Tahoe", year: "2018", plate: "112299", workOrder: "WO-00023", service: "Major service", detail: "Full inspection and service", status: "Paid", date: "23 Mar 2025", dueDate: "30 Mar 2025", amount: 1400, discount: 0, advisor: "Ali Hassan", items: [{ name: "Service Parts", quantity: 1, unitPrice: 950 }, { name: "Labour", quantity: 1, unitPrice: 450 }] },
  { id: "INV-00129", customer: "Huda Saeed", phone: "55887766", email: "huda.saeed@example.com", vehicle: "Mazda CX-5", year: "2021", plate: "334455", workOrder: "WO-00024", service: "Tire alignment", detail: "Wheel alignment service", status: "Paid", date: "22 Mar 2025", dueDate: "29 Mar 2025", amount: 310, discount: 0, advisor: "M. Khan", items: [{ name: "Wheel Alignment", quantity: 1, unitPrice: 310 }] },
];

const statusClass: Record<InvoiceStatus, string> = {
  Pending: "pending",
  Paid: "paid",
  Overdue: "overdue",
  Partial: "partial",
};
const money = (value: number) => `QAR ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Invoices({ notify, onCreate }: { notify: (message: string) => void; onCreate: () => void }) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedId, setSelectedId] = useState("INV-00152");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [advisorFilter, setAdvisorFilter] = useState("All Service Advisors");
  const [page, setPage] = useState(1);
  const filteredInvoices = useMemo(() => invoices.filter((invoice) => {
    const matchesSearch = `${invoice.id} ${invoice.customer} ${invoice.vehicle} ${invoice.service} ${invoice.detail} ${invoice.workOrder}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "All Status" || invoice.status === statusFilter;
    const matchesAdvisor = advisorFilter === "All Service Advisors" || invoice.advisor === advisorFilter;
    return matchesSearch && matchesStatus && matchesAdvisor;
  }), [advisorFilter, invoices, search, statusFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredInvoices.length / 10));
  const currentPage = Math.min(page, pageCount);
  const pageInvoices = filteredInvoices.slice((currentPage - 1) * 10, currentPage * 10);
  const selectedInvoice = filteredInvoices.find((invoice) => invoice.id === selectedId) ?? filteredInvoices[0] ?? invoices.find((invoice) => invoice.id === selectedId);
  const initialCount = (status: InvoiceStatus) => initialInvoices.filter((invoice) => invoice.status === status).length;
  const statusChange = (status: InvoiceStatus) => invoices.filter((invoice) => invoice.status === status).length - initialCount(status);
  const counts = {
    total: 24,
    paid: 14 + statusChange("Paid"),
    pending: 6 + statusChange("Pending") + statusChange("Partial"),
    overdue: 4 + statusChange("Overdue"),
  };
  const markPaid = () => {
    if (!selectedInvoice || selectedInvoice.status === "Paid") return;
    setInvoices((current) => current.map((invoice) => invoice.id === selectedInvoice.id ? { ...invoice, status: "Paid" } : invoice));
    notify(`${selectedInvoice.id} marked paid.`);
  };

  return (
    <main className="invoice-management">
      <header className="invoice-page-heading">
        <div className="invoice-page-title">
          <span><FileText size={25} /></span>
          <div><h1>Invoices</h1><p>Manage customer invoices, payments, and billing records.</p></div>
        </div>
        <button className="invoice-create-button" onClick={onCreate}><Plus size={17} />Create Invoice</button>
      </header>
      <section className="invoice-metrics" aria-label="Invoice summary">
        <article><span className="invoice-metric-icon blue"><FileText size={20} /></span><div><strong>{counts.total}</strong><small>Total Invoices</small></div><Activity size={23} className="invoice-spark blue-text" /></article>
        <article><span className="invoice-metric-icon green"><CircleCheck size={20} /></span><div><strong>{counts.paid}</strong><small>Paid</small></div><Activity size={23} className="invoice-spark green-text" /></article>
        <article><span className="invoice-metric-icon orange"><Clock3 size={20} /></span><div><strong>{counts.pending}</strong><small>Pending</small></div><Activity size={23} className="invoice-spark orange-text" /></article>
        <article><span className="invoice-metric-icon red"><AlertCircle size={20} /></span><div><strong>{counts.overdue}</strong><small>Overdue</small></div><Activity size={23} className="invoice-spark red-text" /></article>
      </section>
      <div className="invoice-management-layout">
        <section className="invoice-list-card">
          <div className="invoice-filters">
            <label className="invoice-search"><Search size={16} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by invoice no., customer, vehicle, or service..." aria-label="Search invoices" /></label>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} aria-label="Filter by invoice status">
              {["All Status", "Paid", "Pending", "Partial", "Overdue"].map((status) => <option key={status}>{status}</option>)}
            </select>
            <label className="invoice-date-filter"><CalendarDays size={15} /><span>14 Apr 2025 - 14 May 2025</span></label>
            <select value={advisorFilter} onChange={(event) => { setAdvisorFilter(event.target.value); setPage(1); }} aria-label="Filter by service advisor">
              {["All Service Advisors", "Ali Hassan", "M. Khan"].map((advisor) => <option key={advisor}>{advisor}</option>)}
            </select>
          </div>
          <div className="invoice-table-scroll">
            <table className="invoice-management-table">
              <thead><tr><th>#</th><th>Invoice No.</th><th>Customer</th><th>Vehicle</th><th>Related To / Service Type</th><th>Status</th><th>Created Date</th><th>Total (QAR)</th><th>Actions</th></tr></thead>
              <tbody>
                {pageInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className={selectedInvoice?.id === invoice.id ? "selected" : ""} onClick={() => setSelectedId(invoice.id)}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td><button className="invoice-id-link" onClick={(event) => { event.stopPropagation(); setSelectedId(invoice.id); }}>{invoice.id}</button></td>
                    <td>{invoice.customer}</td>
                    <td><span className="invoice-vehicle-cell"><CarFront size={25} /><span>{invoice.vehicle}<small>{invoice.year} · {invoice.plate}</small></span></span></td>
                    <td>{invoice.service}<small className="invoice-muted-line">Work Order #{invoice.workOrder}</small></td>
                    <td><span className={`invoice-status-badge ${statusClass[invoice.status]}`}>{invoice.status}</span></td>
                    <td>{invoice.date}</td><td className="invoice-amount">{money(invoice.amount)}</td>
                    <td><button className="invoice-row-action" aria-label={`View ${invoice.id}`} onClick={(event) => { event.stopPropagation(); setSelectedId(invoice.id); }}><Eye size={15} /></button><button className="invoice-row-action" aria-label={`More actions for ${invoice.id}`} onClick={(event) => { event.stopPropagation(); notify("More invoice actions are not available in this frontend preview."); }}><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
                {filteredInvoices.length === 0 && <tr><td colSpan={9} className="invoice-empty">No invoices match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="invoice-table-footer"><span>Showing {filteredInvoices.length ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, filteredInvoices.length)} of {filteredInvoices.length} invoices</span><div><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""} aria-label={`Page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}<button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16} /></button></div></footer>
        </section>
        {selectedInvoice && (
          <aside className="invoice-detail-card" aria-label={`Invoice details for ${selectedInvoice.id}`}>
            <header><div><FileText size={16} /><strong>Invoice Details</strong></div><button onClick={() => notify("Invoice editing is not available in this frontend preview.")}><Pencil size={13} />Edit</button></header>
            <div className="invoice-detail-number"><strong>{selectedInvoice.id}</strong><span className={`invoice-status-badge ${statusClass[selectedInvoice.status]}`}>{selectedInvoice.status}</span></div>
            <small className="invoice-created-at">Created: {selectedInvoice.date}, 10:30 AM</small>
            <section className="invoice-detail-block">
              <h3><UserRound size={15} />Customer <button onClick={() => notify("Customer records are not available in this frontend preview.")}>View Customer</button></h3>
              <div className="invoice-customer-line"><span className="invoice-customer-avatar">{selectedInvoice.customer.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{selectedInvoice.customer}</strong><span>{selectedInvoice.phone}</span><span>{selectedInvoice.email}</span></div></div>
            </section>
            <section className="invoice-detail-block">
              <h3><CarFront size={16} />Vehicle</h3><div className="invoice-vehicle-detail"><CarFront size={47} /><div><strong>{selectedInvoice.vehicle} - {selectedInvoice.year}</strong><span>Plate: {selectedInvoice.plate} · VIN: N/A</span></div></div>
            </section>
            <section className="invoice-detail-block invoice-service-info">
              <h3><Wrench size={15} />Service Information</h3>
              <div><span>Related To</span><strong>Work Order #{selectedInvoice.workOrder}</strong><span>Service Type</span><strong>{selectedInvoice.service}</strong><span>Description</span><strong>{selectedInvoice.detail}</strong><span>Service Advisor</span><strong>{selectedInvoice.advisor}</strong></div>
              <div><span>Invoice Date</span><strong>{selectedInvoice.date}</strong><span>Payment Terms</span><strong>Due in 7 days</strong><span>Due Date</span><strong>{selectedInvoice.dueDate}</strong></div>
            </section>
            <section className="invoice-detail-items">
              <h3><CreditCard size={15} />Invoice Items ({selectedInvoice.items.length} items)</h3>
              <div className="invoice-detail-table-scroll"><table><thead><tr><th>#</th><th>Item / Service</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>
                {selectedInvoice.items.map((item, index) => <tr key={`${selectedInvoice.id}-${item.name}`}><td>{index + 1}</td><td>{item.name}</td><td>{item.quantity}</td><td>{money(item.unitPrice)}</td><td>{money(item.quantity * item.unitPrice)}</td></tr>)}
              </tbody></table></div>
              <div className="invoice-detail-totals"><div><span>Subtotal</span><strong>{money(selectedInvoice.amount)}</strong></div><div><span>VAT (5%)</span><strong>{money(selectedInvoice.amount * 0.05)}</strong></div><div><span>Discount (-)</span><strong className="negative">{money(selectedInvoice.discount)}</strong></div><div className="grand"><strong>Grand Total</strong><strong>{money(selectedInvoice.amount)}</strong></div></div>
            </section>
            <div className="invoice-detail-actions">
              <button onClick={() => window.print()}><Printer size={14} />Print Invoice</button>
              <button onClick={() => notify("Sharing is not available in this frontend preview.")}><Share2 size={14} />Share</button>
              <button className="mark-paid" disabled={selectedInvoice.status === "Paid"} onClick={markPaid}><Check size={14} />Mark Paid</button>
              <button className="reminder" onClick={() => notify(`Payment reminder prepared for ${selectedInvoice.customer}.`)}><BellRing size={14} />Send Reminder</button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

export default Invoices;
