# Garage Workspace — Project Progress

Last updated: 23 October 2026
Project folder: `D:\Garage System`

## Current status

The frontend prototype has an opening splash screen, a CRM dashboard, and a POS Billing screen. Dashboard and POS Billing can be selected in the sidebar. Other modules are placeholders. Development is proceeding step by step from user-supplied screenshots.

This handoff adds documentation only; no existing application functionality was changed.

## Stack and project map

- React 18, Vite 6, TypeScript with TSX and strict checks.
- Tailwind CSS 4 through the Vite plugin; custom component styles and responsive rules in `src/index.css`.
- Lucide React icons. Functional components, React state and effects.
- Frontend only: no backend, database, APIs, authentication, or payment gateway.

```text
public/garage-workspace-logo.png   Original logo asset
src/main.tsx                       React entry point
src/App.tsx                        Shared shell, navigation, CRM dashboard, preview dialogs
src/components/SplashScreen.tsx    Opening loading animation
src/components/PosBilling.tsx      POS catalog, cart, payment UI, drafts and receipts
src/lib/billing.ts                 Integer-cent invoice calculations
src/index.css                      Tailwind import, splash and application styles
tests/billing.mjs                  Billing calculation checks using existing TypeScript dependency
index.html                        Page title and theme color
package.json                      Dependencies and npm scripts
tsconfig.json                     TypeScript configuration
vite.config.ts                    React and Tailwind Vite plugins
.gitignore                        Excludes dependencies, build output and local generated files
```

## Completed features

### Splash screen

- Full-screen dark navy background with the existing white/orange Garage Workspace logo.
- Responsive centered logo, smooth fade-in, thin animated orange loading bar.
- Fade-out begins after 2.5 seconds and lasts 700 ms, revealing the application.
- Uses `useState` and `useEffect`; timers are cleaned up and reduced-motion preferences are supported.
- The original blank placeholder has now been replaced by the dashboard as subsequently requested.

### Shared application shell

- Navy sidebar with original logo, Lucide navigation icons and orange active selection.
- Dashboard/POS switching uses React state; no routing package or URL routes.
- Responsive mobile sidebar with menu toggle and dismissible backdrop.
- Header search, Ctrl/Cmd+K search shortcut, notification popover and owner profile preview.
- Footer styled to match the reference, with status, timezone, version, help and support controls.
- Toast feedback and frontend placeholder dialogs for unfinished modules.
- Latest requested change: only the sidebar scrollbar is hidden through CSS. The sidebar itself remains visible and scrollable.

### CRM dashboard

- Summary cards for active jobs, awaiting signatures, ready vehicles, revenue and pending quotations.
- Searchable work orders, status tabs, mechanic avatars, status badges and work-order detail dialogs.
- Sample quotations with approve/reject actions; pending count and quotation total update in memory.
- POS/invoice summary, quick actions, low-stock list and activity timeline.
- Dashboard preview forms for future workflows explicitly state that they do not save records.
- Removed the four circled buttons from the dashboard billing card at the user's request: New Invoice, Quick Bill, Service Sale and Parts Sale. Keep them removed.

### POS Billing

- Dedicated sidebar destination matching the second supplied screenshot's overall layout.
- Customer selector, editable phone/vehicle/plate fields and optional work-order selector.
- Service Sale / Parts Sale / Mixed Bill tabs; category filters and catalog search.
- Nine sample service/part products; click a product to add it or increment its cart quantity.
- Invoice table with quantity controls, editable line discounts, calculated taxes/totals, item removal and Clear All.
- Quantities limited to 1–999; discounts limited to the line gross amount.
- Billing summary with parts/services gross amounts, subtotal, discounts, 5% demo VAT and grand total.
- Cash, Card, Bank and Split payment choices. Cash checks for insufficient received amount and shows change or amount due. Split accepts a cash portion and calculates the card portion.
- Generate Invoice creates a local demo invoice, adds it to recent invoices, clears the cart and opens a receipt dialog. No real payment is processed.
- Recent invoice list, receipt viewing, browser printing and plain-text invoice downloads.
- New walk-in sale, sample work-order bill loading, add-customer dialog, save draft and resume draft.
- POS dialog Escape handling, focus trapping/restoration and background scroll locking.
- Cart/customer state remains mounted when switching between Dashboard and POS during the same session.

## Storage and persistence

- `garage-pos-invoices`: generated demo invoices stored in browser `localStorage`.
- `garage-pos-draft`: one saved bill containing cart, customer, payment, received amount, split cash and work-order selection. Saving another draft overwrites it; invoice generation removes it.
- Resume Draft is manual; a reload starts with the sample cart rather than automatically reopening the saved draft.
- Added customers are session-only, though a saved draft/invoice includes its customer snapshot. Restoring an unknown draft customer adds a selectable option for that customer.
- Quotation decisions and dashboard changes are session-only.
- Browser storage is local to the browser/origin and is not a shared CRM database. Keep the same host and port to access the same saved browser data.

