import React, { useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ItemTab {
    key: string;
    label: string;
    icon: string;
}
export interface TabsProps {
    items: ItemTab[];
    activeTab?: number
    onChangeTab?: (index: number) => void
}
const AnimatedTabs: React.FC<TabsProps> = ({ items, activeTab = 0, onChangeTab}) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const handleTabPress = (index: number) => {
        onChangeTab && onChangeTab(index);

        // Move indicator smoothly
        Animated.spring(translateX, {
            toValue: index * 80,
            useNativeDriver: true,
        }).start();

        // Fade out and fade in content
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Press effect
        Animated.spring(scale, {
            toValue: 1.1,
            friction: 3,
            tension: 200,
            useNativeDriver: true,
        }).start(() => {
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={{ width: "100%" }}>
            {/* Tabs Navigation */}
            <View style={styles.container}>
                <Animated.View
                    style={[styles.indicator, { transform: [{ translateX }] }]}
                />
                {items.map((tab, index) => (
                    <Pressable
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => handleTabPress(index)}>
                        <Animated.View
                            style={[
                                styles.iconWrapper,
                                { transform: [{ scale: activeTab === index ? scale : 1 }] },
                            ]}
                        >
                            <Ionicons
                                name={tab.icon as never}
                                size={24}
                                color={activeTab === index ? "#fff" : "#555"}
                            />
                        </Animated.View>
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === index && { color: "#fff", fontWeight: "bold" },
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        justifyContent: "space-around",
        width: 320,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    indicator: {
        position: "absolute",
        width: 80,
        height: "100%",
        backgroundColor: "#007AFF",
        borderRadius: 20,
        left: 0,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    iconWrapper: {
        padding: 4,
        borderRadius: 10,
    },
    tabText: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    content: {
        marginTop: 20,
        padding: 10,
        alignItems: "center",
    },
});

export default AnimatedTabs;