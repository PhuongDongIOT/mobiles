import React, { useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Animated, Pressable } from "react-native";

interface CategoryTabsProps {
    categories: Array<string>
    selected: string
    onSelected: (itemChoose: string) => void
}
const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selected, onSelected }) => {
    const [animation] = useState(new Animated.Value(0));

    const handlePress = (category: string) => {
        onSelected(category);
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start(() => {
            animation.setValue(0);
        });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {categories.map((category, index) => {
                const isActive = selected === category;
                return (
                    <Pressable key={index} onPress={() => handlePress(category)} style={[styles.tab, isActive && styles.activeTab]}>
                        <Animated.Text style={[styles.text, isActive && styles.activeText, { transform: [{ scale: isActive ? animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) : 1 }] }]}>
                            {category}
                        </Animated.Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // paddingVertical: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 25,
        backgroundColor: "#EDEDED",
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    activeTab: {
        backgroundColor: "#007AFF",
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    text: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
    activeText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default CategoryTabs;
