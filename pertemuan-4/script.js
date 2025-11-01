const arrHukum = {
  // Identitas
  "A && 1": "Hukum Identitas",
  "1 && A": "Hukum Identitas",
  "A || 0": "Hukum Identitas",
  "0 || A": "Hukum Identitas",

  // Dominasi
  "A && 0": "Hukum Dominasi",
  "0 && A": "Hukum Dominasi",
  "A || 1": "Hukum Dominasi",
  "1 || A": "Hukum Dominasi",

  // Idempotensi
  "A && A": "Hukum Idempotensi",
  "A || A": "Hukum Idempotensi",

  // Negasi
  "A && !A": "Hukum Negasi (Kontradiksi)",
  "!A && A": "Hukum Negasi (Kontradiksi)",
  "A || !A": "Hukum Negasi (Tautologi)",
  "!A || A": "Hukum Negasi (Tautologi)",

  // Komutatif
  "A && B": "Hukum Komutatif",
  "B && A": "Hukum Komutatif",
  "A || B": "Hukum Komutatif",
  "B || A": "Hukum Komutatif",

  // Asosiatif
  "(A || B) || C": "Hukum Asosiatif",
  "A || (B || C)": "Hukum Asosiatif",
  "(A && B) && C": "Hukum Asosiatif",
  "A && (B && C)": "Hukum Asosiatif",

  // Distributif
  "A && (B || C)": "Hukum Distributif",
  "(A && B) || (A && C)": "Hukum Distributif",
  "A || (B && C)": "Hukum Distributif",
  "(A || B) && (A || C)": "Hukum Distributif",

  // Absorpsi
  "A || (A && B)": "Hukum Absorpsi",
  "A && (A || B)": "Hukum Absorpsi",

  // De Morgan
  "!(A && B)": "Hukum De Morgan",
  "!A || !B": "Hukum De Morgan",
  "!(A || B)": "Hukum De Morgan",
  "!A && !B": "Hukum De Morgan",

  // Implikasi
  "A → B": "Definisi Implikasi (¬A ∨ B)",
  "!A || B": "Definisi Implikasi (¬A ∨ B)",

  // Kontraposisi
  "A → B": "Kontraposisi",
  "!B → !A": "Kontraposisi",

  // Double Negasi
  "!!A": "Hukum Double Negasi"
}

// Ambil elemen
const combo1 = document.getElementById("combo1");
const combo2 = document.getElementById("combo2");
const combo3 = document.getElementById("combo3");
const labelHasil = document.getElementById("labelHasil");
const tombolHitung = document.getElementById("hitungBtn");

// Fungsi untuk hitung hukum logika
function hitungHukum() {
  const val1 = combo1.value.trim();
  const val2 = combo2.value.trim();
  const val3 = combo3.value.trim();

  if (!val1 || !val2 || !val3) {
    labelHasil.textContent = "Silahkan pilih semua comboBox!";
    return;
  }

  const ekspresi = `${val1} ${val2} ${val3}`;

  if (arrHukum[ekspresi]) {
    labelHasil.textContent = arrHukum[ekspresi];
  } else {
    labelHasil.textContent = "Hukum untuk ekspresi ini belum tersedia.";
  }
}

// Event listener tombol
tombolHitung.addEventListener("click", hitungHukum);
