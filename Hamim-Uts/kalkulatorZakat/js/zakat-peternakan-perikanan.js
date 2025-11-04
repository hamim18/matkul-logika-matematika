// zakat-peternakan-perikanan.js
export function hitungZakatPeternakanPerikanan() {
    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = [];

    // Nisab dan ketentuan zakat ternak
    const ternakRules = {
        domba: [
            { min: 40, max: 120, zakat: 1 },
            { min: 121, max: 200, zakat: 2 },
            { min: 201, max: 399, zakat: 3 },
            { min: 400, max: 499, zakat: 4 },
            { min: 500, max: Infinity, zakatPer100: 1 }
        ],
        sapi: [
            { min: 30, max: 39, zakat: 1, jenis: 'tabi/tabiah (1 tahun)' },
            { min: 40, max: 59, zakat: 1, jenis: 'musinnah (2 tahun)' },
            { min: 60, max: 69, zakat: 2, jenis: 'tabi/tabiah' },
            { min: 70, max: 79, zakat: 1, jenis: 'musinnah + 1 tabi' },
            { min: 80, max: 89, zakat: 2, jenis: 'musinnah' },
            { min: 90, max: 99, zakat: 3, jenis: 'tabi/tabiah' },
            { min: 100, max: 109, zakat: 1, jenis: 'musinnah + 2 tabi' },
            { min: 110, max: 119, zakat: 2, jenis: 'musinnah + 1 tabi' },
            { min: 120, max: Infinity, zakat: 'setiap 30 ekor: 1 tabi, setiap 40 ekor: 1 musinnah' }
        ],
        unta: [
            { min: 5, max: 9, zakat: 1, jenis: 'kambing' },
            { min: 10, max: 14, zakat: 2, jenis: 'kambing' },
            { min: 15, max: 19, zakat: 3, jenis: 'kambing' },
            { min: 20, max: 24, zakat: 4, jenis: 'kambing' },
            { min: 25, max: 35, zakat: 1, jenis: 'bintu makhad (1 tahun)' },
            { min: 36, max: 45, zakat: 1, jenis: 'bintu labun (2 tahun)' },
            { min: 46, max: 60, zakat: 1, jenis: 'hiqqah (3 tahun)' },
            { min: 61, max: 75, zakat: 1, jenis: 'jadz\'ah (4 tahun)' },
            { min: 76, max: 90, zakat: 2, jenis: 'bintu labun' },
            { min: 91, max: 120, zakat: 2, jenis: 'hiqqah' },
            { min: 121, max: Infinity, zakat: 'setiap 40 ekor: 1 bintu labun, setiap 50 ekor: 1 hiqqah' }
        ]
    };

    // Proses Domba
    const dombaCb = document.querySelector('.jenisTernak[value="domba"]');
    if (dombaCb?.checked) {
        const jumlahDomba = parseFloat(document.getElementById('jumlah-domba')?.value) || 0;
        const haul = parseFloat(document.getElementById('haul-domba')?.value) || 0;

        if (jumlahDomba >= 40 && haul >= 1) {
            let zakatDomba = 0;
            for (let rule of ternakRules.domba) {
                if (jumlahDomba >= rule.min && jumlahDomba <= rule.max) {
                    zakatDomba = rule.zakat;
                    break;
                } else if (jumlahDomba >= 500) {
                    zakatDomba = Math.floor(jumlahDomba / 100);
                }
            }

            const nilaiPerEkor = 2500000;
            const zakatRp = zakatDomba * nilaiPerEkor;
            totalZakatRp += zakatRp;

            rincian.push(`
<b>🐑 Zakat Domba/Kambing:</b>
Jumlah: ${jumlahDomba} ekor (haul: ${haul} tahun)
Zakat: ${zakatDomba} ekor (≈ Rp ${zakatRp.toLocaleString('id-ID')})
            `);

            hukumLogika.push('Domba: Konjungsi (jumlah ≥ 40 AND haul ≥ 1) → wajib zakat.');
        } else {
            rincian.push(`<b>🐑 Domba:</b> ${jumlahDomba} ekor (haul: ${haul} tahun) - Belum mencapai nisab (40 ekor) atau haul.`);
            hukumLogika.push('Domba: Negasi → tidak wajib zakat.');
        }
    }

    // Proses Sapi
    const sapiCb = document.querySelector('.jenisTernak[value="sapi"]');
    if (sapiCb?.checked) {
        const jumlahSapi = parseFloat(document.getElementById('jumlah-sapi')?.value) || 0;
        const haul = parseFloat(document.getElementById('haul-sapi')?.value) || 0;

        if (jumlahSapi >= 30 && haul >= 1) {
            let zakatSapi = '';
            for (let rule of ternakRules.sapi) {
                if (jumlahSapi >= rule.min && jumlahSapi <= rule.max) {
                    if (typeof rule.zakat === 'string') {
                        zakatSapi = rule.zakat;
                    } else {
                        zakatSapi = `${rule.zakat} ekor ${rule.jenis}`;
                    }
                    break;
                }
            }

            const nilaiPerEkor = 15000000;
            const estimasiRp = nilaiPerEkor;
            totalZakatRp += estimasiRp;

            rincian.push(`
<b>🐄 Zakat Sapi/Kerbau:</b>
Jumlah: ${jumlahSapi} ekor (haul: ${haul} tahun)
Zakat: ${zakatSapi} (≈ Rp ${estimasiRp.toLocaleString('id-ID')})
            `);

            hukumLogika.push('Sapi: Konjungsi (jumlah ≥ 30 AND haul ≥ 1) → wajib zakat.');
        } else {
            rincian.push(`<b>🐄 Sapi:</b> ${jumlahSapi} ekor (haul: ${haul} tahun) - Belum mencapai nisab (30 ekor) atau haul.`);
            hukumLogika.push('Sapi: Negasi → tidak wajib zakat.');
        }
    }

    // Proses Unta
    const untaCb = document.querySelector('.jenisTernak[value="unta"]');
    if (untaCb?.checked) {
        const jumlahUnta = parseFloat(document.getElementById('jumlah-unta')?.value) || 0;
        const haul = parseFloat(document.getElementById('haul-unta')?.value) || 0;

        if (jumlahUnta >= 5 && haul >= 1) {
            let zakatUnta = '';
            for (let rule of ternakRules.unta) {
                if (jumlahUnta >= rule.min && jumlahUnta <= rule.max) {
                    if (typeof rule.zakat === 'string') {
                        zakatUnta = rule.zakat;
                    } else {
                        zakatUnta = `${rule.zakat} ekor ${rule.jenis}`;
                    }
                    break;
                }
            }

            const estimasiRp = 2500000;
            totalZakatRp += estimasiRp;

            rincian.push(`
<b>🐫 Zakat Unta:</b>
Jumlah: ${jumlahUnta} ekor (haul: ${haul} tahun)
Zakat: ${zakatUnta} (≈ Rp ${estimasiRp.toLocaleString('id-ID')})
            `);

            hukumLogika.push('Unta: Konjungsi (jumlah ≥ 5 AND haul ≥ 1) → wajib zakat.');
        } else {
            rincian.push(`<b>🐫 Unta:</b> ${jumlahUnta} ekor (haul: ${haul} tahun) - Belum mencapai nisab (5 ekor) atau haul.`);
            hukumLogika.push('Unta: Negasi → tidak wajib zakat.');
        }
    }

    // Proses Perikanan
    const ikanCb = document.querySelector('.jenisTernak[value="ikan"]');
    if (ikanCb?.checked) {
        const jumlahIkan = parseFloat(document.getElementById('jumlah-ikan')?.value) || 0;
        const kursEmas = 2321000;
        const nisabKg = (85 * kursEmas) / 50000; // asumsi harga ikan Rp 50.000/kg

        if (jumlahIkan >= nisabKg) {
            const zakatRp = jumlahIkan * 50000 * 0.025;
            totalZakatRp += zakatRp;

            rincian.push(`
<b>🐟 Zakat Perikanan:</b>
Jumlah: ${jumlahIkan.toLocaleString('id-ID')} kg
Nilai: Rp ${(jumlahIkan * 50000).toLocaleString('id-ID')}
Zakat 2.5%: Rp ${zakatRp.toLocaleString('id-ID')}
            `);

            hukumLogika.push('Perikanan: Nilai hasil ≥ nisab emas → wajib zakat 2.5%.');
        } else {
            rincian.push(`<b>🐟 Perikanan:</b> ${jumlahIkan} kg - Belum mencapai nisab (setara 85 gram emas).`);
            hukumLogika.push('Perikanan: Negasi → tidak wajib zakat.');
        }
    }

    const hukumGabungan = `
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat ternak wajib jika jumlah ≥ nisab <b>dan</b> haul ≥ 1 tahun.</li>
  <li><b>Hukum Disjungsi (OR)</b>: Salah satu jenis ternak memenuhi syarat → sebagian wajib zakat.</li>
  <li><b>Hukum Implikasi</b>: Jika jumlah ≥ nisab → wajib zakat; jika tidak → tidak wajib.</li>
  <li><b>Ketentuan Khusus</b>: Setiap jenis ternak memiliki nisab dan perhitungan berbeda sesuai syariat.</li>
</ul>
    `;

    return {
        totalZakatRp,
        rincian: rincian.length > 0 ? rincian : ['Tidak ada zakat peternakan/perikanan yang wajib.'],
        hukumLogika: hukumGabungan
    };
}