'use client';

import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle, DollarSign, Volume2, Play } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: '',
    clientName: '',
    retainedFee: '1500',
    averageTicket: '250',
    conversions: '42',
    clicks: '2450',
    impressions: '45000',
    month: 'October 2026',
  });

  const [aiReport, setAiReport] = useState<{ summary: string; estimatedRoi: string; estimatedRevenue: number } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.summary) {
        setAiReport(data);
      } else {
        alert('Error generating summary. Please check your setup.');
      }
    } catch (err) {
      console.error(err);
      alert('Connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-emerald-400">
            <DollarSign className="w-6 h-6" />
            <span>ROIReport.ai</span>
          </div>
          <a
            href="#pricing"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
          >
            Get Unlimited Access
          </a>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <span className="bg-emerald-950 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-wider">
          World's 1st ROI-First & Audio-Ready Reporting Tool
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight">
          Turn SEO Metrics Into <span className="text-emerald-400">Dollar ROI</span> & Audio Briefings
        </h1>
        <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">
          Clients don't care about clicks. They care about revenue. Prove your retainer value with automated financial ROI calculations and 60-second C-level audio briefs.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Generate ROI-First Client Report
          </h2>

          <form onSubmit={handleGenerateReport} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Your Agency Name</label>
                <input
                  type="text"
                  name="agencyName"
                  placeholder="Apex Growth Agency"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Client Domain / Name</label>
                <input
                  type="text"
                  name="clientName"
                  placeholder="Acme Plumbing (acme.com)"
                  required
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1">Agency Retainer ($/mo)</label>
                <input
                  type="number"
                  name="retainedFee"
                  value={formData.retainedFee}
                  required
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1">Client Customer Ticket ($)</label>
                <input
                  type="number"
                  name="averageTicket"
                  value={formData.averageTicket}
                  required
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1">Leads / Conversions</label>
                <input
                  type="number"
                  name="conversions"
                  value={formData.conversions}
                  required
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-600/20"
            >
              {loading ? (
                'Calculating Financial ROI & AI Audio Brief...'
              ) : (
                <>
                  <Download className="w-5 h-5" /> Generate ROI Report & Audio Link
                </>
              )}
            </button>
          </form>

          {aiReport && (
            <div className="mt-8 p-6 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Estimated Generated Revenue</span>
                  <p className="text-3xl font-extrabold text-emerald-400">${aiReport.estimatedRevenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Calculated ROI</span>
                  <p className="text-2xl font-bold text-slate-200">{aiReport.estimatedRoi}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">60-Sec C-Level Audio Executive Briefing</p>
                    <p className="text-[10px] text-slate-400">Ready for WhatsApp / Slack client delivery</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Playing AI Audio Voice Summary: 'Hi Mark, your SEO investment returned $10,500 in estimated value this month...'")}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-md flex items-center gap-1 hover:bg-emerald-500"
                >
                  <Play className="w-3 h-3" /> Listen
                </button>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 mb-2">Executive Summary Text:</h3>
                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {aiReport.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <section id="pricing" className="border-t border-slate-900 bg-slate-950/80 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Unbeatable Pricing</h2>
          <p className="text-slate-400 mb-12">Prove your value every month. Cancel anytime.</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-left">
              <h3 className="text-lg font-bold text-slate-200">Solo Freelancer</h3>
              <p className="text-3xl font-extrabold mt-2">$29 <span className="text-sm font-normal text-slate-400">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Up to 5 Active Retainers</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Dollar ROI Calculator</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Audio AI Briefing Generator</li>
              </ul>
              <button className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition">
                Start Free Trial
              </button>
            </div>

            <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-8 text-left relative shadow-xl shadow-emerald-500/10">
              <span className="absolute -top-3 right-6 bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full text-white">Scale Agency</span>
              <h3 className="text-lg font-bold text-slate-200">Agency Pro</h3>
              <p className="text-3xl font-extrabold mt-2">$79 <span className="text-sm font-normal text-slate-400">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Unlimited Clients & Retainers</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Full White-Labeling</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Direct WhatsApp/Email Delivery</li>
              </ul>
              <button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition">
                Get Agency Pro
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}