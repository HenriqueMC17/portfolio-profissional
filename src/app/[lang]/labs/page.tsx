"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Leaf, Zap, Car, Info } from "lucide-react";

const dictLabs = {
  pt: {
    title: "Laboratório Interativo",
    subtitle: "Experimente protótipos funcionais e simulações baseadas nos meus principais projetos.",
    backHome: "Voltar para o início",
    ecoTitle: "Simulador ROI Solar (EcoVolt Lite)",
    ecoDesc: "Ajuste os parâmetros para estimar a geração mensal de energia, a economia financeira e o tempo de retorno do investimento (Payback).",
    solarArea: "Área de Painéis",
    solarIrradiance: "Irradiação Solar Diária",
    energyRate: "Tarifa de Energia",
    monthlyGen: "Geração Estimada",
    monthlySavings: "Economia Mensal",
    estCost: "Custo do Sistema",
    payback: "Tempo de Retorno",
    years: "anos",
    safeTitle: "ESG Carbon Calculator (Safe Finance Lite)",
    safeDesc: "Calcule a estimativa mensal da pegada de carbono com base no seu consumo de eletricidade, transporte e hábitos alimentares.",
    electricity: "Consumo de Eletricidade",
    transport: "Distância Mensal (Carro)",
    diet: "Tipo de Dieta",
    dietMeat: "Consumidor de Carne",
    dietVeg: "Vegetariano",
    dietVegan: "Vegano",
    carbonFootprint: "Pegada de Carbono Total",
    footprintDesc: "Seu consumo gera aproximadamente",
    co2Year: "kg de CO₂ por mês",
    avgComparison: "Comparação com a média nacional (350kg/mês)",
    belowAvg: "Abaixo da média",
    aboveAvg: "Acima da média",
    solarChartTitle: "Projeção de Economia Acumulada (5 Anos)",
  },
  en: {
    title: "Interactive Lab",
    subtitle: "Interact with functional prototypes and simulations based on my main engineering projects.",
    backHome: "Back to home",
    ecoTitle: "Solar ROI Simulator (EcoVolt Lite)",
    ecoDesc: "Adjust parameters to estimate monthly power generation, financial savings, and payback period on your investment.",
    solarArea: "Solar Panel Area",
    solarIrradiance: "Daily Solar Irradiance",
    energyRate: "Electricity Rate",
    monthlyGen: "Estimated Generation",
    monthlySavings: "Monthly Savings",
    estCost: "System Cost",
    payback: "Payback Period",
    years: "years",
    safeTitle: "ESG Carbon Calculator (Safe Finance Lite)",
    safeDesc: "Calculate your monthly estimated carbon footprint based on electricity consumption, transportation, and dietary habits.",
    electricity: "Electricity Consumption",
    transport: "Monthly Distance (Car)",
    diet: "Dietary Habit",
    dietMeat: "Meat Lover",
    dietVeg: "Vegetarian",
    dietVegan: "Vegan",
    carbonFootprint: "Total Carbon Footprint",
    footprintDesc: "Your consumption generates approximately",
    co2Year: "kg of CO₂ per month",
    avgComparison: "Comparison to national average (350kg/month)",
    belowAvg: "Below average",
    aboveAvg: "Above average",
    solarChartTitle: "Accumulated Savings Projection (5 Years)",
  }
};

