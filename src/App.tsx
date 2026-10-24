import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUp, Bell, Box, CalendarDays, CarFront, ChartColumn, Check, ChevronDown, CircleHelp, Clock3, FileText, Headset, Home, Menu, MoreHorizontal, Plus, Search, Settings, ShoppingCart, Users, Wifi, Wrench, X, type LucideIcon } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import PosBilling from './components/PosBilling';

const orders = [
  { id: 'WO-00012', year: '2018', vehicle: 'BMW X6', plate: '770781', customer: 'Sheikh Ahmed', service: 'Full polish', detail: 'Exterior detail', mechanic: 'Ali Hassan', initials: 'AH', status: 'In Progress' },
  { id: 'WO-00006', year: '2018', vehicle: 'Renault Duster', plate: '360730', customer: 'Muhammad Muddasir', service: 'Brake service', detail: 'Front & rear', mechanic: 'M. Khan', initials: 'MK', status: 'Awaiting Parts' },
  { id: 'WO-00003', year: '2019', vehicle: 'Lexus GS', plate: '1234', customer: 'Muhammad Muddasir', service: 'Oil change', detail: 'Filter replacement', mechanic: 'Ali Shah', initials: 'AS', status: 'In Progress' },
  { id: 'WO-00002', year: '2020', vehicle: 'Lexus RX 350', plate: 'Q 1', customer: 'Muhammad Muddasir', service: 'Tire alignment', detail: 'Wheel balancing', mechanic: 'M. Khan', initials: 'MK', status: 'Ready for Delivery' },
];
const initialQuotes = [
  { id: 'QT-00018', vehicle: 'Toyota Land Cruiser', year: '2020', service: 'Brake pads replacement', amount: 850, time: '2 hours ago' },
  { id: 'QT-00017', vehicle: 'Nissan Patrol', year: '2019', service: 'AC service and gas refill', amount: 650, time: '5 hours ago' },
  { id: 'QT-00016', vehicle: 'Lexus ES', year: '2021', service: 'Full body polish', amount: 400, time: '1 day ago' },
];
const nav: [string, LucideIcon][] = [['Dashboard', Home], ['POS Billing', ShoppingCart], ['New Intake', Plus], ['Work Orders', Wrench], ['Quotations', FileText], ['Invoices', FileText], ['Vehicles', CarFront], ['Customers', Users], ['Parts Inventory', Box], ['Mechanics', Users], ['Reports', ChartColumn], ['Settings', Settings]];
const money = (value: number) => `QAR ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
function PanelTitle({ icon: Icon, title, onView }: { icon: LucideIcon; title: string; onView?: () => void }) {
  return <div className="panel-title"><div><Icon size={25} /><h2>{title}</h2></div>{onView && <button className="text-link" onClick={onView}>View all</button>}</div>;
}
function App() {
  const [page, setPage] = useState('Dashboard');
  const [tab, setTab] = useState('Active');
  const [query, setQuery] = useState('');
  const [quotes, setQuotes] = useState(initialQuotes);
  const [modal, setModal] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [sidebar, setSidebar] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === 'Escape') { setModal(null); setNotifications(false); setSidebar(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 3500); return () => window.clearTimeout(timer); }, [notice]);
  const visibleOrders = orders.filter(order => (tab === 'Active' || tab === 'All' || (tab === 'Awaiting Parts' && order.status === 'Awaiting Parts')) && Object.values(order).join(' ').toLowerCase().includes(query.toLowerCase()));
  const open = (title: string) => { setModal(title); setSidebar(false); };
  const decideQuote = (id: string, decision: string) => { setQuotes(current => current.filter(quote => quote.id !== id)); setNotice(`${id} ${decision.toLowerCase()}.`); };
  return <div className="workspace">
    <aside className={`sidebar ${sidebar ? 'is-open' : ''}`}>
      <a className="brand" href="#" aria-label="Garage Workspace dashboard"><img src={`${import.meta.env.BASE_URL}garage-workspace-logo.png`} alt="Garage Workspace — Auto Care & Service" /></a>
      <nav aria-label="Main navigation">{nav.map(([label, Icon]) => <button key={label} className={`nav-item ${label === page ? 'selected' : ''}`} onClick={() => { if (label === 'Dashboard' || label === 'POS Billing') { setPage(label); setSidebar(false); setQuery(''); } else open(label); }}><Icon size={22} strokeWidth={1.8} /><span>{label}</span></button>)}</nav>
    </aside>
    {sidebar && <button aria-label="Close navigation" className="sidebar-scrim" onClick={() => setSidebar(false)} />}
    <div className="main-shell">
      <header className="topbar">
        <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setSidebar(true)}><Menu /></button>
        <div className="search-box"><Search size={21} /><input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search customers, vehicles, work orders, invoices..." aria-label="Search work orders" /><kbd>Ctrl K</kbd></div>
        <div className="header-right"><div className="date"><CalendarDays size={20} /><span>Mon, 14 Apr 2025</span></div><div className="notifications"><button className="icon-button bell" aria-label="Notifications" aria-expanded={notifications} onClick={() => setNotifications(!notifications)}><Bell size={23} /><span>{quotes.length}</span></button>{notifications && <div className="notification-menu"><strong>Notifications</strong><p>{quotes.length} quotations are awaiting your approval.</p><p>5 inventory items are running low.</p><p>2 vehicles are ready for delivery.</p></div>}</div><button className="profile" onClick={() => open('My profile')}><span className="profile-avatar">SA</span><span><strong>Sheikh Ahmed</strong><small>Garage Owner</small></span><ChevronDown size={17} /></button></div>
      </header>
      <div hidden={page !== 'POS Billing'}><PosBilling globalSearch={query} notify={setNotice} /></div>
      <main hidden={page !== 'Dashboard'} className="dashboard">
        <section className="stats" aria-label="Workshop overview">{([
          [Wrench, '4', 'Active Jobs', '+1 from yesterday', 'orange'], [FileText, '0', 'Awaiting Signature', 'No change', 'blue'], [CarFront, '2', 'Vehicles Ready', '+1 from yesterday', 'green'], [ChartColumn, money(1650), 'Today Revenue', '+32% from yesterday', 'orange'], [FileText, String(quotes.length), 'Pending Quotes', `${money(quotes.reduce((sum, quote) => sum + quote.amount, 0))} total`, 'orange'],
        ] as [LucideIcon, string, string, string, string][]).map(([Icon, value, label, change, color]) => <article className="stat-card" key={label}><span className={`stat-icon ${color}`}><Icon size={27} strokeWidth={2.3} /></span><div><strong className={`stat-value ${value.length > 8 ? 'currency' : ''}`}>{value}</strong><p>{label}</p><small className={change.startsWith('+') ? 'positive' : 'muted'}>{change}</small></div></article>)}</section>
        <div className="primary-grid">
          <section className="panel orders-panel"><PanelTitle icon={Wrench} title="Active Work Orders" onView={() => { setTab('All'); setQuery(''); }} /><div className="tabs" role="tablist" aria-label="Work order status">{[['Active', 4], ['Awaiting Parts', 1], ['Completed', 0], ['Released', 0], ['All', 4]].map(([label, count]) => <button role="tab" aria-selected={tab === label} key={label} className={tab === label ? 'active' : ''} onClick={() => setTab(String(label))}>{label} ({count})</button>)}</div>
            <div className="table-scroll"><table><thead><tr>{['WO#', 'Vehicle', 'Plate No.', 'Customer', 'Service', 'Mechanic', 'Status', ''].map((heading, index) => <th key={index}>{heading}</th>)}</tr></thead><tbody>{visibleOrders.map(order => <tr key={order.id}><td><button className="order-id" onClick={() => open(`Work order ${order.id}`)}>{order.id}</button><small>{order.year}</small></td><td><div className="vehicle-cell"><CarFront className="vehicle-icon" size={39} strokeWidth={1.4} /><span>{order.vehicle}</span></div></td><td className="muted">{order.plate}</td><td>{order.customer}</td><td>{order.service}<span className="cell-detail">{order.detail}</span></td><td><div className="mechanic"><span className={`avatar ${order.initials === 'MK' ? 'peach' : ''}`}>{order.initials}</span>{order.mechanic}</div></td><td><span className={`badge ${order.status === 'Awaiting Parts' ? 'pending' : order.status === 'Ready for Delivery' ? 'ready' : ''}`}>{order.status}</span></td><td><button className="icon-button" aria-label={`View ${order.id}`} onClick={() => open(`Work order ${order.id}`)}><MoreHorizontal size={19} /></button></td></tr>)}</tbody></table>{visibleOrders.length === 0 && <div className="empty-state"><CarFront size={30} /><p>{query ? 'No work orders match your search.' : `No ${tab.toLowerCase()} work orders.`}</p></div>}</div>
          </section>
          <section className="panel quotes-panel"><PanelTitle icon={FileText} title="Quotations Awaiting Approval" onView={() => open('All quotations')} /><div className="quote-list">{quotes.map((quote, index) => <article className="quote" key={quote.id}><CarFront size={53} strokeWidth={1.3} className={`quote-car car-${index}`} /><div className="quote-info"><strong>{quote.id}</strong><p>{quote.vehicle} · {quote.year}</p><p>{quote.service}</p></div><div className="quote-actions"><strong>{money(quote.amount)}</strong><small>{quote.time}</small><div><button className="approve" onClick={() => decideQuote(quote.id, 'Approved')}>Approve</button><button className="reject" onClick={() => decideQuote(quote.id, 'Rejected')}>Reject</button></div></div></article>)}{quotes.length === 0 && <div className="empty-state"><Check /><p>All quotations have been reviewed.</p></div>}</div></section>
        </div>
        <div className="secondary-grid">
          <section className="panel billing-panel"><PanelTitle icon={ShoppingCart} title="POS Billing & Invoices" onView={() => open('Invoices')} /><div className="billing-stats"><div><span><FileText className="blue-text" size={26} /><strong>12</strong></span><small>Invoices Today</small><b>{money(1650)}</b></div><div><span><CarFront className="green-text" size={24} /><b>{money(1650)}</b></span><small>Today Revenue</small><em><ArrowUp size={13} /> 32%</em></div><div><span><FileText className="purple-text" size={24} /><b>{money(28400)}</b></span><small>This Month</small><em><ArrowUp size={13} /> 12%</em></div></div></section>
          <section className="panel quick-panel"><PanelTitle icon={Plus} title="Quick Actions" /><div className="quick-grid">{([[CarFront, 'New Intake', 'Add customer & vehicle', 'orange'], [Users, 'Add Customer', 'Create new customer', 'blue'], [FileText, 'Create Quotation', 'Send estimate to customer', 'blue'], [FileText, 'Create Invoice', 'Bill for completed work', 'purple']] as [LucideIcon, string, string, string][]).map(([Icon, label, detail, color]) => <button key={label} onClick={() => open(label)} className={`quick-action ${color}`}><Icon size={28} fill="currentColor" fillOpacity={0.1} /><strong>{label}</strong><small>{detail}</small></button>)}</div></section>
          <section className="panel stock-panel"><PanelTitle icon={Box} title="Low Stock Parts" onView={() => open('Parts Inventory')} />{([['Engine Oil 5W-30', 3, 'P-001', 'oil'], ['Brake Pads (Front)', 2, 'P-045', 'brake'], ['Air Filter', 4, 'P-078', 'filter'], ['Wiper Blades', 3, 'P-102', 'wiper'], ['Brake Disc (Front)', 2, 'P-156', 'disc']] as [string, number, string, string][]).map(([name, count, code, type]) => <button className="stock-item" key={code} onClick={() => open(name)}><span className={`part-art ${type}`}>{type === 'oil' ? <Box size={25} /> : type === 'wiper' ? <Wrench size={28} /> : <Settings size={29} />}</span><span><strong>{name}</strong><small>{count} units left</small></span><span className="stock-code">{code}</span></button>)}</section>
          <section className="panel activity-panel"><PanelTitle icon={Clock3} title="Recent Activity" onView={() => open('Recent Activity')} /><div className="timeline">{[['Invoice INV-00145 created', 'QAR 400.00', '12:05', 'green'], ['WO-00012 status updated', 'In Progress', '11:42', 'blue'], ['New quotation QT-00018', 'QAR 850.00', '10:30', 'orange'], ['Vehicle intake completed', 'Toyota Corolla · 2022', '09:15', 'purple'], ['Payment received', 'QAR 650.00 (INV-00144)', '09:02', 'green']].map(([title, detail, time, color]) => <div className="activity" key={title}><span className={`timeline-dot ${color}`} /><div><p>{title}</p><small>{detail}</small></div><time>{time}</time></div>)}</div></section>
        </div>
      </main>
    </div>
    <footer className="statusbar"><div><span className="online-dot" />System Online<Wifi size={15} /><span className="footer-divider" /><span>Qatar Time (GMT+3)</span><span className="sync">Last synced: 14 Apr 2025, 12:05 PM</span></div><div><span>Garage Workspace v1.0.0</span><button onClick={() => open('Help')}><CircleHelp size={16} />Help</button><button onClick={() => open('Support')}><Headset size={16} />Support</button></div></footer>
    {notice && <div className="toast" role="status"><Check size={18} />{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><X size={16} /></button></div>}
    {modal && <div className="modal-backdrop" onClick={() => setModal(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={modal} onClick={event => event.stopPropagation()}><div className="modal-heading"><h2>{modal}</h2><button autoFocus className="icon-button" aria-label="Close dialog" onClick={() => setModal(null)}><X /></button></div>{modal.startsWith('Work order') ? (() => { const order = orders.find(item => modal.endsWith(item.id)); return order && <div className="order-details"><CarFront size={48} /><h3>{order.vehicle}</h3><p>{order.customer} · Plate {order.plate}</p><p>{order.service} — {order.detail}</p><p>Assigned to {order.mechanic}</p><span className="badge">{order.status}</span></div>; })() : ['New Intake', 'Add Customer', 'New Invoice', 'Create Invoice', 'Create Quotation', 'Quick Bill', 'Service Sale', 'Parts Sale'].includes(modal) ? <form onSubmit={event => { event.preventDefault(); setNotice(`${modal} preview submitted. No record was stored.`); setModal(null); }}><p className="form-intro">Preview this workflow. Records are not saved yet.</p><label>Customer name<input required placeholder="e.g. Sheikh Ahmed" /></label><label>{modal === 'Add Customer' ? 'Phone number' : 'Vehicle / description'}<input required placeholder={modal === 'Add Customer' ? '+974' : 'e.g. Toyota Land Cruiser'} /></label><label>Notes<textarea placeholder="Add any additional details" rows={3} /></label><button type="submit" className="primary-button"><Plus size={18} />Submit preview</button></form> : <div className="module-placeholder"><Activity size={38} /><h3>{modal}</h3><p>This module is ready for the next development step. Explore work orders and approve quotations on the dashboard now.</p><button className="primary-button" onClick={() => setModal(null)}>Back to dashboard</button></div>}</section></div>}
    <SplashScreen />
  </div>;
}
export default App;
