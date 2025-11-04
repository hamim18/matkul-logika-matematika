// zakat-uang-surat-berharga.js
export function hitungZakatUangSuratBerharga() {
    const kursEmas = 2321000;
    const nisabEmas = 85;
    const nisab = nisabEmas * kursEmas;

    // Input uang
    const tunai = parseFloat(document.getElementById('tunai')?.value) || 0;
    const tabungan = parseFloat(document.getElementById('tabungan')?.value) || 0;
    const deposito = parseFloat(document.getElementById('deposito')?.value) || 0;

    // Input investasi
    const saham = parseFloat(document.getElementById('saham')?.value) || 0;
    const obligasi = parseFloat(document.getElementById('obligasi')?.value) || 0;
    const reksadana = parseFloat(document.getElementById('reksadana')?.value) || 0;

    // Input surat berharga lainnya
    const suratTanah = parseFloat(document.getElementById('suratTanah')?.value) || 0;
    const lainnya = parseFloat(document.getElementById('lainnya')?.value) || 0;

    const haul = parseFloat(document.getElementById('haulUang')?.value) || 0;

    const totalHarta = tunai + tabungan + deposito + saham + obligasi + reksadana + suratTanah + lainnya;

    let totalZakatRp = 0;
    let rincian = [];
    let hukumLogika = "";

    if (haul >= 1 && totalHarta >= nisab) {
        totalZakatRp = totalHarta * 0.025;

        rincian.push(`
<b>📊 Rincian Harta:</b>
- Uang Tunai: Rp ${tunai.toLocaleString('id-ID')}
- Tabungan: Rp ${tabungan.toLocaleString('id-ID')}
- Deposito: Rp ${deposito.toLocaleString('id-ID')}
- Saham: Rp ${saham.toLocaleString('id-ID')}
- Obligasi: Rp ${obligasi.toLocaleString('id-ID')}
- Reksadana: Rp ${reksadana.toLocaleString('id-ID')}
- Surat Tanah: Rp ${suratTanah.toLocaleString('id-ID')}
- Lainnya: Rp ${lainnya.toLocaleString('id-ID')}

<b>Total Harta:</b> Rp ${totalHarta.toLocaleString('id-ID')}
<b>Nisab:</b> Rp ${nisab.toLocaleString('id-ID')} (setara 85 gram emas)
<b>Haul:</b> ${haul} tahun

Karena total harta ≥ nisab dan telah mencapai haul ≥ 1 tahun,
maka Anda wajib menunaikan zakat sebesar 2.5%, yaitu <b>Rp ${totalZakatRp.toLocaleString('id-ID')}</b>.
        `);

        hukumLogika = `
Hukum logika pada zakat uang & surat berharga:
<ul>
  <li><b>Hukum Konjungsi (AND)</b>: Zakat wajib jika total harta ≥ nisab <b>dan</b> haul ≥ 1 tahun.</li>
  <li><b>Hukum Identitas</b>: Jika kedua syarat terpenuhi, hasilnya konsisten → Wajib Zakat.</li>
  <li><b>Hukum Disjungsi (OR)</b>: Total harta dihitung dari berbagai sumber (tunai OR tabungan OR investasi, dll).</li>
</ul>
        `;
    } else {
        rincian.push(`
<b>📊 Rincian Harta:</b>
Total Harta: Rp ${totalHarta.toLocaleString('id-ID')}
Nisab: Rp ${nisab.toLocaleString('id-ID')}
Haul: ${haul} tahun

Karena ${totalHarta < nisab ? 'total harta < nisab' : 'haul < 1 tahun'},
maka Anda belum berkewajiban menunaikan zakat uang & surat berharga.
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