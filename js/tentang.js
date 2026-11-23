/* =========================================================
   RUBAKI · js/tentang.js (halaman Tentang)
   Isi: status jam buka hari ini.
   ========================================================= */

function cekJamBuka() {
  const now = new Date();
  const hari = now.getDay();                 // 0 Minggu ... 6 Sabtu
  const menit = now.getHours() * 60 + now.getMinutes();
  let buka = false, info = "";
  if (hari >= 1 && hari <= 5) { buka = menit >= 780 && menit < 1020; info = buka ? "tutup pukul 17.00" : "jam buka 13.00 – 17.00"; }
  else if (hari === 6) { buka = menit >= 540 && menit < 900; info = buka ? "tutup pukul 15.00" : "jam buka 09.00 – 15.00"; }
  else info = "buka lagi Senin pukul 13.00";
  const el = $("#openStatus");
  el.className = "status " + (buka ? "status--open" : "status--closed");
  el.textContent = (buka ? "Sedang buka sekarang, " : "Sedang tutup sekarang, ") + info + ".";
}

cekJamBuka();
