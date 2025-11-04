// zakat-perak.js (Level 6) - konsisten dengan modul lainnya
export function hitungZakatPerak() {
    const perak = parseFloat(document.getElementById('perak')?.value);
    const haul = parseFloat(document.getElementById('haulPerak')?.value);
    const kursPerak = 15000; // harga per gram (update 2025)

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    if (isNaN(perak) || isNaN(haul)) {
        rincian.push("Input tidak valid. Mohon isi jumlah perak dan lama kepemilikan dengan benar.");
        hukumLogika = "Tidak dapat dihitung karena input tidak valid.";
    } else {
        if (perak >= 595 && haul >= 1) {
            const zakatGram = perak * 0.025;
            totalZakatRp = zakatGram * kursPerak;

            rincian.push(`Anda memiliki ${perak} gram perak selama ${haul} tahun.
Karena jumlah perak Anda telah melebihi nisab (595 gram) dan telah mencapai haul (≥ 1 tahun),
maka Anda wajib menunaikan zakat sebesar 2.5% dari total perak, yaitu sebesar Rp ${totalZakatRp.toLocaleString('id-ID')}.`);

            hukumLogika = `
Hukum logika pada zakat perak ini:
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib hanya jika dua kondisi terpenuhi: perak ≥ 595 <b>dan</b> haul ≥ 1.</li>
  <li><b>Hukum Identitas</b>: Jika perak = 595 dan haul = 1, hasilnya tetap konsisten → Wajib Zakat.</li>
  <li><b>Hukum Negasi</b>: Jika salah satu kondisi tidak terpenuhi, hasilnya → Tidak Wajib Zakat.</li>
</ul>
            `;
        } else {
            rincian.push(`Anda memiliki ${perak} gram perak selama ${haul} tahun.
Karena salah satu syarat (nisab ≥ 595 gram atau haul ≥ 1 tahun) belum terpenuhi,
maka Anda belum berkewajiban membayar zakat perak.`);

            hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika salah satu kondisi (perak ≥ 595 atau haul ≥ 1) salah → hasil logika salah.</li>
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