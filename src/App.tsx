import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  ZapOff,
  Plug,
  ToggleLeft,
  GitMerge,
  Cpu,
  Lightbulb,
  Sun,
  Scissors,
  Sparkles,
  Wind,
  Layers,
  Home,
  Receipt,
  CheckSquare,
  Award,
  MapPin,
  MessageCircle,
  Clock,
  Phone,
  Menu,
  X,
  Star,
  ChevronDown,
  Search,
  Calculator,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
} from "lucide-react";

import {
  BUSINESS_INFO,
  SERVICES,
  BENEFITS,
  STEPS,
  GALLERY,
  TESTIMONIALS,
  FAQS,
  HERO_IMAGE_SRC,
  ServiceItem,
} from "./data";

// Helper function to map string to Lucide JSX Icon
function getIcon(name: string, className?: string) {
  switch (name) {
    case "Zap": return <Zap className={className} />;
    case "ZapOff": return <ZapOff className={className} />;
    case "Plug": return <Plug className={className} />;
    case "ToggleLeft": return <ToggleLeft className={className} />;
    case "GitMerge": return <GitMerge className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "Lightbulb": return <Lightbulb className={className} />;
    case "Sun": return <Sun className={className} />;
    case "Scissors": return <Scissors className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "Wind": return <Wind className={className} />;
    case "Layers": return <Layers className={className} />;
    case "Home": return <Home className={className} />;
    case "Receipt": return <Receipt className={className} />;
    case "CheckSquare": return <CheckSquare className={className} />;
    case "Award": return <Award className={className} />;
    case "MapPin": return <MapPin className={className} />;
    case "MessageCircle": return <MessageCircle className={className} />;
    case "Clock": return <Clock className={className} />;
    case "Phone": return <Phone className={className} />;
    case "Menu": return <Menu className={className} />;
    case "X": return <X className={className} />;
    case "Star": return <Star className={className} />;
    case "ChevronDown": return <ChevronDown className={className} />;
    case "Search": return <Search className={className} />;
    case "Calculator": return <Calculator className={className} />;
    case "AlertCircle": return <AlertCircle className={className} />;
    case "ArrowRight": return <ArrowRight className={className} />;
    case "ShieldCheck": return <ShieldCheck className={className} />;
    case "MessageSquare": return <MessageSquare className={className} />;
    case "ThumbsUp": return <ThumbsUp className={className} />;
    case "CheckCircle2": return <CheckCircle2 className={className} />;
    default: return <Zap className={className} />;
  }
}

