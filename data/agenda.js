/* Data agenda RUBAKI. Agenda tambahan dari pengurus disimpan di browser (localStorage). */

/* Tanggal format YYYY-MM-DD menurut jam perangkat (bukan UTC). */
function tanggalLokal(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* Contoh agenda awal. Tanggal dihitung dari hari ini supaya selalu terlihat "akan datang". */
function agendaAwal() {
  const d = (plus) => {
    const t = new Date();
    t.setDate(t.getDate() + plus);
    return tanggalLokal(t);
  };
  return [
    { id: "a1", judul: "Dongeng Sabtu Pagi", tanggal: d(3), jam: "09:00", tempat: "Ruang baca utama", jenis: "Dongeng", ket: "Kak Nana membacakan Timun Mas yang Berani." },
    { id: "a2", judul: "Kelas Sains Kecil: Membuat Hujan di Gelas", tanggal: d(8), jam: "14:00", tempat: "Pojok sains", jenis: "Kelas Sains", ket: "Bawa gelas plastik bening dari rumah." },
    { id: "a3", judul: "Menggambar Maskot Rubah", tanggal: d(-5), jam: "10:00", tempat: "Teras belakang", jenis: "Menggambar", ket: "" }
  ];
}