## Branding and implementation decisions

- Preserve `public/garage-workspace-logo.png` without altering the original logo.
- Primary navy is `#16212f`; orange accents, light gray workspace backgrounds and white cards follow the supplied references.
- Reference files supplied by the user:
  - `D:\IMG\Garage Workspace Dashboard.png`
  - `D:\IMG\Garage Workspace POS Billing Dashboard.png`
- Vehicle and part thumbnails use Lucide icons with colored backgrounds; original photographic thumbnails are not available as separate assets.
- The POS screenshot contains inconsistent arithmetic. Actual line items determine the totals instead of reproducing those inconsistencies.
- For the initial four POS items: gross parts = QAR 445.00, services = QAR 200.00, subtotal = QAR 645.00, discount = QAR 25.00, tax = QAR 31.00, total = QAR 651.00. Initial cash received is QAR 700.00, so change is QAR 49.00.
- Tax is rounded per line after discount using integer-cent calculations. The 5% rate is a demo requirement from the image, not verified tax guidance.
- Printing/download replace external messaging workflows. No WhatsApp/email sending integration has been added.
- Preserve the existing dashboard, splash and removed buttons when implementing future modules.
- The user prefers narrowly scoped edits and has asked not to install anything during recent UI work. No packages were installed for the dashboard refinements, POS screen or scrollbar change. Use existing dependencies unless the user authorizes more.

## Verification completed

- `npm run build` passed after the final POS draft/customer fix: TypeScript and Vite production build succeeded.
- `node tests/billing.mjs` passed: sample totals, quantity changes, discount limits, negative-discount clamping, tax rounding and empty cart.
- Vite started successfully; the root page and POS TSX module returned HTTP 200.
- The later sidebar scrollbar change was a CSS-only edit and was not followed by another build.
- No browser visual verification or automated end-to-end interaction tests were performed. Responsive layout, printing and interactive flows still need a browser review.
- Temporary dev servers started for verification were stopped. No hosted deployment was performed.
- On this machine, sandboxed Node/npm execution previously failed with `EPERM` while resolving `C:\Users\Muhammad Ammar`. Authorized execution outside the sandbox succeeded. This was an environment restriction, not a project build error.

## Pending work and known limitations

- Full modules remain unimplemented: New Intake, Work Orders management, Quotations management, Invoices management, Vehicles, Customers, Parts Inventory, Mechanics, Reports and Settings. Most navigation entries open placeholders; dashboard quick-action forms are previews.
- Header date, footer synchronization/status text and many KPI values are static sample data. New POS receipts use the current date formatted in Qatar time. POS KPI cards are not a complete live aggregation; the bill count uses a demo baseline plus the stored invoice count difference.
- Work-order selection is a local field; the shortcut loads a fixed sample bill rather than fetching a linked work order.
- The receipt header always says Walk-in Sale, including the sample work-order bill.
- Generated local invoices are marked Paid; card/bank selections do not verify payment. Nothing updates a real inventory or accounting ledger.
- Initial historical invoice rows have no item details; their receipt dialogs explicitly identify them as samples.
- Catalog search combines the local catalog input and header search. Dashboard header search filters work orders rather than all application modules.
- Clear cart/new sale actions currently have no confirmation dialog.
- No persistent customer catalog, multi-user sync, automatic cart saving, cloud backups or production invoice numbering.
- Some existing source files are compact with long JSX/CSS lines. Avoid unrelated formatting changes during narrowly scoped requests.

## Exact next steps for the next session

1. Open `D:\Garage System` in VS Code and read this file before editing.
2. Start the existing project (dependencies are already installed):

   ```powershell
   cd 'D:\Garage System'
   npm run dev
   ```

3. Open the Local URL printed by Vite, normally `http://localhost:5173/`. Wait for the splash to fade, then select POS Billing from the sidebar.
4. Review the current dashboard and POS against the two reference images at desktop and mobile sizes. Confirm that only the sidebar scrollbar is hidden and that the four removed dashboard buttons remain absent.
5. Verify POS interactions in the browser: filter/search products; add/remove items; adjust quantity/discount; check sample QAR 651.00 total; test insufficient cash and split payment; save/resume a draft; generate an invoice; reopen it; download and print it. Reload using the same origin to check saved data. Test print using a demo invoice.
6. Run the existing checks when implementation changes warrant them:

   ```powershell
   node tests/billing.mjs
   npm run build
   ```

7. Continue only with the next screen or correction the user requests. No next business module has been selected or authorized yet; ask which module to implement if the user simply says to continue. Keep all development frontend-only unless explicitly instructed otherwise.
8. Update this progress file after the next completed milestone with actual changes and verification results.

Suggested next-session prompt: "Read PROJECT_PROGRESS.md and continue from the current Garage Workspace project. Preserve the existing dashboard and POS. The next task is: [describe the next screen or correction]."
