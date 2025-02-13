import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SectionHeaderProps {
  title: string;
  onPressMore?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPressMore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPressMore}>
        <Text style={styles.more}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D3557",
  },
  more: {
    fontSize: 14,
    color: "#8D99AE",
  },
});

export default SectionHeader;
