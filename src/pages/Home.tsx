import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [metrik, setMetrik] = useState<string>('');
  const [satuanAwal, setSatuanAwal] = useState<string>('');
  const [satuanTujuan, setSatuanTujuan] = useState<string>('');
  const [nilaiMasukan, setNilaiMasukan] = useState<number | null>(null);
  const [hasilKonversi, setHasilKonversi] = useState<number | null>(null);
  const [daftarSatuan, setDaftarSatuan] = useState<string[]>([]);

  useEffect(() => {
    switch (metrik) {
      case 'panjang':
        setDaftarSatuan(['Meter', 'Kilometer', 'Kaki', 'Mil']);
        break;
      case 'berat':
        setDaftarSatuan(['Kilogram', 'Gram', 'Pound', 'Ons']);
        break;
      case 'suhu':
        setDaftarSatuan(['Celsius', 'Fahrenheit', 'Kelvin']);
        break;
      case 'volume':
        setDaftarSatuan(['Liter', 'Mililiter', 'Galon', 'Meter Kubik']);
        break;
      case 'luas':
        setDaftarSatuan(['Meter Persegi', 'Kilometer Persegi', 'Hektar', 'Acre']);
        break;
      default:
        setDaftarSatuan([]);
    }
    setSatuanAwal('');
    setSatuanTujuan('');
  }, [metrik]);

  const handleKonversi = () => {
    if (nilaiMasukan !== null && satuanAwal && satuanTujuan) {
      let hasil: number | null = null;

      if (metrik === 'panjang') {
        hasil = konversiPanjang(nilaiMasukan, satuanAwal, satuanTujuan);
      } else if (metrik === 'berat') {
        hasil = konversiBerat(nilaiMasukan, satuanAwal, satuanTujuan);
      } else if (metrik === 'suhu') {
        hasil = konversiSuhu(nilaiMasukan, satuanAwal, satuanTujuan);
      } else if (metrik === 'volume') {
        hasil = konversiVolume(nilaiMasukan, satuanAwal, satuanTujuan);
      } else if (metrik === 'luas') {
        hasil = konversiLuas(nilaiMasukan, satuanAwal, satuanTujuan);
      }

      // Membulatkan hasil
      if (hasil !== null) {
        setHasilKonversi(Number.isInteger(hasil) ? Math.round(hasil) : parseFloat(hasil.toFixed(2)));
      }
    }
  };

  const konversiPanjang = (nilai: number, dari: string, ke: string): number => {
    const rasioPanjang: { [key: string]: number } = {
      Meter: 1,
      Kilometer: 1000,
      Kaki: 0.3048,
      Mil: 1609.34,
    };
    return (nilai * rasioPanjang[dari]) / rasioPanjang[ke];
  };

  const konversiBerat = (nilai: number, dari: string, ke: string): number => {
    const rasioBerat: { [key: string]: number } = {
      Kilogram: 1,
      Gram: 0.001,
      Pound: 0.453592,
      Ons: 0.0283495,
    };
    return (nilai * rasioBerat[dari]) / rasioBerat[ke];
  };

  const konversiSuhu = (nilai: number, dari: string, ke: string): number | null => {
    if (dari === 'Celsius' && ke === 'Fahrenheit') {
      return (nilai * 9) / 5 + 32;
    } else if (dari === 'Fahrenheit' && ke === 'Celsius') {
      return ((nilai - 32) * 5) / 9;
    } else if (dari === 'Celsius' && ke === 'Kelvin') {
      return nilai + 273.15;
    } else if (dari === 'Kelvin' && ke === 'Celsius') {
      return nilai - 273.15;
    } else if (dari === 'Fahrenheit' && ke === 'Kelvin') {
      return ((nilai - 32) * 5) / 9 + 273.15;
    } else if (dari === 'Kelvin' && ke === 'Fahrenheit') {
      return ((nilai - 273.15) * 9) / 5 + 32;
    }
    return nilai;
  };

  const konversiVolume = (nilai: number, dari: string, ke: string): number => {
    const rasioVolume: { [key: string]: number } = {
      Liter: 1,
      Mililiter: 0.001,
      Galon: 3.78541,
      'Meter Kubik': 1000,
    };
    return (nilai * rasioVolume[dari]) / rasioVolume[ke];
  };

  const konversiLuas = (nilai: number, dari: string, ke: string): number => {
    const rasioLuas: { [key: string]: number } = {
      'Meter Persegi': 1,
      'Kilometer Persegi': 1e6,
      Hektar: 10000,
      Acre: 4046.86,
    };
    return (nilai * rasioLuas[dari]) / rasioLuas[ke];
  };

  return (
    <IonPage className="page-container">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="app-title">Konverter Metrik</IonTitle>
          <h5 className="app-subtitle">By: Gio Gosal</h5>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-container">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Pilih Metrik:</IonLabel>
                <IonSelect value={metrik} placeholder="Pilih Metrik" onIonChange={(e) => setMetrik(e.detail.value)}>
                  <IonSelectOption value="panjang">Panjang</IonSelectOption>
                  <IonSelectOption value="berat">Berat</IonSelectOption>
                  <IonSelectOption value="suhu">Suhu</IonSelectOption>
                  <IonSelectOption value="volume">Volume</IonSelectOption>
                  <IonSelectOption value="luas">Luas</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Pilih Satuan Awal:</IonLabel>
                <IonSelect value={satuanAwal} placeholder="Pilih Satuan" onIonChange={(e) => setSatuanAwal(e.detail.value)}>
                  {daftarSatuan.map((satuan) => (
                    <IonSelectOption key={satuan} value={satuan}>
                      {satuan}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Pilih Satuan Tujuan:</IonLabel>
                <IonSelect value={satuanTujuan} placeholder="Pilih Satuan" onIonChange={(e) => setSatuanTujuan(e.detail.value)}>
                  {daftarSatuan
                    .filter((satuan) => satuan !== satuanAwal)
                    .map((satuan) => (
                      <IonSelectOption key={satuan} value={satuan}>
                        {satuan}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Masukkan Nilai</IonLabel>
                <IonInput type="number" placeholder="Masukkan Angka" value={nilaiMasukan ?? ''} onIonChange={(e) => setNilaiMasukan(parseFloat(e.detail.value ?? '') || null)} />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" className="convert-button" onClick={handleKonversi}>
                Konversi
              </IonButton>
            </IonCol>
          </IonRow>

          {hasilKonversi !== null && (
            <IonRow>
              <IonCol>
                <IonCard className="result-card">
                  <IonCardContent className="result-content">
                    <h3 className="result-text">
                      Hasil: {hasilKonversi} {satuanTujuan}
                    </h3>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
