import { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Eye,
  FileText,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

type QuoteStatus = "Awaiting Approval" | "Approved" | "Draft" | "Rejected" | "Expired";
type QuoteItem = { name: string; quantity: number; unitPrice: number };
type Quote = {
  id: string;
  customer: string;
  vehicle: string;
  year: string;
  plate: string;
  service: string;
  detail: string;
  status: QuoteStatus;
  date: string;
  amount: number;
  advisor: string;
  items: QuoteItem[];
};

const initialQuotes: Quote[] = [
  { id: "QT-00018", customer: "Sheikh Ahmed", vehicle: "Toyota Land Cruiser", year: "2020", plate: "770781", service: "Full polish", detail: "Exterior detail", status: "Awaiting Approval", date: "14 Apr 2025", amount: 850, advisor: "Ali Hassan", items: [{ name: "Full Body Polish", quantity: 1, unitPrice: 350 }, { name: "Interior Cleaning", quantity: 1, unitPrice: 150 }, { name: "Wax & Protect", quantity: 1, unitPrice: 200 }, { name: "Tire Dressing", quantity: 1, unitPrice: 50 }] },
  { id: "QT-00017", customer: "Muhammad Muddasir", vehicle: "Nissan Patrol", year: "2019", plate: "360730", service: "AC service", detail: "AC service and gas refill", status: "Approved", date: "13 Apr 2025", amount: 650, advisor: "M. Khan", items: [{ name: "AC Gas Refill", quantity: 1, unitPrice: 350 }, { name: "AC Filter", quantity: 1, unitPrice: 100 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "QT-00016", customer: "Ali Shah", vehicle: "Lexus ES", year: "2021", plate: "1234", service: "Brake service", detail: "Front & rear", status: "Draft", date: "12 Apr 2025", amount: 400, advisor: "Ali Hassan", items: [{ name: "Brake Inspection", quantity: 1, unitPrice: 100 }, { name: "Labour", quantity: 2, unitPrice: 150 }] },
  { id: "QT-00015", customer: "Khalid Al Marri", vehicle: "Renault Duster", year: "2018", plate: "360730", service: "Oil change", detail: "Filter replacement", status: "Approved", date: "11 Apr 2025", amount: 280, advisor: "M. Khan", items: [{ name: "Engine Oil 5W-30", quantity: 4, unitPrice: 45 }, { name: "Oil Filter", quantity: 1, unitPrice: 60 }, { name: "Labour", quantity: 1, unitPrice: 40 }] },
  { id: "QT-00014", customer: "Ahmed Raza", vehicle: "BMW X6", year: "2019", plate: "664011", service: "Tire alignment", detail: "Wheel balancing", status: "Rejected", date: "10 Apr 2025", amount: 480, advisor: "Ali Hassan", items: [{ name: "Wheel Alignment", quantity: 1, unitPrice: 280 }, { name: "Wheel Balancing", quantity: 4, unitPrice: 50 }] },
  { id: "QT-00013", customer: "Fahad Khan", vehicle: "Lexus RX 350", year: "2020", plate: "Q 1", service: "Engine diagnostic", detail: "Check engine light", status: "Awaiting Approval", date: "9 Apr 2025", amount: 720, advisor: "M. Khan", items: [{ name: "Diagnostic Scan", quantity: 1, unitPrice: 220 }, { name: "Sensor Replacement", quantity: 1, unitPrice: 350 }, { name: "Labour", quantity: 1, unitPrice: 150 }] },
  { id: "QT-00012", customer: "Zara Noor", vehicle: "Toyota Corolla", year: "2021", plate: "112233", service: "AC service", detail: "Compressor check", status: "Draft", date: "8 Apr 2025", amount: 350, advisor: "Ali Hassan", items: [{ name: "AC Service", quantity: 1, unitPrice: 250 }, { name: "Cabin Filter", quantity: 1, unitPrice: 100 }] },
  { id: "QT-00011", customer: "Bilal Khan", vehicle: "Toyota Hilux", year: "2019", plate: "778879", service: "Brake service", detail: "Brake pads replacement", status: "Approved", date: "7 Apr 2025", amount: 510, advisor: "M. Khan", items: [{ name: "Brake Pads (Front)", quantity: 1, unitPrice: 360 }, { name: "Brake Labour", quantity: 1, unitPrice: 150 }] },
  { id: "QT-00010", customer: "Sara Mohammed", vehicle: "Honda Civic", year: "2020", plate: "556677", service: "Full body polish", detail: "Exterior & interior", status: "Expired", date: "6 Apr 2025", amount: 600, advisor: "Ali Hassan", items: [{ name: "Exterior Polish", quantity: 1, unitPrice: 400 }, { name: "Interior Detail", quantity: 1, unitPrice: 200 }] },
  { id: "QT-00009", customer: "Omar Saeed", vehicle: "Mitsubishi Pajero", year: "2018", plate: "998877", service: "Major service", detail: "Full inspection", status: "Awaiting Approval", date: "5 Apr 2025", amount: 950, advisor: "M. Khan", items: [{ name: "Major Service Parts", quantity: 1, unitPrice: 600 }, { name: "Labour", quantity: 1, unitPrice: 350 }] },
  { id: "QT-00008", customer: "Nasser Ali", vehicle: "Toyota Camry", year: "2022", plate: "445566", service: "Oil change", detail: "Oil and filter replacement", status: "Awaiting Approval", date: "4 Apr 2025", amount: 320, advisor: "Ali Hassan", items: [{ name: "Engine Oil", quantity: 1, unitPrice: 250 }, { name: "Oil Filter", quantity: 1, unitPrice: 70 }] },
  { id: "QT-00007", customer: "Mariam Saeed", vehicle: "BMW 5 Series", year: "2021", plate: "889900", service: "Brake service", detail: "Brake pad replacement", status: "Draft", date: "3 Apr 2025", amount: 780, advisor: "M. Khan", items: [{ name: "Brake Pads", quantity: 1, unitPrice: 580 }, { name: "Labour", quantity: 1, unitPrice: 200 }] },
  { id: "QT-00006", customer: "Hassan Omar", vehicle: "Nissan Altima", year: "2020", plate: "221144", service: "AC service", detail: "Cooling performance check", status: "Awaiting Approval", date: "2 Apr 2025", amount: 450, advisor: "Ali Hassan", items: [{ name: "AC Inspection", quantity: 1, unitPrice: 150 }, { name: "Refrigerant Refill", quantity: 1, unitPrice: 300 }] },
  { id: "QT-00005", customer: "Aisha Khan", vehicle: "Lexus RX 350", year: "2022", plate: "665544", service: "Full polish", detail: "Exterior paint correction", status: "Draft", date: "1 Apr 2025", amount: 900, advisor: "M. Khan", items: [{ name: "Paint Correction", quantity: 1, unitPrice: 700 }, { name: "Protective Wax", quantity: 1, unitPrice: 200 }] },
  { id: "QT-00004", customer: "Yousef Rahman", vehicle: "Ford Explorer", year: "2019", plate: "113355", service: "Engine diagnostic", detail: "Warning light diagnosis", status: "Awaiting Approval", date: "31 Mar 2025", amount: 550, advisor: "Ali Hassan", items: [{ name: "Diagnostic Scan", quantity: 1, unitPrice: 250 }, { name: "Labour", quantity: 1, unitPrice: 300 }] },
  { id: "QT-00003", customer: "Fatima Noor", vehicle: "Honda Accord", year: "2021", plate: "778811", service: "Tire alignment", detail: "Alignment and balancing", status: "Draft", date: "30 Mar 2025", amount: 360, advisor: "M. Khan", items: [{ name: "Wheel Alignment", quantity: 1, unitPrice: 240 }, { name: "Wheel Balancing", quantity: 1, unitPrice: 120 }] },
  { id: "QT-00002", customer: "Khalid Hassan", vehicle: "Toyota Prado", year: "2018", plate: "442266", service: "Major service", detail: "Scheduled vehicle service", status: "Awaiting Approval", date: "29 Mar 2025", amount: 1250, advisor: "Ali Hassan", items: [{ name: "Service Parts", quantity: 1, unitPrice: 850 }, { name: "Labour", quantity: 1, unitPrice: 400 }] },
  { id: "QT-00001", customer: "Noor Ahmed", vehicle: "Mercedes C-Class", year: "2020", plate: "990011", service: "Full polish", detail: "Interior and exterior detail", status: "Draft", date: "28 Mar 2025", amount: 680, advisor: "M. Khan", items: [{ name: "Exterior Polish", quantity: 1, unitPrice: 430 }, { name: "Interior Detail", quantity: 1, unitPrice: 250 }] },
];

const statusClass: Record<QuoteStatus, string> = {
  "Awaiting Approval": "awaiting",
  Approved: "approved",
  Draft: "draft",
  Rejected: "rejected",
  Expired: "expired",
};
const money = (value: number) => `QAR ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Quotations({ notify }: { notify: (message: string) => void }) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedId, setSelectedId] = useState("QT-00018");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [advisorFilter, setAdvisorFilter] = useState("All Service Advisors");
  const filteredQuotes = useMemo(() => quotes.filter((quote) => {
    const matchesSearch = `${quote.id} ${quote.customer} ${quote.vehicle} ${quote.service} ${quote.detail}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "All Status" || quote.status === statusFilter;
    const matchesAdvisor = advisorFilter === "All Service Advisors" || quote.advisor === advisorFilter;
    return matchesSearch && matchesStatus && matchesAdvisor;
  }), [advisorFilter, quotes, search, statusFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredQuotes.length / 10));
  const currentPage = Math.min(page, pageCount);
  const pageQuotes = filteredQuotes.slice((currentPage - 1) * 10, currentPage * 10);
  const selectedQuote = filteredQuotes.find((quote) => quote.id === selectedId) ?? filteredQuotes[0] ?? quotes.find((quote) => quote.id === selectedId);
  const statusChanges = (status: QuoteStatus) =>
    quotes.filter((quote) => quote.status === status).length -
    initialQuotes.filter((quote) => quote.status === status).length;
  const counts = {
    total: 18,
    draft: 6 + statusChanges("Draft"),
    awaiting: 7 + statusChanges("Awaiting Approval"),
    approved: 4 + statusChanges("Approved"),
  };
  const decide = (decision: "Approved" | "Rejected") => {
    if (!selectedQuote || selectedQuote.status !== "Awaiting Approval") return;
    setQuotes((current) => current.map((quote) => quote.id === selectedQuote.id ? { ...quote, status: decision } : quote));
    notify(`${selectedQuote.id} ${decision.toLowerCase()}.`);
  };

  return (
    <main className="quote-management">
      <header className="quote-page-heading">
        <div className="quote-page-title">
          <span><FileText size={25} /></span>
          <div><h1>Quotations</h1><p>Create, review, and approve customer estimates.</p></div>
        </div>
      </header>

      <section className="quote-metrics" aria-label="Quotation summary">
        <article><span className="quote-metric-icon blue"><FileText size={20} /></span><div><strong>{counts.total}</strong><small>Total Quotations</small></div><Activity size={23} className="quote-spark blue-text" /></article>
        <article><span className="quote-metric-icon amber"><Pencil size={19} /></span><div><strong>{counts.draft}</strong><small>Draft</small></div><Activity size={23} className="quote-spark amber-text" /></article>
        <article><span className="quote-metric-icon orange"><Clock3 size={20} /></span><div><strong>{counts.awaiting}</strong><small>Awaiting Approval</small></div><Activity size={23} className="quote-spark orange-text" /></article>
        <article><span className="quote-metric-icon green"><CircleCheck size={20} /></span><div><strong>{counts.approved}</strong><small>Approved</small></div><Activity size={23} className="quote-spark green-text" /></article>
      </section>

      <div className="quote-management-layout">
        <section className="quote-list-card">
          <div className="quote-filters">
            <label className="quote-search"><Search size={16} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by quotation no., customer, vehicle, or service..." aria-label="Search quotations" /></label>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} aria-label="Filter by quotation status">
              {["All Status", "Awaiting Approval", "Approved", "Draft", "Rejected", "Expired"].map((status) => <option key={status}>{status}</option>)}
            </select>
            <label className="quote-date-filter"><CalendarDays size={15} /><span>14 Apr 2025 - 14 May 2025</span></label>
            <select value={advisorFilter} onChange={(event) => { setAdvisorFilter(event.target.value); setPage(1); }} aria-label="Filter by service advisor">
              {["All Service Advisors", "Ali Hassan", "M. Khan"].map((advisor) => <option key={advisor}>{advisor}</option>)}
            </select>
          </div>
          <div className="quote-table-scroll">
            <table className="quote-management-table">
              <thead><tr><th>#</th><th>Quote No.</th><th>Customer</th><th>Vehicle</th><th>Service Type</th><th>Status</th><th>Created Date</th><th>Total (QAR)</th><th>Actions</th></tr></thead>
              <tbody>
                {pageQuotes.map((quote, index) => (
                  <tr key={quote.id} className={selectedQuote?.id === quote.id ? "selected" : ""} onClick={() => setSelectedId(quote.id)}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td><button className="quote-id-link" onClick={(event) => { event.stopPropagation(); setSelectedId(quote.id); }}>{quote.id}</button></td>
                    <td>{quote.customer}</td>
                    <td><span className="quote-vehicle-cell"><CarFront size={25} /><span>{quote.vehicle}<small>{quote.year} · {quote.plate}</small></span></span></td>
                    <td>{quote.service}<small className="quote-muted-line">{quote.detail}</small></td>
                    <td><span className={`quote-status-badge ${statusClass[quote.status]}`}>{quote.status}</span></td>
                    <td>{quote.date}</td><td className="quote-amount">{money(quote.amount)}</td>
                    <td><button className="quote-row-view" aria-label={`View ${quote.id}`} onClick={(event) => { event.stopPropagation(); setSelectedId(quote.id); }}><Eye size={15} /></button><button className="quote-row-view" aria-label={`More actions for ${quote.id}`} onClick={(event) => { event.stopPropagation(); notify("More quotation actions are not available in this frontend preview."); }}><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
                {filteredQuotes.length === 0 && <tr><td colSpan={9} className="quote-empty">No quotations match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="quote-table-footer"><span>Showing {filteredQuotes.length ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, filteredQuotes.length)} of {filteredQuotes.length} quotations</span><div><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""} aria-label={`Page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}<button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16} /></button></div></footer>
        </section>

        {selectedQuote && (
          <aside className="quote-detail-card" aria-label={`Quotation details for ${selectedQuote.id}`}>
            <header><div><FileText size={16} /><strong>Quotation Details</strong></div><button onClick={() => notify("Quotation editing is not available in this frontend preview.")}><Pencil size={13} />Edit</button></header>
            <div className="quote-detail-number"><strong>{selectedQuote.id}</strong><span className={`quote-status-badge ${statusClass[selectedQuote.status]}`}>{selectedQuote.status}</span></div>
            <small className="quote-created-at">Created: {selectedQuote.date}, 10:30 AM</small>
            <section className="quote-detail-block">
              <h3><UserRound size={15} />Customer <button onClick={() => notify("Customer records are not available in this frontend preview.")}>View Customer</button></h3>
              <strong>{selectedQuote.customer}</strong><span>{selectedQuote.plate}</span><span>{selectedQuote.customer.toLowerCase().replaceAll(" ", ".")}@email.com</span>
            </section>
            <section className="quote-detail-block">
              <h3><CarFront size={16} />Vehicle</h3><strong>{selectedQuote.vehicle} - {selectedQuote.year}</strong><span>Plate: {selectedQuote.plate} · VIN: N/A</span>
            </section>
            <section className="quote-detail-block quote-service-info">
              <h3><Wrench size={15} />Service Information</h3><div><span>Service Type</span><strong>{selectedQuote.service}</strong><span>Description</span><strong>{selectedQuote.detail}</strong></div><div><span>Service Advisor</span><strong>{selectedQuote.advisor}</strong><span>Expected Delivery</span><strong>16 Apr 2025</strong></div>
            </section>
            <section className="quote-detail-items">
              <h3><FileText size={15} />Quotation Items ({selectedQuote.items.length} items)</h3>
              <div className="quote-detail-table-scroll"><table><thead><tr><th>#</th><th>Item / Service</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>
                {selectedQuote.items.map((item, index) => <tr key={`${selectedQuote.id}-${item.name}`}><td>{index + 1}</td><td>{item.name}</td><td>{item.quantity}</td><td>{money(item.unitPrice)}</td><td>{money(item.quantity * item.unitPrice)}</td></tr>)}
              </tbody></table></div>
              <div className="quote-detail-totals"><div><span>Subtotal</span><strong>{money(selectedQuote.amount)}</strong></div><div><span>VAT (5%)</span><strong>{money(0)}</strong></div><div><span>Discount (-)</span><strong className="negative">{money(0)}</strong></div><div className="grand"><strong>Grand Total</strong><strong>{money(selectedQuote.amount)}</strong></div></div>
            </section>
            <div className="quote-detail-actions">
              <button onClick={() => window.print()}><FileText size={14} />Print Quote</button>
              <button onClick={() => notify("Sharing is not available in this frontend preview.")}><Plus size={14} />Share</button>
              <button className="convert" onClick={() => notify("Convert to Invoice is not available in this frontend preview.")}><FileText size={14} />Convert to Invoice</button>
            </div>
            <div className="quote-decision-actions">
              <button className="approve" disabled={selectedQuote.status !== "Awaiting Approval"} onClick={() => decide("Approved")}><Check size={14} />Approve</button>
              <button className="reject" disabled={selectedQuote.status !== "Awaiting Approval"} onClick={() => decide("Rejected")}><X size={14} />Reject</button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

export default Quotations;
