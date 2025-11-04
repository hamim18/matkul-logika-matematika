// zakat-penghasilan.js (Level 6) - versi konsisten
export function hitungZakatPenghasilan() {
    const gaji = parseFloat(document.getElementById('gaji')?.value);
    const pengeluaran = parseFloat(document.getElementById('pengeluaran')?.value);

    const periodeEl = document.querySelector('input[name="periode"]:checked');
    const periode = periodeEl ? periodeEl.value : 'bulanan';

    const kursEmas = 2321000;
    const nisabEmasGram = 85;
    const nisabTahunan = nisabEmasGram * kursEmas;

    let penghasilanBersih = 0;
    let nisab = 0;

    if (periode === 'tahunan') {
        penghasilanBersih = (gaji - pengeluaran) * 12;
        nisab = nisabTahunan;
    } else {
        penghasilanBersih = gaji - pengeluaran;
        nisab = nisabTahunan / 12;
    }

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    if (isNaN(gaji) || isNaN(pengeluaran)) {
        rincian.push("Input tidak valid. Mohon isi gaji dan pengeluaran dengan benar.");
        hukumLogika = "Tidak dapat dihitung karena input tidak valid.";
    } else {
        if (penghasilanBersih >= nisab) {
            totalZakatRp = penghasilanBersih * 0.025;

            rincian.push(`Periode: ${periode.charAt(0).toUpperCase() + periode.slice(1)}
Penghasilan bersih: Rp ${penghasilanBersih.toLocaleString("id-ID")}
Nisab: Rp ${nisab.toLocaleString("id-ID")}
Karena penghasilan bersih ≥ nisab, Anda wajib menunaikan zakat sebesar 2.5% dari penghasilan bersih,
yaitu Rp ${totalZakatRp.toLocaleString("id-ID")}.`);

            hukumLogika = `
Hukum logika pada zakat penghasilan ini:
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib jika penghasilan bersih ≥ nisab <b>dan</b> periode valid.</li>
  <li><b>Hukum Implikasi</b>: Jika penghasilan ≥ nisab, maka wajib zakat; jika tidak, maka tidak wajib.</li>
  <li><b>Hukum Negasi</b>: Jika penghasilan < nisab, hasil logika → Tidak Wajib Zakat.</li>
</ul>
            `;
        } else {
            rincian.push(`Periode: ${periode.charAt(0).toUpperCase() + periode.slice(1)}
Penghasilan bersih: Rp ${penghasilanBersih.toLocaleString("id-ID")}
Nisab: Rp ${nisab.toLocaleString("id-ID")}
Karena penghasilan bersih < nisab, Anda belum berkewajiban menunaikan zakat.`);

            hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika penghasilan bersih < nisab, maka hasil logika → Tidak Wajib Zakat.</li>
  <li><b>Hukum Konjungsi (AND)</b>: Wajib hanya bila penghasilan ≥ nisab dan periode valid.</li>
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
