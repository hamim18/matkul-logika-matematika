// zakat-penghasilan.js
export function hitungZakatPenghasilan() {
    const gaji = parseFloat(document.getElementById('gaji').value);
    const pengeluaran = parseFloat(document.getElementById('pengeluaran').value);

    // Ambil periode: bulanan atau tahunan
    const periodeEl = document.querySelector('input[name="periode"]:checked');
    const periode = periodeEl ? periodeEl.value : 'bulanan';

    const kursEmas = 2321000; // harga emas per gram
    const nisabEmasGram = 85;
    const nisabTahunan = nisabEmasGram * kursEmas; // nisab tahunan dalam rupiah

    let penghasilanBersih = 0;
    let nisab = 0;

    if (periode === 'tahunan') {
        penghasilanBersih = (gaji - pengeluaran) * 12;
        nisab = nisabTahunan;
    } else {
        penghasilanBersih = gaji - pengeluaran;
        nisab = nisabTahunan / 12; // nisab bulanan
    }

    let hasilText = "";
    let nominalText = "";
    let argumenText = "";
    let hukumText = "";

    if (isNaN(gaji) || isNaN(pengeluaran)) {
        hasilText = "Input tidak valid. Mohon isi gaji dan pengeluaran dengan benar.";
    } else {
        if (penghasilanBersih >= nisab) {
            const zakat = penghasilanBersih * 0.025;

            hasilText = "Wajib Zakat";
            nominalText = `Nominal zakat yang harus dikeluarkan: Rp ${zakat.toLocaleString("id-ID")}`;

            argumenText = `
                Periode: ${periode.charAt(0).toUpperCase() + periode.slice(1)}<br>
                Penghasilan bersih: Rp ${penghasilanBersih.toLocaleString("id-ID")}<br>
                Nisab: Rp ${nisab.toLocaleString("id-ID")}<br>
                Karena penghasilan bersih ≥ nisab, Anda wajib menunaikan zakat 2.5% dari penghasilan bersih, 
                yaitu Rp ${zakat.toLocaleString("id-ID")}.
            `;

            hukumText = `
                Hukum logika pada zakat penghasilan ini:
                - **Hukum Konjungsi (AND)**: Wajib zakat jika penghasilan bersih ≥ nisab dan periode valid.
                - **Hukum Implikasi**: Jika penghasilan ≥ nisab, maka wajib zakat; jika < nisab, maka tidak wajib.
                - **Hukum Negasi**: Jika penghasilan < nisab, hasil logika → Tidak Wajib Zakat.
            `;
        } else {
            hasilText = "Tidak Wajib Zakat";

            argumenText = `
                Periode: ${periode.charAt(0).toUpperCase() + periode.slice(1)}<br>
                Penghasilan bersih: Rp ${penghasilanBersih.toLocaleString("id-ID")}<br>
                Nisab: Rp ${nisab.toLocaleString("id-ID")}<br>
                Karena penghasilan bersih < nisab, Anda belum berkewajiban menunaikan zakat.
            `;

            hukumText = `
                Hukum logika:
                <ul>
                <li><b>>Hukum Negasi</b>: Jika penghasilan bersih < nisab, maka keputusan akhir → Tidak Wajib Zakat.</li>
                <li><b>Hukum Konjungsi (AND)</b> memastikan zakat hanya wajib bila kedua proposisi benar (penghasilan ≥ nisab dan periode valid).</li>
                <ul>
            `;
        }
    }

    // Update ke HTML
    document.getElementById('hasil').innerText = hasilText;
    document.getElementById('nominalZakat').innerText = nominalText;
    document.getElementById('argumenLogis').innerHTML = argumenText;
    document.getElementById('hukumLogika').innerHTML = hukumText;
}
