import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface ApartmentCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  category: string;
  area: string;
  bedrooms: number;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ image, title, location, price, rating, category, area, bedrooms }) => {
  const scaleAnim = new Animated.Value(1);
  const shadowAnim = new Animated.Value(3);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 100, useNativeDriver: true }),
      Animated.timing(shadowAnim, { toValue: 8, duration: 100, useNativeDriver: false }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(shadowAnim, { toValue: 3, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], elevation: shadowAnim }]}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.rating}>
              <FontAwesome5 name="star" size={14} color="#FFA500" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <Text style={styles.category}>{category}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <FontAwesome5 name="map-marker-alt" size={12} color="#888" />
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="ruler-combined" size={14} color="#666" />
              <Text style={styles.detailText}>{area} sqft</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="bed" size={14} color="#666" />
              <Text style={styles.detailText}>{bedrooms} Bedrooms</Text>
            </View>
          </View>

          <Text style={styles.price}>{price}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#777",
    marginLeft: 4,
  },
  details: {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 6,
  },
});

export default ApartmentCard;
