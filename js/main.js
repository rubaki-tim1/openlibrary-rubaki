/* =========================================================
   RUBAKI · js/main.js (dipakai semua halaman, punya CSS Global)
   Isi: penyimpanan lokal, toast, kartu buku, favorit,
   dialog detail buku, agenda bersama, pencarian, tombol ke atas.
   Script halaman (beranda.js, koleksi.js, dst.) dimuat sesudah file ini,
   jadi semua fungsi di sini bisa langsung dipakai di sana.
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Penyimpanan lokal (aman kalau browser menolak) ---------- */
const simpan = {
  ambil(key, cadangan) {
    try {
      const v = localStorage.getItem("rubaki-" + key);
      return v === null ? cadangan : JSON.parse(v);
    } catch { return cadangan; }
  },
  taruh(key, nilai) {
    try { localStorage.setItem("rubaki-" + key, JSON.stringify(nilai)); } catch { /* mode privat, abaikan */ }
  }
};

const state = {
  favorit: new Set(simpan.ambil("favorit", [])),
  progres: simpan.ambil("progres", {}),        // { idBuku: indeksHalaman }
  terakhir: simpan.ambil("terakhir", null),    // id buku terakhir dibaca
  agenda: simpan.ambil("agenda", null) || agendaAwal()
};
simpan.taruh("agenda", state.agenda);

const cariBuku = (id) => BUKU.find((b) => b.id === id);
const hariIni = () => tanggalLokal(new Date());
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const linkBaca = (id) => "detail.html?id=" + encodeURIComponent(id);

/* Halaman bisa mendaftarkan fungsi gambar ulang di sini.
   Dipanggil setiap kali favorit berubah, misalnya supaya ikon hati di grid ikut berganti. */
const RUBAKI = { saatFavoritBerubah: null };

/* ---------- Toast ---------- */
let toastTimer;
function toast(pesan) {
  const el = $("#toast");
  el.textContent = pesan;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2600);
}

/* =========================================================
   Kartu buku (dipakai Beranda dan Koleksi)
   ========================================================= */
function kartuBuku(b) {
  const kat = KATEGORI[b.kategori];
  const fav = state.favorit.has(b.id);
  const hal = state.progres[b.id];
  const progres = hal !== undefined
    ? `<p class="progress-tag">${hal >= b.halaman.length ? "Sudah selesai dibaca" : `Lanjut di halaman ${hal + 1}`}</p>`
    : "";
  return `
    <article class="book">
      <div class="book__media">
        <button type="button" class="book__cover" data-detail="${b.id}" aria-label="Lihat detail ${esc(b.judul)}">${sampulSVG(b.id, b.judul)}</button>
        <button type="button" class="fav-btn" data-fav="${b.id}" aria-pressed="${fav}" aria-label="${fav ? "Hapus" : "Simpan"} ${esc(b.judul)} ${fav ? "dari" : "ke"} favorit">
          <svg aria-hidden="true"><use href="#i-heart"/></svg>
        </button>
      </div>
      <h3 class="book__title">${esc(b.judul)}</h3>
      ${progres}
      <div class="book__foot">
        <span class="chip ${kat.cls}">${kat.label}</span>
        <button type="button" class="book__open" data-detail="${b.id}" aria-label="Buka detail ${esc(b.judul)}">
          <svg aria-hidden="true"><use href="#i-arrow"/></svg>
        </button>
      </div>
    </article>`;
}

function toggleFavorit(id) {
  const b = cariBuku(id);
  if (state.favorit.has(id)) { state.favorit.delete(id); toast(`${b.judul} dihapus dari favorit`); }
  else { state.favorit.add(id); toast(`${b.judul} disimpan ke favorit`); }
  simpan.taruh("favorit", [...state.favorit]);
  if (RUBAKI.saatFavoritBerubah) RUBAKI.saatFavoritBerubah();
  sinkronTombolFavModal(id);
}

/* ---------- Detail buku (dialog) ---------- */
const modalBuku = $("#bookModal");
let bukuDibuka = null;

