import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useTheme } from "@/contexts/ThemeContext";
import { Mail, MapPin, Phone, Heart, Users, TrendingUp, Moon, Sun } from "lucide-react";
import { useState } from "react";

function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable || !toggleTheme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-[var(--pastel-blue)] dark:bg-slate-800 flex items-center justify-center text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] hover:scale-110 transition-all duration-300 shadow-sm border border-transparent dark:border-slate-700"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md h-20 flex justify-between items-center px-6 md:px-16 shadow-sm dark:shadow-slate-800/50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center p-0.5 border-2 border-[var(--brand-yellow)] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-[var(--brand-purple)] text-white font-bold text-lg">
              S
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-2xl font-bold tracking-tight text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
              SYGO
            </div>
            <div className="text-[0.65rem] font-bold text-[var(--brand-pink)] tracking-wide hidden sm:block mt-0.5">
              Youth Empowerment
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 font-bold text-on-surface dark:text-slate-200 transition-colors duration-300">
          <a href="#home" className="nav-link text-[var(--brand-purple)] dark:text-[var(--brand-yellow)]">
            Home
          </a>
          <a href="#about" className="nav-link hover:text-[var(--brand-purple)] dark:hover:text-[var(--brand-yellow)]">
            About
          </a>
          <a href="#causes" className="nav-link hover:text-[var(--brand-purple)] dark:hover:text-[var(--brand-yellow)]">
            Causes
          </a>
          <a href="#impact" className="nav-link hover:text-[var(--brand-purple)] dark:hover:text-[var(--brand-yellow)]">
            Impact
          </a>
          <a href="#contact" className="nav-link hover:text-[var(--brand-purple)] dark:hover:text-[var(--brand-yellow)]">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="bg-[var(--brand-pink)] text-white px-8 py-3 rounded-full font-bold bouncy-btn shadow-md shadow-[var(--brand-pink)]/30">
            Donate Now
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-[var(--pastel-yellow)] dark:bg-[var(--brand-yellow)]/20 border-2 border-[var(--brand-yellow)] dark:border-[var(--brand-yellow)]/50 rounded-full text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] font-bold text-sm transition-colors duration-300">
              👋 WELCOME TO SYGO
            </div>
            <h1 className="flex flex-col gap-4 font-bold leading-tight">
              <span className="text-2xl lg:text-3xl text-[var(--brand-blue)] tracking-wider uppercase flex items-center gap-3">
                🎯 Strategic Focus
              </span>
              <span className="text-5xl lg:text-6xl text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
                Primary Focus: <br />
                <span className="text-[var(--brand-pink)]">Youth Empowerment</span>
              </span>
              <span className="text-2xl lg:text-3xl font-semibold text-stone-600 dark:text-slate-300 mt-2 border-l-4 border-[var(--brand-yellow)] pl-4 transition-colors duration-300">
                Cross-cutting Priority: <br />
                <span className="text-[var(--brand-purple)] dark:text-[var(--brand-yellow)]">
                  Women & Girls Empowerment
                </span>
              </span>
            </h1>
            <p className="text-xl text-stone-600 dark:text-slate-300 max-w-lg font-medium leading-relaxed transition-colors duration-300">
              To empower youth—especially young women and girls—through skills development, leadership protection, and economic opportunities, enabling them to actively contribute to positive social and economic change.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="bg-[var(--brand-purple)] text-white px-10 py-5 rounded-2xl font-bold text-xl bouncy-btn shadow-[0_8px_0_rgb(114,9,183)] active:shadow-none active:translate-y-1">
                Support Our Mission
              </button>
              <button className="flex items-center gap-3 bg-white dark:bg-slate-800 dark:text-white border-4 border-[var(--pastel-blue)] dark:border-slate-700 px-8 py-4 rounded-2xl font-bold text-xl bouncy-btn transition-colors duration-300">
                👁️ View Projects
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-irregular-1 overflow-hidden aspect-square shadow-2xl border-8 border-white dark:border-slate-800 transition-colors duration-300 bg-gradient-to-br from-[var(--brand-blue)]/20 to-[var(--brand-purple)]/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-lg font-bold text-[var(--brand-purple)]">Youth Campaign</p>
              </div>
            </div>
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white dark:bg-slate-800 z-20 border-8 border-[var(--brand-yellow)] dark:border-[var(--brand-yellow)]/80 shadow-xl hidden md:flex items-center justify-center p-3 transition-colors duration-300">
              <div className="w-full h-full flex items-center justify-center bg-[var(--brand-purple)] rounded-full text-white font-bold text-6xl">
                S
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border-2 border-[var(--pastel-green)] dark:border-slate-700 playful-card transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-[var(--brand-pink)] flex items-center justify-center animate-bounce text-white text-2xl">
                👥
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
                  1,000+
                </div>
                <div className="text-sm font-bold text-stone-500 dark:text-slate-400">Youth Engaged</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-[var(--pastel-blue)]/30 dark:bg-slate-800/40 py-24 relative overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group cursor-pointer">
              <div className="rounded-irregular-2 overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 aspect-video relative bg-gradient-to-br from-[var(--brand-blue)]/10 to-[var(--brand-purple)]/10 p-4 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <p className="text-lg font-bold text-[var(--brand-purple)]">Vision & Mission</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-5xl font-bold leading-tight text-on-surface dark:text-white transition-colors duration-300">
                A Society Where Empowered <span className="text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] underline decoration-[var(--brand-yellow)] dark:decoration-[var(--brand-pink)] decoration-8">Youth Lead</span>.
              </h2>
              <p className="text-lg font-medium leading-relaxed text-stone-600 dark:text-slate-300 transition-colors duration-300">
                Our vision is to see a community where youth and women have access to education, skills, peace, and economic opportunities for a better life. We believe in inclusive and sustainable development led by empowered young minds.
              </p>
              <div className="grid grid-cols-2 gap-6 text-on-surface dark:text-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--brand-blue)] text-2xl">✓</span>
                  <span className="font-bold">Youth-Led Initiatives</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--brand-pink)] text-2xl">✓</span>
                  <span className="font-bold">Gender Equality Focus</span>
                </div>
              </div>
              <button className="bg-[var(--brand-purple)] dark:bg-[var(--brand-blue)] text-white px-10 py-4 rounded-full font-bold bouncy-btn flex items-center gap-3">
                Discover Our Core Values 🚀
              </button>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section id="causes" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
              Our Core Focus Areas...
            </h2>
            <div className="w-32 h-2 bg-[var(--brand-yellow)] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Skills & Education */}
            <div className="bg-[var(--pastel-yellow)] dark:bg-slate-800 p-10 rounded-irregular-1 border-4 border-transparent dark:border-[var(--brand-yellow)]/30 hover:border-[var(--brand-yellow)] playful-card text-center group transition-colors duration-300">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:rotate-12 transition-transform text-4xl">
                🎓
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Skills & Education</h3>
              <p className="font-medium text-stone-600 dark:text-slate-400 mb-6">Equipping youth with practical skills and digital awareness for the future.</p>
              <a className="text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] font-bold flex items-center justify-center gap-2" href="#">
                Learn More →
              </a>
            </div>

            {/* GBV Prevention */}
            <div className="bg-[var(--pastel-blue)] dark:bg-slate-800 p-10 rounded-irregular-2 border-4 border-transparent dark:border-[var(--brand-blue)]/30 hover:border-[var(--brand-blue)] playful-card text-center group transition-colors duration-300">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:-rotate-12 transition-transform text-4xl">
                🛡️
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">GBV Prevention</h3>
              <p className="font-medium text-stone-600 dark:text-slate-400 mb-6">Conducting vital awareness campaigns and peer-to-peer education.</p>
              <a className="text-[var(--brand-blue)] font-bold flex items-center justify-center gap-2" href="#">
                Our Impact →
              </a>
            </div>

            {/* Leadership */}
            <div className="bg-[var(--pastel-green)] dark:bg-slate-800 p-10 rounded-irregular-1 border-4 border-transparent dark:border-green-400/30 hover:border-green-400 playful-card text-center group transition-colors duration-300">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:rotate-12 transition-transform text-4xl">
                👑
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Leadership</h3>
              <p className="font-medium text-stone-600 dark:text-slate-400 mb-6">Fostering organizational governance and conflict management skills.</p>
              <a className="text-green-600 font-bold flex items-center justify-center gap-2" href="#">
                View Programs →
              </a>
            </div>

            {/* Economic Growth */}
            <div className="bg-[var(--pastel-purple)] dark:bg-slate-800 p-10 rounded-irregular-2 border-4 border-transparent dark:border-[var(--brand-pink)]/30 hover:border-[var(--brand-pink)] playful-card text-center group transition-colors duration-300">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:-rotate-12 transition-transform text-4xl">
                📈
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Economic Growth</h3>
              <p className="font-medium text-stone-600 dark:text-slate-400 mb-6">Creating pathways for inclusive economic opportunities and self-reliance.</p>
              <a className="text-[var(--brand-pink)] font-bold flex items-center justify-center gap-2" href="#">
                See Opportunities →
              </a>
            </div>
          </div>
        </section>

        {/* Recent Interventions */}
        <section id="impact" className="bg-white dark:bg-slate-900 py-24 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
              <h2 className="text-5xl font-bold text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
                Recent Interventions
              </h2>
              <a className="text-[var(--brand-pink)] font-bold text-xl flex items-center gap-2 hover:underline" href="#">
                View All Projects ✨
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* GBV Prevention Project */}
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-[var(--pastel-blue)] dark:border-slate-700 playful-card flex flex-col transition-colors duration-300">
                <div className="relative h-64 shrink-0 bg-gradient-to-br from-[var(--brand-blue)]/20 to-[var(--brand-blue)]/10 flex items-center justify-center text-5xl">
                  🛡️
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="inline-block w-fit bg-[var(--brand-blue)] text-white px-4 py-1 rounded-full font-bold text-sm uppercase mb-4">
                    GBV Response
                  </span>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">GBV Prevention in Horn of Africa</h3>
                  <p className="text-stone-600 dark:text-slate-300 font-medium mb-8 flex-grow">
                    Partnering with SDC, PLAN International, and WDRO to prevent and respond to Gender-Based Violence in Jigjiga City.
                  </p>
                  <button className="w-full bg-[var(--brand-blue)] text-white py-4 rounded-2xl font-bold bouncy-btn mt-auto">
                    Read Report
                  </button>
                </div>
              </div>

              {/* School Awareness Campaign */}
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-[var(--pastel-yellow)] dark:border-slate-700 playful-card flex flex-col transition-colors duration-300">
                <div className="relative h-64 shrink-0 bg-gradient-to-br from-[var(--brand-yellow)]/20 to-[var(--brand-yellow)]/10 flex items-center justify-center text-5xl">
                  📢
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="inline-block w-fit bg-[var(--brand-yellow)] text-[var(--brand-purple)] px-4 py-1 rounded-full font-bold text-sm uppercase mb-4">
                    Awareness
                  </span>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">School & Community Campaigns</h3>
                  <p className="text-stone-600 dark:text-slate-300 font-medium mb-8 flex-grow">
                    Conducting extensive peer-to-peer education and radio discourse to raise awareness in local high schools and forums.
                  </p>
                  <button className="w-full bg-[var(--brand-yellow)] text-[var(--brand-purple)] py-4 rounded-2xl font-bold bouncy-btn mt-auto">
                    See Gallery
                  </button>
                </div>
              </div>

              {/* Leadership Training */}
              <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-[var(--pastel-purple)] dark:border-slate-700 playful-card flex flex-col transition-colors duration-300">
                <div className="relative h-64 shrink-0 bg-gradient-to-br from-[var(--brand-purple)]/20 to-[var(--brand-purple)]/10 flex items-center justify-center text-5xl">
                  👑
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="inline-block w-fit bg-[var(--brand-purple)] text-white px-4 py-1 rounded-full font-bold text-sm uppercase mb-4">
                    Leadership
                  </span>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">Capacity Building & Training</h3>
                  <p className="text-stone-600 dark:text-slate-300 font-medium mb-8 flex-grow">
                    Providing training on organizational governance, digital awareness, and recognizing emerging young leaders.
                  </p>
                  <button className="w-full bg-[var(--brand-purple)] text-white py-4 rounded-2xl font-bold bouncy-btn mt-auto">
                    Join Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborative Approach */}
        <section className="bg-[var(--pastel-green)]/40 dark:bg-slate-800/40 py-24 px-6 overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl font-bold leading-tight text-on-surface dark:text-white transition-colors duration-300">
                Our Collaborative Approach...
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-md dark:shadow-none dark:border dark:border-slate-700 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-blue)] flex-shrink-0 flex items-center justify-center text-white text-3xl">
                    🤝
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[var(--brand-purple)] dark:text-[var(--brand-yellow)]">
                      Collaboration & Team-Work
                    </h4>
                    <p className="text-stone-600 dark:text-slate-300 font-medium">
                      Working hand-in-hand with stakeholders, international partners, and local communities.
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-md dark:shadow-none dark:border dark:border-slate-700 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-yellow)] flex-shrink-0 flex items-center justify-center text-[var(--brand-purple)] text-3xl">
                    🌍
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[var(--brand-purple)] dark:text-[var(--brand-yellow)]">
                      Inclusiveness & Integrity
                    </h4>
                    <p className="text-stone-600 dark:text-slate-300 font-medium">
                      Ensuring transparency, impartiality, and equal opportunities for everyone we serve.
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl flex items-center gap-6 shadow-sm hover:shadow-md dark:shadow-none dark:border dark:border-slate-700 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--brand-pink)] flex-shrink-0 flex items-center justify-center text-white text-3xl">
                    🌱
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[var(--brand-purple)] dark:text-[var(--brand-yellow)]">
                      Sustainability & Results
                    </h4>
                    <p className="text-stone-600 dark:text-slate-300 font-medium">
                      Focusing on long-term impact and accountable, result-oriented initiatives for real change.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center relative">
              <div className="relative w-96 h-96 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="40" stroke="var(--pastel-blue)" strokeWidth="12"></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="var(--brand-pink)"
                    strokeDasharray="251"
                    strokeDashoffset="213"
                    strokeWidth="12"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="var(--brand-yellow)"
                    strokeDasharray="251"
                    strokeDashoffset="188"
                    strokeWidth="12"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="var(--brand-blue)"
                    strokeDasharray="251"
                    strokeDashoffset="100"
                    strokeWidth="12"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-bold text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
                    100%
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[var(--brand-pink)]">
                    Love & Trust
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Updates Hub */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-[var(--brand-purple)] dark:text-white transition-colors duration-300">
            Impact & Updates Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Milestone Card */}
            <article className="bg-[var(--pastel-yellow)]/30 dark:bg-slate-800 p-8 rounded-[2rem] border-4 border-dashed border-[var(--brand-yellow)] dark:border-[var(--brand-yellow)]/30 group hover:bg-[var(--pastel-yellow)]/50 dark:hover:border-[var(--brand-yellow)] transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1 bg-white dark:bg-slate-700 rounded-full text-xs font-bold text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] transition-colors duration-300">
                  MILESTONE
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-slate-400">Oct 12</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface dark:text-white leading-tight">
                Best Emerging Young Leader
              </h3>
              <p className="font-medium text-stone-600 dark:text-slate-300 mb-8">
                SYGO was recognized as the Best Emerging Young Leader of the year in SRS, a testament to our ongoing commitment to youth empowerment.
              </p>
              <a className="text-[var(--brand-purple)] dark:text-[var(--brand-yellow)] font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                Read the Story 📖
              </a>
            </article>

            {/* Project Update Card */}
            <article className="bg-[var(--pastel-blue)]/30 dark:bg-slate-800 p-8 rounded-[2rem] border-4 border-dashed border-[var(--brand-blue)] dark:border-[var(--brand-blue)]/30 group hover:bg-[var(--pastel-blue)]/50 dark:hover:border-[var(--brand-blue)] transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1 bg-white dark:bg-slate-700 rounded-full text-xs font-bold text-[var(--brand-blue)] dark:text-[var(--brand-blue)] transition-colors duration-300">
                  PROJECT UPDATE
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-slate-400">Sep 28</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface dark:text-white leading-tight">
                6 Months of Impact on GBV
              </h3>
              <p className="font-medium text-stone-600 dark:text-slate-300 mb-8">
                Reflecting on our rapid progress and expanding interventions to prevent and respond to GBV across the Horn of Africa alongside our partners.
              </p>
              <a className="text-[var(--brand-blue)] font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                View Impact Data 📊
              </a>
            </article>

            {/* Community Card */}
            <article className="bg-[var(--pastel-purple)]/30 dark:bg-slate-800 p-8 rounded-[2rem] border-4 border-dashed border-[var(--brand-purple)] dark:border-[var(--brand-pink)]/30 group hover:bg-[var(--pastel-purple)]/50 dark:hover:border-[var(--brand-pink)] transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1 bg-white dark:bg-slate-700 rounded-full text-xs font-bold text-[var(--brand-purple)] dark:text-[var(--brand-pink)] transition-colors duration-300">
                  COMMUNITY
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-slate-400">Sep 15</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface dark:text-white leading-tight">
                Digital Awareness Drive
              </h3>
              <p className="font-medium text-stone-600 dark:text-slate-300 mb-8">
                Bringing vital tech skills and SBCC training to youth, opening up new pathways for communication, education, and development.
              </p>
              <a className="text-[var(--brand-purple)] dark:text-[var(--brand-pink)] font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                See the Tech 💻
              </a>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="h-[600px] relative mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-pink)] dark:from-slate-900 dark:to-slate-800 backdrop-blur-[4px] flex items-center justify-center text-center px-6 transition-colors duration-300">
            <div className="max-w-4xl space-y-10">
              <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                Together, We Can Drive Positive <span className="text-[var(--brand-yellow)]">Social Change!</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="bg-[var(--brand-pink)] text-white px-12 py-5 rounded-3xl font-bold text-2xl bouncy-btn shadow-2xl">
                  Partner With Us
                </button>
                <button className="bg-white text-[var(--brand-purple)] px-12 py-5 rounded-3xl font-bold text-2xl bouncy-btn shadow-2xl">
                  View Our Interventions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[var(--brand-purple)] dark:bg-slate-950 text-white py-20 px-6 rounded-t-[4rem] transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-lg overflow-hidden font-bold text-[var(--brand-purple)] text-2xl">
                  S
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold leading-none">SYGO</div>
                  <div className="text-xs text-[var(--brand-yellow)] font-bold mt-1 max-w-[200px]">
                    Somali Youth Growth Mind Organization
                  </div>
                </div>
              </div>
              <p className="text-white/80 font-medium leading-relaxed">
                Empowering youth—especially young women and girls—through skills development, leadership, and economic opportunities to actively contribute to positive social change.
              </p>
              <div className="flex gap-4">
                <a className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-purple)] transition-all text-xl" href="#">
                  😊
                </a>
                <a className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[var(--brand-blue)] hover:text-white transition-all text-xl" href="#">
                  👥
                </a>
                <a className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[var(--brand-pink)] hover:text-white transition-all text-xl" href="#">
                  🚀
                </a>
              </div>
            </div>

            {/* Organization Links */}
            <div>
              <h4 className="text-2xl font-bold mb-8">Organization</h4>
              <ul className="space-y-4 font-medium text-lg">
                <li>
                  <a className="hover:text-[var(--brand-yellow)]" href="#">
                    Vision & Mission
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-yellow)]" href="#">
                    Our Programs
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-yellow)]" href="#">
                    Get Involved
                  </a>
                </li>
                <li>
                  <a className="hover:text-[var(--brand-yellow)]" href="#">
                    Our Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-2xl font-bold mb-8">Contact Us</h4>
              <ul className="space-y-5 font-medium text-base">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[var(--brand-yellow)] shrink-0 mt-0.5" size={20} />
                  <span className="text-white/80 leading-relaxed text-sm">
                    06 Kebele, inside Jigjiga Youth Center (in front of Public Admin & Management College), Jigjiga City, Ethiopia
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-[var(--brand-yellow)] shrink-0 mt-0.5" size={20} />
                  <div className="flex flex-col text-white/80 text-sm gap-1">
                    <a className="hover:text-[var(--brand-yellow)] transition-colors" href="tel:+251948677457">
                      +251 948 677 457
                    </a>
                    <a className="hover:text-[var(--brand-yellow)] transition-colors" href="tel:+251915428533">
                      +251 915 428 533
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-[var(--brand-yellow)] shrink-0 mt-0.5" size={20} />
                  <div className="flex flex-col text-white/80 text-sm gap-1 break-all">
                    <a className="hover:text-[var(--brand-yellow)] transition-colors" href="mailto:sygoacorg@gmail.com">
                      sygoacorg@gmail.com
                    </a>
                    <a className="hover:text-[var(--brand-yellow)] transition-colors" href="mailto:samiiraomer7457@gmail.com">
                      samiiraomer7457@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold">Stay Updated!</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-3xl px-6 py-4 text-white focus:ring-4 focus:ring-[var(--brand-yellow)] outline-none placeholder:text-white/40"
                  placeholder="Type your email..."
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-[var(--brand-yellow)] text-[var(--brand-purple)] px-6 py-2 rounded-2xl font-bold hover:scale-105 transition-transform"
                >
                  Join!
                </button>
              </form>
              {subscribed && <p className="text-[var(--brand-yellow)] text-sm font-bold">✓ Thank you for subscribing!</p>}
            </div>
          </div>

          {/* Copyright */}
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-white/60">
            <p>© 2024 SYGO (Somali Youth Growth Mind Organization). Creating smiles everywhere!</p>
            <div className="flex gap-10">
              <a className="hover:text-white" href="#">
                The Rules
              </a>
              <a className="hover:text-white" href="#">
                Our Cookies
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
