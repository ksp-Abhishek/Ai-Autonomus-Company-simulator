import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  TrendingUp, Activity, DollarSign, PieChart as PieChartIcon, 
  Users, Zap, ShieldAlert, Crosshair, Sparkles, Bell, User, BarChart2,
  Globe, Sliders, Swords, AlertTriangle, MessageSquare,
  BrainCircuit, Briefcase, CircleDollarSign, Users2, Megaphone, Cpu,
  Settings, Key, ShieldCheck, LogOut, Copy, Check, Fingerprint, Clock, TerminalSquare,
  CheckCircle2, Info, X, Loader2
} from 'lucide-react';

// --- MOCK DATA ---
const twinPathData = [
  { month: 'Jan', revenue: 4200, cashFlow: 2400 },
  { month: 'Feb', revenue: 4800, cashFlow: 2100 },
  { month: 'Mar', revenue: 5100, cashFlow: 2900 },
  { month: 'Apr', revenue: 4900, cashFlow: 3200 },
  { month: 'May', revenue: 5800, cashFlow: 3800 },
  { month: 'Jun', revenue: 6500, cashFlow: 4100 },
  { month: 'Jul', revenue: 7200, cashFlow: 4800 },
  { month: 'Aug', revenue: 6900, cashFlow: 5200 },
  { month: 'Sep', revenue: 8100, cashFlow: 6100 },
  { month: 'Oct', revenue: 8500, cashFlow: 6500 },
  { month: 'Nov', revenue: 9200, cashFlow: 7100 },
  { month: 'Dec', revenue: 10500, cashFlow: 8200 },
];

const marketShareData = [
  { name: 'Nexus (Us)', value: 42, color: '#3b82f6' }, // Neon Blue
  { name: 'Synapse Inc', value: 28, color: '#8b5cf6' }, // Neon Purple
  { name: 'Nova Corp', value: 18, color: '#10b981' }, // Emerald
  { name: 'Others', value: 12, color: '#475569' },    // Slate
];

const competitors = [
  { id: 1, name: 'Nexus AI (You)', share: '42%', growth: '+15.2%', margin: '68%', status: 'Dominant', isUs: true },
  { id: 2, name: 'Synapse Inc', share: '28%', growth: '+8.4%', margin: '54%', status: 'Threat', isUs: false },
  { id: 3, name: 'Nova Corp', share: '18%', growth: '-2.1%', margin: '42%', status: 'Fading', isUs: false },
  { id: 4, name: 'Aegis Tech', share: '8%', growth: '+22.5%', margin: '31%', status: 'Emerging', isUs: false },
];

const pulseData = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  value: 40 + Math.sin(i / 1.5) * 15 + (Math.random() * 5)
}));

const candleData = [
  { time: '09:00', open: 82, close: 84, high: 86, low: 81 },
  { time: '10:00', open: 84, close: 83, high: 86, low: 82 },
  { time: '11:00', open: 83, close: 87, high: 88, low: 82 },
  { time: '12:00', open: 87, close: 86, high: 89, low: 85 },
  { time: '13:00', open: 86, close: 90, high: 92, low: 85 },
  { time: '14:00', open: 90, close: 89, high: 91, low: 88 },
  { time: '15:00', open: 89, close: 94, high: 96, low: 87 },
  { time: '16:00', open: 94, close: 92, high: 95, low: 90 },
];

const battleData = [
  { metric: 'Tech Defensibility', us: 90, rival: 75 },
  { metric: 'Market Reach', us: 80, rival: 85 },
  { metric: 'Capital / Runway', us: 70, rival: 90 },
  { metric: 'Enterprise Users', us: 95, rival: 60 },
  { metric: 'Growth Velocity', us: 85, rival: 70 },
];

// --- NEW INVESTIGATION & FEEDBACK DATA ---
const investigationData = [
  { id: 1, issue: 'Lack of Native Enterprise Integrations', impact: 85, trend: '+12%', color: 'from-red-600 to-red-400', severity: 'Critical' },
  { id: 2, issue: 'API Latency Spikes (EU Region)', impact: 68, trend: '+5%', color: 'from-orange-600 to-orange-400', severity: 'High' },
  { id: 3, issue: 'Complex Onboarding Flow', impact: 45, trend: '-2%', color: 'from-yellow-600 to-yellow-400', severity: 'Medium' },
  { id: 4, issue: 'Pricing Overlap with Nova Corp', impact: 32, trend: '0%', color: 'from-blue-600 to-blue-400', severity: 'Low' },
];

