/* =========================================================
   RUBAKI · js/koleksi.js (halaman Koleksi)
   Isi: cari, filter kategori, urutkan, grid buku.
   Bisa dibuka dengan filter langsung, misalnya koleksi.html?kategori=sains
   ========================================================= */

const kol = {
  filter: new URLSearchParams(location.search).get("kategori") || "semua",
  cari: "",
  urut: "judul"
};
if (kol.filter !== "favorit" && kol.filter !== "semua" && !KATEGORI[kol.filter]) kol.filter = "semua";

function renderChips() {
  const daftar = [["semua", "Semua"], ...Object.entries(KATEGORI).map(([k, v]) => [k, v.label]), ["favorit", "Favoritku"]];
  $("#kolChips").innerHTML = daftar.map(([k, label]) =>
    `<button type="button" data-cat="${k}" aria-pressed="${kol.filter === k}">${label}</button>`).join("");
}

function renderKoleksi() {
  renderChips();
  const q = kol.cari.trim().toLowerCase();
  const hasil = BUKU.filter((b) => {
    if (kol.filter === "favorit" && !state.favorit.has(b.id)) return false;
    if (!["semua", "favorit"].includes(kol.filter) && b.kategori !== kol.filter) return false;
    if (!q) return true;
    return (b.judul + " " + b.sinopsis + " " + b.halaman.join(" ")).toLowerCase().includes(q);
  });

  hasil.sort((a, b) => {
    if (kol.urut === "umur") return a.umur - b.umur || a.judul.localeCompare(b.judul);
    if (kol.urut === "fav") return (state.favorit.has(b.id) - state.favorit.has(a.id)) || a.judul.localeCompare(b.judul);
    return a.judul.localeCompare(b.judul, "id");
  });

  $("#kolCount").textContent = hasil.length ? `Menampilkan ${hasil.length} buku` : "";
  $("#kolGrid").innerHTML = hasil.length
    ? hasil.map(kartuBuku).join("")
    : `<div class="empty" style="grid-column:1/-1">
         <svg viewBox="0 0 220 220" aria-hidden="true"><use href="#fox"/></svg>
         <p class="empty__title">${kol.filter === "favorit" && !q ? "Belum ada buku favorit" : "Bukunya belum ketemu"}</p>
         <p class="empty__text">${kol.filter === "favorit" && !q
           ? "Tekan tombol hati di pojok bawah sampul untuk menyimpan buku ke sini."
           : "Coba kata lain atau pilih kategori Semua."}</p>
         <button type="button" class="btn btn--soft" data-reset>Tampilkan semua buku</button>
       </div>`;
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.cat) { kol.filter = t.dataset.cat; renderKoleksi(); }
  else if (t.hasAttribute("data-reset")) { kol.filter = "semua"; kol.cari = ""; $("#kolSearch").value = ""; renderKoleksi(); }
});

$("#kolSearch").addEventListener("input", (e) => { kol.cari = e.target.value; renderKoleksi(); });
$("#kolSort").addEventListener("change", (e) => { kol.urut = e.target.value; renderKoleksi(); });

RUBAKI.saatFavoritBerubah = renderKoleksi;
renderKoleksi();
