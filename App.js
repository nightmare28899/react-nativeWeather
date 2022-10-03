import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  Appbar,
} from "react-native-paper";
import axios from "axios";
import {Keyboard} from 'react-native'

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleClick = async () => {
    if (text) {
      setLoading(true);

      try {
        await axios
          .get(
            "http://api.weatherstack.com/current?access_key=f7637f7de1d59aaa541469d01e9ed29b&query=" +
              text
          )
          .then((response) => {
            const data = response.data;
            setApiResponse(data);
            setText("");
            Keyboard.dismiss()
          });
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a city name");
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Weather App" />
      </Appbar.Header>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TextInput
          label="Write a city name"
          value={text}
          onChangeText={(valorIngresado) => setText(valorIngresado)}
        />
        <Button icon="information" mode="contained" onPress={handleClick}>
          Get information
        </Button>
        {loading && <ActivityIndicator size="large" />}
        <Text style={{ marginTop: 15, fontWeight: "bold" }}>
          Information:
        </Text>
        {apiResponse != null ? (
          <Text>
            Ciudad: {apiResponse.location.name} {"\n"}Country:{" "}
            {apiResponse.location.region}
            {"\n"}localTime: {apiResponse.location.localtime}
            {"\n"}
            Temperature: {apiResponse.current.temperature}{"\n"}
            Weather: {apiResponse.current.weather_descriptions}{"\n"}
            Humidity: {apiResponse.current.humidity}{"\n"}
            Wind Speed: {apiResponse.current.wind_speed}{"\n"}
            Wind Degree: {apiResponse.current.wind_degree}{"\n"}
            Wind Direction: {apiResponse.current.wind_dir}{"\n"}
            Pressure: {apiResponse.current.pressure}{"\n"}
            Precipitation: {apiResponse.current.precip}{"\n"}
            Cloudcover: {apiResponse.current.cloudcover}{"\n"}
            Feelslike: {apiResponse.current.feelslike}{"\n"}
            UV Index: {apiResponse.current.uv_index}{"\n"}
            Visibility: {apiResponse.current.visibility}{"\n"}
            Icon:{"\n"}
            <Image
              style={{ width: 100, height: 120 }}
              source={  { uri: apiResponse.current.weather_icons[0] }}
            />
          </Text>
        ) : (
          <Text>There's not information</Text>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
  },
});
