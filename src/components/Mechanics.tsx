import { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  HardHat,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Star,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";

type MechanicStatus = "On Job" | "Available" | "Busy" | "Off Duty" | "On Leave" | "On Duty";
type AssignmentStatus = "In Progress" | "Pending" | "Completed";
type Assignment = { workOrder: string; vehicle: string; customer: string; service: string; status: AssignmentStatus };
type Mechanic = {
  id: string;
  name: string;
  initials: string;
  role: string;
  phone: string;
  email: string;
  status: MechanicStatus;
  shift: string;
  assignedJobs: number;
  completedJobs: number;
  rating: number;
  experience: number;
  notes: string;
  assignments: Assignment[];
};

const assignmentsFor = (name: string, service: string): Assignment[] => {
  const assignments: Assignment[] = [
  { workOrder: "WO-0047", vehicle: "Toyota Corolla", customer: "Ahmed Malik", service, status: "In Progress" },
  { workOrder: "WO-0049", vehicle: "Honda Civic", customer: "Sara Khan", service: "Oil Change", status: "Pending" },
  { workOrder: "WO-0051", vehicle: "Ford Ranger", customer: "Bilal Ahmed", service: "Cooling System Check", status: "In Progress" },
  ];
  return assignments.map((assignment, index) => ({ ...assignment, customer: index === 0 ? "Ahmed Malik" : index === 1 ? "Sara Khan" : name === "Ali Hassan" ? "Bilal Ahmed" : "Omar Saeed" }));
};

const featuredMechanics: Mechanic[] = [
  { id: "MEC-1001", name: "Ali Hassan", initials: "AH", role: "Engine Specialist", phone: "050 123 4567", email: "ali.hassan@garageworkspace.com", status: "On Job", shift: "Morning", assignedJobs: 3, completedJobs: 248, rating: 4.8, experience: 6, notes: "Expert in engine diagnostics and premium detailing.", assignments: assignmentsFor("Ali Hassan", "Engine Diagnostics") },
  { id: "MEC-1002", name: "M. Khan", initials: "MK", role: "Brake Specialist", phone: "050 234 5678", email: "m.khan@garageworkspace.com", status: "Available", shift: "Morning", assignedJobs: 2, completedJobs: 194, rating: 4.5, experience: 5, notes: "Experienced brake and suspension technician.", assignments: assignmentsFor("M. Khan", "Brake Service") },
  { id: "MEC-1003", name: "Ahmed Raza", initials: "AR", role: "Electrical", phone: "050 345 6789", email: "ahmed.raza@garageworkspace.com", status: "On Job", shift: "Evening", assignedJobs: 3, completedJobs: 171, rating: 4.7, experience: 4, notes: "Specializes in diagnostics, wiring, and electrical systems.", assignments: assignmentsFor("Ahmed Raza", "Electrical Diagnostics") },
  { id: "MEC-1004", name: "Bilal Khan", initials: "BK", role: "AC Specialist", phone: "050 456 7890", email: "bilal.khan@garageworkspace.com", status: "Available", shift: "Morning", assignedJobs: 1, completedJobs: 156, rating: 4.3, experience: 4, notes: "Air-conditioning service and climate system repairs.", assignments: assignmentsFor("Bilal Khan", "AC Service") },
  { id: "MEC-1005", name: "Fahad Khan", initials: "FK", role: "Transmission", phone: "050 567 8901", email: "fahad.khan@garageworkspace.com", status: "Busy", shift: "Evening", assignedJobs: 4, completedJobs: 212, rating: 4.6, experience: 7, notes: "Transmission servicing and drivetrain repair specialist.", assignments: assignmentsFor("Fahad Khan", "Transmission Repair") },
  { id: "MEC-1006", name: "Usman Ali", initials: "UA", role: "General Repair", phone: "050 678 9012", email: "usman.ali@garageworkspace.com", status: "Off Duty", shift: "Morning", assignedJobs: 1, completedJobs: 132, rating: 4.2, experience: 3, notes: "General vehicle maintenance and repair.", assignments: assignmentsFor("Usman Ali", "General Repair") },
  { id: "MEC-1007", name: "Hamza Shehzad", initials: "HS", role: "Suspension", phone: "050 789 0123", email: "hamza.shehzad@garageworkspace.com", status: "Available", shift: "Evening", assignedJobs: 2, completedJobs: 163, rating: 4.4, experience: 5, notes: "Suspension, steering, and wheel alignment services.", assignments: assignmentsFor("Hamza Shehzad", "Suspension Check") },
  { id: "MEC-1008", name: "Imran Qureshi", initials: "IQ", role: "Diagnostics", phone: "050 890 1234", email: "imran.qureshi@garageworkspace.com", status: "On Job", shift: "Morning", assignedJobs: 3, completedJobs: 205, rating: 4.8, experience: 8, notes: "Advanced diagnostics and fault tracing.", assignments: assignmentsFor("Imran Qureshi", "Vehicle Diagnostics") },
  { id: "MEC-1009", name: "Salman Ali", initials: "SA", role: "Body & Paint", phone: "050 901 2345", email: "salman.ali@garageworkspace.com", status: "On Leave", shift: "Evening", assignedJobs: 1, completedJobs: 118, rating: 4.1, experience: 3, notes: "Body repair, paintwork, and detailing.", assignments: assignmentsFor("Salman Ali", "Body Repair") },
  { id: "MEC-1010", name: "Zeeshan Ahmed", initials: "ZA", role: "Tyres & Alignment", phone: "050 012 3456", email: "zeeshan.ahmed@garageworkspace.com", status: "Available", shift: "Morning", assignedJobs: 2, completedJobs: 147, rating: 4.5, experience: 4, notes: "Wheel and tyre services with alignment expertise.", assignments: assignmentsFor("Zeeshan Ahmed", "Wheel Alignment") },
  { id: "MEC-1011", name: "Omar Saeed", initials: "OS", role: "Engine Specialist", phone: "050 112 3456", email: "omar.saeed@garageworkspace.com", status: "Available", shift: "Evening", assignedJobs: 1, completedJobs: 138, rating: 4.6, experience: 5, notes: "Engine servicing and scheduled maintenance.", assignments: assignmentsFor("Omar Saeed", "Engine Service") },
  { id: "MEC-1012", name: "Hassan Noor", initials: "HN", role: "General Repair", phone: "050 212 3456", email: "hassan.noor@garageworkspace.com", status: "On Job", shift: "Morning", assignedJobs: 2, completedJobs: 126, rating: 4.3, experience: 4, notes: "General inspections and workshop repairs.", assignments: assignmentsFor("Hassan Noor", "Vehicle Inspection") },
  { id: "MEC-1013", name: "Tariq Mansoor", initials: "TM", role: "Electrical", phone: "050 312 3456", email: "tariq.mansoor@garageworkspace.com", status: "Available", shift: "Night", assignedJobs: 1, completedJobs: 102, rating: 4.4, experience: 3, notes: "Electrical systems and battery service.", assignments: assignmentsFor("Tariq Mansoor", "Battery Service") },
  { id: "MEC-1014", name: "Yousef Rahman", initials: "YR", role: "Brake Specialist", phone: "050 412 3456", email: "yousef.rahman@garageworkspace.com", status: "Busy", shift: "Morning", assignedJobs: 4, completedJobs: 186, rating: 4.7, experience: 6, notes: "Brake repairs and preventive safety checks.", assignments: assignmentsFor("Yousef Rahman", "Brake Inspection") },
  { id: "MEC-1015", name: "Nasser Ali", initials: "NA", role: "AC Specialist", phone: "050 512 3456", email: "nasser.ali@garageworkspace.com", status: "Off Duty", shift: "Evening", assignedJobs: 0, completedJobs: 95, rating: 4.2, experience: 3, notes: "AC diagnostics and refrigerant systems.", assignments: assignmentsFor("Nasser Ali", "AC Diagnostics") },
  { id: "MEC-1016", name: "Rashid Salem", initials: "RS", role: "Transmission", phone: "050 612 3456", email: "rashid.salem@garageworkspace.com", status: "Available", shift: "Night", assignedJobs: 1, completedJobs: 155, rating: 4.6, experience: 7, notes: "Transmission diagnostics and repair.", assignments: assignmentsFor("Rashid Salem", "Transmission Service") },
  { id: "MEC-1017", name: "Majid Noor", initials: "MN", role: "Suspension", phone: "050 712 3456", email: "majid.noor@garageworkspace.com", status: "On Leave", shift: "Morning", assignedJobs: 0, completedJobs: 87, rating: 4.0, experience: 2, notes: "Suspension system repair and inspections.", assignments: assignmentsFor("Majid Noor", "Suspension Repair") },
  { id: "MEC-1018", name: "Khalid Hassan", initials: "KH", role: "Diagnostics", phone: "050 812 3456", email: "khalid.hassan@garageworkspace.com", status: "On Job", shift: "Evening", assignedJobs: 2, completedJobs: 164, rating: 4.7, experience: 6, notes: "Vehicle diagnostics and service reporting.", assignments: assignmentsFor("Khalid Hassan", "Engine Diagnostics") },
];

const statusClass: Record<MechanicStatus, string> = { "On Job": "on-job", Available: "available", Busy: "busy", "Off Duty": "off-duty", "On Leave": "on-leave", "On Duty": "on-duty" };

function Mechanics({ notify, onAdd, onAssign }: { notify: (message: string) => void; onAdd: () => void; onAssign: () => void }) {
  const [mechanics] = useState(featuredMechanics);
  const [selectedId, setSelectedId] = useState("MEC-1001");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [shiftFilter, setShiftFilter] = useState("All Shifts");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const filteredMechanics = useMemo(() => mechanics.filter((mechanic) => {
    const matchesSearch = `${mechanic.id} ${mechanic.name} ${mechanic.role} ${mechanic.phone}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesRole = roleFilter === "All Roles" || mechanic.role === roleFilter;
    const matchesStatus = statusFilter === "All Status" || mechanic.status === statusFilter;
    const matchesShift = shiftFilter === "All Shifts" || mechanic.shift === shiftFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesShift;
  }), [mechanics, roleFilter, search, shiftFilter, statusFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredMechanics.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageMechanics = filteredMechanics.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selectedMechanic = filteredMechanics.find((mechanic) => mechanic.id === selectedId) ?? filteredMechanics[0] ?? mechanics.find((mechanic) => mechanic.id === selectedId);
  const counts = { total: 18, onDuty: 12, available: 5, onJob: 7 };

  return (
    <main className="mechanics-management">
      <header className="mechanics-page-heading">
        <div className="mechanics-page-title"><span><UsersRound size={26} /></span><div><h1>Mechanics</h1><p>Manage technicians, assignments, skills, and performance.</p></div></div>
        <button className="mechanics-create-button" onClick={onAdd}><Plus size={18} />Add Mechanic</button>
      </header>
      <section className="mechanics-metrics" aria-label="Mechanic summary">
        <article><span className="mechanics-metric-icon blue"><UsersRound size={21} /></span><div><strong>{counts.total}</strong><small>Total Mechanics</small></div><Activity size={23} className="mechanics-spark blue-text" /></article>
        <article><span className="mechanics-metric-icon green"><HardHat size={20} /></span><div><strong>{counts.onDuty}</strong><small>On Duty</small></div><Activity size={23} className="mechanics-spark green-text" /></article>
        <article><span className="mechanics-metric-icon purple"><UserRound size={20} /></span><div><strong>{counts.available}</strong><small>Available</small></div><Activity size={23} className="mechanics-spark purple-text" /></article>
        <article><span className="mechanics-metric-icon orange"><Wrench size={20} /></span><div><strong>{counts.onJob}</strong><small>On Job</small></div><Activity size={23} className="mechanics-spark orange-text" /></article>
      </section>
      <div className="mechanics-management-layout">
        <section className="mechanics-list-card">
          <div className="mechanics-filters">
            <label className="mechanics-search"><Search size={16} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search by mechanic name, ID, specialty, phone..." aria-label="Search mechanics" /></label>
            <select value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setPage(1); }} aria-label="Filter by mechanic role">{["All Roles", ...Array.from(new Set(mechanics.map((mechanic) => mechanic.role)))].map((role) => <option key={role}>{role}</option>)}</select>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} aria-label="Filter by mechanic status">{["All Status", "On Job", "Available", "Busy", "Off Duty", "On Leave"].map((status) => <option key={status}>{status}</option>)}</select>
            <select value={shiftFilter} onChange={(event) => { setShiftFilter(event.target.value); setPage(1); }} aria-label="Filter by shift">{["All Shifts", "Morning", "Evening", "Night"].map((shift) => <option key={shift}>{shift}</option>)}</select>
            <label className="mechanics-date-filter"><CalendarDays size={15} /><span>Last Updated (All Dates)</span></label>
          </div>
          <div className="mechanics-table-scroll">
            <table className="mechanics-management-table">
              <thead><tr><th>#</th><th>Mechanic ID</th><th>Mechanic Name</th><th>Role / Specialty</th><th>Contact</th><th>Assigned Jobs</th><th>Status</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {pageMechanics.map((mechanic, index) => (
                  <tr key={mechanic.id} className={selectedMechanic?.id === mechanic.id ? "selected" : ""} onClick={() => setSelectedId(mechanic.id)}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td><td><button className="mechanic-id-link" onClick={(event) => { event.stopPropagation(); setSelectedId(mechanic.id); }}>{mechanic.id}</button></td>
                    <td><span className="mechanic-name-cell"><span>{mechanic.initials}</span>{mechanic.name}</span></td><td>{mechanic.role}</td><td>{mechanic.phone}</td><td>{mechanic.assignedJobs}</td>
                    <td><span className={`mechanic-status-badge ${statusClass[mechanic.status]}`}>{mechanic.status}</span></td><td><span className="mechanic-rating"><Star size={13} fill="currentColor" />{mechanic.rating.toFixed(1)}</span></td>
                    <td><button className="mechanic-row-action" aria-label={`View ${mechanic.id}`} onClick={(event) => { event.stopPropagation(); setSelectedId(mechanic.id); }}><Eye size={15} /></button><button className="mechanic-row-action" aria-label={`Edit ${mechanic.id}`} onClick={(event) => { event.stopPropagation(); notify("Mechanic editing is not available in this frontend preview."); }}><Wrench size={14} /></button><button className="mechanic-row-action" aria-label={`More actions for ${mechanic.id}`} onClick={(event) => { event.stopPropagation(); notify(`More actions for ${mechanic.id} are not available in this frontend preview.`); }}><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
                {filteredMechanics.length === 0 && <tr><td colSpan={9} className="mechanics-empty">No mechanics match the selected filters.</td></tr>}
              </tbody>
            </table>
          </div>
          <footer className="mechanics-table-footer"><span>Showing {filteredMechanics.length ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredMechanics.length)} of {filteredMechanics.length} mechanics</span><div><button aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""} aria-label={`Page ${pageNumber}`} aria-current={currentPage === pageNumber ? "page" : undefined} onClick={() => setPage(pageNumber)}>{pageNumber}</button>)}<button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16} /></button><select aria-label="Rows per page" value={pageSize} onChange={() => setPage(1)}><option value={10}>10</option><option value={25}>25</option></select></div></footer>
        </section>
        {selectedMechanic && (
          <aside className="mechanic-detail-card" aria-label={`Mechanic details for ${selectedMechanic.id}`}>
            <header><div><FileText size={16} /><strong>Mechanic Details</strong></div><button onClick={() => notify("Mechanic editing is not available in this frontend preview.")}>Edit</button></header>
            <div className="mechanic-detail-heading"><span className="mechanic-large-avatar">{selectedMechanic.initials}</span><div><strong>{selectedMechanic.name}</strong><span>Mechanic ID: {selectedMechanic.id}</span></div><span className={`mechanic-status-badge ${statusClass[selectedMechanic.status]}`}>{selectedMechanic.status === "On Job" ? "On Duty" : selectedMechanic.status}</span></div>
            <div className="mechanic-detail-facts">
              <div><Phone size={14} /><span>Phone:</span><strong>{selectedMechanic.phone}</strong></div>
              <div><Mail size={14} /><span>Email:</span><strong>{selectedMechanic.email}</strong></div>
              <div><Wrench size={14} /><span>Specialty:</span><strong>{selectedMechanic.role}</strong></div>
              <div><Clock3 size={14} /><span>Experience:</span><strong>{selectedMechanic.experience} Years</strong></div>
              <div><Clock3 size={14} /><span>Working Hours:</span><strong>{selectedMechanic.shift === "Morning" ? "9:00 AM – 6:00 PM" : selectedMechanic.shift === "Evening" ? "2:00 PM – 11:00 PM" : "10:00 PM – 7:00 AM"}</strong></div>
              <div><UserRound size={14} /><span>Status:</span><strong><span className={`mechanic-status-badge ${statusClass[selectedMechanic.status]}`}>{selectedMechanic.status}</span></strong></div>
              <div><FileText size={14} /><span>Assigned Jobs:</span><strong>{selectedMechanic.assignedJobs}</strong></div>
              <div><Check size={14} /><span>Completed Jobs:</span><strong>{selectedMechanic.completedJobs}</strong></div>
              <div><Star size={14} /><span>Average Rating:</span><strong>{selectedMechanic.rating.toFixed(1)} / 5.0</strong></div>
            </div>
            <section className="mechanic-notes"><p><strong><span><Activity size={15} />Notes:</span></strong><br />{selectedMechanic.notes}</p></section>
            <section className="mechanic-assignments">
              <h3><FileText size={15} />Today's Assignments<button onClick={() => notify(`Showing all assignments for ${selectedMechanic.name}.`)}>View All</button></h3>
              <div className="mechanic-assignments-scroll"><table><thead><tr><th>#</th><th>WO #</th><th>Vehicle / Customer</th><th>Service</th><th>Status</th></tr></thead><tbody>{selectedMechanic.assignments.map((assignment, index) => <tr key={`${selectedMechanic.id}-${assignment.workOrder}`}><td>{index + 1}</td><td>{assignment.workOrder}</td><td>{assignment.vehicle}<small>{assignment.customer}</small></td><td>{assignment.service}</td><td><span className={`assignment-status ${assignment.status === "Pending" ? "pending" : assignment.status === "Completed" ? "completed" : "in-progress"}`}>{assignment.status}</span></td></tr>)}</tbody></table></div>
            </section>
            <div className="mechanic-detail-actions"><button onClick={() => notify(`Schedule preview opened for ${selectedMechanic.name}.`)}><CalendarDays size={14} />View Schedule</button><button onClick={() => notify("Mechanic editing is not available in this frontend preview.")}><Wrench size={14} />Edit Mechanic</button><button className="assign-work-order" onClick={onAssign}><Plus size={14} />Assign Work Order</button></div>
          </aside>
        )}
      </div>
    </main>
  );
}

export default Mechanics;
