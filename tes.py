import sys
from time import sleep

def print_lirik():
    baris = [
        ("Aduh abang bukan maksudku begitu begitu", 0.07),
        ("Masalah stecu bukan berarti tak mau", 0.09),
        ("Jual mahal dikit kan bisa", 0.06),
        ("Coba kasih efort-nya saja", 0.06),
        ("Kalo emang cocok bisa datang ke rumah", 0.06),
        ("Stecu, stecu, stelan cuek baru malu", 0.09),
        ("Aduh, ade ini juga abang yang rayu", 0.09),
        ("Stecu, stecu, stelan cuek baru malu", 0.09),
        ("Stecu, stecu, stelan cuek baru madu", 0.09),
    ]

    for line, char_jeda in baris:
        for char in line:
            sys.stdout.write(char)
            sys.stdout.flush()
            sleep(char_jeda)
        print()  # ganti baris setelah satu kalimat selesai
        sleep(0.5)  # jeda antar baris

if __name__ == "__main__":
    print_lirik()
