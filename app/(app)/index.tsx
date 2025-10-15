import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Svg, Path } from 'react-native-svg';

// Icon Components (Inline SVG for simplicity)
const InfoIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <Path d="M12 16V12" />
    <Path d="M12 8H12.01" />
  </Svg>
);

const ScanIcon = ({ color, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <Path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <Path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <Path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <Path d="M7 12h10" />
  </Svg>
);

const ListIcon = ({ color }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M8 6h13" />
        <Path d="M8 12h13" />
        <Path d="M8 18h13" />
        <Path d="M3 6h.01" />
        <Path d="M3 12h.01" />
        <Path d="M3 18h.01" />
    </Svg>
);


// Main Component for the Home Screen
export default function HomeScreen() {
  const router = useRouter();
  const [manualBarcode, setManualBarcode] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = getStyles(isDarkMode);

  // Function to handle the manual search
  const handleManualSearch = () => {
    if (!manualBarcode.trim()) {
      Alert.alert('Empty Input', 'Please enter a barcode number or NIBAR.');
      return;
    }
    // Navigate to the details page with the barcode as a parameter
    router.push({ pathname: '/details', params: { nibar: manualBarcode.trim() } });
    setManualBarcode('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Card: Search Asset */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
            <ScanIcon color="#3b82f6" size={20} />
            <Text style={styles.cardTitle}>Cari Aset dengan Barcode</Text>
        </View>
        <Text style={styles.cardSubtitle}>Scan barcode atau masukkan nomor secara manual</Text>

        <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/scanner')}>
          <ScanIcon color="white" size={20}/>
          <Text style={styles.scanButtonText}>Scan dengan kamera</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>OR</Text>

        <TextInput
          style={styles.input}
          placeholder="Type barcode number (e.g., 1234567)"
          placeholderTextColor="#9ca3af"
          value={manualBarcode}
          onChangeText={setManualBarcode}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleManualSearch}>
          <Text style={styles.searchButtonText}>Cari Aset</Text>
        </TouchableOpacity>
      </View>

      {/* Card: About the App */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
            <InfoIcon color="#3b82f6" />
            <Text style={styles.cardTitle}>Tentang Aplikasi Ini</Text>
        </View>
        <Text style={styles.cardContent}>
            Aplikasi ini memudahkan pengelolaan dan pemantauan aset milik Dinas Tenaga Kerja Kota Semarang. Gunakan fitur pemindaian barcode untuk mengakses informasi detail setiap aset.
        </Text>
      </View>
      
      {/* Card: Quick Guide */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
            <ListIcon color="#3b82f6" />
            <Text style={styles.cardTitle}>Panduan</Text>
        </View>
        <View style={styles.guideStep}>
            <View style={styles.guideNumberContainer}><Text style={styles.guideNumber}>1</Text></View>
            <Text style={styles.guideText}>Masukkan nomor barcode di kolom pencarian atau klik "Scan dengan Kamera".</Text>
        </View>
        <View style={styles.guideStep}>
            <View style={styles.guideNumberContainer}><Text style={styles.guideNumber}>2</Text></View>
            <Text style={styles.guideText}>Jika menggunakan kamera, izinkan akses kamera saat diminta.</Text>
        </View>
        <View style={styles.guideStep}>
            <View style={styles.guideNumberContainer}><Text style={styles.guideNumber}>3</Text></View>
            <Text style={styles.guideText}>Arahkan kamera ke barcode atau ketik nomor secara manual.</Text>
        </View>
        <View style={styles.guideStep}>
            <View style={styles.guideNumberContainer}><Text style={styles.guideNumber}>4</Text></View>
            <Text style={styles.guideText}>Detail aset akan ditampilkan setelah scan berhasil.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Function to get dynamic styles based on light/dark mode
const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#111827' : '#f3f4f6',
    },
    contentContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: isDarkMode ? '#e5e7eb' : '#111827',
        marginLeft: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: isDarkMode ? '#9ca3af' : '#6b7280',
        marginBottom: 16,
    },
    cardContent: {
        fontSize: 14,
        color: isDarkMode ? '#d1d5db' : '#4b5563',
        lineHeight: 20,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 12,
    },
    scanButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    orText: {
        textAlign: 'center',
        color: isDarkMode ? '#9ca3af' : '#6b7280',
        marginVertical: 8,
        fontSize: 12,
        fontWeight: '500',
    },
    input: {
        height: 48,
        borderColor: isDarkMode ? '#4b5563' : '#d1d5db',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
        color: isDarkMode ? '#f9fafb' : '#111827',
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
    },
    searchButton: {
        backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButtonText: {
        color: isDarkMode ? '#f9fafb' : '#1f2937',
        fontSize: 16,
        fontWeight: '600',
    },
    guideStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    guideNumberContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    guideNumber: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    guideText: {
        flex: 1,
        fontSize: 14,
        color: isDarkMode ? '#d1d5db' : '#4b5563',
        lineHeight: 22,
    },
});