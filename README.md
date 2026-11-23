# RUBAKI (Ruang Baca Kita)

Website open library bacaan anak, mini project Jaringan Komputer dan Desain Web, Tim 1.

Lihat web-nya di link GitHub Pages (ada di bagian About sebelah kanan).

## Pembagian file

Satu orang cuma mengubah file bagiannya sendiri, biar nggak saling timpa.

| Bagian | File yang boleh diubah |
|---|---|
| Beranda | `index.html`, `css/beranda.css`, `js/beranda.js` |
| Katalog dan Pencarian | `koleksi.html`, `css/koleksi.css`, `js/koleksi.js` |
| Detail Koleksi (halaman baca) | `detail.html`, `css/detail.css`, `js/detail.js` |
| Panduan, Kontributor, Agenda, Tentang | `panduan.html`, `kontributor.html`, `agenda.html`, `tentang.html` beserta CSS dan JS-nya |
| Data Buku, Sampul, dan Agenda | `data/buku.js`, `data/agenda.js`, `img/sampul/` |
| CSS Global (Hanifa) | `css/style.css`, `js/main.js`, `DESIGN.md` |

Navbar, footer, dialog detail buku, dan dialog pencarian di tiap halaman udah jadi, jangan diubah. Bagian yang boleh kamu ubah ada di dalam `<main>`, ditandai komentar `ISI HALAMAN`.

Fungsi umum (kartu buku, favorit, dialog detail, pencarian, toast) ada di `js/main.js`. Script halaman kamu tinggal memakainya. Halaman baca dibuka lewat `detail.html?id=<id buku>`, misalnya `detail.html?id=kancil`.

## Cara ngerjain

1. Buka file halaman kamu di repo ini, salin isinya
2. Buka chat AI, lampirin `css/style.css` dan `js/main.js`, tempel isi file halaman kamu (warna dan komponen terbaru ada di `css/style.css`)
3. Minta AI ngisi bagian `<main>` sesuai tugas kamu, tanpa ngubah navbar, footer, dan bagian `<head>`
4. Download hasilnya, terus upload ke repo ini (Add file, Upload files) dengan nama file yang sama persis

## Cara ngetes di laptop

Download repo (Code, Download ZIP), ekstrak, lalu buka `index.html` di browser.