function bukaDetail(id) {
  const b = cariBuku(id);
  if (!b) return;
  bukuDibuka = id;
  const kat = KATEGORI[b.kategori];
  $("#bmCover").innerHTML = sampulSVG(b.id, b.judul);
  $("#bmCat").className = "chip " + kat.cls;
  $("#bmCat").textContent = kat.label;
  $("#bmTitle").textContent = b.judul;
  $("#bmMeta").textContent = `Untuk usia ${b.umur} tahun ke atas · ${b.halaman.length} halaman`;
  $("#bmSyn").textContent = b.sinopsis;
  const hal = state.progres[id];
  $("#bmRead").textContent = hal !== undefined && hal < b.halaman.length ? `Lanjut Halaman ${hal + 1}` : "Baca Sekarang";
  $("#bmRead").href = linkBaca(id);
  sinkronTombolFavModal(id);
  modalBuku.showModal();
}

function sinkronTombolFavModal(id) {
  if (bukuDibuka !== id) return;
  const fav = state.favorit.has(id);
  const btn = $("#bmFav");
  btn.setAttribute("aria-pressed", fav);
  btn.querySelector("span").textContent = fav ? "Tersimpan di favorit" : "Simpan ke favorit";
}

$("#bmFav").addEventListener("click", () => bukuDibuka && toggleFavorit(bukuDibuka));

/* =========================================================
   Agenda bersama (dipakai Beranda, Agenda, dan pencarian)
   ========================================================= */
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function urutAgenda() {
  const h = hariIni();
  const mendatang = state.agenda.filter((a) => a.tanggal >= h).sort((a, b) => (a.tanggal + a.jam).localeCompare(b.tanggal + b.jam));
  const lewat = state.agenda.filter((a) => a.tanggal < h).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  return { mendatang, lewat };
}

function kartuAgenda(a, { bisaHapus = false, lewat = false } = {}) {
  const [y, m, d] = a.tanggal.split("-").map(Number);
  const tgl = new Date(y, m - 1, d);
  const hariNama = tgl.toLocaleDateString("id-ID", { weekday: "long" });
  return `
    <article class="agenda-item ${lewat ? "agenda-item--past" : ""}">
      <div class="date-badge" aria-hidden="true">
        <span class="date-badge__m">${BULAN[m - 1]}</span>
        <span class="date-badge__d">${d}</span>
      </div>
      <div>
        <h3>${esc(a.judul)}</h3>
        <div class="agenda-item__meta">
          <span><svg aria-hidden="true"><use href="#i-cal"/></svg>${hariNama}, ${d} ${BULAN[m - 1]} ${y}</span>
          <span><svg aria-hidden="true"><use href="#i-clock"/></svg>${a.jam.replace(":", ".")} WIB</span>
          <span><svg aria-hidden="true"><use href="#i-pin"/></svg>${esc(a.tempat || "Ruang baca")}</span>
        </div>
        ${a.ket ? `<p class="agenda-item__ket">${esc(a.ket)}</p>` : ""}
        ${bisaHapus ? `<button type="button" class="btn btn--ghost agenda-item__del" data-hapus="${a.id}"><svg aria-hidden="true"><use href="#i-trash"/></svg>Hapus</button>` : ""}
      </div>
    </article>`;
}

const ilustrasiKalender = `
  <svg viewBox="0 0 200 200" aria-hidden="true">
    <path d="M40 150 C20 130 26 100 46 104 C44 124 50 138 60 146Z" fill="#7DB653"/>
    <rect x="44" y="44" width="124" height="116" rx="16" fill="#FFF8EE" stroke="#B5603A" stroke-width="6" transform="rotate(-6 106 102)"/>
    <g transform="rotate(-6 106 102)">
      <rect x="44" y="44" width="124" height="28" rx="14" fill="#E9761A"/>
      <g stroke="#E8D3BC" stroke-width="3"><path d="M44 100h124M44 130h124M86 72v88M128 72v88"/></g>
      <path d="m106 82 8 16 18 2-13 12 3 18-16-9-16 9 3-18-13-12 18-2z" fill="#F5C030" stroke="#C98A00" stroke-width="3" stroke-linejoin="round"/>
    </g>
  </svg>`;

