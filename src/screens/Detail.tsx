import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import PropertyInfoCard from "../components/molecules/property-info-card";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactCard from "../components/molecules/contact-card";
import Heading from "../components/molecules/heading";
import Tabs from "../components/atoms/tabs";
import { Text } from "../components/UI/Themed";
import { PhotoGallery } from 'react-native-photos-gallery';
import ReviewCard from "../components/organism/review-card";
import Index from "./Index";
import StepForm from "../components/organism/step-form";
// import Gallery from "../components/molecules/gallery";

const itemContact = {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Sandeep S.",
    role: "Partner",
    onEmailPress: () => Alert.alert("Email Pressed"),
    onCallPress: () => Alert.alert("Call Pressed")
}
const tabs = [
    { key: "home", label: "Home", icon: "home-outline" },
    { key: "search", label: "Search", icon: "search-outline" },
    { key: "profile", label: "Profile", icon: "person-outline" },
    { key: "profile", label: "Profile", icon: "person-outline" },
    // { key: "profile", label: "Profile", icon: "person-outline" },
];

export const data = [
    {
        id: 1,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 2,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 3,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 4,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 5,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 6,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 7,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
    {
        id: 8,
        source: {
            uri: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
    },
];

const itemReview = {
    user: {
        name: "Sandeep S.",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    time: "2 months ago",
    comment: "Lorem Ipsum is simply dummy text of the printing.",
    rating: 5,
    images: [
        'https://randomuser.me/api/portraits/women/45.jpg',
        'https://randomuser.me/api/portraits/women/45.jpg',
    ]
}

export default function Detail() {

    const [activeTab, setActiveTab] = useState(0);
    const onChangeTab = (index: number) => setActiveTab(index)
    const content = [
        (
            <SafeAreaView style={styles.container}>
                <View style={styles.containerSection}>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="ruler-combined" value="1,225" label="sqft" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="bed" value="3.0" label="Bedrooms" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="bath" value="1.0" label="Bathrooms" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                </View>
                <View style={styles.paddingContainer}>
                    <Heading title="Address" actionText="View on Map" onPress={() => Alert.alert("Opening Map...")} />
                </View>
                <ContactCard {...itemContact} />
                <View style={styles.paddingContainer}>
                    <Heading title="Address" actionText="View on Map" onPress={() => Alert.alert("Opening Map...")} />
                </View>
                <View style={[styles.containerSection, { justifyContent: 'flex-start', flexWrap: "wrap" }]}>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="ruler-combined" value="1,225" label="sqft" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="bed" value="3.0" label="Bedrooms" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="bath" value="1.0" label="Bathrooms" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                    <View style={{ width: 90 }}>
                        <PropertyInfoCard icon="shield-alt" value="4,457" label="Safety Rank" />
                    </View>
                </View>
            </SafeAreaView>
        ),
        (
            <View style={{ width: "100%" }}>
                <SafeAreaView style={styles.screen}>
                    <Index />
                </SafeAreaView>
            </View>
        ),
        (
            <SafeAreaView style={{...styles.container, paddingHorizontal: 20}}>
                <ReviewCard {...itemReview} />
            </SafeAreaView>
        ),
        (
            <SafeAreaView style={{...styles.container, paddingHorizontal: 20}}>
                <StepForm />
            </SafeAreaView>
        ),
    ]
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{ paddingBottom: 10 }}>
                <Tabs items={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
            </View>
            {content[activeTab]}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    modalBackgroundStyle: {
        backgroundColor: 'white',
    },
    container: {
        width: "100%",
        height: 600,
        backgroundColor: "#fff",
        flex: 1
    },
    paddingContainer: {
        paddingHorizontal: 12,
    },
    containerSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        gap: 4,
    },
});