export default function LabsPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "pt";
  const dict = lang === "pt" ? dictLabs.pt : dictLabs.en;

  // Solar ROI Simulator States
  const [panelArea, setPanelArea] = useState(40); // in m2
  const [irradiance, setIrradiance] = useState(4.8); // kWh/m2/day
  const [energyRate, setEnergyRate] = useState(0.85); // R$ or $ per kWh

  // ESG Carbon Calculator States
  const [electricity, setElectricity] = useState(220); // kWh/month
  const [transportDist, setTransportDist] = useState(600); // km/month
  const [dietType, setDietType] = useState("meat"); // meat, veg, vegan

  // Solar Calculations
  const solarEfficiency = 0.18; // standard panel efficiency (18%)
  const monthlyGeneration = Math.round(panelArea * irradiance * 30 * solarEfficiency); // kWh/month
  const monthlySavings = Math.round(monthlyGeneration * energyRate);
  const estimatedSystemCost = Math.round(panelArea * 450); // average cost per m2 installed
  const paybackPeriod = monthlySavings > 0 ? (estimatedSystemCost / (monthlySavings * 12)).toFixed(1) : "0.0";

  // Carbon Calculations
  const electricityCo2 = electricity * 0.09; // 0.09 kg CO2 per kWh
  const transportCo2 = transportDist * 0.12; // 0.12 kg CO2 per km
  const dietCo2 = dietType === "meat" ? 210 : dietType === "veg" ? 110 : 55; // kg CO2 per month
  const totalCarbonFootprint = Math.round(electricityCo2 + transportCo2 + dietCo2);
  const isBelowAverage = totalCarbonFootprint <= 350;

  // Chart values (accumulated savings over 5 years)
  const projectionData = Array.from({ length: 5 }).map((_, i) => {
    const year = i + 1;
    const accumulatedSavings = monthlySavings * 12 * year;
    const netReturn = accumulatedSavings - estimatedSystemCost;
    return { year, accumulatedSavings, netReturn };
  });

  const maxSavings = projectionData[4].accumulatedSavings;

  return (
    <main className="min-h-screen bg-background text-foreground relative py-16 px-6 overflow-hidden animate-page-enter">
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-accent/8 rounded-full blur-[140px] opacity-35" />
      </div>

      <div className="z-10 relative container mx-auto max-w-5xl">
        {/* Back Button */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{dict.backHome}</span>
        </Link>

        {/* Page Header */}
        <div className="mb-14">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {dict.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {dict.subtitle}
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* EcoVolt Lite: Solar ROI Simulator */}
          <section className="glass rounded-2xl p-6 md:p-8 flex flex-col border border-white/8 bg-surface-l1/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <Sun className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white leading-none">{dict.ecoTitle}</h2>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed mb-6">
              {dict.ecoDesc}
            </p>

            {/* Controls */}
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium">{dict.solarArea}</span>
                  <span className="text-primary-400 font-mono font-bold">{panelArea} m²</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={panelArea}
                  onChange={(e) => setPanelArea(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium">{dict.solarIrradiance}</span>
                  <span className="text-primary-400 font-mono font-bold">{irradiance.toFixed(1)} kWh/m²/dia</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="6.5"
                  step="0.1"
                  value={irradiance}
                  onChange={(e) => setIrradiance(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium">{dict.energyRate}</span>
                  <span className="text-primary-400 font-mono font-bold">
                    {lang === "pt" ? "R$" : "$"} {energyRate.toFixed(2)}/kWh
                  </span>
                </div>
                <input
                  type="range"
                  min="0.40"
                  max="1.80"
                  step="0.05"
                  value={energyRate}
                  onChange={(e) => setEnergyRate(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>

            {/* Outputs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="text-[10px] text-white/45 block mb-1 uppercase font-semibold tracking-wider">
                  {dict.monthlyGen}
                </span>
                <span className="text-xl font-bold text-white font-mono tracking-tight tabular-nums">
                  {monthlyGeneration} kWh
                </span>
              </div>
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="text-[10px] text-white/45 block mb-1 uppercase font-semibold tracking-wider">
                  {dict.monthlySavings}
                </span>
                <span className="text-xl font-bold text-accent font-mono tracking-tight tabular-nums">
                  {lang === "pt" ? "R$" : "$"} {monthlySavings}
                </span>
              </div>
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="text-[10px] text-white/45 block mb-1 uppercase font-semibold tracking-wider">
                  {dict.estCost}
                </span>
                <span className="text-xl font-bold text-white/70 font-mono tracking-tight tabular-nums">
                  {lang === "pt" ? "R$" : "$"} {estimatedSystemCost}
                </span>
              </div>
              <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                <span className="text-[10px] text-white/45 block mb-1 uppercase font-semibold tracking-wider">
                  {dict.payback}
                </span>
                <span className="text-xl font-bold text-primary-400 font-mono tracking-tight tabular-nums">
                  {paybackPeriod} {dict.years}
                </span>
              </div>
            </div>

            {/* Custom Visual Chart projection */}
            <div className="border-t border-white/8 pt-6">
              <h3 className="text-xs font-semibold text-white/70 mb-4 uppercase tracking-wider">
                {dict.solarChartTitle}
              </h3>
              <div className="flex items-end justify-between h-32 gap-3 pt-4">
                {projectionData.map((d) => {
                  const pct = Math.max(10, Math.round((d.accumulatedSavings / maxSavings) * 100));
                  const isPositive = d.netReturn > 0;
                  return (
                    <div key={d.year} className="flex flex-col items-center flex-1 group">
                      <div className="w-full relative flex flex-col justify-end h-20 bg-white/3 rounded-md overflow-hidden">
                        {/* Fill bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          className={`w-full ${isPositive ? "bg-accent/40 border-t border-accent" : "bg-primary-500/20 border-t border-primary-500/40"}`}
                        />
                        {/* Tooltip */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 text-[10px] text-white font-mono pointer-events-none text-center p-1">
                          {lang === "pt" ? "Saldo:" : "Net:"}<br />
                          {lang === "pt" ? "R$" : "$"} {d.netReturn}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono mt-2 text-white/50">
                        {lang === "pt" ? `Ano ${d.year}` : `Yr ${d.year}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Safe Finance ESG Lite: Carbon Calculator */}
          <section className="glass rounded-2xl p-6 md:p-8 flex flex-col border border-white/8 bg-surface-l1/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                <Leaf className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white leading-none">{dict.safeTitle}</h2>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed mb-6">
              {dict.safeDesc}
            </p>

            {/* Controls */}
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{dict.electricity}</span>
                  </span>
                  <span className="text-green-400 font-mono font-bold">{electricity} kWh/{lang === "pt" ? "mês" : "mo"}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={electricity}
                  onChange={(e) => setElectricity(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-blue-400" />
                    <span>{dict.transport}</span>
                  </span>
                  <span className="text-green-400 font-mono font-bold">{transportDist} km/{lang === "pt" ? "mês" : "mo"}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={transportDist}
                  onChange={(e) => setTransportDist(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/80 font-medium block mb-2">{dict.diet}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: "meat", label: dict.dietMeat },
                    { type: "veg", label: dict.dietVeg },
                    { type: "vegan", label: dict.dietVegan }
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setDietType(item.type)}
                      className={`px-3 py-2 text-[10px] sm:text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        dietType === item.type
                          ? "bg-green-500/10 border-green-500 text-green-400"
                          : "bg-black/20 border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations display */}
            <div className="bg-green-950/10 border border-green-500/15 p-6 rounded-2xl mb-6 text-center flex flex-col items-center">
              <span className="text-xs text-white/55 mb-2 block uppercase tracking-wider font-semibold">
                {dict.carbonFootprint}
              </span>
              <p className="text-white/50 text-[11px] mb-1">{dict.footprintDesc}</p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-green-400 font-mono tracking-tight tabular-nums mb-3">
                {totalCarbonFootprint} <span className="text-lg font-sans font-normal">kg CO₂</span>
              </h3>
              
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                isBelowAverage 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}>
                <Info className="w-3.5 h-3.5" />
                <span>
                  {isBelowAverage ? dict.belowAvg : dict.aboveAvg} - {dict.avgComparison}
                </span>
              </div>
            </div>

            {/* Broken-down Carbon segments visual */}
            <div className="space-y-3.5">
              {[
                { name: lang === "pt" ? "Eletricidade" : "Electricity", val: Math.round(electricityCo2), max: 54, color: "bg-yellow-400" },
                { name: lang === "pt" ? "Transporte" : "Transportation", val: Math.round(transportCo2), max: 240, color: "bg-blue-400" },
                { name: lang === "pt" ? "Alimentação" : "Diet", val: dietCo2, max: 210, color: "bg-green-400" }
              ].map((segment, idx) => {
                const percentage = Math.max(8, Math.round((segment.val / (segment.max || 1)) * 100));
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">{segment.name}</span>
                      <span className="font-mono text-white/80 tabular-nums">{segment.val} kg CO₂</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full ${segment.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}