import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface SearchHeaderProps {
  title?: string;
  onBackPress?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ title = "Search", onBackPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <FontAwesome5 name="arrow-left" size={18} color="#1D3557" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F8F9FA",
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D3557",
  },
});

export default SearchHeader;
