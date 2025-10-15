import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth, API_URL } from '../../context/AuthContext';

// Async function to fetch asset details from the API
const fetchAssetDetails = async (code: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/find/${code}`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    });
    return await response.json();
  } catch (e) {
    console.error("Fetch asset details error:", e);
    return { error: 'Network request failed' };
  }
};

// Component for a single row of data
const DetailRow = ({ label, value, isEditing, onChangeText, styles }) => {
    // Hide internal fields
    if (['id', 'created_at', 'updated_at', 'barcode'].includes(label)) {
        return null;
    }
    
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label.replace(/_/g, ' ').toUpperCase()}</Text>
            {isEditing ? (
              <TextInput style={styles.input} value={String(value || '')} onChangeText={onChangeText} />
            ) : (
              <Text style={styles.value}>{String(value || 'N/A')}</Text>
            )}
        </View>
    );
};

// Main screen component
export default function AssetDetailScreen() {
  const { nibar: code } = useLocalSearchParams<{ nibar: string }>();
  const router = useRouter();
  const { session } = useAuth();
  
  const [assetData, setAssetData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // --- CHANGE FOR DARK MODE ---
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode); // Get dynamic styles
  // --- END OF CHANGE ---

  useEffect(() => {
    if (!code || !session) return;
    const loadData = async () => {
      setIsLoading(true);
      const response = await fetchAssetDetails(code, session);
      
      if (response && response.data) {
        setAssetData(response.data);
        setOriginalData(response.data);
      } else {
        Alert.alert('Error', 'Asset not found in database.', [{ text: 'OK', onPress: () => router.back() }]);
      }
      setIsLoading(false);
    };
    loadData();
  }, [code, session]);

  const handleInputChange = (field, text) => {
    const editableFields = ['lokasi', 'nama_pemakai', 'status_pemakai', 'jabatan', 'keterangan'];
    if (editableFields.includes(field)) {
        setAssetData(prevData => ({ ...prevData, [field]: text }));
    }
  };

  const handleSave = async () => {
    if (!assetData?.id || !session) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/asset/${assetData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(assetData),
      });
      if (!response.ok) throw new Error('Failed to save changes');
      
      const result = await response.json();

      if (result && result.data) {
          setAssetData(result.data);
          setOriginalData(result.data);
          setIsEditing(false);
          Alert.alert('Success', 'Asset data has been updated.');
      } else {
          throw new Error('Server did not return updated data.');
      }
    } catch (e) {
      console.error("Save error:", e);
      Alert.alert('Error', 'Could not save changes.');
    } finally {
        setIsLoading(false);
    }
  };
  
  const getEditableStatus = (key) => {
    const editableFields = ['lokasi', 'nama_pemakai', 'status_pemakai', 'jabatan', 'keterangan'];
    return isEditing && editableFields.includes(key);
  }

  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /><Text style={styles.loadingText}>Fetching asset data...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      {assetData && Object.entries(assetData).map(([key, value]) => (
        <DetailRow 
            key={key} 
            label={key} 
            value={value} 
            isEditing={getEditableStatus(key)} 
            onChangeText={(text) => handleInputChange(key, text)}
            styles={styles} // Pass dynamic styles to the child component
        />
      ))}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <Button title="Save Changes" onPress={handleSave} color="#28a745" />
            <View style={{ marginTop: 10 }}><Button title="Cancel" onPress={() => { setIsEditing(false); setAssetData(originalData); }} color="#dc3545" /></View>
          </>
        ) : (
          <Button title="Edit Data" onPress={() => setIsEditing(true)} />
        )}
        <View style={{ marginTop: 10 }}><Button title="Scan Another Asset" onPress={() => router.back()} color="#6c757d" /></View>
      </View>
    </ScrollView>
  );
}

// --- STYLESHEET UPDATED FOR DARK MODE ---
const getStyles = (isDarkMode) => StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#111827' : '#f3f4f6',
  },
  loadingText: {
    color: isDarkMode ? '#d1d5db' : '#4b5563',
  },
  container: { 
    flex: 1, 
    backgroundColor: isDarkMode ? '#111827' : '#f3f4f6',
  },
  row: { 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb', 
    backgroundColor: isDarkMode ? '#1f2937' : 'white',
  },
  label: { 
    fontSize: 12, 
    color: isDarkMode ? '#9ca3af' : '#6b7280', 
    marginBottom: 4, 
    fontWeight: 'bold' 
  },
  value: { 
    fontSize: 16, 
    color: isDarkMode ? '#f9fafb' : '#1f2937' 
  },
  input: { 
    fontSize: 16, 
    color: isDarkMode ? '#f9fafb' : '#111827', 
    borderWidth: 1, 
    borderColor: isDarkMode ? '#4b5563' : '#ced4da', 
    borderRadius: 5, 
    padding: 8, 
    backgroundColor: isDarkMode ? '#374151' : '#fff'
  },
  buttonContainer: { 
    margin: 20 
  },
});