const feedbackData = [
  { id: 1, user: 'CTO, TechFlow', sentiment: 'Critical', text: 'We need secure webhooks. Synapse offers this out of the box. We might have to switch if not resolved in Q3.', time: '2h ago' },
  { id: 2, user: 'Lead Dev, DataSync', sentiment: 'Negative', text: 'Response times spiked to over 800ms during our peak load yesterday. Unacceptable for real-time AI.', time: '5h ago' },
  { id: 3, user: 'Product Mgr, InnovateX', sentiment: 'Constructive', text: 'Love the new UI, but the API documentation is severely lacking on the new vision models.', time: '1d ago' },
  { id: 4, user: 'VP Eng, Aegis', sentiment: 'Negative', text: 'Pricing model is too opaque. Hard to predict our monthly spend with the current token system.', time: '2d ago' },
];

// --- NEW AI TEAM DATA ---
const aiTeamData = [
  {
    id: 'ceo',
    role: 'AI CEO',
    title: 'Apex Synthesizer',
    description: 'Continuously ingests global market shifts and competitor vectors to steer corporate strategy, outmaneuvering human executives with microsecond latency.',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    status: 'Directing'
  },
  {
    id: 'financer',
    role: 'AI Financer',
    title: 'Algorithmic Capital Architect',
    description: 'Dynamically allocates resources, predicts cash flow bottlenecks, and executes high-frequency capital maneuvers to maximize runway and ROI.',
    icon: CircleDollarSign,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    status: 'Optimizing'
  },
  {
    id: 'hr',
    role: 'AI HR',
    title: 'Sentient Talent Nexus',
    description: 'Monitors deep organizational health, predicts employee churn before it happens, and autonomously sources top-tier human/AI hybrid talent.',
    icon: Users2,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    status: 'Monitoring'
  },
  {
    id: 'marketer',
    role: 'AI Marketer',
    title: 'Dynamic Growth Engine',
    description: 'Deploys hyper-personalized campaigns, conducts real-time A/B testing on millions of variants, and manipulates dynamic pricing matrices for maximum capture.',
    icon: Megaphone,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    status: 'Deploying'
  }
];

