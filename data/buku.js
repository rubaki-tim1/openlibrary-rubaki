/* Data koleksi RUBAKI.
   Di proyek akhir, bagian ini bisa diganti dengan data dari server (fetch ke file JSON atau API). */

const KATEGORI = {
  dongeng:      { label: "Dongeng",         cls: "chip--blue" },
  sains:        { label: "Sains",           cls: "chip--green" },
  ensiklopedia: { label: "Ensiklopedia",    cls: "chip--gold" },
  cerita:       { label: "Cerita Bergambar", cls: "chip--rose" }
};

const BUKU = [
  {
    id: "kancil", judul: "Petualangan Si Kancil", kategori: "dongeng", umur: 5, favorit: true,
    sinopsis: "Si Kancil ingin menyeberang sungai yang penuh buaya. Dengan kepala dingin, ia menemukan cara yang cerdik.",
    halaman: [
      "Pada suatu pagi, Si Kancil berjalan ke tepi sungai. Di seberang ada kebun timun yang hijau dan segar. Perutnya keroncongan, tetapi sungainya dalam dan arusnya deras.",
      "Di dalam air, banyak buaya sedang berjemur. Kancil mendapat ide. \"Hai, Buaya! Raja hutan ingin tahu berapa jumlah kalian. Ayo berbaris dari tepi ke tepi supaya aku bisa menghitung!\"",
      "Para buaya pun berbaris rapi. Kancil melompat dari punggung ke punggung sambil berhitung, \"Satu, dua, tiga, empat…\" Hap! Ia sampai di seberang dengan selamat.",
      "Kancil tertawa lega. Hari itu ia belajar bahwa berpikir tenang bisa menolong kita keluar dari masalah. Tapi ingat, membohongi teman tetap bukan hal yang baik, ya."
    ]
  },
  {
    id: "alam", judul: "Mengenal Alam Semesta", kategori: "sains", umur: 7, favorit: true,
    sinopsis: "Kenalan dengan Matahari, planet-planet, dan roket yang membawa manusia menjelajah luar angkasa.",
    halaman: [
      "Matahari adalah bintang yang paling dekat dengan Bumi. Cahayanya membuat siang menjadi terang dan hangat.",
      "Bumi berputar seperti gasing. Saat tempat kita menghadap Matahari, terjadilah siang. Saat membelakanginya, terjadilah malam.",
      "Ada delapan planet yang mengelilingi Matahari. Jupiter yang paling besar, sedangkan Merkurius yang paling dekat dengan Matahari.",
      "Untuk menjelajah luar angkasa, manusia membuat roket. Siapa tahu, suatu hari kamu ikut terbang melihat bintang dari dekat!"
    ]
  },
  {
    id: "hewan", judul: "Dunia Hewan", kategori: "ensiklopedia", umur: 6, favorit: true,
    sinopsis: "Gajah, jerapah, dan zebra punya keunikan masing-masing. Yuk, cari tahu apa saja!",
    halaman: [
      "Gajah adalah hewan darat terbesar. Belalainya bisa dipakai untuk minum, mengambil makanan, bahkan menyapa temannya.",
      "Jerapah punya leher yang sangat panjang. Dengan leher itu, ia bisa memetik daun di pucuk pohon yang tinggi.",
      "Tidak ada dua zebra yang belangnya sama persis. Belang zebra itu unik, seperti sidik jari kita.",
      "Setiap hewan punya cara hidupnya sendiri. Yuk, sayangi hewan dan jaga rumah mereka di alam!"
    ]
  },
  {
    id: "timun", judul: "Timun Mas yang Berani", kategori: "dongeng", umur: 6, favorit: false,
    sinopsis: "Dikejar raksasa, Timun Mas berlari sambil membawa empat bungkusan ajaib dari ibunya.",
    halaman: [
      "Di sebuah desa, hiduplah Mbok Sirni dan anak perempuannya, Timun Mas. Timun Mas lahir dari sebuah timun emas yang besar.",
      "Suatu hari, raksasa datang ingin membawa Timun Mas pergi. Mbok Sirni memberinya empat bungkusan kecil berisi biji timun, jarum, garam, dan terasi.",
      "Timun Mas berlari sekuat tenaga. Setiap kali raksasa mendekat, ia melempar satu bungkusan. Muncullah ladang timun, hutan bambu, lalu lautan luas!",
      "Bungkusan terakhir berubah menjadi lautan lumpur yang menghentikan raksasa. Timun Mas pulang dan memeluk ibunya. Keberaniannya menyelamatkan mereka berdua."
    ]
  },
  {
    id: "hujan", judul: "Dari Mana Datangnya Hujan?", kategori: "sains", umur: 6, favorit: false,
    sinopsis: "Perjalanan setetes air dari kolam, naik ke awan, lalu turun lagi sebagai hujan.",
    halaman: [
      "Saat matahari bersinar, air di laut, sungai, dan kolam pelan-pelan menguap naik ke langit.",
      "Di atas sana udaranya dingin. Uap air berkumpul menjadi titik-titik kecil dan membentuk awan.",
      "Semakin banyak titik air, awan menjadi berat dan gelap. Akhirnya, air jatuh kembali sebagai hujan.",
      "Air hujan mengalir ke sungai dan laut, lalu naik lagi ke langit. Perjalanan ini disebut siklus air, dan terjadi terus-menerus."
    ]
  },
  {
    id: "serangga", judul: "Serangga di Kebun", kategori: "ensiklopedia", umur: 5, favorit: false,
    sinopsis: "Kupu-kupu, lebah, dan semut ternyata punya tugas penting di kebun kita.",
    halaman: [
      "Serangga punya enam kaki dan tubuh yang terbagi tiga, yaitu kepala, dada, dan perut.",
      "Kupu-kupu dulunya ulat. Ulat makan banyak daun, lalu membungkus diri menjadi kepompong, dan keluar sebagai kupu-kupu.",
      "Lebah membantu bunga berbuah dengan membawa serbuk sari dari satu bunga ke bunga lain.",
      "Semut bekerja sama membawa makanan ke sarangnya. Walau kecil, mereka bisa mengangkat benda yang jauh lebih berat dari tubuhnya."
    ]
  },
  {
    id: "kelinci", judul: "Kiko Ingin Bernyanyi", kategori: "cerita", umur: 4, favorit: false,
    sinopsis: "Kiko si kelinci suka bernyanyi, tapi hanya kalau sedang sendirian. Bisakah ia berani tampil?",
    halaman: [
      "Kiko si kelinci suka bernyanyi, tetapi hanya kalau sedang sendirian di balik semak.",
      "Suatu sore, burung-burung mendengar suaranya. \"Merdu sekali! Ayo ikut bernyanyi di pesta panen besok,\" ajak mereka.",
      "Kiko gemetar. Ia takut suaranya sumbang. Sahabatnya, Tupai, berkata, \"Bernyanyilah seperti saat kamu sendirian. Aku ada di barisan depan.\"",
      "Esok harinya, Kiko bernyanyi sambil menatap Tupai. Semua bertepuk tangan. Kiko tersenyum, ternyata berani itu bisa dilatih sedikit demi sedikit."
    ]
  },
  {
    id: "lampion", judul: "Lampion untuk Nenek", kategori: "cerita", umur: 4, favorit: false,
    sinopsis: "Nenek tidak bisa datang ke festival lampion. Rara punya cara supaya festival datang ke rumah.",
    halaman: [
      "Nenek Rara tidak bisa ke lapangan untuk melihat festival lampion karena kakinya sedang sakit.",
      "Rara punya ide. Ia mengumpulkan kertas warna-warni, lem, dan benang dari laci meja.",
      "Sepanjang sore Rara melipat dan menempel. Jadilah tiga lampion kecil berbentuk bulan, bintang, dan ikan.",
      "Malamnya, Rara menggantung lampion di teras. \"Festivalnya datang ke rumah kita, Nek!\" Nenek tertawa dan memeluk Rara erat-erat."
    ]
  }
];

