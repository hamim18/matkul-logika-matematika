// js/zakat-pertanian.js
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

    jenisPertanian.forEach(jenis => {
        const checkbox = document.querySelector(`.jenisPertanian[value="${jenis}"]`);
        const hasilInput = document.getElementById(`hasil-${jenis}`);
        const irigasiCheckbox = document.getElementById(`irigasi-${jenis}`);

        if (!checkbox || !checkbox.checked) return;

        const hasilPanen = parseFloat(hasilInput?.value) || 0;
        const irigasiBuatan = irigasiCheckbox?.checked || false;
        let zakatKg = 0;
        let zakatRp = 0;
        let penjelasan = "";

        if (hasilPanen >= nisab) {
            const persentase = irigasiBuatan ? 0.05 : 0.10;
            zakatKg = hasilPanen * persentase;
            zakatRp = zakatKg * hargaPerKg[jenis];
            totalZakatKg += zakatKg;
            totalZakatRp += zakatRp;

            penjelasan = `
                ✅ Anda <b>wajib zakat</b> hasil <b>${jenis}</b> sebanyak ${hasilPanen.toLocaleString("id-ID")} kg,
                dengan irigasi <b>${irigasiBuatan ? "buatan (5%)" : "alami (10%)"}</b>.<br>
                Jumlah zakat: <b>${zakatKg.toFixed(2)} kg</b> (setara Rp ${zakatRp.toLocaleString("id-ID")}).
            `;
        } else {
            penjelasan = `
                ❌ Hasil panen <b>${jenis}</b> Anda sebesar ${hasilPanen.toLocaleString("id-ID")} kg 
                belum mencapai nisab (653 kg), sehingga <b>tidak wajib zakat</b>.
            `;
        }

        rincian.push(penjelasan);
    });

    // Hasil akhir
    const hasilText = totalZakatKg > 0 ? "Wajib Zakat" : "Tidak Wajib Zakat";
    const nominalText = totalZakatKg > 0
        ? `💰 Total zakat yang harus dikeluarkan: <b>Rp ${totalZakatRp.toLocaleString("id-ID")}</b> 
           (${totalZakatKg.toFixed(2)} kg hasil panen)`
        : "";

    const hukumText = `
        Hukum logika pada perhitungan zakat pertanian ini:
        <ul>
            <li><b>Hukum Konjungsi (AND)</b>: Wajib zakat jika hasil panen ≥ 653 kg dan jenis pertanian valid.</li>
            <li><b>Hukum Disjungsi (OR)</b>: Salah satu jenis panen yang memenuhi nisab sudah menimbulkan kewajiban zakat.</li>
            <li><b>Hukum Implikasi</b>: Jika hasil panen melebihi nisab, maka wajib zakat; jika tidak, maka tidak wajib.</li>
            <li><b>Hukum Negasi</b>: Jika hasil panen < 653 kg, maka tidak wajib zakat.</li>
        </ul>
    `;

    // Update tampilan
    document.getElementById("hasil").innerText = hasilText;
    document.getElementById("nominalZakat").innerHTML = nominalText;
    document.getElementById("argumenLogis").innerHTML = rincian.join("<hr>");
    document.getElementById("hukumLogika").innerHTML = hukumText;
}
