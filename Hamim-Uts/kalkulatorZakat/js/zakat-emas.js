// zakat-emas.js
export function hitungZakatEmas() {
    const emas = parseFloat(document.getElementById('emas').value);
    const haul = parseFloat(document.getElementById('haul').value);
    const kursEmas = 2321000; // harga per gram (bisa diubah sesuai tahun berjalan)

    let hasilText = "";
    let nominalText = "";
    let argumenText = "";
    let hukumText = "";

    if (isNaN(emas) || isNaN(haul)) {
        hasilText = "Input tidak valid. Mohon isi jumlah emas dan lama kepemilikan dengan benar.";
    } else {
        if (emas >= 85 && haul >= 1) {
            const zakatGram = emas * 0.025;
            const zakatRupiah = zakatGram * kursEmas;

            hasilText = "Wajib Zakat";
            nominalText = `Nominal zakat yang harus dikeluarkan: Rp ${zakatRupiah.toLocaleString('id-ID')}`;

            argumenText = `
                Anda memiliki ${emas} gram emas selama ${haul} tahun.
                Karena jumlah emas Anda telah melebihi nisab (85 gram)
                dan telah mencapai haul (≥ 1 tahun),
                maka Anda wajib menunaikan zakat sebesar 2.5% dari total emas,
                yaitu sebesar Rp ${zakatRupiah.toLocaleString('id-ID')}.
            `;

            hukumText = `
                Hukum logika yang berlaku pada perhitungan zakat emas ini:
                - **Hukum Konjungsi (AND)**: Zakat wajib hanya jika dua kondisi terpenuhi: emas ≥ 85 **dan** haul ≥ 1.
                - **Hukum Identitas**: Jika haul = 1 dan emas = 85, maka hasil logika tetap konsisten → Wajib Zakat.
                - **Hukum Negasi**: Jika salah satu kondisi tidak terpenuhi, maka hasilnya otomatis Tidak Wajib Zakat.
            `;
        } else {
            hasilText = "Tidak Wajib Zakat";
            argumenText = `
                Anda memiliki ${emas} gram emas selama ${haul} tahun.
                Karena salah satu syarat (nisab ≥ 85 gram atau haul ≥ 1 tahun) belum terpenuhi,
                maka Anda belum berkewajiban membayar zakat emas.
            `;

            hukumText = `
                Hukum logika yang berlaku:
                <ul>
                <li><b>Hukum Negasi</b>: Jika salah satu kondisi (emas ≥ 85 atau haul ≥ 1) bernilai salah, maka keputusan akhir bernilai salah.</li>
                <li><b>Hukum Konjungsi (AND)</b> memastikan zakat hanya wajib bila kedua proposisi benar.</li>
                </ul>
            `;
        }
    }

    // Tampilkan hasil ke HTML
    document.getElementById('hasil').innerText = hasilText;
    document.getElementById('nominalZakat').innerText = nominalText;
    document.getElementById('argumenLogis').innerText = argumenText;
    document.getElementById('hukumLogika').innerHTML = hukumText;
}
