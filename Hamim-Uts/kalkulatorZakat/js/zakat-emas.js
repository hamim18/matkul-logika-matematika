// zakat-emas.js (Level 6) - versi konsisten dengan pertanian/penghasilan
export function hitungZakatEmas() {
    const emas = parseFloat(document.getElementById('emas')?.value);
    const haul = parseFloat(document.getElementById('haul')?.value);
    const kursEmas = 2321000; // harga per gram (update 2025)

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    if (isNaN(emas) || isNaN(haul)) {
        rincian.push("Input tidak valid. Mohon isi jumlah emas dan lama kepemilikan dengan benar.");
        hukumLogika = "Tidak dapat dihitung karena input tidak valid.";
    } else {
        if (emas >= 85 && haul >= 1) {
            const zakatGram = emas * 0.025;
            totalZakatRp = zakatGram * kursEmas;

            rincian.push(`Anda memiliki ${emas} gram emas selama ${haul} tahun.
Karena jumlah emas Anda telah melebihi nisab (85 gram) dan telah mencapai haul (≥ 1 tahun),
maka Anda wajib menunaikan zakat sebesar 2.5% dari total emas, yaitu sebesar Rp ${totalZakatRp.toLocaleString('id-ID')}.`);

            hukumLogika = `
Hukum logika pada zakat emas ini:
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib hanya jika dua kondisi terpenuhi: emas ≥ 85 <b>dan</b> haul ≥ 1.</li>
  <li><b>Hukum Identitas</b>: Jika emas = 85 dan haul = 1, hasilnya tetap konsisten → Wajib Zakat.</li>
  <li><b>Hukum Negasi</b>: Jika salah satu kondisi tidak terpenuhi, hasilnya → Tidak Wajib Zakat.</li>
</ul>
            `;
        } else {
            rincian.push(`Anda memiliki ${emas} gram emas selama ${haul} tahun.
Karena salah satu syarat (nisab ≥ 85 gram atau haul ≥ 1 tahun) belum terpenuhi,
maka Anda belum berkewajiban membayar zakat emas.`);

            hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika salah satu kondisi (emas ≥ 85 atau haul ≥ 1) salah → hasil logika salah.</li>
  <li><b>Hukum Konjungsi (AND)</b>: Wajib hanya jika kedua proposisi benar.</li>
</ul>
            `;
        }
    }

    return {
        totalZakatRp,
        rincian,
        hukumLogika
    };
}
