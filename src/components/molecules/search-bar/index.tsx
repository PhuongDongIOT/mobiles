import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, { toValue: 0.9, duration: 150, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, focused && styles.searchFocused]}>
        <FontAwesome5 name="search" size={16} color={focused ? "#007AFF" : "#A0A4A8"} style={styles.searchIcon} />
        <TextInput
          placeholder="Search by Address, City, or ZIP"
          placeholderTextColor="#A0A4A8"
          style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as Object)]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>

      <TouchableOpacity activeOpacity={0.8} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.filterButton, { transform: [{ scale: scaleAnim }] }]}>
          <FontAwesome5 name="sliders-h" size={20} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // backgroundColor: "#F8F9FB",
    // shadowColor: "#000",
    // shadowOpacity: 0.08,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 6,
    // elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchFocused: {
    borderColor: "#007AFF",
    shadowOpacity: 0.15,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#007AFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
});

export default SearchBar;
