import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Easing } from "react-native-reanimated";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const progress = new Animated.Value(0.25); // Tiến trình ban đầu

  const animateProgress = (value: number) => {
    Animated.timing(progress, {
      toValue: value,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      animateProgress((step + 1) / 4);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      animateProgress((step - 1) / 4);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>Step {step}/4</Text>
        <Animated.View style={[styles.progressBar, { width: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0%", "100%"],
        }) }]} />
      </View>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter your name" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="example@gmail.com" keyboardType="email-address" />

          <Text style={styles.label}>Age</Text>
          <View style={styles.row}>
            <Picker style={styles.picker}>
              <Picker.Item label="Day" value="" />
              {[...Array(31)].map((_, i) => (
                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
            <Picker style={styles.picker}>
              <Picker.Item label="Month" value="" />
              {["Jan", "Feb", "Mar", "Apr", "May"].map((month, i) => (
                <Picker.Item key={i} label={month} value={month} />
              ))}
            </Picker>
            <Picker style={styles.picker}>
              <Picker.Item label="Year" value="" />
              {[...Array(50)].map((_, i) => (
                <Picker.Item key={i} label={`${1975 + i}`} value={`${1975 + i}`} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radio}>
              <Text>🔘 Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radio}>
              <Text>⚪ Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radio}>
              <Text>⚪ Others</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={prevStep}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 4 && (
          <TouchableOpacity style={styles.button} onPress={nextStep}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default StepForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    margin: 16,
  },
  progressContainer: {
    marginBottom: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  stepText: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  progressBar: {
    height: "100%",
    backgroundColor: "#007bff",
    position: "absolute",
    left: 0,
    top: 0,
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  picker: { flex: 1, height: 40, marginRight: 6 },
  radioGroup: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  radio: { flexDirection: "row", alignItems: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  backButton: { backgroundColor: "#ccc" },
  buttonText: { color: "white", fontWeight: "600" },
});
