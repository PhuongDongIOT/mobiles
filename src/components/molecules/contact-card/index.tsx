import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface ContactCardProps {
  image: string;
  name: string;
  role: string;
  onEmailPress: () => void;
  onCallPress: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ image, name, role, onEmailPress, onCallPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onEmailPress}
          style={styles.iconButton}
        >
          <FontAwesome5 name="envelope" size={18} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onCallPress}
          style={styles.iconButton}
        >
          <FontAwesome5 name="phone-alt" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    // shadowColor: "#000",
    // shadowOpacity: 0.12,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 8,
    // elevation: 4,
    marginVertical: 8,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  role: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  actions: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(0,122,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactCard;
