import { ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'components/UI/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApartmentCard from '../components/organism/apartment-card';
import SearchBar from '../components/molecules/search-bar';

const itemApartment = {
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    title: "Woodland Apartment",
    location: "1012 Ocean Avenue, New York, USA",
    price: "$340/month",
    rating: 4.9,
    category: "Apartment",
    area: "1,225",
    bedrooms: 3,
}

const Home = () => {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.container} testID='home-screen'>
            <SearchBar />
            <ScrollView showsHorizontalScrollIndicator={false}>
                <SafeAreaView>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <ApartmentCard {...itemApartment} />
                        <ApartmentCard {...itemApartment} />
                        <ApartmentCard {...itemApartment} />
                        <ApartmentCard {...itemApartment} />
                        <ApartmentCard {...itemApartment} />
                    </ScrollView>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        gap: 20,
    },
    link: {
        color: 'blue',
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 20,
    },
});

export default Home;