/* =========================================================
   Pencarian cepat (tombol kaca pembesar atau tombol /)
   ========================================================= */
const modalCari = $("#searchModal");
const inputCari = $("#globalSearch");

function tandai(teks, q) {
  const t = esc(teks);
  if (!q) return t;
  const i = teks.toLowerCase().indexOf(q);
  if (i < 0) return t;
  return esc(teks.slice(0, i)) + "<mark>" + esc(teks.slice(i, i + q.length)) + "</mark>" + esc(teks.slice(i + q.length));
}

function renderCari() {
  const q = inputCari.value.trim().toLowerCase();
  const box = $("#searchResults");
  if (!q) {
    box.innerHTML = `<p class="sr-empty">Ketik judul buku, topik seperti <strong>planet</strong>, atau nama kegiatan.</p>`;
    return;
  }
  const buku = BUKU.filter((b) => (b.judul + " " + b.sinopsis + " " + KATEGORI[b.kategori].label).toLowerCase().includes(q));
  const agenda = state.agenda.filter((a) => (a.judul + " " + a.jenis + " " + a.ket).toLowerCase().includes(q));

  if (!buku.length && !agenda.length) {
    box.innerHTML = `<p class="sr-empty">Tidak ada hasil untuk "<strong>${esc(q)}</strong>". Coba kata yang lebih pendek.</p>`;
    return;
  }
  box.innerHTML =
    (buku.length ? `<h3>Buku</h3>` + buku.map((b) => `
      <button type="button" class="sr-item" data-sr-buku="${b.id}">
        <span class="sr-item__thumb" aria-hidden="true">${sampulSVG(b.id, b.judul)}</span>
        <span><span class="sr-item__title">${tandai(b.judul, q)}</span><br><span class="sr-item__sub">${KATEGORI[b.kategori].label} · usia ${b.umur}+</span></span>
      </button>`).join("") : "") +
    (agenda.length ? `<h3>Agenda</h3>` + agenda.map((a) => `
      <a class="sr-item" href="agenda.html">
        <svg width="28" height="28" aria-hidden="true" style="color:#B8540A"><use href="#i-cal"/></svg>
        <span><span class="sr-item__title">${tandai(a.judul, q)}</span><br><span class="sr-item__sub">${a.tanggal.split("-").reverse().join("/")} · ${esc(a.jenis)}</span></span>
      </a>`).join("") : "");
}

function bukaCari() {
  inputCari.value = "";
  renderCari();
  modalCari.showModal();
  inputCari.focus();
}

$("#openSearch").addEventListener("click", bukaCari);
inputCari.addEventListener("input", renderCari);
inputCari.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { const first = $(".sr-item", modalCari); if (first) first.click(); }
  if (e.key === "Escape") { e.preventDefault(); modalCari.close(); }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !document.querySelector("dialog[open]") && !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
    e.preventDefault();
    bukaCari();
  }
});

/* =========================================================
   Klik umum (delegasi), berlaku di semua halaman
   ========================================================= */
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t) return;

  if (t.dataset.fav) toggleFavorit(t.dataset.fav);
  else if (t.dataset.detail) bukaDetail(t.dataset.detail);
  else if (t.hasAttribute("data-close")) t.closest("dialog").close();
  else if (t.dataset.srBuku) { modalCari.close(); bukaDetail(t.dataset.srBuku); }
  else if (t.dataset.social) toast(`Akun ${t.dataset.social} RUBAKI belum ditautkan.`);
});

/* Klik di luar kotak dialog menutup dialog */
$$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));

/* Lewati ke konten */
$(".skip").addEventListener("click", (e) => { e.preventDefault(); $("#main").focus(); });

/* Tombol kembali ke atas */
const keAtas = $("#toTop");
window.addEventListener("scroll", () => keAtas.classList.toggle("is-visible", window.scrollY > 500), { passive: true });
keAtas.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
