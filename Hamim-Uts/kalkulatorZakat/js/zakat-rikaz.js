// zakat-rikaz.js (Harta Temuan)
export function hitungZakatRikaz() {
    const nilaiRikaz = parseFloat(document.getElementById('nilaiRikaz')?.value) || 0;
    const jenisRikaz = document.getElementById('jenisRikaz')?.value || '';

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    // Rikaz tidak memerlukan nisab dan tidak memerlukan haul
    // Zakat langsung 20% (1/5) dari nilai harta temuan

    if (nilaiRikaz > 0) {
        totalZakatRp = nilaiRikaz * 0.20;

        rincian.push(`
<b>💎 Zakat Rikaz (Harta Temuan):</b>
Jenis Harta: ${jenisRikaz || 'Tidak disebutkan'}
Nilai Harta Temuan: Rp ${nilaiRikaz.toLocaleString('id-ID')}

Berdasarkan syariat Islam, zakat rikaz (harta temuan/harta karun) wajib dikeluarkan sebesar <b>20%</b> (1/5) dari nilai harta yang ditemukan, <b>tanpa syarat nisab dan haul</b>.

Zakat yang wajib dibayarkan: <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b>

<i>Catatan Penting:</i>
• Rikaz adalah harta terpendam dari zaman jahiliyah (pra-Islam) atau harta karun yang ditemukan
• Tidak memerlukan nisab (batas minimal)
• Tidak memerlukan haul (kepemilikan 1 tahun)
• Wajib dikeluarkan segera saat harta ditemukan
• Zakat rikaz termasuk yang paling tinggi persentasenya (20%)
        `);

        hukumLogika = `
Hukum logika pada zakat rikaz:
<ul>
  <li><b>Hukum Identitas Khusus</b>: Rikaz memiliki aturan berbeda dari zakat lainnya.</li>
  <li><b>Tidak Ada Konjungsi Nisab/Haul</b>: Berbeda dengan zakat lain, rikaz tidak mensyaratkan nisab atau haul.</li>
  <li><b>Hukum Implikasi Sederhana</b>: Jika menemukan harta karun → wajib zakat 20%, langsung.</li>
  <li><b>Hukum Definitif</b>: Persentase tetap 20% tanpa kondisi tambahan.</li>
  <li><b>Dalil Hadis</b>: "Dalam rikaz (harta karun) zakatnya seperlima" (HR. Bukhari & Muslim).</li>
</ul>
        `;
    } else {
        rincian.push(`
<b>💎 Zakat Rikaz:</b>
Belum ada harta temuan yang dilaporkan.
        `);

        hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika tidak ada harta yang ditemukan → Tidak ada zakat.</li>
</ul>
        `;
    }

    return {
        totalZakatRp,
        rincian,
        hukumLogika
    };
}