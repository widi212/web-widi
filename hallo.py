import pywhatkit
import pandas as pd
import time

# Baca file CSV dengan pemisah ;
data = pd.read_csv("blast.csv", sep=';', dtype={"number": str})

# Hapus baris yang tidak memiliki nomor atau resi
data = data.dropna(subset=['number', 'resi'])

# Tampilkan kolom yang terbaca
print("📋 Kolom yang terbaca:", data.columns.tolist())

# Kirim pesan satu per satu
for index, row in data.iterrows():
    # Validasi isi kolom
    print(f"Data baris {index + 1}: {row['number']}, {row['resi']}")

    # Lewati jika data kosong
    if pd.isna(row['number']) or pd.isna(row['resi']) or not row['number'].strip() or not row['resi'].strip():
        print(f"❌ Data tidak lengkap pada baris {index + 1}, dilewati...")
        continue

    # Format nomor telepon
    number = "+{}".format(str(row['number']).strip().lstrip("+"))

    # Ambil data lain dari baris
    resi = str(row['resi']).strip()
    kendala = str(row.get('kendala', '')).strip()
    link = str(row.get('link', '')).strip()
    penerima = str(row.get('penerima', '')).strip()
    pengirim = str(row.get('pengirim', '')).strip()

    # Format pesan WhatsApp
    message = f"""Selamat siang kaka😊, kami dari team lincah.id ingin konfirmasi terkait resi:

{resi}

{kendala}

{link}

Nama pengirim = {pengirim}
Nama penerima = {penerima}

Mohon dibantu cek kembali dan hubungi buyernya ya ka.
Apakah keterangan tersebut sesuai atau tidak?
Lampirkan bukti chatnya.

Feedback diusahakan hari ini ka. Jika sampai batas waktu simpan gudang belum ada feedback,
paket akan direturn otomatis oleh ekspedisi.

Terima kasih 🙏
"""

    # Kirim pesan
    print(f"[{index + 1}] Mengirim ke {number} dengan resi {resi}...")
    try:
        pywhatkit.sendwhatmsg_instantly(number, message, wait_time=7)
        print(f"✅ Berhasil kirim ke {number}")
        
        time.sleep(7)  # Delay antar kiriman
    except Exception as e:
        print(f"❌ Gagal kirim ke {number}: {e}")