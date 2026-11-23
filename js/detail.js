/* =========================================================
   RUBAKI · js/detail.js (halaman Membaca)
   Dibuka lewat detail.html?id=<id buku>, misalnya detail.html?id=kancil
   Isi: tampilkan buku per halaman, simpan posisi baca, ukuran huruf.
   ========================================================= */

const idBuku = new URLSearchParams(location.search).get("id");
const bukuIni = cariBuku(idBuku);
let ukuranHuruf = simpan.ambil("ukuran", 1.3);
let baca = { hal: 0 };

if (!bukuIni) {
  location.replace("koleksi.html");
} else {
  const tersimpan = state.progres[bukuIni.id] ?? 0;
  baca.hal = tersimpan >= bukuIni.halaman.length ? 0 : tersimpan;
  state.terakhir = bukuIni.id;
  simpan.taruh("terakhir", bukuIni.id);

  document.title = bukuIni.judul + " · RUBAKI";
  $("#rdArt").innerHTML = sampulSVG(bukuIni.id, bukuIni.judul);
  $("#rdMeta").textContent = KATEGORI[bukuIni.kategori].label;
  $("#rd-title").textContent = bukuIni.judul;
  aturUkuran(ukuranHuruf);
  gambarHalaman();
}

function gambarHalaman() {
  const b = bukuIni;
  const total = b.halaman.length;
  const selesai = baca.hal >= total;

  $("#rdText").innerHTML = selesai
    ? `<div class="reader__done">
         <p><strong>Tamat!</strong> Kamu sudah membaca ${esc(b.judul)} sampai habis.</p>
         <div class="bm__actions">
           <button type="button" class="btn btn--soft" id="rdAgain">Baca dari awal</button>
           <a class="btn btn--primary" href="koleksi.html">Pilih buku lain</a>
         </div>
       </div>`
    : `<p>${esc(b.halaman[baca.hal])}</p>`;

  $("#rdPage").textContent = selesai ? `Selesai · ${total} halaman` : `Halaman ${baca.hal + 1} dari ${total}`;
  $("#rdBar").style.width = `${(Math.min(baca.hal + 1, total) / total) * 100}%`;
  $("#rdPrev").disabled = baca.hal === 0;
  $("#rdNext").disabled = selesai;
  $("#rdNext").firstChild.textContent = baca.hal === total - 1 ? "Selesai" : "Berikutnya";

  state.progres[b.id] = baca.hal;
  simpan.taruh("progres", state.progres);

  const lagi = $("#rdAgain");
  if (lagi) lagi.addEventListener("click", () => { baca.hal = 0; gambarHalaman(); });
}

function geserHalaman(arah) {
  const baru = baca.hal + arah;
  if (baru < 0 || baru > bukuIni.halaman.length) return;
  baca.hal = baru;
  gambarHalaman();
}

function aturUkuran(n) {
  ukuranHuruf = Math.min(1.9, Math.max(1, Math.round(n * 10) / 10));
  simpan.taruh("ukuran", ukuranHuruf);
  $("#rdText").style.setProperty("--reader-size", ukuranHuruf + "rem");
  $("#fontDown").disabled = ukuranHuruf <= 1;
  $("#fontUp").disabled = ukuranHuruf >= 1.9;
}

$("#rdPrev").addEventListener("click", () => geserHalaman(-1));
$("#rdNext").addEventListener("click", () => geserHalaman(1));
$("#fontDown").addEventListener("click", () => aturUkuran(ukuranHuruf - 0.1));
$("#fontUp").addEventListener("click", () => aturUkuran(ukuranHuruf + 0.1));

document.addEventListener("keydown", (e) => {
  if (!bukuIni || document.querySelector("dialog[open]")) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
  if (e.key === "ArrowRight") geserHalaman(1);
  if (e.key === "ArrowLeft") geserHalaman(-1);
});
