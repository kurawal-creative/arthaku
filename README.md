# Arthaku

Smart financial tracking via chat-style workflow and insight-focused dashboard.

## Overview

Arthaku adalah aplikasi pencatatan keuangan yang berfokus pada kemudahan input dan kejelasan insight.

Konsep utama produk:

- Input terasa natural seperti chat.
- Data diproses menjadi kategori dan ringkasan keuangan.
- Website menjadi pusat visualisasi, analitik, dan monitoring progres.

## Product Goal

Arthaku dibangun untuk:

- Menyederhanakan pencatatan pemasukan, pengeluaran, dan tabungan.
- Meningkatkan konsistensi user dalam mencatat transaksi.
- Menyajikan insight yang mudah dipahami, bukan sekadar daftar data.
- Menggabungkan kemudahan input cepat dengan dashboard analitik.

## Current Architecture (Product Concept)

### 1. Input Layer (Chat-Based)

Pengguna mencatat transaksi melalui channel chat seperti WhatsApp/Telegram.

Contoh input:

```text
makan 25 ribu
gaji 5 juta
nabung 1 juta
```

### 2. Processing Layer

Target proses sistem:

- Parsing natural language Bahasa Indonesia.
- Identifikasi nominal.
- Klasifikasi jenis transaksi (pemasukan/pengeluaran/tabungan).
- Kategorisasi otomatis.
- Penyimpanan ke database.

### 3. Output Layer (Web Dashboard)

Data ditampilkan sebagai:

- Statistik keuangan.
- Grafik pemasukan vs pengeluaran.
- Progress target tabungan.
- Insight dan rekomendasi.

## Feature Audit (Based on Current Codebase)

Catatan: tabel ini adalah audit implementasi aktual pada repository saat ini, bukan rencana produk.

| Feature | Status | Kondisi Saat Ini |
| --- | --- | --- |
| Auth (Email/Password) | Implemented | Halaman login/sign-up aktif, terhubung `better-auth`, route dashboard diproteksi di `hooks.server.ts`. |
| Auth Google | Implemented | Tombol OAuth Google sudah ada di login/sign-up menggunakan `authClient.signIn.social`. |
| Dashboard Overview | Implemented (UI/Data mock) | Halaman dashboard utama menampilkan stats, chart, history, insight cards dari data statis komponen. |
| Transactions Module | Implemented (Local state) | Filter/search/ringkasan transaksi berjalan di client dengan dataset lokal. |
| Target Tabungan | Implemented (UI/Data mock) | Tabel target + ringkasan tersedia dengan data hardcoded. |
| Analytics | Implemented (UI/Data mock) | Grafik dan ringkasan analitik tersedia dengan data contoh. |
| Insight Page | Implemented (UI/Data mock) | Money score, insight list, recommendation tersedia. |
| Activity Timeline | Implemented (UI/Data mock) | Timeline aktivitas tersedia, saat ini berbasis data statis. |
| Integrations UI (WA/Telegram) | Partial | UI connect/disconnect sudah ada, masih toggle state lokal (belum API integrasi nyata). |
| Bot Settings UI | Implemented (UI-only) | Pengaturan auto kategori + tipe default tersedia, belum dipersist ke backend. |
| CSV/Excel Import | Partial | Validasi file dan simulasi upload sudah ada, belum kirim ke backend/storage nyata. |
| Docs + Aside Navigation | Implemented | Konten docs terhubung ke aside, active state dinamis, smooth scroll saat klik TOC. |
| Chat Bot Runtime (WA/Telegram backend) | Planned | Belum ada endpoint/service bot runtime di repo saat ini. |
| NLP Parsing Transaksi | Planned | Belum ada modul parser NLP transaksi pada backend saat ini. |
| Insight Engine Otomatis (AI/Rule engine) | Planned | Insight saat ini masih berbasis konten statis/mock UI. |

## What Arthaku Is Right Now

Secara implementasi saat ini, Arthaku adalah:

- Web app SvelteKit dengan autentikasi yang sudah berjalan.
- Dashboard keuangan yang sudah cukup lengkap dari sisi UI/UX.
- Fondasi kuat untuk produk chat-based finance.
- Belum lengkap pada layer backend bot, NLP, dan sinkronisasi data real-time.

## User Flow (Target Experience)

1. User mengirim pesan transaksi lewat chat.
2. Bot memproses dan mencatat data.
3. Sistem mengupdate statistik, target, dan insight.
4. User membuka dashboard untuk monitoring.

## Design Principles

- Frictionless input.
- Insight-driven UX.
- Lightweight and readable interface.
- Consistency over complexity.

## Target Users

- Mahasiswa
- Freelancer
- Pekerja muda
- Pengguna yang ingin catat keuangan tanpa proses rumit

## Current Tech Stack (Implemented)

- Frontend: Svelte 5 + SvelteKit
- UI: Tailwind CSS + shadcn-svelte + bits-ui
- Auth: better-auth
- ORM: Prisma
- Database provider (current): MongoDB
- Charting: d3 + layerchart

## Development Status

Status produk saat ini:

`Active Development`

Fokus berikutnya agar sesuai visi penuh chat-based financial tracking:

- Integrasi backend WhatsApp/Telegram yang real.
- Pipeline parsing transaksi bahasa natural Indonesia.
- Persistensi data transaksi/target/insight dari backend nyata.
- Insight engine yang lebih cerdas (rule/AI-assisted).

## Run Locally

```sh
pnpm install
pnpm dev
```

Perintah penting:

```sh
pnpm check
pnpm build
pnpm preview
```

## Team Note

Dokumen ini dimaksudkan sebagai referensi bersama untuk developer, designer, dan product owner agar semua pengembangan tetap selaras dengan visi:

chat-based financial tracking + insight-driven system.
