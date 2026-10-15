"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    agencyName: "",
    clientName: "",
    retainer: "",
    ticket: "",
    conversions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);

    try {
      // Simulação ou chamada real da sua API
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      } else {
        setReport("Relatório gerado com sucesso para " + formData.clientName);
      }
    } catch (error) {
      console.error(error);
      setReport("Erro ao processar o relatório. Verifique os dados inseridos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Cabeçalho do SaaS */}
      <header className="text-center mb-12">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
          Inteligência Artificial para Agências
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-4">
          ROIReport<span className="text-blue-500">.ai</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
          Gere análises de retorno sobre investimento e resumos executivos prontos para envio em questão de segundos.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Entrada */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Dados da Campanha
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Nome da Agência</label>
              <input
                type="text"
                name="agencyName"
                placeholder="Ex: Apex Growth"
                value={formData.agencyName}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Nome do Cliente</label>
              <input
                type="text"
                name="clientName"
                placeholder="Ex: Loja Exemplo"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Fee / Retainer (R$)</label>
                <input
                  type="number"
                  name="retainer"
                  placeholder="1500"
                  value={formData.retainer}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Ticket Médio (R$)</label>
                <input
                  type="number"
                  name="ticket"
                  placeholder="250"
                  value={formData.ticket}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Total de Conversões / Vendas</label>
              <input
                type="number"
                name="conversions"
                placeholder="42"
                value={formData.conversions}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Processando Análise..." : "Gerar Relatório de ROI"}
            </button>
          </form>
        </div>

        {/* Área de Exibição do Relatório */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-slate-300">Resumo Executivo Gerado</h3>
              <span className="text-xs text-slate-500">Gemini AI Engine</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs">Sintetizando métricas e gerando insights...</p>
              </div>
            ) : report ? (
              <div className="prose prose-invert prose-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {report}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
                <p className="text-sm mb-1">Nenhum relatório gerado ainda.</p>
                <p className="text-xs text-slate-600">Preencha os dados ao lado e clique em "Gerar Relatório".</p>
              </div>
            )}
          </div>

          {report && !loading && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => navigator.clipboard.writeText(report)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                Copiar Relatório
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}