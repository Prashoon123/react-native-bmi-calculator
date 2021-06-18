import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { Text } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function App() {
  const [inputHeight, setInputHeight] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const flex = deviceHeight > 680 ? 0.9 : 0.66;
  const flex1 = deviceHeight > 680 ? 1 : 0.7;

  const calculateBmi = () => {
    Keyboard.dismiss();

    let height = Number(inputHeight);
    let weight = Number(inputWeight);

    let bmi = Math.round(weight / (((height / 100) * height) / 100));

    if (!bmi) {
      setBmi("");
      setStatus("");
      setError(true);
      setInputHeight("");
      setInputWeight("");
      console.log(error);
    } else {
      setError("");

      if (bmi <= 18.5) {
        setBmi(`Your BMI is ${bmi}`);
        setStatus("Sorry you are underweight ❌");
      } else if (bmi >= 18.6 && bmi <= 24.9) {
        setBmi(`Your BMI is ${bmi}`);
        setStatus("Congrats your weight is perfect ✅");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setBmi(`Your BMI is ${bmi}`);
        setStatus("Sorry you are overweight ❌");
      } else if (bmi >= 30 && bmi <= 39.9) {
        setBmi(`Your BMI is ${bmi}`);
        setStatus("Sorry you are obese ❌");
      } else if (bmi >= 40 && bmi >= 39.9) {
        setBmi(`Your BMI is ${bmi}`);
        setStatus("Sorry you are extremely obese ❌");
      }
    }

    setInputHeight("");
    setInputWeight("");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#ff6b6b", "#5f27cd"]}
      start={[0, 0]}
      end={[1, 0]}
    >
      <StatusBar style="light" />
      <View
        style={{
          height:
            Platform.OS === "android" ? RNStatusBar.currentHeight - 12 : 0,
        }}
      />
      <View
        style={[styles.bmiContainer, { flex: bmi || error ? flex1 : flex }]}
      >
        <View style={styles.textContainer}>
          <Text h3>BMI Calculator</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Height"
            labelStyle={{ fontWeight: "900" }}
            value={inputHeight}
            onChangeText={(text) => setInputHeight(text)}
            keyboardType="number-pad"
          />
          <View style={{ height: 10 }} />
          <Input
            label="Weight"
            labelStyle={{ fontWeight: "900" }}
            value={inputWeight}
            onChangeText={(text) => setInputWeight(text)}
            keyboardType="number-pad"
          />
          <View style={{ height: 10 }} />

          {error ? (
            <View style={styles.errorContainer}>
              <Text h4 h4Style={{ fontSize: 16 }} style={styles.error}>
                Please enter a valid height and weight.
              </Text>
            </View>
          ) : (
            <View />
          )}

          {bmi ? (
            <View style={styles.resultContainer}>
              <Text h4 h4Style={{ fontSize: 18 }} style={styles.result}>
                {bmi}
              </Text>
              <Text h4 h4Style={{ fontSize: 15 }} style={styles.result}>
                {status}
              </Text>
            </View>
          ) : (
            <View />
          )}

          <View style={{ height: bmi || error ? 20 : 10 }} />

          <LinearGradient
            colors={["#ff6b6b", "#5f27cd"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.buttonContainer}
          >
            <Button onPress={calculateBmi} title="Calculate" />
          </LinearGradient>
          <View style={{ height: 10 }} />
          <Text>Please enter height[cm] and weight[kg]</Text>
          <View style={{ height: 10 }} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bmiContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    padding: 5,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "75%",
  },
  buttonContainer: {
    width: "50%",
    borderRadius: 999,
  },
  resultContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  result: {
    color: "#341f97",
  },
  errorContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
