import heroImage from './assets/images/hero_tukang_listrik_1782473962258.jpg';
import lampuImage from './assets/images/instalasi_lampu_1782473980146.jpg';
import stopKontakImage from './assets/images/perbaikan_stop_kontak_1782473994264.jpg';
import mcbImage from './assets/images/pemasangan_mcb_1782474006012.jpg';
import kabelImage from './assets/images/penarikan_kabel_1782474019440.jpg';
import checkImage from './assets/images/pemeriksaan_instalasi_1782474032652.jpg';
import rukoImage from './assets/images/galeri_tukang_kerja_1782474047201.jpg';

export const BUSINESS_INFO = {
  name: "Jasa Tukang Listrik Surabaya",
  phone: "6285732452605",
  address: "Jl. Simomagerejo II No.17, Surabaya, Jawa Timur 60181",
  operationalHours: "Setiap Hari (24 Jam untuk Darurat/Kondisional, Panggilan Umum 07.00 - 21.00)",
  tagline: "Solusi Cepat, Rapi, Aman & Bergaransi untuk Masalah Listrik Anda",
  whatsappUrl: (message: string) => `https://wa.me/6285732452605?text=${encodeURIComponent(message)}`,
};

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  estimatedPrice: string;
  iconName: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "konslet",
    title: "Perbaikan Listrik Konslet",
    description: "Deteksi cepat dan perbaikan jalur kabel konsleting listrik yang menyebabkan MCB turun terus-menerus.",
    estimatedPrice: "Mulai Rp 150.000",
    iconName: "ZapOff"
  },
  {
    id: "stop_kontak",
    title: "Pasang/Ganti Stop Kontak",
    description: "Pemasangan stop kontak baru atau penggantian stop kontak lama yang meleleh, longgar, atau rusak.",
    estimatedPrice: "Mulai Rp 50.000 / titik",
    iconName: "Plug"
  },
  {
    id: "saklar",
    title: "Pasang/Ganti Saklar",
    description: "Instalasi saklar tunggal, saklar ganda, atau saklar hotel untuk kemudahan kontrol pencahayaan ruangan Anda.",
    estimatedPrice: "Mulai Rp 45.000 / titik",
    iconName: "ToggleLeft"
  },
  {
    id: "tambah_jalur",
    title: "Tambah Jalur Listrik",
    description: "Pembuatan jalur kabel baru untuk AC, pompa air, mesin cuci, atau peralatan berdaya besar lainnya.",
    estimatedPrice: "Mulai Rp 120.000",
    iconName: "GitMerge"
  },
  {
    id: "mcb",
    title: "Ganti MCB & Box Panel",
    description: "Penggantian MCB yang sudah lemah/sering turun sendiri dan penataan box sekring agar lebih rapi dan aman.",
    estimatedPrice: "Mulai Rp 100.000",
    iconName: "Cpu"
  },
  {
    id: "ganti_lampu",
    title: "Ganti & Pasang Lampu",
    description: "Melayani penggantian lampu rumah biasa, lampu gantung, lampu sorot, lampu hias, maupun lampu downlight.",
    estimatedPrice: "Mulai Rp 35.000 / titik",
    iconName: "Lightbulb"
  },
  {
    id: "lampu_taman",
    title: "Instalasi Lampu Taman",
    description: "Instalasi pencahayaan luar ruangan (outdoor) dengan kabel kedap air (underground) yang aman dari hujan.",
    estimatedPrice: "Mulai Rp 150.000",
    iconName: "Sun"
  },
  {
    id: "kabel_putus",
    title: "Perbaikan Kabel Putus",
    description: "Penyambungan dan isolasi kabel yang putus digigit tikus atau akibat usia kabel di plafon rumah.",
    estimatedPrice: "Mulai Rp 80.000",
    iconName: "Scissors"
  },
  {
    id: "lampu_led",
    title: "Pasang Lampu LED Strip",
    description: "Pemasangan dekoratif lampu LED strip tersembunyi (hidden lighting) untuk plafon, lemari dapur, atau backdrop TV.",
    estimatedPrice: "Mulai Rp 90.000",
    iconName: "Sparkles"
  },
  {
    id: "exhaust_fan",
    title: "Pasang Exhaust Fan",
    description: "Instalasi exhaust fan dinding atau plafon untuk sirkulasi udara kamar mandi, kamar tidur, atau dapur.",
    estimatedPrice: "Mulai Rp 100.000 / unit",
    iconName: "Wind"
  },
  {
    id: "panel_sederhana",
    title: "Perbaikan Panel Sederhana",
    description: "Perbaikan, perakitan, dan pembersihan panel distribusi listrik 1 phase atau 3 phase untuk usaha mikro/ruko.",
    estimatedPrice: "Mulai Rp 250.000",
    iconName: "Layers"
  },
  {
    id: "instalasi_baru",
    title: "Instalasi Rumah Baru",
    description: "Pemasangan instalasi listrik menyeluruh untuk rumah baru, renovasi, kontrakan, kos-kosan, atau ruko.",
    estimatedPrice: "Hubungi untuk Estimasi/Survey",
    iconName: "Home"
  }
];

