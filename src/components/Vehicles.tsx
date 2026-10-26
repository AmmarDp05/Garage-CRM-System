import { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  MoreVertical,
  Plus,
  Search,
  UserRound,
  Wrench,
} from "lucide-react";

type VehicleStatus = "In Service" | "Ready" | "Due" | "Archived";
type ServiceRecord = { date: string; job: string; mileage: string; amount: number };
type Vehicle = {
  id: string;
  plate: string;
  customer: string;
  phone: string;
  model: string;
  year: string;
  mileage: string;
  lastService: string;
  nextService: string;
  status: VehicleStatus;
  advisor: string;
  fuel: string;
  color: string;
  notes: string;
  history: ServiceRecord[];
};

const createHistory = (job: string, amount: number): ServiceRecord[] => [
  { date: "14 Apr 2025", job, mileage: "125,430", amount },
  { date: "10 Jan 2025", job: "Brake service", mileage: "118,200", amount: 480 },
  { date: "15 Sep 2024", job: "AC service", mileage: "112,800", amount: 420 },
  { date: "20 Jun 2024", job: "Interior detailing", mileage: "106,450", amount: 300 },
  { date: "12 Mar 2024", job: "Full service", mileage: "98,750", amount: 650 },
];

const initialVehicles: Vehicle[] = [
  { id: "VEH-0052", plate: "770781", customer: "Sheikh Ahmed", phone: "66871557", model: "Toyota Land Cruiser", year: "2020", mileage: "125,430", lastService: "14 Apr 2025", nextService: "14 Jul 2025", status: "In Service", advisor: "Ali Hassan", fuel: "Diesel", color: "White", notes: "Customer reports engine noise and AC not cooling properly. Also requested general checkup and full service.", history: createHistory("Engine oil change", 350) },
  { id: "VEH-0051", plate: "660421", customer: "Mohammed Al Sadi", phone: "55112233", model: "Nissan Patrol", year: "2019", mileage: "98,200", lastService: "12 Apr 2025", nextService: "12 Jul 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Red", notes: "Brake service completed. Customer notified that the vehicle is ready for pickup.", history: createHistory("Brake service", 650) },
  { id: "VEH-0050", plate: "562315", customer: "Ali Shah", phone: "55345678", model: "Lexus ES", year: "2021", mileage: "67,850", lastService: "10 Apr 2025", nextService: "10 Jul 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "Black", notes: "Regular service due. Customer requested a vehicle inspection.", history: createHistory("Oil change", 400) },
  { id: "VEH-0049", plate: "366730", customer: "Khalid Al Marri", phone: "55167890", model: "Renault Duster", year: "2018", mileage: "82,400", lastService: "11 Apr 2025", nextService: "11 Jul 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "AC service complete. Please confirm pickup time with the customer.", history: createHistory("AC service", 820) },
  { id: "VEH-0048", plate: "981877", customer: "Ahmed Raza", phone: "55223344", model: "BMW X6", year: "2019", mileage: "71,250", lastService: "8 Apr 2025", nextService: "8 Jul 2025", status: "In Service", advisor: "Ali Hassan", fuel: "Petrol", color: "Red", notes: "Front brake pads being replaced.", history: createHistory("Brake pads", 720) },
  { id: "VEH-0047", plate: "602114", customer: "Fahad Khan", phone: "55556677", model: "Lexus RX 350", year: "2020", mileage: "89,600", lastService: "6 Apr 2025", nextService: "6 Jul 2025", status: "Due", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "Vehicle is due for scheduled maintenance.", history: createHistory("Tire alignment", 480) },
  { id: "VEH-0046", plate: "554211", customer: "Bilal Khan", phone: "55112233", model: "Toyota Corolla", year: "2021", mileage: "54,320", lastService: "3 Apr 2025", nextService: "3 Jul 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "White", notes: "AC service and inspection completed.", history: createHistory("AC service", 510) },
  { id: "VEH-0045", plate: "778932", customer: "Zara Noor", phone: "55778899", model: "Toyota Yaris", year: "2021", mileage: "48,750", lastService: "2 Apr 2025", nextService: "2 Jul 2025", status: "Archived", advisor: "M. Khan", fuel: "Petrol", color: "Blue", notes: "Vehicle record archived at customer request.", history: createHistory("Electrical repair", 280) },
  { id: "VEH-0044", plate: "205667", customer: "Sara Mohammed", phone: "55445566", model: "Honda Civic", year: "2020", mileage: "76,890", lastService: "1 Apr 2025", nextService: "1 Jul 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "White", notes: "General service completed.", history: createHistory("General service", 600) },
  { id: "VEH-0043", plate: "998877", customer: "Omar Saeed", phone: "55889900", model: "Mitsubishi Pajero", year: "2018", mileage: "102,340", lastService: "29 Mar 2025", nextService: "29 Jun 2025", status: "Due", advisor: "M. Khan", fuel: "Petrol", color: "Black", notes: "Engine diagnostic required. Awaiting customer confirmation.", history: createHistory("Engine diagnostic", 950) },
  { id: "VEH-0042", plate: "445566", customer: "Nasser Ali", phone: "55101010", model: "Toyota Camry", year: "2022", mileage: "42,110", lastService: "27 Mar 2025", nextService: "27 Jun 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "Silver", notes: "Routine oil and filter service completed.", history: createHistory("Oil change", 320) },
  { id: "VEH-0041", plate: "889900", customer: "Mariam Saeed", phone: "55667788", model: "BMW 5 Series", year: "2021", mileage: "61,500", lastService: "25 Mar 2025", nextService: "25 Jun 2025", status: "In Service", advisor: "M. Khan", fuel: "Petrol", color: "Black", notes: "Brake inspection in progress.", history: createHistory("Brake service", 780) },
  { id: "VEH-0040", plate: "221144", customer: "Hassan Omar", phone: "55221100", model: "Nissan Altima", year: "2020", mileage: "69,800", lastService: "22 Mar 2025", nextService: "22 Jun 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "Gray", notes: "Scheduled maintenance reminder pending.", history: createHistory("AC service", 450) },
  { id: "VEH-0039", plate: "665544", customer: "Aisha Khan", phone: "55770011", model: "Lexus RX 350", year: "2022", mileage: "39,200", lastService: "20 Mar 2025", nextService: "20 Jun 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "Paint correction and protective wax completed.", history: createHistory("Full polish", 900) },
  { id: "VEH-0038", plate: "113355", customer: "Yousef Rahman", phone: "55334455", model: "Ford Explorer", year: "2019", mileage: "91,250", lastService: "18 Mar 2025", nextService: "18 Jun 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "Blue", notes: "Check engine light diagnosis requested.", history: createHistory("Engine diagnostic", 550) },
  { id: "VEH-0037", plate: "778811", customer: "Fatima Noor", phone: "55998877", model: "Honda Accord", year: "2021", mileage: "57,300", lastService: "15 Mar 2025", nextService: "15 Jun 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "Wheel alignment completed.", history: createHistory("Tire alignment", 360) },
  { id: "VEH-0036", plate: "442266", customer: "Khalid Hassan", phone: "55118899", model: "Toyota Prado", year: "2018", mileage: "110,800", lastService: "12 Mar 2025", nextService: "12 Jun 2025", status: "In Service", advisor: "Ali Hassan", fuel: "Petrol", color: "Silver", notes: "Major scheduled service in progress.", history: createHistory("Major service", 1250) },
  { id: "VEH-0035", plate: "990011", customer: "Noor Ahmed", phone: "55661122", model: "Mercedes C-Class", year: "2020", mileage: "73,600", lastService: "9 Mar 2025", nextService: "9 Jun 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Black", notes: "Interior and exterior detailing completed.", history: createHistory("Full polish", 680) },
  { id: "VEH-0034", plate: "889911", customer: "Rashid Salem", phone: "55440011", model: "Toyota Hilux", year: "2019", mileage: "96,420", lastService: "6 Mar 2025", nextService: "6 Jun 2025", status: "Due", advisor: "Ali Hassan", fuel: "Diesel", color: "White", notes: "Oil and filter service due.", history: createHistory("General service", 420) },
  { id: "VEH-0033", plate: "223344", customer: "Layla Omar", phone: "55109988", model: "Kia Sportage", year: "2022", mileage: "44,680", lastService: "3 Mar 2025", nextService: "3 Jun 2025", status: "Archived", advisor: "M. Khan", fuel: "Petrol", color: "Red", notes: "Vehicle no longer maintained by this workshop.", history: createHistory("AC service", 390) },
  { id: "VEH-0032", plate: "556699", customer: "Tariq Mansoor", phone: "55220033", model: "Hyundai Tucson", year: "2021", mileage: "62,190", lastService: "28 Feb 2025", nextService: "28 May 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "Gray", notes: "Brake inspection and service complete.", history: createHistory("Brake service", 530) },
  { id: "VEH-0031", plate: "667788", customer: "Sana Khalid", phone: "55990022", model: "Audi Q5", year: "2020", mileage: "80,110", lastService: "25 Feb 2025", nextService: "25 May 2025", status: "Due", advisor: "M. Khan", fuel: "Petrol", color: "Blue", notes: "Battery charging system inspection due.", history: createHistory("Electrical repair", 760) },
  { id: "VEH-0030", plate: "112299", customer: "Majid Rahman", phone: "55332211", model: "Chevrolet Tahoe", year: "2018", mileage: "118,400", lastService: "22 Feb 2025", nextService: "22 May 2025", status: "In Service", advisor: "Ali Hassan", fuel: "Petrol", color: "Black", notes: "Full vehicle inspection and service in progress.", history: createHistory("Major service", 1400) },
  { id: "VEH-0029", plate: "334455", customer: "Huda Saeed", phone: "55887766", model: "Mazda CX-5", year: "2021", mileage: "58,900", lastService: "19 Feb 2025", nextService: "19 May 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Red", notes: "Wheel alignment service completed.", history: createHistory("Tire alignment", 310) },
  { id: "VEH-0028", plate: "778899", customer: "Omar Khalid", phone: "55112200", model: "Toyota Corolla", year: "2019", mileage: "92,100", lastService: "16 Feb 2025", nextService: "16 May 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "White", notes: "Vehicle is due for maintenance.", history: createHistory("Oil change", 280) },
  { id: "VEH-0027", plate: "445588", customer: "Maha Ali", phone: "55773311", model: "Nissan X-Trail", year: "2020", mileage: "77,500", lastService: "13 Feb 2025", nextService: "13 May 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Silver", notes: "Standard maintenance complete.", history: createHistory("General service", 540) },
  { id: "VEH-0026", plate: "119944", customer: "Salem Nasser", phone: "55994411", model: "Ford Ranger", year: "2018", mileage: "121,300", lastService: "10 Feb 2025", nextService: "10 May 2025", status: "Archived", advisor: "Ali Hassan", fuel: "Diesel", color: "Blue", notes: "Archived vehicle record.", history: createHistory("Brake service", 690) },
  { id: "VEH-0025", plate: "330077", customer: "Rania Hassan", phone: "55227700", model: "Lexus IS", year: "2022", mileage: "36,800", lastService: "7 Feb 2025", nextService: "7 May 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "Routine vehicle inspection completed.", history: createHistory("Oil change", 390) },
  { id: "VEH-0024", plate: "881122", customer: "Faisal Noor", phone: "55551122", model: "BMW X3", year: "2021", mileage: "55,600", lastService: "4 Feb 2025", nextService: "4 May 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "Black", notes: "Maintenance reminder due.", history: createHistory("AC service", 460) },
  { id: "VEH-0023", plate: "990066", customer: "Dana Omar", phone: "55886600", model: "Honda CR-V", year: "2019", mileage: "88,700", lastService: "1 Feb 2025", nextService: "1 May 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Gray", notes: "Scheduled service finished.", history: createHistory("General service", 510) },
  { id: "VEH-0022", plate: "220033", customer: "Yousef Ali", phone: "55110033", model: "Toyota Fortuner", year: "2020", mileage: "74,900", lastService: "29 Jan 2025", nextService: "29 Apr 2025", status: "In Service", advisor: "Ali Hassan", fuel: "Diesel", color: "White", notes: "Engine inspection in progress.", history: createHistory("Engine diagnostic", 730) },
  { id: "VEH-0021", plate: "440055", customer: "Sara Khalid", phone: "55440055", model: "Kia Sorento", year: "2021", mileage: "63,200", lastService: "26 Jan 2025", nextService: "26 Apr 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Red", notes: "Detailing service complete.", history: createHistory("Interior detailing", 320) },
  { id: "VEH-0020", plate: "660088", customer: "Khalid Salem", phone: "55660088", model: "Nissan Sunny", year: "2018", mileage: "134,000", lastService: "23 Jan 2025", nextService: "23 Apr 2025", status: "Due", advisor: "Ali Hassan", fuel: "Petrol", color: "Silver", notes: "Vehicle maintenance is overdue.", history: createHistory("Oil change", 260) },
  { id: "VEH-0019", plate: "770099", customer: "Amina Raza", phone: "55770099", model: "Mercedes GLC", year: "2022", mileage: "33,500", lastService: "20 Jan 2025", nextService: "20 Apr 2025", status: "Ready", advisor: "M. Khan", fuel: "Petrol", color: "Black", notes: "Vehicle inspection complete.", history: createHistory("Full service", 820) },
  { id: "VEH-0018", plate: "880011", customer: "Nasser Muddasir", phone: "55880011", model: "Toyota RAV4", year: "2020", mileage: "79,200", lastService: "17 Jan 2025", nextService: "17 Apr 2025", status: "Archived", advisor: "Ali Hassan", fuel: "Petrol", color: "Blue", notes: "Vehicle record archived.", history: createHistory("Brake service", 580) },
  { id: "VEH-0017", plate: "990022", customer: "Hassan Ahmed", phone: "55990022", model: "Land Rover Discovery", year: "2019", mileage: "105,800", lastService: "14 Jan 2025", nextService: "14 Apr 2025", status: "Due", advisor: "M. Khan", fuel: "Diesel", color: "White", notes: "Scheduled service and inspection due.", history: createHistory("Major service", 1300) },
  { id: "VEH-0016", plate: "110033", customer: "Lina Saeed", phone: "55110033", model: "Hyundai Santa Fe", year: "2021", mileage: "59,300", lastService: "11 Jan 2025", nextService: "11 Apr 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "Gray", notes: "Service completed and vehicle ready.", history: createHistory("Oil change", 360) },
  { id: "VEH-0015", plate: "220044", customer: "Majed Khan", phone: "55220044", model: "Jeep Grand Cherokee", year: "2018", mileage: "126,700", lastService: "8 Jan 2025", nextService: "8 Apr 2025", status: "In Service", advisor: "M. Khan", fuel: "Petrol", color: "Black", notes: "Suspension and steering inspection.", history: createHistory("Suspension check", 880) },
  { id: "VEH-0014", plate: "330055", customer: "Rasha Omar", phone: "55330055", model: "Toyota Yaris", year: "2022", mileage: "31,900", lastService: "5 Jan 2025", nextService: "5 Apr 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "White", notes: "Routine inspection completed.", history: createHistory("General service", 340) },
  { id: "VEH-0013", plate: "440066", customer: "Tariq Ali", phone: "55440066", model: "Audi A6", year: "2020", mileage: "82,450", lastService: "2 Jan 2025", nextService: "2 Apr 2025", status: "Due", advisor: "M. Khan", fuel: "Petrol", color: "Silver", notes: "Service due, customer contacted.", history: createHistory("AC service", 560) },
  { id: "VEH-0012", plate: "550077", customer: "Maha Noor", phone: "55550077", model: "Nissan Pathfinder", year: "2019", mileage: "99,100", lastService: "30 Dec 2024", nextService: "30 Mar 2025", status: "Ready", advisor: "Ali Hassan", fuel: "Petrol", color: "Blue", notes: "Vehicle service completed.", history: createHistory("Brake service", 720) },
  { id: "VEH-0011", plate: "660099", customer: "Salem Ahmed", phone: "55660099", model: "Chevrolet Captiva", year: "2021", mileage: "61,700", lastService: "27 Dec 2024", nextService: "27 Mar 2025", status: "Due", advisor: "M. Khan", fuel: "Petrol", color: "White", notes: "Maintenance due.", history: createHistory("Oil change", 310) },
];

const statusClass: Record<VehicleStatus, string> = {
  "In Service": "in-service",
  Ready: "ready",
  Due: "due",
  Archived: "archived",
};
const money = (value: number) => `QAR ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Vehicles({ notify, onAdd, onCreateWorkOrder }: { notify: (message: string) => void; onAdd: () => void; onCreateWorkOrder: () => void }) {
  const [vehicles] = useState(initialVehicles);
  const [selectedId, setSelectedId] = useState("VEH-0052");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Vehicle Types");
  const [page, setPage] = useState(1);
  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => {
    const matchesSearch = `${vehicle.id} ${vehicle.plate} ${vehicle.customer} ${vehicle.model} ${vehicle.year} ${vehicle.mileage}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "All Status" || vehicle.status === statusFilter;
    const matchesType = typeFilter === "All Vehicle Types" || vehicle.model.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  }), [search, statusFilter, typeFilter, vehicles]);
  const pageCount = Math.max(1, Math.ceil(filteredVehicles.length / 10));
  const currentPage = Math.min(page, pageCount);
  const pageVehicles = filteredVehicles.slice((currentPage - 1) * 10, currentPage * 10);
  const selectedVehicle = filteredVehicles.find((vehicle) => vehicle.id === selectedId) ?? filteredVehicles[0] ?? vehicles.find((vehicle) => vehicle.id === selectedId);
  const counts = {
    total: 42,
    inService: 18,
    ready: 15,
    due: 9,
  };
  const showHistory = () => selectedVehicle && notify(`Showing the latest ${selectedVehicle.history.length} service records for ${selectedVehicle.model}.`);
  const startWorkOrder = () => {
    if (!selectedVehicle) return;
    onCreateWorkOrder();
  };

  return (
    <main className="vehicle-management">
      <header className="vehicle-page-heading">
        <div className="vehicle-page-title">
          <span><CarFront size={27} /></span>
          <div><h1>Vehicles</h1><p>Manage customer vehicles, service records, and vehicle details.</p></div>
        </div>
        <button className="vehicle-create-button" onClick={onAdd}><Plus size={18} />Add Vehicle</button>
      </header>
      <section className="vehicle-metrics" aria-label="Vehicle summary">
        <article><span className="vehicle-metric-icon blue"><CarFront size={21} /></span><div><strong>{counts.total}</strong><small>Total Vehicles</small></div><Activity size={23} className="vehicle-spark blue-text" /></article>
        <article><span className="vehicle-metric-icon green"><Wrench size={20} /></span><div><strong>{counts.inService}</strong><small>Active in Service</small></div><Activity size={23} className="vehicle-spark green-text" /></article>
        <article><span className="vehicle-metric-icon orange"><Check size={20} /></span><div><strong>{counts.ready}</strong><small>Ready for Pickup</small></div><Activity size={23} className="vehicle-spark orange-text" /></article>
        <article><span className="vehicle-metric-icon red"><CalendarDays size={20} /></span><div><strong>{counts.due}</strong><small>Due for Maintenance</small></div><Activity size={23} className="vehicle-spark red-text" /></article>
      </section>
      <div className="vehicle-management-layout">
        <section className="vehicle-list-card">
          <div className="vehicle-filters">
            <label className="vehicle-search"><Search size={16} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by plate no., customer, vehicle, or VIN..." aria-label="Search vehicles" /></label>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} aria-label="Filter by vehicle status">
              {["All Status", "In Service", "Ready", "Due", "Archived"].map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(1); }} aria-label="Filter by vehicle type">
              {["All Vehicle Types", "Toyota", "Nissan", "Lexus", "BMW", "Honda"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <label className="vehicle-date-filter"><CalendarDays size={15} /><span>Last Service (All Dates)</span></label>
          </div>
          <div className="vehicle-table-scroll">
            <table className="vehicle-management-table">
              <thead><tr><th>#</th><th>Vehicle ID</th><th>Plate No.</th><th>Customer</th><th>Vehicle</th><th>Year</th><th>Mileage (KM)</th><th>Last Service</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {pageVehicles.map((vehicle, index) => (
                  <tr key={vehicle.id} className={selectedVehicle?.id === vehicle.id ? "selected" : ""} onClick={() => setSelectedId(vehicle.id)}>
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td><button className="vehicle-id-link" onClick={(event) => { event.stopPropagation(); setSelectedId(vehicle.id); }}>{vehicle.id}</button></td>
                    <td>{vehicle.plate}</td><td>{vehicle.customer}</td>
                    <td><span className="vehicle-model-cell"><CarFront size={31} /><span>{vehicle.model}</span></span></td>
                    <td>{vehicle.year}</td><td>{vehicle.mileage}</td><td>{vehicle.lastService}</td>
                    <td><span className={`vehicle-status-badge ${statusClass[vehicle.status]}`}>{vehicle.status}</span></td>
                    <td><button className="vehicle-row-action" aria-label={`View ${vehicle.id}`} onClick={(event) => { event.stopPropagation(); setSelectedId(vehicle.id); }}><Eye size={15} /></button><button className="vehicle-row-action" aria-label={`More actions for ${vehicle.id}`} onClick={(event) => { event.stopPropagation(); notify(`More actions for ${vehicle.id} are not available in this frontend preview.`); }}><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
                {filteredVehicles.length === 0 && <tr><td colSpan={10} className="vehicle-empty">No vehicles match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="vehicle-table-footer"><span>Showing {filteredVehicles.length ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, filteredVehicles.length)} of {filteredVehicles.length} vehicles</span><div><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""} aria-label={`Page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}<button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16} /></button></div></footer>
        </section>
        {selectedVehicle && (
          <aside className="vehicle-detail-card" aria-label={`Vehicle details for ${selectedVehicle.id}`}>
            <header><div><FileText size={16} /><strong>Vehicle Details</strong></div><button onClick={() => notify("Vehicle editing is not available in this frontend preview.")}>Edit</button></header>
            <div className="vehicle-detail-heading"><strong>{selectedVehicle.model} - {selectedVehicle.year}</strong><span className={`vehicle-status-badge ${statusClass[selectedVehicle.status]}`}>{selectedVehicle.status}</span></div>
            <div className="vehicle-detail-overview">
              <span className={`vehicle-large-illustration ${selectedVehicle.color.toLowerCase().replaceAll(" ", "-")}`}><CarFront size={76} strokeWidth={1.4} /></span>
              <div><span>Plate No.<strong>{selectedVehicle.plate}</strong></span><span>VIN:<strong>N/A</strong></span><span>Mileage:<strong>{selectedVehicle.mileage} KM</strong></span><span>Fuel Type:<strong>{selectedVehicle.fuel}</strong></span><span>Color:<strong>{selectedVehicle.color}</strong></span></div>
            </div>
            <div className="vehicle-detail-facts">
              <div><UserRound size={15} /><span>Customer</span><strong>{selectedVehicle.customer}<small>{selectedVehicle.phone}</small></strong></div>
              <div><Wrench size={15} /><span>Service Advisor</span><strong>{selectedVehicle.advisor}</strong></div>
              <div><CalendarDays size={15} /><span>Last Service Date</span><strong>{selectedVehicle.lastService}</strong></div>
              <div><CalendarDays size={15} className="due-icon" /><span>Next Service Due</span><strong className="next-due">{selectedVehicle.nextService} (in 3 months)</strong></div>
            </div>
            <section className="vehicle-notes">
              <h3><FileText size={15} />Recent Notes</h3>
              <p>{selectedVehicle.notes}</p>
            </section>
            <section className="vehicle-history">
              <h3><Clock3 size={15} />Service History (Latest 5)<button onClick={showHistory}>View All</button></h3>
              <div className="vehicle-history-scroll"><table><thead><tr><th>Date</th><th>Job Type</th><th>Mileage</th><th>Amount</th></tr></thead><tbody>{selectedVehicle.history.map((record) => <tr key={`${selectedVehicle.id}-${record.date}`}><td>{record.date}</td><td>{record.job}</td><td>{record.mileage}</td><td>{money(record.amount)}</td></tr>)}</tbody></table></div>
            </section>
            <div className="vehicle-detail-actions">
              <button onClick={showHistory}><Clock3 size={14} />View History</button>
              <button onClick={() => notify("Vehicle editing is not available in this frontend preview.")}><Wrench size={14} />Edit Vehicle</button>
              <button className="create-work-order" onClick={startWorkOrder}><FileText size={14} />Create Work Order</button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

export default Vehicles;
