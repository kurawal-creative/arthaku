export type DocsItem = {
  id: string;
  label: string;
  paragraphs: string[];
};

export type DocsGroup = {
  title: string;
  items: DocsItem[];
};

export const docsGroups: DocsGroup[] = [
  {
    title: "Introduction",
    items: [
      {
        id: "about",
        label: "Apa itu Arthaku?",
        paragraphs: ["Arthaku adalah platform pencatatan keuangan pribadi yang membantu kamu mencatat pemasukan, pengeluaran, dan progres tabungan dengan cara yang sederhana.", "Dokumentasi ini menjelaskan alur dasar pemakaian fitur agar kamu bisa mulai lebih cepat tanpa kebingungan."],
      },
      {
        id: "how-it-works",
        label: "Cara kerja",
        paragraphs: ["Arthaku menggabungkan pencatatan manual di dashboard dengan input cepat melalui chat bot.", "Semua data yang kamu input akan dirangkum dalam statistik dan insight agar keputusan keuangan lebih terarah."],
      },
    ],
  },
  {
    title: "Getting Started",
    items: [
      {
        id: "create-account",
        label: "Buat akun",
        paragraphs: ["Mulai dari membuat akun dan melengkapi profil dasar agar sistem bisa menyesuaikan pengalaman kamu."],
      },
      {
        id: "connect-whatsapp",
        label: "Hubungkan WhatsApp",
        paragraphs: ["Setelah akun siap, hubungkan WhatsApp untuk mencatat transaksi langsung lewat chat."],
      },
    ],
  },
  {
    title: "Cara Pakai",
    items: [
      {
        id: "input-transaksi",
        label: "Catat pemasukan & pengeluaran",
        paragraphs: ["Kamu bisa input transaksi dari dashboard atau lewat bot, lalu sistem akan menyusunnya ke riwayat transaksi."],
      },
      {
        id: "saving",
        label: "Menabung via chat",
        paragraphs: ["Gunakan format chat sederhana untuk menambahkan tabungan ke target tertentu secara cepat."],
      },
      {
        id: "examples",
        label: "Contoh chat",
        paragraphs: ["Contoh: 'pengeluaran makan 25000' atau 'tabungan laptop 100000'. Bot akan membaca intent dan menyimpan datanya."],
      },
    ],
  },
  {
    title: "Dashboard",
    items: [
      {
        id: "stats",
        label: "Melihat statistik",
        paragraphs: ["Dashboard menampilkan ringkasan pemasukan, pengeluaran, dan tren periode tertentu."],
      },
      {
        id: "target",
        label: "Target tabungan",
        paragraphs: ["Buat target tabungan dan pantau progres untuk menjaga konsistensi finansial."],
      },
      {
        id: "insight",
        label: "Insight keuangan",
        paragraphs: ["Insight otomatis membantu melihat pola pengeluaran agar kamu tahu area yang bisa dioptimalkan."],
      },
    ],
  },
  {
    title: "Integrations",
    items: [
      {
        id: "wa",
        label: "WhatsApp",
        paragraphs: ["Integrasi WhatsApp memungkinkan input cepat dan notifikasi langsung dari kanal yang familiar."],
      },
      {
        id: "telegram",
        label: "Telegram",
        paragraphs: ["Telegram tersedia sebagai alternatif channel input dengan alur yang sama seperti WhatsApp."],
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        id: "faq",
        label: "FAQ",
        paragraphs: ["Bagian ini merangkum pertanyaan yang paling sering ditanyakan untuk troubleshooting cepat."],
      },
      {
        id: "contact",
        label: "Kontak",
        paragraphs: ["Jika butuh bantuan lanjutan, hubungi tim support melalui kanal resmi yang tersedia di aplikasi."],
      },
    ],
  },
];
