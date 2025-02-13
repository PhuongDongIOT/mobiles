import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface PropertyInfoProps {
  icon: string;
  value: string;
  label: string;
}

const PropertyInfoCard: React.FC<PropertyInfoProps> = ({ icon, value, label }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <LinearGradient colors={["#ffffff", "#f8f9fa"]} style={styles.gradient}>
        <FontAwesome5 name={icon} size={20} color="#007AFF" />
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    width: "100%",
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
});

export default PropertyInfoCard;
