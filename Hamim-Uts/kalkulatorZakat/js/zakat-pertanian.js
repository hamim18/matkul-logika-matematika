// zakat-pertanian.js (Level 6)
export function hitungZakatPertanian() {
    const hargaPerKg = {
        padi: 10000,
        sayur: 8000,
        rempah: 25000,
        buah: 15000
    };

    const nisab = 653; // nisab hasil panen dalam kg
    const jenisPertanian = ["padi", "sayur", "rempah", "buah"];
    let totalZakatKg = 0;
    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = [];

    jenisPertanian.forEach(jenis => {
        const checkbox = document.querySelector(`.jenisPertanian[value="${jenis}"]`);
        const hasilInput = document.getElementById(`hasil-${jenis}`);
        const irigasiCheckbox = document.getElementById(`irigasi-${jenis}`);

        if (!checkbox || !checkbox.checked) return;

        const hasilPanen = parseFloat(hasilInput?.value) || 0;
        const irigasiBuatan = irigasiCheckbox?.checked || false;
        let zakatKg = 0;
        let zakatRp = 0;

        if (hasilPanen >= nisab) {
            const persentase = irigasiBuatan ? 0.05 : 0.10;
            zakatKg = hasilPanen * persentase;
            zakatRp = zakatKg * hargaPerKg[jenis];
            totalZakatKg += zakatKg;
            totalZakatRp += zakatRp;

            rincian.push(`
✅ Hasil panen <b>${jenis}</b>: ${hasilPanen.toLocaleString("id-ID")} kg
Irigasi: <b>${irigasiBuatan ? "buatan (5%)" : "alami (10%)"}</b>
Zakat: <b>${zakatKg.toFixed(2)} kg</b> (Rp ${zakatRp.toLocaleString("id-ID")})
            `);

            hukumLogika.push(`Hukum logika untuk ${jenis}: Konjungsi (AND) terpenuhi → wajib zakat.`);
        } else {
            rincian.push(`
❌ Hasil panen <b>${jenis}</b>: ${hasilPanen.toLocaleString("id-ID")} kg
Belum mencapai nisab (${nisab} kg) → tidak wajib zakat.
            `);

            hukumLogika.push(`Hukum logika untuk ${jenis}: Negasi → hasil < nisab → tidak wajib zakat.`);
        }
    });

    const hukumGabungan = `
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib jika hasil panen ≥ nisab dan jenis pertanian valid.</li>
  <li><b>Hukum Disjungsi (OR)</b>: Salah satu jenis panen memenuhi nisab → sebagian wajib zakat.</li>
  <li><b>Hukum Implikasi</b>: Jika hasil panen ≥ nisab → wajib zakat, jika tidak → tidak wajib.</li>
  <li><b>Hukum Negasi</b>: Jika hasil panen < nisab → tidak wajib zakat.</li>
</ul>
`;

    return {
        totalZakatRp,
        rincian,
        hukumLogika: hukumGabungan
    };
}