export default function App() {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search and Category states for Services section
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // FAQ Accordion expanded index
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Lightbox modal state for Gallery
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Cost Calculator States
  const [calculatorSelected, setCalculatorSelected] = useState<{ [id: string]: number }>({});
  const [calculatorName, setCalculatorName] = useState("");
  const [calculatorAddress, setCalculatorAddress] = useState("");

  // Target Customer pill selector for quick filtering / interest
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  // Emergency flashing effect
  const [emergencyBlink, setEmergencyBlink] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencyBlink((prev) => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Filtered services list based on search and category tabs
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === "Semua") return matchesSearch;
      if (selectedCategory === "Perbaikan") {
        return (
          matchesSearch &&
          (service.id === "konslet" ||
            service.id === "stop_kontak" ||
            service.id === "saklar" ||
            service.id === "mcb" ||
            service.id === "kabel_putus" ||
            service.id === "panel_sederhana")
        );
      }
      if (selectedCategory === "Instalasi") {
        return (
          matchesSearch &&
          (service.id === "tambah_jalur" ||
            service.id === "instalasi_baru" ||
            service.id === "lampu_taman" ||
            service.id === "ganti_lampu" ||
            service.id === "lampu_led" ||
            service.id === "exhaust_fan")
        );
      }
      return matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Handle Calculator selection additions/subtractions
  const updateCalculatorQty = (id: string, delta: number) => {
    setCalculatorSelected((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  // Calculate ballpark cost
  const calculatorTotal = useMemo(() => {
    let total = 0;
    Object.entries(calculatorSelected).forEach(([id, qty]) => {
      const service = SERVICES.find((s) => s.id === id);
      if (!service) return;
      // Extract number from estimated price string (e.g. "Mulai Rp 150.000" -> 150000)
      const digitsOnly = service.estimatedPrice.replace(/\D/g, "");
      const basePrice = parseInt(digitsOnly, 10) || 0;
      const qtyNum = Number(qty) || 0;
      total += basePrice * qtyNum;
    });
    return total;
  }, [calculatorSelected]);

  // Create pre-filled WhatsApp message for general click
  const getWhatsAppLink = (message: string) => {
    return BUSINESS_INFO.whatsappUrl(message);
  };

  // Send calculator details to WhatsApp
  const sendCalculatorToWhatsApp = () => {
    if (Object.keys(calculatorSelected).length === 0) return;

    let itemsText = "";
    Object.entries(calculatorSelected).forEach(([id, qty]) => {
      const service = SERVICES.find((s) => s.id === id);
      if (!service) return;
      itemsText += `- ${service.title} (${qty}x) : ${service.estimatedPrice}\n`;
    });

    const formattedTotal = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(calculatorTotal);

    const text = `Halo Jasa Tukang Listrik Surabaya, saya ingin mengajukan perbaikan listrik dengan estimasi dari website:

${itemsText}
Estimasi Total Biaya Jasa: ${formattedTotal}
(Catatan: Estimasi belum termasuk bahan jika ada yang perlu diganti)

Nama: ${calculatorName || "Pelanggan"}
Alamat / Wilayah: ${calculatorAddress || "Surabaya"}

Mohon informasi jadwal kunjungan tukangnya. Terima kasih!`;

    window.open(BUSINESS_INFO.whatsappUrl(text), "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HEADER / NAVIGATION BAR */}
      <header id="header" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group" id="nav-logo">
            <div className="bg-amber-400 p-2.5 rounded-xl text-slate-900 group-hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight block">
                TUKANG LISTRIK
              </span>
              <span className="text-xs text-amber-400 font-mono tracking-wider block -mt-1 font-bold uppercase">
                Panggilan Surabaya
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#layanan" className="text-slate-300 hover:text-amber-400 transition-colors">Layanan</a>
            <a href="#keunggulan" className="text-slate-300 hover:text-amber-400 transition-colors">Keunggulan</a>
            <a href="#kalkulator" className="text-slate-300 hover:text-amber-400 transition-colors">Kalkulator Biaya</a>
            <a href="#alur" className="text-slate-300 hover:text-amber-400 transition-colors">Alur Kerja</a>
            <a href="#galeri" className="text-slate-300 hover:text-amber-400 transition-colors">Galeri</a>
            <a href="#faq" className="text-slate-300 hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          {/* Call-to-Action Desktop Button */}
          <div className="hidden md:block">
            <a
              href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya butuh bantuan darurat / perbaikan listrik di lokasi saya.")}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-amber-500/20"
              id="cta-nav-whatsapp"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Hubungi 24 Jam</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900 border-t border-slate-800 text-white overflow-hidden px-4 py-4 space-y-3"
            >
              <a
                href="#layanan"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Layanan Listrik
              </a>
              <a
                href="#keunggulan"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Keunggulan Kami
              </a>
              <a
                href="#kalkulator"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Kalkulator Biaya
              </a>
              <a
                href="#alur"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Alur Pemesanan
              </a>
              <a
                href="#galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Galeri Hasil Kerja
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
              >
                FAQ Listrik
              </a>
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya butuh perbaikan listrik panggilan segera.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all"
                  id="mobile-nav-cta-wa"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden py-16 md:py-28">
        {/* Ambient yellow glowing background light */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Emergency Alert Tag */}
              <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 rounded-full py-1.5 px-4 text-xs sm:text-sm font-medium text-slate-200">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${emergencyBlink ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-red-900"} transition-all`} />
                <span>Layanan Panggilan Surabaya 24 Jam Darurat</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Tukang Listrik Panggilan <br className="hidden sm:inline" />
                <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Cepat &amp; Profesional
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
                Melayani pemasangan, perbaikan, instalasi, dan troubleshooting listrik rumah maupun usaha dengan pengerjaan rapi, bergaransi, dan harga transparan di seluruh area Surabaya.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Harga Transparan</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Garansi Jasa</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>Tukang Berpengalaman</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya ingin bertanya mengenai perbaikan listrik.")}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20 text-base md:text-lg"
                  id="hero-cta-primary"
                >
                  <MessageCircle className="h-6 w-6 fill-current animate-pulse" />
                  <span>Hubungi via WhatsApp</span>
                </a>
                <a
                  href="#kalkulator"
                  className="bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all font-semibold text-base md:text-lg"
                  id="hero-cta-secondary"
                >
                  <Calculator className="h-5 w-5 text-amber-400" />
                  <span>Konsultasi &amp; Estimasi</span>
                </a>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative border-4 border-slate-800 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={HERO_IMAGE_SRC}
                  alt="Tukang Listrik Surabaya Sedang Bekerja"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-6 text-left">
                  <p className="text-amber-400 font-mono text-xs uppercase tracking-wider font-bold">Pekerja Asli Indonesia</p>
                  <p className="text-white font-semibold text-base sm:text-lg">Mas Adi - Teknisi Listrik Lapangan Surabaya</p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Sopan, berpengalaman, dan mengutamakan standar keselamatan (K3).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET PELANGGAN/SEGMENT SECTION */}
      <section className="bg-slate-100 py-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm uppercase tracking-widest font-bold text-slate-500 mb-6 font-mono">
            KAMI MELAYANI BERBAGAI SEKTOR DI SURABAYA
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Pemilik Rumah",
              "Kontrakan & Kost",
              "Ruko & Toko UMKM",
              "Warung & Depot",
              "Kantor Kecil & Studio",
              "Toko Kelontong & Ritel",
            ].map((target) => (
              <button
                key={target}
                onClick={() => {
                  setSelectedTarget(selectedTarget === target ? null : target);
                  if (target === "Ruko & Toko UMKM" || target === "Warung & Depot" || target === "Toko Kelontong & Ritel") {
                    setSelectedCategory("Perbaikan");
                    setSearchQuery("panel");
                  } else if (target === "Kontrakan & Kost") {
                    setSelectedCategory("Instalasi");
                    setSearchQuery("mcb");
                  } else {
                    setSelectedCategory("Semua");
                    setSearchQuery("");
                  }
                }}
                className={`py-2 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 border cursor-pointer ${
                  selectedTarget === target
                    ? "bg-slate-900 border-slate-900 text-amber-400 shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:text-slate-900"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${selectedTarget === target ? "bg-amber-400" : "bg-slate-300"}`} />
                <span>{target}</span>
              </button>
            ))}
          </div>
          {selectedTarget && (
            <p className="text-center text-xs text-slate-500 mt-4 animate-pulse">
              *Menyaring daftar layanan relevan untuk <strong>{selectedTarget}</strong> di bawah. Klik tombol kembali untuk mengatur ulang.
            </p>
          )}
        </div>
      </section>

      {/* KENAPA MEMILIH KAMI (BENEFITS) */}
      <section id="keunggulan" className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              KEUNGGULAN UTAMA KAMI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Kenapa Harus Mempercayakan Listrik Anda Pada Kami?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg">
              Kami berkomitmen memberikan kenyamanan dan ketenangan pikiran dengan pengerjaan listrik berkualitas tinggi untuk seluruh pelanggan kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-2xl text-left hover:shadow-xl hover:border-amber-400/40 transition-all group"
              >
                <div className="bg-slate-900 text-amber-400 p-3.5 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors duration-300 shadow-md">
                  {getIcon(benefit.iconName, "h-7 w-7")}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-950 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COST ESTIMATOR / CALCULATION WIZARD */}
      <section id="kalkulator" className="py-16 md:py-24 bg-slate-900 text-white relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Calculator Left Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-amber-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
                ALAT BANTU ESTIMASI MANDIRI
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Kalkulator Estimasi Biaya Jasa Listrik
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Ingin tahu kisaran biaya perbaikan atau instalasi? Pilih jenis layanan di samping, tentukan jumlah titiknya, dan kirimkan hasilnya langsung ke WhatsApp kami untuk pemesanan instan.
              </p>
              
              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3 text-sm text-slate-300">
                  <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Catatan Transparansi:</strong> Biaya yang tertera adalah estimasi upah jasa pengerjaan standar dan tidak termasuk pembelian sparepart/kabel jika ada material yang harus diganti.
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Pengerjaan selalu diawali kesepakatan tertulis</span>
                </div>
              </div>
            </div>

            {/* Calculator Panel Right */}
            <div className="lg:col-span-7 bg-white text-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center space-x-2.5">
                  <Calculator className="h-5 w-5 text-slate-900" />
                  <h3 className="font-display text-lg sm:text-xl font-bold">Simulasi Layanan Listrik</h3>
                </div>
                <button
                  onClick={() => setCalculatorSelected({})}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer"
                  disabled={Object.keys(calculatorSelected).length === 0}
                >
                  Reset Pilihan
                </button>
              </div>

              {/* Service List with Quantities Selector */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 mb-6">
                {SERVICES.map((service) => {
                  const qty = calculatorSelected[service.id] || 0;
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        qty > 0
                          ? "border-amber-400 bg-amber-50/20"
                          : "border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex-1 pr-3 text-left">
                        <p className="font-semibold text-xs sm:text-sm text-slate-900">{service.title}</p>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">{service.estimatedPrice}</p>
                      </div>

                      {/* Add/Remove Actions */}
                      <div className="flex items-center space-x-3">
                        {qty > 0 ? (
                          <>
                            <button
                              onClick={() => updateCalculatorQty(service.id, -1)}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono font-bold text-sm text-slate-900 w-4 text-center">{qty}</span>
                            <button
                              onClick={() => updateCalculatorQty(service.id, 1)}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold flex items-center justify-center transition-colors text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => updateCalculatorQty(service.id, 1)}
                            className="text-xs font-bold text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-3.5 py-1.5 rounded-lg border border-amber-200/50 transition-colors cursor-pointer"
                          >
                            Pilih
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer input fields for WhatsApp personalization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 text-left mb-1.5">Nama Anda (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pak Budi"
                    value={calculatorName}
                    onChange={(e) => setCalculatorName(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 text-left mb-1.5">Alamat / Wilayah (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rungkut"
                    value={calculatorAddress}
                    onChange={(e) => setCalculatorAddress(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Calculation Summary Footer */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600 text-xs sm:text-sm">Jumlah Layanan Terpilih:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {Object.values(calculatorSelected).reduce((a: number, b: number) => a + b, 0)} Jenis Pilihan
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <div>
                    <span className="text-slate-900 font-bold text-sm sm:text-base block">Estimasi Biaya Jasa:</span>
                    <span className="text-[10px] sm:text-xs text-slate-500">Belum termasuk material pengganti</span>
                  </div>
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-950 font-mono">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(calculatorTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                onClick={sendCalculatorToWhatsApp}
                disabled={Object.keys(calculatorSelected).length === 0}
                className={`w-full font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all text-base mt-6 cursor-pointer ${
                  Object.keys(calculatorSelected).length > 0
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                }`}
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Kirim Rincian &amp; Pesan Jasa ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR LAYANAN (SERVICES) SECTION */}
      <section id="layanan" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              DAFTAR LAYANAN LENGKAP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Solusi Masalah Listrik Rumah &amp; Usaha Anda
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kami melayani pengerjaan kelistrikan secara amanah, cepat, dan profesional demi kenyamanan aktivitas Anda sehari-hari.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 mb-10 flex flex-col sm:flex-row items-center gap-2">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
              <input
                type="text"
                placeholder="Cari layanan (misal: mcb, lampu, saklar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-11 pr-4 py-2.5 focus:outline-none text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
              {["Semua", "Perbaikan", "Instalasi"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 sm:flex-none text-xs font-bold py-2 px-4 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    key={service.id}
                    className="bg-white border border-slate-200/80 p-5 rounded-2xl text-left flex flex-col justify-between hover:shadow-lg transition-all border-b-4 hover:border-b-amber-400"
                  >
                    <div className="space-y-4">
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between">
                        <div className="bg-amber-100/80 text-amber-600 p-3 rounded-xl">
                          {getIcon(service.iconName, "h-6 w-6")}
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                          {service.estimatedPrice.includes("Survey") ? "Proyek" : "Jasa"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-1.5 group-hover:text-amber-500 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Estimasi Biaya</p>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-900">{service.estimatedPrice}</p>
                      </div>
                      <a
                        href={getWhatsAppLink(`Halo Tukang Listrik Surabaya, saya ingin berkonsultasi mengenai jasa: ${service.title}. Mohon estimasi pengerjaan.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold p-2 px-3 rounded-xl flex items-center text-xs transition-colors group"
                      >
                        <span>Pesan</span>
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                  <AlertCircle className="h-10 w-10 text-slate-400 mx-auto" />
                  <p className="text-slate-700 font-semibold text-lg">Layanan tidak ditemukan</p>
                  <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                    Silakan cari layanan listrik yang lain, atau tanyakan langsung pada kami jika jenis kerusakan Anda tidak tertera.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Semua");
                    }}
                    className="mt-2 text-xs font-bold text-amber-500 hover:text-amber-600 underline"
                  >
                    Atur Ulang Pencarian
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ALUR PEMESANAN (STEPS) */}
      <section id="alur" className="py-16 md:py-24 bg-white text-center border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              ALUR KERJA MUDAH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              6 Langkah Mudah Memesan Tukang Listrik
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Proses pemesanan transparan dari awal hingga akhir, menjamin keselamatan kelistrikan properti Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
            {/* Visual connecting line for desktop */}
            <div className="hidden xl:block absolute top-[44px] left-10 right-10 h-0.5 bg-slate-100 z-0 pointer-events-none" />

            {STEPS.map((step) => (
              <div key={step.number} className="relative z-10 flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-amber-400 text-amber-400 font-display font-extrabold text-xl flex items-center justify-center mb-5 shadow-md">
                  {step.number}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI HASIL PEKERJAAN */}
      <section id="galeri" className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              DOKUMENTASI PEKERJAAN ASLI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Galeri Hasil Kerja Tukang Listrik Kami
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Semua gambar di bawah adalah contoh dokumentasi pengerjaan kami di lapangan secara nyata, bersih, dan mematuhi standar keamanan kelistrikan.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-sm text-amber-400 text-[10px] font-mono font-bold py-1 px-3 rounded-full border border-slate-700">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <p className="text-white text-xs font-semibold flex items-center space-x-1">
                      <span>Perbesar Detail Foto</span>
                      <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALLERY */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 sm:p-6"
          >
            {/* Close trigger background */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveLightboxIndex(null)} />

            {/* Close Button Top Right */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 bg-slate-800 text-white p-3 rounded-xl hover:bg-slate-700 z-10"
              aria-label="Tutup"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Box */}
            <div className="relative max-w-4xl w-full z-10 flex flex-col items-center space-y-4">
              <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 max-h-[75vh]">
                <img
                  src={GALLERY[activeLightboxIndex].imgSrc}
                  alt={GALLERY[activeLightboxIndex].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between w-full text-white px-2">
                <button
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : 0
                    )
                  }
                  className="bg-slate-800/80 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  Sebelumnya
                </button>
                <div className="text-center text-xs sm:text-sm text-slate-400">
                  <p className="font-bold text-white text-base">{GALLERY[activeLightboxIndex].title}</p>
                  <p className="mt-1">{GALLERY[activeLightboxIndex].desc}</p>
                </div>
                <button
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % GALLERY.length : 0
                    )
                  }
                  className="bg-slate-800/80 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIAL SECTION */}
      <section id="testimoni" className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              ULASAN &amp; TESTIMONI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Kata Pelanggan Yang Telah Menggunakan Jasa Kami
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Kami bangga dipercaya oleh pemilik rumah, pengusaha UMKM, serta pemilik kos-kosan di wilayah Surabaya. Berikut adalah ulasan nyata mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testi, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-amber-500">
                    {Array.from({ length: testi.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{testi.text}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">{testi.name}</h4>
                    <p className="text-slate-500 text-[11px] font-medium">{testi.role} &bull; {testi.location}</p>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold py-1 px-2.5 rounded-full uppercase border border-amber-200">
                    {testi.case}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 p-6 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between text-left gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-400 p-2.5 rounded-xl text-slate-900">
                <ThumbsUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm sm:text-base">Punya Masalah Listrik Serupa?</p>
                <p className="text-xs text-slate-600">Konsultasikan gratis masalah Anda sekarang.</p>
              </div>
            </div>
            <a
              href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya ingin berkonsultasi mengenai masalah listrik saya.")}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Hubungi Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 md:py-24 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-amber-500 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
              PERTANYAAN UMUM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Jawaban atas beberapa pertanyaan mendasar mengenai jasa tukang listrik panggilan kami.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-left shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-5 focus:outline-none text-slate-900 font-bold text-sm sm:text-base cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-amber-500" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section id="cta-akhir" className="py-20 bg-gradient-to-br from-slate-950 to-slate-900 text-white relative text-center">
        {/* Ambient yellow glowing background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <span className="text-amber-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold block">
            JANGAN TUNGGU SAMPAI BERBAHAYA
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Butuh Tukang Listrik Hari Ini? <br />
            Kami Siap Meluncur Sekarang!
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hindari risiko kebakaran akibat perbaikan listrik asal-asalan. Hubungi teknisi kami untuk penanganan kelistrikan yang aman, rapi, transparan, dan bergaransi di seluruh area Surabaya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya butuh pengerjaan listrik panggilan sekarang.")}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] shadow-lg shadow-amber-500/20"
              id="cta-footer-wa"
            >
              <MessageCircle className="h-6 w-6 fill-current animate-bounce" />
              <span>Chat WhatsApp Sekarang</span>
            </a>
            <a
              href="#header"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-2xl border border-slate-700 transition-all text-sm"
            >
              Kembali Ke Atas
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Branding widget */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-400 p-2 rounded-xl text-slate-900">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <span className="font-display text-white text-lg font-bold tracking-tight">
                  Tukang Listrik Surabaya
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Penyedia layanan jasa tukang listrik panggilan terpercaya di kota Surabaya. Kami melayani perbaikan dan instalasi skala rumah tangga, kos, ruko, maupun usaha kecil menengah (UMKM) dengan mengutamakan keselamatan dan transparansi.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Navigasi Cepat</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#layanan" className="hover:text-amber-400 transition-colors">Layanan Kelistrikan</a></li>
                <li><a href="#keunggulan" className="hover:text-amber-400 transition-colors">Keunggulan Kami</a></li>
                <li><a href="#kalkulator" className="hover:text-amber-400 transition-colors">Kalkulator Estimasi</a></li>
                <li><a href="#alur" className="hover:text-amber-400 transition-colors">Alur Pemesanan</a></li>
                <li><a href="#galeri" className="hover:text-amber-400 transition-colors">Dokumentasi Kerja</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ / Tanya Jawab</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Kontak &amp; Alamat</h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span>+62 857-3245-2605</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Clock className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Jam Operasional:</strong><br />
                    {BUSINESS_INFO.operationalHours}
                  </span>
                </li>
              </ul>
            </div>

            {/* Google Map Anchor & Trust badges */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider">Area Layanan Kami</h4>
              <p className="text-xs text-slate-400">
                Melayani seluruh wilayah Surabaya (Surabaya Pusat, Timur, Barat, Utara, dan Selatan) serta area perbatasan sekitarnya.
              </p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Jl.+Simomagerejo+II+No.17,+Surabaya"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold transition-all"
                  id="footer-maps-link"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Buka Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright and Legal notes */}
          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500 space-y-2">
            <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.</p>
            <p>
              Dirancang secara profesional, bergaransi, dan amanah oleh usaha lokal skala kecil yang peduli pada keselamatan kelistrikan masyarakat Surabaya.
            </p>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING WHATSAPP BUTTON WITH EMERGENCY ACCENT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Floating Tooltip */}
        <div className="bg-slate-950 text-white text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xl border border-slate-800 flex items-center space-x-2 animate-bounce pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Butuh Tukang Listrik Cepat?</span>
        </div>

        {/* Pulsating Floating Button */}
        <a
          href={getWhatsAppLink("Halo Tukang Listrik Surabaya, saya butuh perbaikan panggilan darurat segera di lokasi saya.")}
          target="_blank"
          rel="noreferrer"
          className="relative group bg-[#25d366] hover:bg-[#20ba5a] text-white p-4.5 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Chat WhatsApp Darurat"
          id="floating-whatsapp-btn"
        >
          {/* Pulsating wave rings */}
          <span className="absolute inset-0 rounded-full bg-[#25d366]/30 animate-ping -z-10" />
          <MessageCircle className="h-7 w-7 fill-current" />
        </a>
      </div>
    </div>
  );
}
