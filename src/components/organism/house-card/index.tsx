import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface HouseCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
}

const HouseCard: React.FC<HouseCardProps> = ({ image, title, price, location }) => {
  const [saved, setSaved] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePress = () => {
    setSaved(!saved);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <LinearGradient colors={["rgba(0,0,0,0.3)", "transparent"]} style={styles.overlay} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#777" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {/* <Pressable onPress={handlePress} style={styles.bookmarkButton}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <FontAwesome5 name="bookmark" size={12} color={saved ? "#007AFF" : "#C4C4C4"} solid={saved} />
        </Animated.View>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
  },
  infoContainer: {
    marginTop: 8,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },    
  price: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "400",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#777",
    marginLeft: 6,
  },
  bookmarkButton: {
    position: "absolute",
    bottom: 2,
    right: 12,
    backgroundColor: "#E5F0FF",
    borderRadius: 4,
    padding: 6,
  },
});

export default HouseCard;