export interface BenefitItem {
  title: string;
  description: string;
  iconName: string;
}

export const BENEFITS: BenefitItem[] = [
  {
    title: "Datang Cepat",
    description: "Tim kami siap meluncur ke lokasi Anda di wilayah Surabaya secara tepat waktu sesuai jadwal.",
    iconName: "Zap"
  },
  {
    title: "Harga Transparan",
    description: "Estimasi biaya diinformasikan di awal sebelum pengerjaan. Bebas dari biaya siluman atau tambahan sepihak.",
    iconName: "Receipt"
  },
  {
    title: "Pengerjaan Rapi",
    description: "Kabel dirapikan menggunakan ducting/pipa khusus, penyambungan aman, standar keselamatan tinggi.",
    iconName: "CheckSquare"
  },
  {
    title: "Berpengalaman",
    description: "Tukang listrik kami memiliki jam terbang tinggi menangani ribuan kasus kelistrikan rumah dan ruko.",
    iconName: "Award"
  },
  {
    title: "Bisa Panggilan Rumah",
    description: "Anda tidak perlu repot, cukup tunggu di rumah. Tukang kami membawa peralatan lengkap ke pintu Anda.",
    iconName: "MapPin"
  },
  {
    title: "Konsultasi Gratis",
    description: "Tanyakan masalah listrik Anda lewat WhatsApp. Kami berikan saran solusi terbaik tanpa biaya.",
    iconName: "MessageCircle"
  }
];

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export const STEPS: StepItem[] = [
  {
    number: 1,
    title: "Hubungi WhatsApp",
    description: "Klik tombol chat untuk terhubung langsung dengan tukang listrik kami."
  },
  {
    number: 2,
    title: "Jelaskan Masalah",
    description: "Ceritakan kendala listrik atau jenis instalasi yang Anda butuhkan (bisa kirim foto/video)."
  },
  {
    number: 3,
    title: "Survey / Estimasi",
    description: "Kami memberikan estimasi biaya awal atau menjadwalkan survey lokasi jika masalahnya kompleks."
  },
  {
    number: 4,
    title: "Persetujuan Biaya",
    description: "Pengerjaan baru akan dimulai setelah Anda menyetujui rincian biaya yang kami tawarkan."
  },
  {
    number: 5,
    title: "Pengerjaan Profesional",
    description: "Tukang kami bekerja dengan standar keamanan tinggi, rapi, dan cepat di lokasi Anda."
  },
  {
    number: 6,
    title: "Selesai & Bergaransi",
    description: "Listrik dites bersama untuk memastikan aman. Kami memberikan garansi hasil pengerjaan."
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imgSrc: string;
  desc: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Pemasangan Lampu Rumah",
    category: "Pencahayaan",
    imgSrc: lampuImage,
    desc: "Pemasangan lampu plafon modern untuk ruang keluarga dengan pencahayaan hangat dan rapi."
  },
  {
    id: "g2",
    title: "Perbaikan Stop Kontak",
    category: "Perbaikan",
    imgSrc: stopKontakImage,
    desc: "Proses penggantian stop kontak dinding yang rusak demi keamanan anak dan keluarga."
  },
  {
    id: "g3",
    title: "Instalasi MCB Panel",
    category: "Keamanan",
    imgSrc: mcbImage,
    desc: "Pemasangan pengaman MCB baru pada box panel rumah untuk mencegah risiko kebakaran akibat korsleting."
  },
  {
    id: "g4",
    title: "Pemasangan Kabel Plafon",
    category: "Instalasi",
    imgSrc: kabelImage,
    desc: "Penarikan jalur kabel baru di dalam plafon rumah menggunakan pipa pelindung berstandar SNI."
  },
  {
    id: "g5",
    title: "Pemeriksaan Tegangan Listrik",
    category: "Pemeriksaan",
    imgSrc: checkImage,
    desc: "Pengecekan stabilitas tegangan listrik dan kualitas grounding rumah menggunakan multimeter digital."
  },
  {
    id: "g6",
    title: "Pelayanan di Toko & Ruko",
    category: "Komersial",
    imgSrc: rukoImage,
    desc: "Tukang ramah yang siap melayani kebutuhan instalasi dan penataan listrik di ruko, toko, serta ruko UMKM."
  }
];

