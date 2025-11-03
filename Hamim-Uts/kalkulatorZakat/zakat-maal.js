function hitungZakat() {
    const emas = parseFloat(document.getElementById('emas').value);
    const haul = parseFloat(document.getElementById('haul').value);
    let hasilText = '';

    if (emas >= 85 && haul >= 1) {
        hasilText = "Wajib Zakat";
    } else {
        hasilText = "Tidak Wajib Zakat";
    }

    document.getElementById('hasil').innerText = hasilText;
}

document.getElementById('hitungBtn').addEventListener('click', hitungZakat);
