# Bookkeeping, Tax Compliance, and Per-Villa Profitability for a Bali Short-Term Rental Business

**Working paper — draft v0.1**
**Prepared:** 2026-10-08
**Status:** Methodology only. No transaction data has been received yet. All Indonesian tax rules in Section 5 are *unverified* and must be confirmed by a licensed local accountant (*konsultan pajak*) before use.

---

## Abstract

A family-owned short-term rental business in Bali earns income through Airbnb payouts, direct bank transfers, and cash, in several currencies, mostly Indonesian rupiah (IDR). Owner and family money are mixed, service fees are unclear, and pricing decisions are made by feel rather than by per-villa profit. This paper sets out a method to (1) record every income and expense item in one ledger, (2) convert all amounts to IDR at the transaction-date rate, (3) reconcile platform payouts against bookings and fees, (4) separate business cash from personal cash, (5) produce monthly, quarterly, half-year, and annual reports including per-villa profit, and (6) track Indonesian tax obligations on a reporting calendar. The output is a set of reproducible files that an accountant can review.

---

## 1. Introduction

The business generates revenue from villa stays. Its owner (the user's mother) runs day-to-day operations. The user is an investor-minded family member who wants clean books, on-time tax filings, and a reliable profit figure for each villa. The current problems are:

1. **Commingling.** Business revenue pays for personal living costs, including support for a family member. Salary and owner's draw are not separated from operating cash.
2. **Unclear fees.** Platform fees, currency conversion charges, and bank charges are netted out of payouts with no record.
3. **Multi-currency.** Some payouts arrive in foreign currency; costs are mostly in IDR.
4. **No per-villa view.** Costs are not tagged to a villa, so profitability per property is unknown.
5. **Tax uncertainty.** Filing status, rates, and deadlines are not documented.

## 2. Research Questions

- **RQ1:** Can every transaction be traced from source document to ledger entry to report line?
- **RQ2:** What is the net profit per villa per month, after platform fees, FX effects, and all direct costs?
- **RQ3:** Which Indonesian tax obligations apply, and what is the compliance calendar?
- **RQ4:** What separation between business and personal funds is needed to keep the books defensible?

## 3. Scope and Data

**In scope:** Airbnb payouts and fee statements; direct bookings; bank transfers; cash receipts; villa operating costs (cleaning, repairs, utilities, supplies); staff pay; licences and permits; tax payments.

**Out of scope (for now):** Personal household spending of any family member; the owner's own personal tax return (to be confirmed with the accountant).

**Data sources required:**

| Source | Format | Frequency | Status |
|---|---|---|---|
| Airbnb transaction history (earnings and fees) | CSV from Airbnb | Monthly | Not yet received |
| Bank statements (every account used) | PDF / CSV | Monthly | Not yet received |
| Cash book | Handwritten or spreadsheet | Daily | Not yet received |
| Supplier and staff receipts | Photo / PDF | Per event | Not yet received |
| Licence and permit documents | PDF | One-off / renewal | Not yet received |

## 4. Methodology

### 4.1 Single ledger, one row per money movement

Every movement of money is one row in `ledger_template.csv` (see the companion file). Each row carries:

- `date`, `villa_id`, `category`, `description`
- `direction` (income / expense / transfer / owner_draw)
- `original_amount`, `original_currency`
- `fx_rate_to_idr`, `amount_idr` (computed)
- `counterparty`, `source_doc` (filename or receipt ID)
- `account` (which bank or cash box)

**Transfers and owner's draws are recorded, but they are not income or expense.** This is the single most important rule for the mixed-funds problem: money moved from the business account to a family member is an owner's draw (or a documented salary) and is reported as such, not as an operating cost.

### 4.2 Currency conversion

Per the owner's instruction, all foreign-currency amounts are converted to IDR at the **transaction-date rate**. Rules:

1. Use one published daily source for every conversion (proposal: Bank Indonesia reference rate for that date; confirm with the accountant).
2. Store the rate in the ledger row. Never convert retroactively with a different rate.
3. Foreign exchange gains and losses that arise when the payout is received later than the booking are recorded in a separate line, `fx_difference`.
4. For Indonesian tax purposes, the accountant must confirm whether the monthly tax exchange rate (*kurs pajak*) is required in place of the transaction-date rate. The books keep the transaction-date rate; tax filings may need a second figure.

### 4.3 Reconciling payouts to bookings

For each Airbnb payout, the reconciliation is:

> **Gross booking amount** − **guest service fee (if shown)** − **host service fee** − **taxes withheld by platform (if any)** − **currency conversion fee** = **Net payout received**

Each booking is matched to one or more payout lines. Unmatched amounts (differences above a tolerance, proposed IDR 10,000) are listed on an exceptions sheet and cleared before month-end close.

### 4.4 Per-villa profit

Profit per villa is computed as:

> **Villa contribution** = Gross income attributed to the villa − Platform fees − Direct costs tagged to that villa (cleaning, repairs, utilities, supplies, villa-specific staff time)

Shared costs (management salary, licences that cover multiple villas, shared utilities) are allocated by a stated key, proposed as the **number of nights booked** per villa in the period. The allocation key is written in the report so it can be challenged and changed.

**Business profit** = Sum of villa contributions − Shared overheads − Tax provisions.

### 4.5 Separation of business and family money

- Open a dedicated business bank account. All Airbnb payouts go there. No personal spending from it.
- Pay the owner a **fixed, written salary or draw** on a set date each month. Record it as `owner_draw` or `salary`. The amount is decided by the owner, documented, and visible to the family.
- Any support to a family member outside the business is paid from the owner's draw, not from business cash. The owner decides how to use her draw.
- Cash is recorded in a cash book the same day it is received or paid.

This keeps the business ledger honest and gives the owner full freedom over her personal money.

### 4.6 Reporting outputs

| Report | Frequency | Content |
|---|---|---|
| Monthly P&L | Monthly | Income by villa and channel, expenses by category, net profit |
| Cash flow view | Monthly | Opening cash, inflows, outflows, transfers, closing cash, by account |
| Per-villa profitability | Monthly, quarterly, 6-month, annual | Contribution per villa, occupancy, average daily rate (ADR), net per night |
| Tax calendar | Rolling | Obligation, due date, amount, status |
| Accountant checklist | Quarterly and year-end | Open items, documents needed, questions |
| Reconciliation exceptions | Monthly | Unmatched payouts, fee gaps, FX differences |

## 5. Indonesian Tax and Licensing Framework (UNVERIFIED — for accountant confirmation)

The points below are working assumptions based on general knowledge. Rates, thresholds, and deadlines change often. **Each item must be confirmed in writing by a local accountant before any filing.**

| Area | Working assumption | Confirm with accountant |
|---|---|---|
| Legal form | Unknown: individual (*perorangan*), CV, or PT / PT PMA | Which form the business is registered as; this decides the tax route |
| Income tax on rental | Rental income from land and buildings may be subject to a final income tax (commonly cited as 10%); short-term villa stays may instead be treated as an accommodation service | Which regime applies to this business |
| Hotel / accommodation tax | Regional tax on accommodation (*PBJT atas jasa perhotelan*), commonly cited at 10% in Bali | Rate, base, and whether Airbnb collects it already |
| VAT (PPN) | Applies to accommodation above the registration threshold; general rate has been 11% and changed in 2025 | Whether the business must register as a VAT entity (PKP), and current rate |
| Payroll tax (PPh 21) | Monthly withholding on staff salaries; monthly return and deposit | Staff status (employee vs. contractor), correct tax treatment |
| Social security (BPJS) | Employer and employee contributions for staff | Current contribution rates and registration |
| Foreign tourist levy (Bali) | A per-foreign-visitor levy was introduced in 2024; collection mechanism for villas unclear | Whether the business has any collection or reporting duty |
| Licences | Villa operation in Bali generally requires business registration (OSS / NIB) and tourism business permits; local (*kabupaten*) rules vary | Which licences the villas hold, and whether any renewal or moratorium affects them |
| Airbnb tax reporting | Airbnb may collect and remit some taxes on the host's behalf | Obtain Airbnb's tax summary and confirm no double-counting |

## 6. Reporting Calendar (indicative — confirm dates)

| Frequency | Item | Typical due date (to confirm) |
|---|---|---|
| Monthly | Record all transactions; bank reconciliation; payroll calculation | Within 5 business days after month-end |
| Monthly | Payroll tax deposit and return | Around the 10th of the following month |
| Monthly | Final income tax deposit (if applicable) | Around the 15th of the following month |
| Monthly | Accommodation / regional tax | Confirm with local rules |
| Monthly | VAT return (if registered) | End of the following month |
| Quarterly | Management report and per-villa review | 10 days after quarter-end |
| Half-year | Mid-year review and forecast update | 15 July |
| Annual | Individual annual tax return (SPT Tahunan OP) | 31 March |
| Annual | Corporate annual tax return (SPT Tahunan Badan), if a company | 30 April |
| Annual | Financial statements | Accountant to confirm |

## 7. Findings (Current State)

No data has been provided, so no findings are reported yet. The expected findings are:

- The share of costs paid from business cash that are personal in nature.
- The effective platform fee rate (fees ÷ gross bookings) and how it changes with currency conversion.
- The per-villa contribution margin, which should show which villas to price up, re-equip, or stop.

These will be reported with numbers once the data arrives.

## 8. Limitations

- Tax rules are stated as working assumptions, not advice.
- Rate-date and tax-rate choices affect the figures and require accountant sign-off.
- Without complete bank and cash records, reconciliation is partial and profit figures are provisional.

## 9. Conclusion and Next Steps

The method is a single ledger, transaction-date FX, explicit fee reconciliation, a documented separation between business and family money, and a monthly reporting cycle. Implementing it requires data from the sources in Section 3 and a confirmed tax framework from a local accountant.

**Next steps:**

1. Collect the data listed in Section 3 for the last 12 months (or as far back as available).
2. Engage a Bali-based accountant to confirm Section 5 and sign off the checklist.
3. Set up the dedicated business bank account and the owner's draw policy.
4. Load historical data into `ledger_template.csv` and produce the first monthly P&L.

---

## Appendix A — Accountant Checklist (to send)

- [ ] Legal form of the business and the correct tax regime
- [ ] Final income tax treatment of villa rental income
- [ ] Accommodation / regional tax rate, base, and collection method
- [ ] VAT registration obligation and threshold
- [ ] Transaction-date rate vs. monthly tax rate (*kurs pajak*) — which to use for each purpose
- [ ] Treatment of Airbnb-collected taxes and fees in the books
- [ ] PPh 21 and BPJS for staff; contractor vs. employee status
- [ ] Bali foreign tourist levy: any duty for these villas
- [ ] Licences per villa and renewal dates
- [ ] Filing calendar with exact due dates for the next 12 months
- [ ] Owner's draw / salary: correct documentation to avoid it being treated as a business expense or as a taxable benefit
- [ ] Year-end closing steps and documents to keep

## Appendix B — Ledger Template

See `finance/ledger_template.csv`.
