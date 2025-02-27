import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const SecureStorageExample = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [storedData, setStoredData] = useState("");

  // Guardar datos en SecureStore
  const saveData = async () => {
    try {
      await SecureStore.setItemAsync("userData", data);
      setTempData(data);
      Alert.alert("Guardado", "Dato guardado en SecureStore.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  // Cargar datos desde SecureStore
  const loadData = async () => {
    try {
      const value = await SecureStore.getItemAsync("userData");
      if (value) {
        setStoredData(value);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el dato.");
    }
  };

  // Eliminar datos de SecureStore
  const clearData = async () => {
    try {
      await SecureStore.deleteItemAsync("userData");
      setStoredData("");
      Alert.alert("Eliminado", "Elemento eliminado de SecureStore.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  // Cargar el dato almacenado al iniciar la app
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Ingresa un dato:</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Guardar Dato" style={{ marginVertical: 5 }} onPress={saveData} />
      <Button title="Cargar Dato" onPress={loadData} />
      <Button title="Eliminar Dato" onPress={clearData} />
      {storedData ? <Text>Dato guardado en SecureStore: {storedData}</Text> : null}
      <Text>Dato Temporal: {tempData}</Text>
    </View>
  );
};

export default SecureStorageExample;