/* Sampul buku digambar dengan SVG, jadi tidak perlu file gambar terpisah. */
function sampulSVG(id, judul) {
  const t = (fill, y = 66) => {
    const garis = fill === "#FFFFFF" ? "#1B2550" : "#FFFFFF";
    return `<text x="150" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="30" fill="${fill}" stroke="${garis}" stroke-width="6" stroke-linejoin="round" paint-order="stroke">${pecahJudul(judul)}</text>`;
  };
  const art = {
    kancil: `
      <rect width="300" height="400" fill="#A9D8F5"/>
      <path d="M40 260 L120 150 L200 260Z" fill="#7C9CC4"/><path d="M95 185 L120 150 L145 185 L130 180 L120 190 L110 180Z" fill="#fff"/>
      <path d="M0 270 C80 230 200 240 300 260 V400 H0Z" fill="#8CC75A"/>
      <path d="M0 320 C100 290 200 300 300 310 V400 H0Z" fill="#6DAE45"/>
      <path d="M130 400 C140 350 170 320 200 290 L215 292 C190 330 175 360 172 400Z" fill="#E7C98F"/>
      <rect x="196" y="236" width="60" height="44" fill="#F3E3C6"/><path d="M188 240 L226 206 L264 240Z" fill="#D9473A"/><rect x="218" y="254" width="16" height="26" fill="#8C5A35"/>
      <g fill="#fff"><ellipse cx="70" cy="120" rx="34" ry="14"/><ellipse cx="240" cy="140" rx="28" ry="11"/></g>`,
    alam: `
      <rect width="300" height="400" fill="#1E2C5E"/>
      <g fill="#fff"><circle cx="40" cy="140" r="2"/><circle cx="260" cy="120" r="2.5"/><circle cx="220" cy="200" r="1.8"/><circle cx="60" cy="300" r="2"/><circle cx="250" cy="330" r="2"/><circle cx="120" cy="360" r="1.6"/><circle cx="30" cy="220" r="1.5"/></g>
      <circle cx="235" cy="250" r="34" fill="#F29A4A"/><ellipse cx="235" cy="250" rx="55" ry="12" fill="none" stroke="#F7D07A" stroke-width="5"/>
      <circle cx="70" cy="200" r="20" fill="#E86A5A"/><circle cx="90" cy="345" r="14" fill="#7CC6E8"/>
      <g transform="translate(150 270) rotate(30)">
        <path d="M0 -70 C22 -45 22 10 18 30 H-18 C-22 10 -22 -45 0 -70Z" fill="#F4F4F4"/>
        <circle cy="-20" r="10" fill="#5DA9E9" stroke="#2F5E9E" stroke-width="4"/>
        <path d="M-18 10 L-34 40 L-18 32Z M18 10 L34 40 L18 32Z" fill="#E2483A"/>
        <path d="M-12 32 Q0 70 12 32Z" fill="#F7B53A"/>
      </g>`,
    hewan: `
      <rect width="300" height="400" fill="#BDE3F7"/>
      <path d="M0 300 C100 280 200 290 300 285 V400 H0Z" fill="#8CC75A"/>
      <rect x="220" y="150" width="16" height="150" fill="#E5B95B"/><ellipse cx="228" cy="140" rx="20" ry="13" fill="#E5B95B"/>
      <g fill="#B5752F"><circle cx="226" cy="190" r="5"/><circle cx="231" cy="230" r="5"/><circle cx="225" cy="265" r="4"/></g>
      <rect x="206" y="285" width="10" height="45" fill="#E5B95B"/><rect x="240" y="285" width="10" height="45" fill="#E5B95B"/><ellipse cx="228" cy="290" rx="30" ry="18" fill="#E5B95B"/>
      <ellipse cx="120" cy="290" rx="70" ry="45" fill="#9AA3AD"/>
      <rect x="70" y="300" width="22" height="50" rx="6" fill="#9AA3AD"/><rect x="140" y="300" width="22" height="50" rx="6" fill="#9AA3AD"/>
      <circle cx="58" cy="262" r="34" fill="#A9B1BA"/><ellipse cx="82" cy="262" rx="22" ry="28" fill="#8C959F"/>
      <path d="M30 270 C20 300 22 330 40 340" stroke="#A9B1BA" stroke-width="14" fill="none" stroke-linecap="round"/>
      <circle cx="48" cy="252" r="4" fill="#2B2B2B"/>`,
    timun: `
      <rect width="300" height="400" fill="#CFE9B5"/>
      <path d="M0 320 C100 300 200 310 300 300 V400 H0Z" fill="#7DB653"/>
      <ellipse cx="150" cy="250" rx="70" ry="95" fill="#F2B92B" transform="rotate(-18 150 250)"/>
      <g stroke="#D99A12" stroke-width="5" fill="none" stroke-linecap="round"><path d="M110 190 C120 240 125 290 140 330"/><path d="M150 165 C155 220 160 280 170 335"/></g>
      <path d="M190 150 C220 120 250 130 255 160 C230 160 210 165 190 150Z" fill="#4E9A3A"/>
      <path d="M180 160 C190 140 200 135 208 132" stroke="#3F7F2E" stroke-width="5" fill="none"/>
      <g fill="#fff" opacity=".8"><circle cx="60" cy="150" r="4"/><circle cx="250" cy="250" r="5"/><circle cx="70" cy="300" r="3"/></g>`,
    hujan: `
      <rect width="300" height="400" fill="#9FC7EA"/>
      <g fill="#F6F9FC"><ellipse cx="150" cy="150" rx="90" ry="40"/><ellipse cx="110" cy="130" rx="50" ry="40"/><ellipse cx="185" cy="120" rx="55" ry="45"/></g>
      <g stroke="#2F6DB5" stroke-width="5" stroke-linecap="round"><path d="M90 205 l-8 22"/><path d="M130 210 l-8 22"/><path d="M170 205 l-8 22"/><path d="M210 210 l-8 22"/><path d="M110 245 l-8 22"/><path d="M150 250 l-8 22"/><path d="M190 245 l-8 22"/></g>
      <path d="M0 320 C40 305 60 335 100 320 C140 305 160 335 200 320 C240 305 260 335 300 320 V400 H0Z" fill="#3E7CC4"/>`,
    serangga: `
      <rect width="300" height="400" fill="#E3F2D0"/>
      <path d="M0 300 C100 280 200 300 300 290 V400 H0Z" fill="#7DB653"/>
      <g transform="translate(150 230)">
        <ellipse cx="-34" cy="-18" rx="34" ry="26" fill="#F28C28"/><ellipse cx="34" cy="-18" rx="34" ry="26" fill="#F28C28"/>
        <ellipse cx="-26" cy="22" rx="22" ry="18" fill="#F5B84A"/><ellipse cx="26" cy="22" rx="22" ry="18" fill="#F5B84A"/>
        <rect x="-5" y="-40" width="10" height="80" rx="5" fill="#3B2A1A"/>
        <path d="M-3 -40 C-10 -60 -20 -66 -26 -64 M3 -40 C10 -60 20 -66 26 -64" stroke="#3B2A1A" stroke-width="3" fill="none"/>
      </g>
      <g transform="translate(70 330)"><circle r="14" fill="#D9473A"/><path d="M0 -14 V14" stroke="#2B2B2B" stroke-width="2"/><circle cx="-5" cy="-3" r="3" fill="#2B2B2B"/><circle cx="6" cy="5" r="3" fill="#2B2B2B"/></g>
      <g transform="translate(240 340)"><circle r="12" fill="#fff"/><circle r="5" fill="#F5B82E"/></g>`,
    kelinci: `
      <rect width="300" height="400" fill="#F9D9CF"/>
      <circle cx="235" cy="120" r="30" fill="#FFF1D6"/>
      <path d="M0 310 C100 290 200 300 300 290 V400 H0Z" fill="#9CCB6B"/>
      <ellipse cx="140" cy="290" rx="50" ry="42" fill="#FFFFFF"/>
      <circle cx="140" cy="230" r="34" fill="#FFFFFF"/>
      <ellipse cx="122" cy="175" rx="10" ry="34" fill="#FFFFFF"/><ellipse cx="158" cy="175" rx="10" ry="34" fill="#FFFFFF"/>
      <ellipse cx="122" cy="178" rx="4" ry="24" fill="#F4B2B6"/><ellipse cx="158" cy="178" rx="4" ry="24" fill="#F4B2B6"/>
      <circle cx="128" cy="226" r="3.5" fill="#3B2A1A"/><circle cx="152" cy="226" r="3.5" fill="#3B2A1A"/>
      <ellipse cx="140" cy="244" rx="7" ry="6" fill="#E86A5A"/>
      <g fill="#7A4A9E"><circle cx="215" cy="215" r="7"/><rect x="220" y="180" width="3.5" height="36"/><path d="M220 180 q14 4 16 16 q-6 -6 -16 -6z"/>
      <circle cx="245" cy="250" r="6"/><rect x="249" y="220" width="3" height="31"/></g>`,
    lampion: `
      <rect width="300" height="400" fill="#2B356E"/>
      <g fill="#fff"><circle cx="40" cy="130" r="2"/><circle cx="270" cy="110" r="2"/><circle cx="250" cy="300" r="1.6"/></g>
      <path d="M0 140 C100 170 200 170 300 140" stroke="#D9C9A8" stroke-width="2" fill="none"/>
      <g><path d="M70 155 V175" stroke="#D9C9A8" stroke-width="2"/><rect x="45" y="175" width="50" height="62" rx="20" fill="#F28C28"/><rect x="60" y="237" width="20" height="8" fill="#B5603A"/></g>
      <g><path d="M150 168 V188" stroke="#D9C9A8" stroke-width="2"/><rect x="122" y="188" width="56" height="70" rx="22" fill="#E2483A"/><rect x="140" y="258" width="20" height="8" fill="#9B2E25"/></g>
      <g><path d="M230 155 V175" stroke="#D9C9A8" stroke-width="2"/><rect x="205" y="175" width="50" height="62" rx="20" fill="#F5C030"/><rect x="220" y="237" width="20" height="8" fill="#B5603A"/></g>
      <path d="M0 330 H300 V400 H0Z" fill="#3A2B4E"/><rect x="40" y="300" width="220" height="30" fill="#5A4470"/>`
  }[id] || `<rect width="300" height="400" fill="#E8D3BC"/>`;

  const terang = ["alam", "lampion"].includes(id);
  return `<svg viewBox="0 0 300 400" role="img" aria-label="Sampul ${judul}" preserveAspectRatio="xMidYMid slice">
    ${art}
    <rect x="0" y="0" width="14" height="400" fill="#000" opacity=".12"/>
    ${t(terang ? "#FFFFFF" : "#1F3B66")}
  </svg>`;
}

/* Memecah judul jadi 1 sampai 3 baris supaya muat di sampul. */
function pecahJudul(judul) {
  const kata = judul.split(" ");
  const baris = [];
  let cur = "";
  kata.forEach((k) => {
    if ((cur + " " + k).trim().length > 13) { baris.push(cur.trim()); cur = k; }
    else cur += " " + k;
  });
  if (cur.trim()) baris.push(cur.trim());
  return baris.map((b, i) => `<tspan x="150" dy="${i === 0 ? 0 : 34}">${b}</tspan>`).join("");
}