export interface TestimonialItem {
  name: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  case: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Budi Santoso",
    location: "Rungkut, Surabaya",
    role: "Pemilik Rumah Tinggal",
    text: "Sangat puas! Kemarin listrik rumah tiba-tiba padam sebelah padahal MCB utama on. Hubungi masnya langsung datang 30 menit kemudian. Ternyata ada kabel digigit tikus di atas plafon. Langsung diganti dan dibungkus pipa pelindung. Harganya sangat bersahabat!",
    rating: 5,
    case: "Kabel Plafon Putus"
  },
  {
    name: "Ibu Hajah Aminah",
    location: "Kutisari, Surabaya",
    role: "Pengelola Kos-kosan",
    text: "Saya punya kos-kosan 10 kamar, sering sekali MCB jeglek kalau anak-anak kos nyalakan AC barengan. Mas tukang ke sini menyarankan pembagian phase baru dan ganti MCB utama yang sudah berumur. Sekarang aman lancar jaya, kosan jadi tenang tidak sering mati lampu lagi.",
    rating: 5,
    case: "Pembagian Jalur Listrik & MCB"
  },
  {
    name: "Hendra Wijaya",
    location: "Kertajaya, Surabaya",
    role: "Pemilik Depot Makan UMKM",
    text: "Sangat profesional. Lampu sorot papan nama depot mati dan stop kontak dapur meleleh karena beban cooker. Pengerjaannya cepat sekali, rapi, dan dicolok berkali-kali sudah tidak panas lagi. Recommended buat pemilik usaha kuliner di Surabaya.",
    rating: 5,
    case: "Stop Kontak Meleleh & Lampu Sorot"
  },
  {
    name: "Siti Rahma",
    location: "Darmo, Surabaya",
    role: "Pemilik Rumah Minimalis",
    text: "Baru selesai renovasi ruang tamu dan ingin pasang lampu gantung hias serta LED strip di drop ceiling. Bingung cari tukang, akhirnya ketemu jasa ini. Hasil kerjanya estetik sekali, kabel tidak kelihatan sama sekali, pengerjaan bersih dan sopan.",
    rating: 5,
    case: "Pasang Lampu Hias & LED Strip"
  },
  {
    name: "Rian Prasetya",
    location: "Manukan, Surabaya",
    role: "Pemilik Ruko Laundry",
    text: "Penyelamat! Mesin laundry sering mati sendiri padahal daya cukup, ternyata ada instalasi grounding yang bermasalah di panel belakang. Teknisi datang malam-malam, diperiksa teliti, dan langsung beres dalam sejam. Kerja jadi tidak terganggu.",
    rating: 5,
    case: "Perbaikan Grounding Panel"
  },
  {
    name: "Lilik Indah",
    location: "Simomulyo, Surabaya",
    role: "Kontrakan & Ruko UMKM",
    text: "Harga sangat jujur. Dari awal dikasih tahu estimasi harganya, tidak dimarkup macam-macam saat di lokasi. Tukangnya juga menjelaskan kerusakan dengan detail jadi kita sebagai orang awam paham. Sangat recommended dan tepercaya!",
    rating: 5,
    case: "Ganti Saklar & Fitting Lampu"
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Apakah bisa menerima panggilan darurat malam hari?",
    answer: "Ya, kami melayani panggilan darurat 24 jam untuk kasus berbahaya seperti korsleting listrik yang mengeluarkan percikan api, bau terbakar menyengat, atau padam total darurat. Silakan hubungi kami segera via WhatsApp."
  },
  {
    question: "Apakah ada biaya survey lokasi?",
    answer: "Untuk konsultasi online via WhatsApp sepenuhnya GRATIS. Jika diperlukan kunjungan survey langsung ke lokasi untuk proyek besar (seperti instalasi rumah baru atau ruko besar), kami mengenakan biaya survey yang sangat terjangkau, dan biaya survey tersebut akan dipotong langsung jika Anda jadi mengambil jasa instalasi dari kami."
  },
  {
    question: "Apakah melayani perbaikan listrik untuk rumah tinggal?",
    answer: "Tentu saja. Kami melayani semua segmen rumah tangga, mulai dari perumahan sederhana, kontrakan, kamar kos, hingga rumah tinggal mewah di seluruh area Surabaya."
  },
  {
    question: "Apakah melayani tempat usaha seperti ruko, toko, atau kantor?",
    answer: "Ya. Kami berpengalaman menangani instalasi listrik komersial skala kecil hingga menengah seperti ruko, toko kelontong, butik, depot/warung makan, kantor kecil, studio foto, hingga ruko laundry."
  },
  {
    question: "Apakah bisa mengerjakan instalasi dari nol untuk bangunan baru?",
    answer: "Bisa. Kami melayani rancang bangun instalasi listrik dari nol, mulai dari penarikan kabel utama, pembagian group MCB, hingga pemasangan titik saklar, stop kontak, dan lampu di seluruh ruangan."
  },
  {
    question: "Berapa lama garansi hasil pengerjaan?",
    answer: "Kami memberikan garansi hasil pengerjaan selama 14 s/d 30 hari (tergantung jenis pekerjaan) untuk memastikan instalasi yang kami kerjakan benar-benar aman dan berfungsi optimal tanpa kendala berulang."
  }
];

export const HERO_IMAGE_SRC = heroImage;
