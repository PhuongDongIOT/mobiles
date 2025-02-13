import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

interface User {
    name: string;
    avatar: string;
}

interface ReviewCardProps {
    user: User;
    rating: number;
    comment: string;
    images: string[];
    time: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ user, rating, comment, images, time }) => {
    const [helpfulCount, setHelpfulCount] = useState<number>(1);
    const [dislikeCount, setDislikeCount] = useState<number>(2);

    // Animation state
    const scale = useSharedValue(1);

    const handleHelpful = () => {
        setHelpfulCount(helpfulCount + 1);
        scale.value = withSpring(1.2, { damping: 2 }, () => {
            scale.value = withSpring(1);
        });
    };

    const handleDislike = () => {
        setDislikeCount(dislikeCount + 1);
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>

            {/* Comment */}
            <Text style={styles.comment}>{comment}</Text>

            {/* Star Rating */}
            <View style={styles.ratingRow}>
                {[...Array(5)].map((_, index) => (
                    <FontAwesome
                        key={index}
                        name="star"
                        size={16}
                        color={index < rating ? "#FFA500" : "#DDD"}
                    />
                ))}
                <Text style={styles.ratingText}>{rating}</Text>
            </View>


            {/* Helpful Section */}
            <View style={styles.actionsRow}>
                <Text style={styles.helpfulText}>Helpful?</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Pressable onPress={handleHelpful}>
                        <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
                            <AntDesign name="like2" size={18} color="black" />
                        </Animated.View>
                    </Pressable>
                    <Text style={styles.count}>{helpfulCount}</Text>
                    <Pressable onPress={handleDislike}>
                        <AntDesign name="dislike2" size={18} color="black" />
                    </Pressable>
                    <Text style={styles.count}>{dislikeCount}</Text>
                </View>
            </View>
            {/* Images */}
            <View style={styles.imageRow}>
                {images.map((img, index) => (
                    <Image key={index} source={{ uri: img }} style={styles.reviewImage} />
                ))}
            </View>
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginBottom: 12,
    },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    userInfo: { marginLeft: 10 },
    username: { fontWeight: "bold", fontSize: 14 },
    time: { color: "gray", fontSize: 12 },
    comment: { fontSize: 14, marginBottom: 6 },
    ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    ratingText: { marginLeft: 4, fontWeight: "bold", color: "#FFA500" },
    imageRow: { flexDirection: "row", marginTop: 6 },
    reviewImage: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
    actionsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 4 },
    helpfulText: { marginRight: 6, fontSize: 13, fontWeight: "500" },
    iconContainer: { marginHorizontal: 4 },
    count: { marginHorizontal: 4, fontSize: 14 },
});
