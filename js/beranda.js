/* =========================================================
   RUBAKI · js/beranda.js (halaman Beranda)
   Isi: buku favorit, lanjut membaca, agenda singkat, carousel hero.
   Fungsi umum (kartuBuku, kartuAgenda, state, dst.) ada di js/main.js.
   ========================================================= */

function renderBeranda() {
  $("#homeBooks").innerHTML = BUKU.filter((b) => b.favorit).slice(0, 3).map(kartuBuku).join("");
  renderAgendaMini();
  renderLanjutBaca();
}

function renderLanjutBaca() {
  const b = cariBuku(state.terakhir);
  const teks = $("#resumeText"), tombol = $("#resumeBtn"), sampul = $("#resumeCover");
  if (!b) { sampul.innerHTML = sampulSVG("kancil", "Petualangan Si Kancil"); return; }
  const hal = Math.min(state.progres[b.id] ?? 0, b.halaman.length - 1);
  teks.textContent = `${b.judul}, halaman ${hal + 1} dari ${b.halaman.length}. Yuk lanjutkan!`;
  tombol.textContent = "Lanjut Membaca";
  tombol.href = linkBaca(b.id);
  sampul.innerHTML = sampulSVG(b.id, b.judul);
}

function renderAgendaMini() {
  const { mendatang } = urutAgenda();
  const box = $("#homeAgenda");
  if (!mendatang.length) {
    box.innerHTML = `<div class="empty">${ilustrasiKalender}
      <p class="empty__title">Belum ada agenda untuk saat ini~</p>
      <p class="empty__text">Kegiatan baru akan muncul di sini.</p>
      <a class="pill-link" href="agenda.html">Buka halaman agenda</a></div>`;
    return;
  }
  box.innerHTML = mendatang.slice(0, 2).map((a) => kartuAgenda(a)).join("") +
    `<a class="pill-link link-all" href="agenda.html">Semua agenda (${mendatang.length})</a>`;
}

/* ---------- Carousel hero ---------- */
const carousel = (() => {
  const slides = $$(".slide");
  const dots = $$(".dot");
  const kurangiGerak = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0, timer = null, ditahan = false;

  function ke(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => { s.hidden = n !== idx; s.classList.toggle("is-active", n === idx); });
    dots.forEach((d, n) => { d.classList.toggle("is-active", n === idx); d.setAttribute("aria-selected", n === idx); });
  }
  function jalan() {
    clearInterval(timer);
    if (!kurangiGerak && !ditahan) timer = setInterval(() => ke(idx + 1), 6000);
  }

  dots.forEach((d) => d.addEventListener("click", () => { ke(+d.dataset.go); jalan(); }));
  const hero = $("#hero");
  hero.addEventListener("mouseenter", () => { ditahan = true; jalan(); });
  hero.addEventListener("mouseleave", () => { ditahan = false; jalan(); });
  hero.addEventListener("focusin", () => { ditahan = true; jalan(); });
  hero.addEventListener("focusout", () => { ditahan = false; jalan(); });

  /* geser di layar sentuh */
  let x0 = null;
  hero.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { ke(idx + (dx < 0 ? 1 : -1)); jalan(); }
    x0 = null;
  }, { passive: true });

  return { mulai: jalan, henti: () => clearInterval(timer) };
})();

RUBAKI.saatFavoritBerubah = renderBeranda;
renderBeranda();
carousel.mulai();
