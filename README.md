# Math Playground — NgodingAI

Eksplorasi matematika interaktif untuk Seminar Gebyar Matematika (GEMA) 2026, Universitas Indraprasta PGRI.

**Live:** [math.ngoding.ai](https://math.ngoding.ai)

## Playground

| # | Playground | Topik |
|---|-----------|-------|
| 📐 | **Fungsi Kuadrat** | y = ax² + bx + c — diskriminan, akar, titik puncak |
| 📏 | **Fungsi Linear** | y = mx + c — gradien, slope triangle, intercept |
| 🌊 | **Trigonometri** | y = A·sin(Bx + C) + D — amplitudo, frekuensi, fase |
| 🚀 | **Eksponensial & Logaritma** | y = a·bˣ vs y = a·log(x) — pertumbuhan, peluruhan |
| 🎲 | **Lempar Dadu & CLT** | Simulasi Central Limit Theorem — dari distribusi rata ke bell curve |
| 🔍 | **Graph Detective** | Gambar grafik, foto, AI tebak persamaannya (GPT-4o Vision) |

## Fitur

- **100% client-side** — satu file HTML, tanpa framework, tanpa build step
- **Responsive** — works di desktop dan HP
- **Interaktif** — slider, drag, zoom, preset, simulasi real-time
- **Penjelasan teori** — setiap playground punya penjelasan konsep matematika
- **Graph Detective** — integrasi OpenAI GPT-4o Vision untuk analisis gambar grafik

## Deploy (GitHub Pages)

1. Fork/clone repo ini
2. Settings → Pages → Source: Deploy from branch → `main` → `/` (root)
3. Site akan live di `https://<username>.github.io/<repo-name>/`

Untuk custom domain (`math.ngoding.ai`):
1. Settings → Pages → Custom domain → `math.ngoding.ai`
2. Tambahkan CNAME record di DNS: `math.ngoding.ai` → `<username>.github.io`

## Graph Detective — API Key

Graph Detective menggunakan OpenAI GPT-4o Vision. API key diminta via browser prompt saat pertama kali klik "Tebak!" dan disimpan di `sessionStorage` (hilang saat tab ditutup).

Untuk demo live: masukkan API key sebelum audiens datang, key tersimpan selama tab terbuka.

Jika ingin menggunakan backend proxy (agar API key tidak di client):
- File `api/guess.js` tersedia sebagai Vercel Edge Function
- Set environment variable `OPENAI_API_KEY`
- Deploy ke Vercel/Netlify

## Konteks

Materi seminar: **"Pengembangan Kreativitas melalui Pemanfaatan AI dalam Pembelajaran Matematika untuk Meraih Prestasi di Era 5.0"**

Pemateri: **Afif Akbar Iskandar, S.Si., M.Kom.** — AI/ML & Data Science, NgodingAI

## Tech Stack

- HTML + CSS + JavaScript (vanilla, zero dependencies)
- Canvas API untuk grafik
- OpenAI API untuk Graph Detective

## Lisensi

MIT
