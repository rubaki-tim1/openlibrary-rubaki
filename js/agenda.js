/* =========================================================
   RUBAKI · js/agenda.js (halaman Agenda)
   Isi: daftar agenda (akan datang/sudah lewat), tambah dan hapus agenda.
   Agenda baru tersimpan di browser perangkat ini saja.
   ========================================================= */

let tabAgenda = "mendatang";

function renderAgenda() {
  const { mendatang, lewat } = urutAgenda();
  const daftar = tabAgenda === "mendatang" ? mendatang : lewat;
  $$(".tab").forEach((t) => {
    const aktif = t.dataset.tab === tabAgenda;
    t.classList.toggle("is-active", aktif);
    t.setAttribute("aria-selected", aktif);
  });
  $("#agendaList").innerHTML = daftar.length
    ? daftar.map((a) => kartuAgenda(a, { bisaHapus: true, lewat: tabAgenda === "lewat" })).join("")
    : `<div class="empty">${ilustrasiKalender}
        <p class="empty__title">${tabAgenda === "mendatang" ? "Belum ada agenda untuk saat ini~" : "Belum ada agenda yang lewat"}</p>
        <p class="empty__text">${tabAgenda === "mendatang" ? "Tambahkan kegiatan pertama lewat tombol Tambah Agenda." : "Agenda yang sudah lewat tanggalnya akan pindah ke sini."}</p>
       </div>`;
}

$$(".tab").forEach((t) => t.addEventListener("click", () => { tabAgenda = t.dataset.tab; renderAgenda(); }));

/* Formulir tambah agenda */
const modalAgenda = $("#agendaModal");
const formAgenda = $("#agendaForm");

$("#addAgendaBtn").addEventListener("click", () => {
  formAgenda.reset();
  $("#agTanggal").min = hariIni();
  $("#agTanggal").value = hariIni();
  ["#errJudul", "#errTanggal"].forEach((s) => ($(s).textContent = ""));
  ["#agJudul", "#agTanggal"].forEach((s) => $(s).removeAttribute("aria-invalid"));
  modalAgenda.showModal();
  $("#agJudul").focus();
});

formAgenda.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formAgenda));
  let valid = true;

  const salah = (input, err, pesan) => {
    $(err).textContent = pesan;
    $(input).setAttribute("aria-invalid", pesan ? "true" : "false");
    $(input).setAttribute("aria-describedby", err.slice(1));
    if (pesan && valid) $(input).focus();
    if (pesan) valid = false;
  };

  salah("#agJudul", "#errJudul", data.judul.trim().length < 3 ? "Nama kegiatan minimal 3 huruf." : "");
  salah("#agTanggal", "#errTanggal",
    !data.tanggal ? "Pilih tanggal kegiatan." : data.tanggal < hariIni() ? "Tanggal sudah lewat. Pilih hari ini atau sesudahnya." : "");

  if (!valid) return;

  state.agenda.push({
    id: "a" + Date.now(),
    judul: data.judul.trim(),
    tanggal: data.tanggal,
    jam: data.jam || "09:00",
    tempat: data.tempat.trim(),
    jenis: data.jenis,
    ket: data.ket.trim()
  });
  simpan.taruh("agenda", state.agenda);
  modalAgenda.close();
  tabAgenda = "mendatang";
  renderAgenda();
  toast("Agenda tersimpan");
});

function hapusAgenda(id) {
  const a = state.agenda.find((x) => x.id === id);
  state.agenda = state.agenda.filter((x) => x.id !== id);
  simpan.taruh("agenda", state.agenda);
  renderAgenda();
  toast(`Agenda "${a.judul}" dihapus`);
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (t && t.dataset.hapus) hapusAgenda(t.dataset.hapus);
});

renderAgenda();
