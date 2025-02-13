import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface GalleryProps {
    images: Array<string>;
}
const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
        scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(images.length - 1);
        }
        scrollRef.current?.scrollTo({ x: (currentIndex - 1) * width, animated: true });
    };

    return (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Gallery ({images.length})</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            >
                {images.map((img, index) => (
                    <Animated.View key={index} style={{ width, alignItems: "center", opacity: fadeAnim }}>
                        <Image source={{ uri: img }} style={{ width: width * 0.9, height: 200, borderRadius: 10 }} />
                    </Animated.View>
                ))}
            </ScrollView>

            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: currentIndex === index ? "#007BFF" : "#ccc",
                            margin: 5,
                        }}
                    />
                ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
                <TouchableOpacity onPress={prevImage} style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>⬅️ Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextImage} style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16 }}>Next ➡️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Gallery;
