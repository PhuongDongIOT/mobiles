import React, { useEffect, useRef } from "react";
import { Text, Image, StyleSheet, Animated, View } from "react-native";

interface WelcomeHeaderProps {
  greeting: string;
  highlightText: string;
  avatarUrl: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ greeting, highlightText, avatarUrl }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current; // Bắt đầu từ vị trí thấp hơn 20px

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View>
        <Text style={styles.lightText}>{greeting} </Text>
        <Text style={styles.boldText}>{highlightText}</Text>
      </View>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
  },
  lightText: {
    color: "#8D99AE",
  },
  boldText: {
    fontWeight: "bold",
    color: "#1D3557",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default WelcomeHeader;