// --- NEW PROFILE / ACTION DATA ---
const actionLogs = [
  { id: 1, action: 'Initiated Dynamic Pricing Protocol (EU Region)', time: '10 mins ago', status: 'Success', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, action: 'Reallocated Cloud Compute to APAC Node', time: '1 hour ago', status: 'Success', icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, action: 'Blocked Anomalous API Request (IP Masked)', time: '3 hours ago', status: 'Prevented', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 4, action: 'Generated Q3 Predictive Market Report', time: '5 hours ago', status: 'Success', icon: BarChart2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const notificationsList = [
  { id: 1, title: 'Security Protocol Activated', desc: 'Anomalous API request blocked automatically.', time: '2m ago', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 2, title: 'Market Insight Generated', desc: 'Synapse Inc price drop detected in EMEA region.', time: '15m ago', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 3, title: 'Server Load Elevated', desc: 'Predictive scaling allocated 2 new nodes in APAC.', time: '1h ago', icon: Activity, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
];

// --- COMPONENTS ---

const BentoCard = ({ children, className = "", title, icon: Icon, action }) => (
  <div className={`relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:border-slate-600/50 p-6 flex flex-col ${className}`}>
    {(title || Icon) && (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {Icon && <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-blue-400"><Icon size={20} /></div>}
          <h3 className="text-lg font-semibold text-slate-100 tracking-wide">{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl">
        <p className="text-slate-300 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-400">{entry.name}:</span>
            <span className="text-slate-100 font-semibold">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- NEW TRADINGVIEW WIDGET COMPONENT ---
const TradingViewWidget = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    // Only append the script if it hasn't been added yet (prevents React StrictMode double rendering)
    if (container.current && container.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:NVDA",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "backgroundColor": "rgba(15, 23, 42, 1)",
          "gridColor": "rgba(51, 65, 85, 0.4)",
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": false,
          "hotlist": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
    </div>
  );
};

// --- NEW COMPONENT FOR PULSE GRAPH ---
const PulseTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-2xl">
        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Pulse Index</p>
        <p className="text-white font-bold text-lg">{payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// --- NEW TOGGLE COMPONENT ---
const ToggleSwitch = ({ label, description, enabled, onChange, colorClass = "bg-blue-500" }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-sm font-bold text-slate-200">{label}</p>
      {description && <p className="text-xs text-slate-400 mt-0.5 max-w-[200px]">{description}</p>}
    </div>
    <button 
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${enabled ? colorClass : 'bg-slate-700'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'} shadow-[0_2px_5px_rgba(0,0,0,0.2)]`} />
    </button>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [activeNav, setActiveNav] = useState('Analysis');
  const [macroVolatility, setMacroVolatility] = useState(30);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Profile State
  const [copiedKey, setCopiedKey] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [aggroCapture, setAggroCapture] = useState(false);
  const [predictiveScaling, setPredictiveScaling] = useState(true);

  // --- NEW INTERACTIVITY STATE ---
  const [toasts, setToasts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Mac OS / Chrome', isCurrent: true },
    { id: 2, device: 'iOS / Safari', isCurrent: false }
  ]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const navItems = ['Market + Share', 'AI Team', 'Analysis', 'Action / Profile'];

  // Dynamically distort the pulse graph based on the volatility slider
  const dynamicPulse = React.useMemo(() => {
    return pulseData.map(d => ({
      time: d.time,
      value: d.value + (Math.sin(d.time * 2) * macroVolatility * 0.4)
    }));
  }, [macroVolatility]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-300 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl min-w-[280px]">
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
            {toast.type === 'warning' && <AlertTriangle size={18} className="text-yellow-400" />}
            {toast.type === 'info' && <Info size={18} className="text-blue-400" />}
            <span className="text-sm font-medium text-slate-200">{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-auto text-slate-500 hover:text-slate-300">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Background Glow Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-wider uppercase">
                AI COMPANY <span className="text-blue-500">SIMULATOR</span>
              </span>
            </div>

            {/* Left-Aligned Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeNav === item 
                      ? 'bg-slate-800/80 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-slate-700/50' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Notification Bell Dropdown Container */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-full border transition-all duration-300 group shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-red-500/30 ${
                  showNotifications ? 'bg-slate-800 text-white border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-slate-950 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                </span>
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute top-14 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                    <h3 className="text-sm font-bold text-white tracking-wide">System Notifications</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">3 New</span>
                  </div>
                  <div className="max-h-[340px] overflow-y-auto custom-scrollbar">
                    {notificationsList.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer group/notif">
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-xl h-fit border border-slate-700/50 ${notif.bg} group-hover/notif:scale-110 transition-transform duration-300`}>
                            <notif.icon size={16} className={notif.color} />
                          </div>
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-sm font-bold text-slate-200">{notif.title}</h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mb-2">{notif.desc}</p>
                            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                              <Clock size={10} /> {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-slate-800 bg-slate-950/50">
                    <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-slate-800"></div>
            <button 
              onClick={() => setActiveNav('Action / Profile')}
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center border-2 border-slate-950">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-200">Sarah J.</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 space-y-6 relative z-10">
        
        {/* --- AI TEAM VIEW --- */}
        {activeNav === 'AI Team' && (
          <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            
            {/* The Central Decision Engine */}
            <BentoCard className="relative overflow-hidden group min-h-[200px] border-t-4 border-t-white">
              {/* Background Core Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-[100%] blur-[80px] pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 h-full">
                {/* Glowing Core Icon */}
                <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-slate-700 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-slate-600 animate-[spin_7s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <BrainCircuit size={48} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                </div>

                {/* Core Description */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Online</span>
                  </div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-3 tracking-tight">
                    AI Decision Engine
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                    <strong className="text-slate-200">The Central Nervous System.</strong> Processing trillion-parameter datasets in real-time, it acts as the ultimate arbiter, rendering infallible, split-second operational decisions across all departmental nodes.
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Departmental AI Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiTeamData.map((ai) => (
                <BentoCard key={ai.id} className={`group hover:-translate-y-2 transition-transform duration-300 ${ai.glow}`}>
                  <div className="flex flex-col h-full relative">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${ai.bg} ${ai.border} border`}>
                        <ai.icon size={24} className={ai.color} />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                        <Cpu size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{ai.status}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{ai.role}</h4>
                      <h3 className={`text-xl font-bold mb-3 drop-shadow-md ${ai.color}`}>
                        {ai.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {ai.description}
                      </p>
                    </div>

                    {/* Bottom Status Line */}
                    <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] text-slate-500 font-medium">Link Established</span>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">0ms latency</span>
                    </div>

                  </div>
                </BentoCard>
              ))}
            </div>

          </div>
        )}

        {/* --- ACTION / PROFILE VIEW --- */}
        {activeNav === 'Action / Profile' && (
          <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            
            {/* ROW 1: Profile Header Card */}
            <BentoCard className="!p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  {/* Glowing Avatar */}
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div 
                      onClick={() => addToast('Avatar customization interface initialized.', 'info')}
                      className="relative w-24 h-24 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center overflow-hidden"
                    >
                       <User size={40} className="text-slate-400 group-hover:scale-110 transition-transform duration-300" />
                       <div className="absolute bottom-0 w-full h-1/3 bg-slate-800/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <span className="text-[10px] text-white font-bold uppercase tracking-wider">Edit</span>
                       </div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-slate-900 rounded-full"></div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-3xl font-black text-white tracking-tight">Sarah Jenkins</h1>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/30">Owner</span>
                    </div>
                    <p className="text-slate-400 font-medium">Chief AI Operator @ Nexus Technologies</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> Last login: 2 mins ago</span>
                      <span className="flex items-center gap-1.5"><Globe size={14} /> Location: US East (Encrypted)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => addToast('Advanced settings panel unlocked.', 'success')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-600 transition-colors shadow-lg"
                  >
                    <Settings size={16} /> Preferences
                  </button>
                  <button 
                    onClick={() => addToast('Disconnecting secure channel...', 'warning')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium border border-red-500/30 transition-colors shadow-lg"
                  >
                    <LogOut size={16} /> Disconnect
                  </button>
                </div>
              </div>
            </BentoCard>

            {/* ROW 2: Toggles, API, Security */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* System Action Preferences */}
              <BentoCard title="AI Action Parameters" icon={Sliders}>
                <div className="divide-y divide-slate-800/50 flex-1">
                  <ToggleSwitch 
                    label="Autonomous Trading Mode" 
                    description="Allow AI to execute market trades without human approval."
                    enabled={autoMode} 
                    onChange={setAutoMode} 
                    colorClass="bg-emerald-500"
                  />
                  <ToggleSwitch 
                    label="Aggressive Market Capture" 
                    description="Prioritize market share over short-term gross margin."
                    enabled={aggroCapture} 
                    onChange={setAggroCapture} 
                    colorClass="bg-red-500"
                  />
                  <ToggleSwitch 
                    label="Predictive Scaling" 
                    description="Auto-scale server nodes based on predicted traffic."
                    enabled={predictiveScaling} 
                    onChange={setPredictiveScaling} 
                    colorClass="bg-blue-500"
                  />
                </div>
              </BentoCard>

              {/* API Keys & Usage */}
              <BentoCard title="Neural API & Tokens" icon={Key}>
                <div className="space-y-6 flex-1">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-200">Monthly Token Usage</span>
                      <span className="text-xs text-slate-400">8.4M / 10M</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 w-[84%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    </div>
                    <p className="text-[10px] text-purple-400 mt-2 uppercase tracking-wider font-bold">Approaching Limit</p>
                  </div>

                  <div>
                    <span className="text-sm font-bold text-slate-200 block mb-2">Primary Production Key</span>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 group relative">
                      <code className="text-sm text-slate-400 font-mono tracking-wider blur-[3px] group-hover:blur-none transition-all duration-300">
                        nx_live_9a8b...3c2d
                      </code>
                      <button 
                        onClick={() => {
                          setCopiedKey(true);
                          setTimeout(() => setCopiedKey(false), 2000);
                        }}
                        className="p-1.5 rounded-md hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                      >
                        {copiedKey ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </BentoCard>

              {/* Security & Authentication */}
              <BentoCard title="Security Protocols" icon={ShieldCheck}>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <Fingerprint size={20} className="text-emerald-400" />
                      <div>
                        <p className="text-sm font-bold text-emerald-400">Biometric 2FA</p>
                        <p className="text-[10px] text-emerald-500/70 uppercase tracking-widest font-bold">Active & Enforced</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Sessions</p>
                    {sessions.map(session => (
                      <div key={session.id} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 flex items-center gap-2"><Globe size={14} className="text-slate-500"/> {session.device}</span>
                        {session.isCurrent ? (
                          <span className="text-emerald-400 text-xs">Current</span>
                        ) : (
                          <button 
                            onClick={() => {
                              setSessions(prev => prev.filter(s => s.id !== session.id));
                              addToast(`${session.device} session revoked securely.`, 'success');
                            }}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                    {sessions.length === 1 && (
                      <p className="text-[10px] text-slate-500 italic mt-2">No other active sessions.</p>
                    )}
                  </div>
                </div>
              </BentoCard>

            </div>

            {/* ROW 3: Terminal Action Log */}
            <BentoCard title="Automated System Action Log" icon={TerminalSquare} className="min-h-[300px]">
               <div className="bg-slate-950/50 rounded-xl border border-slate-800/80 p-4 font-mono text-sm h-full flex flex-col gap-3 overflow-hidden">
                 <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                   </div>
                   <span className="text-slate-500 text-xs tracking-widest uppercase ml-2">nexus_core_daemon_tty1</span>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                   {actionLogs.map((log) => (
                     <div key={log.id} className="flex items-start gap-4 p-2 rounded hover:bg-slate-800/30 transition-colors">
                       <span className="text-slate-500 whitespace-nowrap">[{log.time}]</span>
                       <div className={`p-1 rounded ${log.bg} border border-slate-700/50`}>
                         <log.icon size={14} className={log.color} />
                       </div>
                       <div className="flex-1">
                         <p className="text-slate-300">{log.action}</p>
                       </div>
                       <span className={`text-xs uppercase tracking-wider font-bold ${log.status === 'Success' ? 'text-emerald-400' : 'text-red-400'}`}>
                         {log.status}
                       </span>
                     </div>
                   ))}
                   <div className="flex items-center gap-2 text-slate-500 animate-pulse mt-4">
                     <span className="text-blue-400">root@nexus:~#</span>
                     <span className="w-2 h-4 bg-slate-400"></span>
                   </div>
                 </div>
               </div>
            </BentoCard>

          </div>
        )}

        {activeNav === 'Analysis' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BentoCard className="!p-5 border-t-4 border-t-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Total Revenue</p>
                    <h2 className="text-3xl font-bold text-white">$12.4M</h2>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                    <TrendingUp size={14} />
                    <span>+24.5%</span>
                  </div>
                </div>
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
              </BentoCard>

              <BentoCard className="!p-5 border-t-4 border-t-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Total Shares / Price</p>
                    <h2 className="text-3xl font-bold text-white">4.2M <span className="text-lg text-slate-500 font-normal">@ $84.20</span></h2>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                    <TrendingUp size={14} />
                    <span>+12.1%</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                  <Activity size={16} className="text-purple-400" />
                  <span>Volume spiking in last 48h</span>
                </div>
              </BentoCard>

              <BentoCard className="!p-5 border-t-4 border-t-emerald-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Profit Analysis</p>
                    <div className="flex items-baseline gap-3">
                      <h2 className="text-3xl font-bold text-white">68%</h2>
                      <span className="text-sm text-slate-400">Gross</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-medium text-slate-300">Net: 24%</span>
                    <span className="text-xs text-emerald-400">Exceeds industry avg</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                   <div className="h-2 w-[68%] bg-emerald-500 rounded-l-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                   <div className="h-2 w-[32%] bg-slate-700 rounded-r-full"></div>
                </div>
              </BentoCard>
            </div>

            {/* Middle Grid: Twin Path Chart & AI Report */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Twin Path Chart (Span 8) */}
              <BentoCard title="Twin Path Analysis: Revenue vs Cash Flow" icon={BarChart2} className="lg:col-span-8 min-h-[400px]">
                <div className="flex-1 w-full h-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={twinPathData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                      <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                      
                      {/* Dual Y-Axis */}
                      <YAxis yAxisId="left" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '14px', color: '#cbd5e1' }}/>
                      
                      <Area yAxisId="left" type="monotone" dataKey="revenue" name="Total Revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6', style: { filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))' } }} />
                      <Area yAxisId="right" type="monotone" dataKey="cashFlow" name="Free Cash Flow" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorCash)" activeDot={{ r: 6, strokeWidth: 0, fill: '#a855f7', style: { filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))' } }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </BentoCard>

              {/* AI Strategy Report Card (Span 4) */}
              <BentoCard title="AI Strategy & Survival" icon={Zap} className="lg:col-span-4 bg-gradient-to-b from-slate-900/60 to-blue-950/20 border-blue-900/30 relative">
                {/* Subtle overlay pulse */}
                <div className="absolute top-0 right-0 p-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </div>

                <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  
                  {/* Critical Action */}
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert size={16} className="text-red-400" />
                      <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">Critical Action</h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Synapse Inc is aggressively undercutting pricing in the EU market. Implement automated dynamic pricing matrix immediately to retain top-tier enterprise clients.
                    </p>
                  </div>

                  {/* Growth Opportunity */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Crosshair size={16} className="text-emerald-400" />
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Growth Opportunity</h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Acquisition target identified: <span className="text-white font-semibold">DataSphere Ltd</span>. Their proprietary ML models align 94% with our Q4 product roadmap. High ROI probability.
                    </p>
                  </div>

                  {/* Action Plan */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-3 border-b border-slate-800 pb-2">Immediate Execution Plan</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30 mt-0.5">
                          <span className="text-xs text-blue-400 font-bold">1</span>
                        </div>
                        <span className="text-sm text-slate-400">Deploy resource re-allocation from Legacy V1 to NextGen AI API by Friday.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30 mt-0.5">
                          <span className="text-xs text-blue-400 font-bold">2</span>
                        </div>
                        <span className="text-sm text-slate-400">Initiate marketing blitz emphasizing our new zero-latency NLP engine vs Nova Corp.</span>
                      </li>
                    </ul>
                  </div>

                </div>
                
                <button 
                  onClick={() => {
                    if (isGenerating) return;
                    setIsGenerating(true);
                    addToast('Initiating deep dive analysis...', 'info');
                    setTimeout(() => {
                      setIsGenerating(false);
                      addToast('Report generated and secured in Vault.', 'success');
                    }, 2500);
                  }}
                  disabled={isGenerating}
                  className={`mt-4 w-full py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex justify-center items-center gap-2 ${
                    isGenerating ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                  }`}
                >
                  {isGenerating ? <><Loader2 size={18} className="animate-spin" /> Analyzing vectors...</> : 'Generate Deep Dive Report'}
                </button>
              </BentoCard>

            </div>

            {/* Bottom Grid: Market Share & Competitors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
              
              {/* Competitor Table (Span 8) */}
              <BentoCard title="Market Competitor Matrix" icon={Users} className="lg:col-span-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-sm font-medium text-slate-400">
                        <th className="pb-3 pl-4">Company</th>
                        <th className="pb-3">Market Share</th>
                        <th className="pb-3">YoY Growth</th>
                        <th className="pb-3">Gross Margin</th>
                        <th className="pb-3">AI Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {competitors.map((comp) => (
                        <tr 
                          key={comp.id} 
                          className={`border-b border-slate-800/50 transition-colors hover:bg-slate-800/30 ${
                            comp.isUs ? 'bg-blue-900/10 border-l-2 border-l-blue-500' : ''
                          }`}
                        >
                          <td className="py-4 pl-4 font-medium text-slate-200 flex items-center gap-2">
                            {comp.isUs && <Sparkles size={14} className="text-blue-400" />}
                            {comp.name}
                          </td>
                          <td className="py-4 text-slate-300">{comp.share}</td>
                          <td className={`py-4 ${comp.growth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                            {comp.growth}
                          </td>
                          <td className="py-4 text-slate-300">{comp.margin}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              comp.status === 'Dominant' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              comp.status === 'Threat' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              comp.status === 'Emerging' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                              'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}>
                              {comp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </BentoCard>

              {/* Market Share Donut (Span 4) */}
              <BentoCard title="Current Market Share" icon={PieChartIcon} className="lg:col-span-4 flex flex-col justify-center items-center relative">
                <div className="w-full h-[250px] mt-2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={6}
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0px 0px 6px ${entry.color}40)` }}/>
                        ))}
                      </Pie>
                      <RechartsTooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-white tracking-tight">42%</span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Leading</span>
                  </div>
                </div>
                
                {/* Custom Legend */}
                <div className="w-full grid grid-cols-2 gap-3 mt-6 px-2">
                  {marketShareData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                      <span className="text-xs text-slate-300 font-medium truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>

            </div>

            {/* ROW 4: Investigation & User Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
              
              {/* Product Churn Investigation (Span 7) */}
              <BentoCard title="Root Cause Analysis: Churn Drivers" icon={AlertTriangle} className="lg:col-span-7">
                <div className="mt-2 space-y-6 flex-1 flex flex-col justify-center">
                  {investigationData.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">{item.issue}</h4>
                          <span className="text-xs text-slate-400 font-medium mt-0.5 inline-block">Impact Score: {item.impact}/100</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            item.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            item.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                            item.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                      </div>
                      {/* Glowing Impact Bar */}
                      <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_12px_currentColor]`}
                          style={{ width: `${item.impact}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </BentoCard>

              {/* Live User Feedback Stream (Span 5) */}
              <BentoCard title="Live Feedback Stream" icon={MessageSquare} className="lg:col-span-5 bg-gradient-to-bl from-slate-900/60 to-slate-950/40">
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar h-[320px] space-y-4">
                  {feedbackData.map((feedback) => (
                    <div key={feedback.id} className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                            <User size={14} className="text-slate-300" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-200">{feedback.user}</p>
                            <p className="text-[10px] text-slate-500">{feedback.time}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          feedback.sentiment === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          feedback.sentiment === 'Negative' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {feedback.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 pl-3 border-slate-600">
                        "{feedback.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </BentoCard>

            </div>
          </div>
        )}

        {/* --- NEW MARKET + SHARE VIEW --- */}
        {activeNav === 'Market + Share' && (
          <div className="space-y-6 animate-in fade-in duration-500 pb-12">
            
            {/* ROW 1: World Pulse & Market Index */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* World Map & Market Pulse */}
              <BentoCard title="Company Simulator" icon={Globe} className="lg:col-span-8 min-h-[320px] relative overflow-hidden group">
                
                {/* Authentic Vector World Map */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6 mt-12 opacity-50">
                  <div className="relative w-full max-w-[700px] aspect-[2/1]">
                    
                    {/* Real World Map via CSS Mask */}
                    <div 
                      className="absolute inset-0 bg-slate-500 drop-shadow-[0_0_15px_rgba(100,116,139,0.3)]"
                      style={{
                        WebkitMaskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        WebkitMaskRepeat: 'no-repeat',
                        maskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg")',
                        maskSize: 'contain',
                        maskPosition: 'center',
                        maskRepeat: 'no-repeat',
                      }}
                    />

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-60">
                      <line x1="22%" y1="35%" x2="52%" y2="25%" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                      <line x1="52%" y1="25%" x2="75%" y2="40%" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                      <line x1="75%" y1="40%" x2="22%" y2="35%" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                    </svg>

                    {/* Interactive Region Overlays scoped within the aspect ratio container */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {[
                        { id: 'AMER', left: '22%', top: '35%', color: 'text-blue-400', bg: 'bg-blue-500', shadow: 'shadow-[0_0_20px_#3b82f6]', users: '4.2M', status: 'Optimal' },
                        { id: 'EMEA', left: '52%', top: '25%', color: 'text-purple-400', bg: 'bg-purple-500', shadow: 'shadow-[0_0_20px_#a855f7]', users: '2.8M', status: 'Elevated Load' },
                        { id: 'APAC', left: '75%', top: '40%', color: 'text-emerald-400', bg: 'bg-emerald-500', shadow: 'shadow-[0_0_20px_#10b981]', users: '1.9M', status: 'Stable' },
                      ].map((region) => (
                        <div 
                          key={region.id}
                          className="absolute group/node pointer-events-auto"
                          style={{ left: region.left, top: region.top, transform: 'translate(-50%, -50%)' }}
                          onMouseEnter={() => setHoveredRegion(region.id)}
                          onMouseLeave={() => setHoveredRegion(null)}
                        >
                          {/* Node Point */}
                          <div className="relative flex items-center justify-center cursor-pointer p-4">
                             <div className={`absolute inset-0 rounded-full transition-all duration-300 ${hoveredRegion === region.id ? 'bg-slate-700/50 scale-100 backdrop-blur-sm' : 'scale-0'}`}></div>
                             <div className={`w-3 h-3 rounded-full transition-all duration-300 z-10 ${region.bg} ${hoveredRegion === region.id ? `scale-150 ${region.shadow}` : 'animate-pulse'}`} />
                             <span className={`absolute top-full mt-1 text-xs font-bold tracking-widest transition-colors duration-300 ${hoveredRegion === region.id ? 'text-white' : 'text-slate-500'}`}>
                               {region.id}
                             </span>
                          </div>

                          {/* Floating Tooltip Panel */}
                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-3.5 rounded-xl shadow-2xl transition-all duration-300 pointer-events-none ${hoveredRegion === region.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                              <span className={`font-bold text-sm ${region.color}`}>{region.id} Cluster</span>
                              <span className={`flex h-2 w-2 rounded-full ${region.status === 'Optimal' || region.status === 'Stable' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Active Users</span>
                                <span className="text-slate-200 font-medium">{region.users}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Status</span>
                                <span className="text-slate-200 font-medium">{region.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pulse Graph layered on top */}
                <div className="w-full h-full relative z-10 mt-6 pointer-events-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dynamicPulse} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <RechartsTooltip content={<PulseTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={macroVolatility > 70 ? "#ef4444" : macroVolatility > 40 ? "#eab308" : "#3b82f6"} 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{ r: 6, fill: macroVolatility > 70 ? "#ef4444" : macroVolatility > 40 ? "#eab308" : "#3b82f6", strokeWidth: 0, style: { filter: `drop-shadow(0 0 8px ${macroVolatility > 70 ? 'red' : macroVolatility > 40 ? 'yellow' : 'blue'})` } }}
                        isAnimationActive={false}
                        style={{ filter: `drop-shadow(0 0 ${macroVolatility/8}px ${macroVolatility > 70 ? 'red' : 'blue'})` }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </BentoCard>

              {/* Market Index & Position */}
              <BentoCard title="Market Index Tier" icon={TrendingUp} className="lg:col-span-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Gauge Ring */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="6" />
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="440" strokeDashoffset={440 - (440 * 0.95)} className="drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">#1</span>
                    <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] mt-1 font-bold">Position</span>
                  </div>
                </div>
                <div className="mt-8 flex gap-4 w-full justify-center">
                  <div className="text-center px-6 border-r border-slate-700/50">
                    <div className="text-2xl font-bold text-white">42.0%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Total Share</div>
                  </div>
                  <div className="text-center px-6">
                    <div className="text-2xl font-bold text-emerald-400">+15.2%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">YoY Shift</div>
                  </div>
                </div>
              </BentoCard>

            </div>

            {/* ROW 2: Candlestick & Volatility */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Interactive TradingView Chart */}
              <BentoCard title="Advanced Market Charting (Pro)" icon={BarChart2} className="lg:col-span-8 min-h-[500px]">
                <div className="w-full flex-1 relative mt-4 rounded-xl overflow-hidden border border-slate-700/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <TradingViewWidget />
                </div>
              </BentoCard>

              {/* Macro Volatility Interactive */}
              <BentoCard title="Macro Volatility Simulator" icon={Sliders} className="lg:col-span-4 flex flex-col justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 pointer-events-none rounded-3xl" />
                
                <div className="text-center mb-8 relative z-10">
                  <div className={`text-7xl font-black tracking-tighter transition-colors duration-500 ${
                    macroVolatility > 70 ? 'text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]' : 
                    macroVolatility > 40 ? 'text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]' : 
                    'text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                  }`}>
                    {macroVolatility}
                  </div>
                  <div className="text-sm text-slate-400 mt-3 font-bold uppercase tracking-widest flex justify-center items-center gap-2">
                    Global Risk Index 
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${macroVolatility > 70 ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${macroVolatility > 70 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                    </span>
                  </div>
                </div>

                <div className="px-6 relative z-10">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={macroVolatility}
                    onChange={(e) => setMacroVolatility(parseInt(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all ${
                      macroVolatility > 70 ? 'bg-red-900/50 accent-red-500' : 
                      macroVolatility > 40 ? 'bg-yellow-900/50 accent-yellow-500' : 
                      'bg-emerald-900/50 accent-emerald-500'
                    }`}
                  />
                  <div className="flex justify-between text-xs mt-4 font-bold uppercase tracking-wider">
                    <span className={macroVolatility <= 40 ? 'text-emerald-400' : 'text-slate-600'}>Stable</span>
                    <span className={macroVolatility > 40 && macroVolatility <= 70 ? 'text-yellow-400' : 'text-slate-600'}>Elevated</span>
                    <span className={macroVolatility > 70 ? 'text-red-400' : 'text-slate-600'}>Critical</span>
                  </div>
                </div>
              </BentoCard>

            </div>

            {/* ROW 3: Shares Battle & Session Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Shares Battle */}
              <BentoCard title="Shares Battle: Nexus vs Synapse" icon={Swords} className="lg:col-span-8 min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={battleData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Nexus AI (Us)" dataKey="us" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.4} />
                    <Radar name="Synapse Inc (Rival)" dataKey="rival" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.4} />
                    <Legend wrapperStyle={{ fontSize: '14px', color: '#cbd5e1', paddingTop: '20px' }} />
                    <RechartsTooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </BentoCard>

              {/* Session Stats Column */}
              <BentoCard title="Session Statistics" icon={Activity} className="lg:col-span-4 bg-slate-900/60">
                <div className="flex flex-col gap-3 mt-2 h-full justify-center">
                  {[
                    { label: 'Company Share', value: '42.0%', trend: 'up' },
                    { label: 'Rival Share', value: '28.5%', trend: 'down' },
                    { label: 'Session High', value: '$96.40', text: 'text-emerald-400' },
                    { label: 'Session Low', value: '$81.20', text: 'text-red-400' },
                    {
                      label: 'Risk State',
                      value: macroVolatility > 70 ? 'CRITICAL' : macroVolatility > 40 ? 'ELEVATED' : 'STABLE',
                      bg: macroVolatility > 70 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 
                          macroVolatility > 40 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                      <span className="text-sm text-slate-400 font-medium">{item.label}</span>
                      {item.bg ? (
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border shadow-lg tracking-wider ${item.bg}`}>
                          {item.value}
                        </span>
                      ) : (
                        <span className={`text-lg font-bold ${item.text || 'text-white'} flex items-center gap-2`}>
                          {item.value}
                          {item.trend === 'up' && <TrendingUp size={16} className="text-emerald-400" />}
                          {item.trend === 'down' && <TrendingUp size={16} className="text-red-400 transform rotate-180" />}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </BentoCard>

            </div>

          </div>
        )}

      </main>

      {/* Custom Styles for Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 0.6); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(71, 85, 105, 0.8); }
      `}} />
    </div>
  );
}