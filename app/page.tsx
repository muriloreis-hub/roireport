"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"app" | "about" | "reviews" | "pricing">("app");

  const [agencyName, setAgencyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [retainer, setRetainer] = useState("");
  const [ticket, setTicket] = useState("");
  const [conversions, setConversions] = useState("");

  const retainerNum = parseFloat(retainer) || 0;
  const ticketNum = parseFloat(ticket) || 0;
  const conversionsNum = parseInt(conversions) || 0;

  const totalRevenue = ticketNum * conversionsNum;
  const netProfit = totalRevenue - retainerNum;
  const roiMultiplier = retainerNum > 0 ? (totalRevenue / retainerNum).toFixed(2) : "0.00";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agencyName, clientName, retainer, ticket, conversions }),
      });

      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      } else {
        setReport(
          `EXECUTIVE ROI REPORT\n` +
          `==========================================\n` +
          `Client: ${clientName.toUpperCase()}\n` +
          `Prepared By: ${agencyName}\n` +
          `Status: Campaign Completed Successfully\n` +
          `==========================================\n\n` +
          `1. FINANCIAL PERFORMANCE HIGHLIGHTS\n` +
          `------------------------------------------\n` +
          `• Gross Revenue Generated: $${totalRevenue.toLocaleString()}\n` +
          `• Retainer & Operational Fees: $${retainerNum.toLocaleString()}\n` +
          `• Net Profit Generated: $${netProfit.toLocaleString()}\n` +
          `• Campaign ROI Multiplier: ${roiMultiplier}x\n\n` +
          `2. EXECUTIVE SUMMARY & INSIGHTS\n` +
          `------------------------------------------\n` +
          `The campaign yielded high operational efficiency during this cycle. ` +
          `With ${conversionsNum} total verified conversions at an average ticket price of $${ticketNum}, ` +
          `the client account achieved a net return of $${netProfit.toLocaleString()} over retainer costs.\n\n` +
          `3. RECOMMENDATIONS & NEXT STEPS\n` +
          `------------------------------------------\n` +
          `• Reinvest 15% of profits into top-performing conversion funnels.\n` +
          `• Scale budget allocation for next month's campaign cycle.`
        );
      }
    } catch (error) {
      console.error(error);
      setReport("An error occurred while generating the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("report-pdf-content");
      const opt = {
        margin: [0.5, 0.5],
        filename: `${clientName || "Client"}_ROI_Report.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/25">
              R
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              ROIReport<span className="text-blue-500">.ai</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => setActiveTab("app")}
              className={`transition-colors ${activeTab === "app" ? "text-blue-400 font-semibold" : "hover:text-slate-200"}`}
            >
              Generator Studio
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`transition-colors ${activeTab === "about" ? "text-blue-400 font-semibold" : "hover:text-slate-200"}`}
            >
              About Us
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`transition-colors ${activeTab === "reviews" ? "text-blue-400 font-semibold" : "hover:text-slate-200"}`}
            >
              Client Reviews
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`transition-colors ${activeTab === "pricing" ? "text-blue-400 font-semibold" : "hover:text-slate-200"}`}
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("pricing")}
              className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              Get Unlimited Access
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 z-10">
        
        {activeTab === "app" && (
          <div>
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                AI Executive Reporting Engine v2.4
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4 leading-tight">
                Turn Campaign Data into <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">Client Retention</span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Generate clean, automated financial ROI breakdowns and executive summaries for your agency clients in seconds.
              </p>
            </div>

            {/* Live Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 backdrop-blur-xl">
                <p className="text-xs font-medium text-slate-400 mb-1">Gross Revenue</p>
                <p className="text-2xl font-bold text-slate-100">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 backdrop-blur-xl">
                <p className="text-xs font-medium text-slate-400 mb-1">Retainer / Cost</p>
                <p className="text-2xl font-bold text-slate-100">${retainerNum.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 backdrop-blur-xl">
                <p className="text-xs font-medium text-slate-400 mb-1">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  ${netProfit.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 backdrop-blur-xl">
                <p className="text-xs font-medium text-slate-400 mb-1">ROI Multiplier</p>
                <p className="text-2xl font-bold text-blue-400">{roiMultiplier}x</p>
              </div>
            </div>

            {/* Main Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                <h2 className="text-base font-semibold text-slate-200 mb-5 flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span>Campaign Inputs</span>
                  <span className="text-xs font-normal text-slate-500">Live Calculation</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Agency Name</label>
                    <input
                      type="text"
                      placeholder="Apex Growth Media"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Client / Brand Name</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Retainer Fee ($)</label>
                      <input
                        type="number"
                        placeholder="2500"
                        value={retainer}
                        onChange={(e) => setRetainer(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">Avg Ticket ($)</label>
                      <input
                        type="number"
                        placeholder="150"
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Total Conversions</label>
                    <input
                      type="number"
                      placeholder="64"
                      value={conversions}
                      onChange={(e) => setConversions(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? "Synthesizing Metrics..." : "Generate AI Executive Report"}
                  </button>
                </form>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 min-h-[460px] flex flex-col justify-between backdrop-blur-xl shadow-2xl">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                    <h2 className="text-base font-semibold text-slate-200">Executive Report Document</h2>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                      Formatted Text
                    </span>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs font-medium text-slate-400">Creating custom executive analysis & financial summary...</p>
                    </div>
                  ) : report ? (
                    <div
                      id="report-pdf-content"
                      className="bg-slate-950 border border-slate-800/80 p-6 rounded-xl text-slate-200 text-sm leading-relaxed whitespace-pre-line font-mono"
                    >
                      {report}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-500 text-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-3 text-slate-400 text-lg">
                        📄
                      </div>
                      <p className="text-sm font-medium text-slate-300 mb-1">No Report Generated Yet</p>
                      <p className="text-xs text-slate-500 max-w-xs">Fill in your campaign metrics on the left and click "Generate AI Executive Report".</p>
                    </div>
                  )}
                </div>

                {report && !loading && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={handleDownloadPDF}
                      className="text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                    >
                      📥 Download PDF Report
                    </button>
                    <button
                      onClick={handleCopy}
                      className="text-xs font-medium bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600/20 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      {copied ? "✓ Copied to Clipboard!" : "Copy Raw Text"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto py-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-4 mb-4">
                Built by Agency Owners, for Agency Owners
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
                We experienced firsthand the pain of spending hundreds of hours every month manually assembling campaign reports, spreadsheets, and PDFs for clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-slate-100 mb-2">The Problem</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Marketing agencies lose over 15 hours per account manager every single month just creating end-of-month client reports. Clients rarely read 30-page complex dashboards; they want to know one thing: <strong>What was my Return on Investment (ROI)?</strong>
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-slate-100 mb-2">The Solution</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ROIReport.ai synthesizes campaign metrics into executive financial summaries in under 10 seconds. We empower digital marketing agencies worldwide to communicate value clearly and retain clients longer.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-5xl mx-auto py-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Trusted Worldwide
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-4 mb-4">
                Loved by 500+ Digital Agencies
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "ROIReport.ai saved our team over 18 hours of client reporting work in our first month alone."
                </p>
                <div>
                  <p className="text-xs font-bold text-slate-100">David Miller</p>
                  <p className="text-[11px] text-slate-500">Founder @ ScaleMedia Digital</p>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "The live ROI multiplier and net profit breakdown make us look extremely professional."
                </p>
                <div>
                  <p className="text-xs font-bold text-slate-100">Sarah Jenkins</p>
                  <p className="text-[11px] text-slate-500">VP of Operations @ Apex Growth</p>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "Incredible speed! What used to take us 2 days is now handled in 10 minutes."
                </p>
                <div>
                  <p className="text-xs font-bold text-slate-100">Lucas Santos</p>
                  <p className="text-[11px] text-slate-500">Head of Performance @ OmniGrowth</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="max-w-5xl mx-auto py-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Transparent Plans
              </span>
              <h2 className="text-3xl font-extrabold text-slate-100 mt-4 mb-3">Simple & Affordable Pricing</h2>
              <p className="text-slate-400 text-xs sm:text-sm">Choose the plan that fits your agency size.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">Starter</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white">$19</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li>✓ Up to 10 Active Clients</li>
                    <li>✓ Unlimited AI ROI Reports</li>
                    <li>✓ One-Click PDF Export</li>
                  </ul>
                </div>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors">
                  Start Trial
                </button>
              </div>

              <div className="bg-slate-900 border-2 border-blue-500/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl relative shadow-2xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">Agency Pro</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white">$49</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li>✓ Unlimited Clients</li>
                    <li>✓ Unlimited AI ROI Reports</li>
                    <li>✓ Custom Branding (White-Label)</li>
                  </ul>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg text-xs transition-all">
                  Upgrade to Pro
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">Agency Scale</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white">$99</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li>✓ Everything in Pro</li>
                    <li>✓ Multi-User Team Seats</li>
                    <li>✓ REST API Access</li>
                  </ul>
                </div>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80 text-center py-6 text-xs text-slate-500 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© ROIReport.ai — Professional Campaign Intelligence & Client Reporting Suite.</p>
          <div className="flex gap-4 text-slate-400">
            <button onClick={() => setActiveTab("about")} className="hover:text-slate-200">About Us</button>
            <button onClick={() => setActiveTab("reviews")} className="hover:text-slate-200">Reviews</button>
            <button onClick={() => setActiveTab("pricing")} className="hover:text-slate-200">Pricing</button>
          </div>
        </div>
      </footer>
    </div>
  );
}