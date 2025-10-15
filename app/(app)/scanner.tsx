import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TextInput, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; 
import { useRouter } from 'expo-router';
import type { BarcodeScanningResult } from 'expo-camera';

// Mengambil lebar layar perangkat untuk menghitung ukuran kotak scan secara dinamis
const { width } = Dimensions.get('window');
const scanBoxWidth = width * 0.7;
const scanBoxHeight = width * 0.5;

// Komponen utama untuk layar scan
export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [manualNibar, setManualNibar] = useState(''); // State for the manual input
  const router = useRouter();

  const navigateToDetails = (nibar: string) => {
    if (!nibar.trim()) {
        Alert.alert("Input Error", "Please enter a barcode number.");
        return;
    }
    // Reset the scanned state and input field before navigating
    setScanned(true); 
    setManualNibar('');
    router.push({ pathname: '/details', params: { nibar: nibar.trim() } });
  };

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (scanningResult.data && !scanned) { 
      navigateToDetails(scanningResult.data);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "ean13", "code39"], // Added code39 for more barcode types
        }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.darkOverlay}>
          <Text style={styles.instructions}>Arahkan kamera ke barcode aset</Text>
        </View>

        <View style={styles.middleRow}>
          <View style={styles.darkOverlay} />
          <View style={styles.scanBox} />
          <View style={styles.darkOverlay} />
        </View>

        {/* This bottom section now contains the manual input field */}
        <View style={styles.darkOverlay}>
            <Text style={styles.orText}>atau</Text>
            <TextInput
                style={styles.input}
                placeholder="Ketik Nomor Barcode Manual"
                placeholderTextColor="#999"
                value={manualNibar}
                onChangeText={setManualNibar}
            />
            <Button
                title="Cari Aset"
                onPress={() => navigateToDetails(manualNibar)}
                color="#007BFF"
            />
        </View>
      </View>

      {/* When a scan is successful, show a 'Scan Again' button */}
      {scanned && (
        <View style={styles.rescanButtonContainer}>
          <Button title={'Scan Ulang'} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

// Kumpulan styles untuk mengatur tampilan komponen di layar ini
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add padding for the input field
  },
  middleRow: {
    flexDirection: 'row',
    height: scanBoxHeight,
  },
  scanBox: { 
    width: scanBoxWidth, 
    height: scanBoxHeight, 
    borderWidth: 2, 
    borderColor: '#4CAF50', 
    borderRadius: 10,
  },
  instructions: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center',
    paddingBottom: 20,
  },
  // NEW STYLES for manual input
  orText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  // Repurposed the old rescan button style
  rescanButtonContainer: { 
    position: 'absolute', 
    bottom: 40, 
    left: '25%', 
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  }
});