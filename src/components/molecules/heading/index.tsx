import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

interface HeadingProps {
  title: string;
  actionText?: string;
  onPress?: () => void;
}

const Heading: React.FC<HeadingProps> = ({ title, actionText, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionText && onPress && (
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          <Animated.Text style={[styles.actionText, { transform: [{ scale: scaleAnim }] }]}>
            {actionText}
          </Animated.Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  actionText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default Heading;
