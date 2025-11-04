// zakat-perniagaan.js
export function hitungZakatPerniagaan() {
    const kursEmas = 2321000;
    const nisabEmas = 85;
    const nisab = nisabEmas * kursEmas;

    const nilaiBarang = parseFloat(document.getElementById('nilaiBarang')?.value) || 0;
    const uangKas = parseFloat(document.getElementById('uangKas')?.value) || 0;
    const hutang = parseFloat(document.getElementById('hutang')?.value) || 0;
    const haul = parseFloat(document.getElementById('haulPerniagaan')?.value) || 0;

    const totalAset = nilaiBarang + uangKas - hutang;

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    if (totalAset < 0) {
        rincian.push(`
<b>⚠️ Perhatian:</b> Total aset bersih Anda negatif (hutang lebih besar dari aset).
Dalam kondisi ini, Anda tidak wajib menunaikan zakat perniagaan.
        `);

        hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika total aset ≤ 0 → Tidak Wajib Zakat.</li>
</ul>
        `;
    } else if (haul >= 1 && totalAset >= nisab) {
        totalZakatRp = totalAset * 0.025;

        rincian.push(`
<b>💼 Rincian Perniagaan:</b>
- Nilai Barang Dagangan: Rp ${nilaiBarang.toLocaleString('id-ID')}
- Uang Kas: Rp ${uangKas.toLocaleString('id-ID')}
- Hutang: Rp ${hutang.toLocaleString('id-ID')}

<b>Total Aset Bersih:</b> Rp ${totalAset.toLocaleString('id-ID')}
<b>Nisab:</b> Rp ${nisab.toLocaleString('id-ID')} (setara 85 gram emas)
<b>Haul:</b> ${haul} tahun

Karena aset bersih (barang + kas - hutang) ≥ nisab dan telah mencapai haul ≥ 1 tahun,
maka Anda wajib menunaikan zakat sebesar 2.5%, yaitu <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b>.
        `);

        hukumLogika = `
Hukum logika pada zakat perniagaan:
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib jika (barang + kas - hutang) ≥ nisab <b>dan</b> haul ≥ 1 tahun.</li>
  <li><b>Hukum Implikasi</b>: Jika aset bersih ≥ nisab → wajib zakat; jika tidak → tidak wajib.</li>
  <li><b>Hukum Operasi Aritmatika dalam Logika</b>: Aset bersih = (barang + kas) - hutang.</li>
</ul>
        `;
    } else {
        rincian.push(`
<b>💼 Rincian Perniagaan:</b>
Total Aset Bersih: Rp ${totalAset.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}
Haul: ${haul} tahun

Karena ${totalAset < nisab ? 'aset bersih < nisab' : 'haul < 1 tahun'},
maka Anda belum berkewajiban menunaikan zakat perniagaan.
        `);

        hukumLogika = `
<ul>
  <li><b>Hukum Negasi</b>: Jika salah satu kondisi tidak terpenuhi → Tidak Wajib Zakat.</li>
  <li><b>Hukum Konjungsi (AND)</b>: Wajib hanya jika kedua proposisi benar.</li>
</ul>
        `;
    }

    return {
        totalZakatRp,
        rincian,
        hukumLogika
    };
}