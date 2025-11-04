// zakat-pertambangan.js
export function hitungZakatPertambangan() {
    const kursEmas = 2321000;
    const nisabEmas = 85;
    const nisab = nisabEmas * kursEmas;

    const nilaiTambang = parseFloat(document.getElementById('nilaiTambang')?.value) || 0;
    const biayaProduksi = parseFloat(document.getElementById('biayaProduksi')?.value) || 0;
    const jenisUsaha = document.querySelector('input[name="jenisUsaha"]:checked')?.value || 'berat';

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    const nilaiKotor = nilaiTambang;
    const nilaiBersih = nilaiTambang - biayaProduksi;

    if (jenisUsaha === 'ringan') {
        // Usaha ringan: biaya produksi rendah, zakat 20% dari hasil kotor
        if (nilaiKotor >= nisab) {
            totalZakatRp = nilaiKotor * 0.20;

            rincian.push(`
<b>⛏️ Zakat Pertambangan (Usaha Ringan):</b>
Jenis: Usaha dengan biaya produksi rendah (minim modal & tenaga)
Nilai Hasil Tambang: Rp ${nilaiKotor.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}

Karena nilai hasil ≥ nisab dan usaha tergolong ringan,
maka zakat yang wajib dibayarkan adalah <b>20%</b> dari hasil kotor,
yaitu <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b>.

<i>Catatan: Zakat pertambangan tidak mensyaratkan haul (langsung dikeluarkan saat panen/ekstraksi).</i>
            `);

            hukumLogika = `
Hukum logika pada zakat pertambangan (usaha ringan):
<ul>
  <li><b>Hukum Implikasi</b>: Jika nilai hasil ≥ nisab <b>dan</b> usaha ringan → wajib zakat 20% dari hasil kotor.</li>
  <li><b>Tidak Ada Haul</b>: Zakat pertambangan wajib segera saat hasil didapat (berbeda dengan zakat harta).</li>
  <li><b>Hukum Identitas</b>: Nilai kotor = nilai kotor (tidak dikurangi biaya).</li>
</ul>
            `;
        } else {
            rincian.push(`
<b>⛏️ Zakat Pertambangan (Usaha Ringan):</b>
Nilai Hasil: Rp ${nilaiKotor.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}

Karena nilai hasil < nisab, maka tidak wajib zakat.
            `);

            hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika nilai hasil < nisab → Tidak Wajib Zakat.</li>
</ul>
            `;
        }
    } else {
        // Usaha berat: biaya produksi tinggi, zakat 2.5% dari hasil bersih
        if (nilaiBersih >= nisab) {
            totalZakatRp = nilaiBersih * 0.025;

            rincian.push(`
<b>⛏️ Zakat Pertambangan (Usaha Berat):</b>
Jenis: Usaha dengan biaya produksi tinggi (butuh modal & tenaga besar)
Nilai Hasil Tambang: Rp ${nilaiKotor.toLocaleString('id-ID')}
Biaya Produksi: Rp ${biayaProduksi.toLocaleString('id-ID')}
Nilai Bersih: Rp ${nilaiBersih.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}

Karena nilai bersih ≥ nisab dan usaha tergolong berat,
maka zakat yang wajib dibayarkan adalah <b>2.5%</b> dari hasil bersih (setelah dikurangi biaya produksi),
yaitu <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b>.

<i>Catatan: Zakat pertambangan tidak mensyaratkan haul (langsung dikeluarkan saat panen/ekstraksi).</i>
            `);

            hukumLogika = `
Hukum logika pada zakat pertambangan (usaha berat):
<ul>
  <li><b>Hukum Implikasi</b>: Jika (nilai kotor - biaya) ≥ nisab <b>dan</b> usaha berat → wajib zakat 2.5% dari hasil bersih.</li>
  <li><b>Tidak Ada Haul</b>: Zakat pertambangan wajib segera saat hasil didapat.</li>
  <li><b>Hukum Operasi Aritmatika</b>: Nilai bersih = nilai kotor - biaya produksi.</li>
</ul>
            `;
        } else {
            rincian.push(`
<b>⛏️ Zakat Pertambangan (Usaha Berat):</b>
Nilai Bersih: Rp ${nilaiBersih.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}

Karena nilai bersih < nisab, maka tidak wajib zakat.
            `);

            hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika nilai bersih < nisab → Tidak Wajib Zakat.</li>
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