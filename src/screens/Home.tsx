import { Button, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'components/UI/Themed';
import { useAppDispatch } from '../store';
import { setAppLanguage } from '../store/slices/appSlice';
import CategoryTabs from '../components/molecules/category-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import HouseCard from '../components/organism/house-card';
import SearchBar from '../components/molecules/search-bar';
import ApartmentCard from '../components/organism/apartment-card';
import SectionHeader from '../components/molecules/section-header';
import WelcomeHeader from '../components/molecules/welcome-header';

const itemWelcome = {
  greeting: "Let's Find your",
  highlightText: "Favorite Home",
  avatarUrl: "https://file4.batdongsan.com.vn/resize/1275x717/2024/12/16/20241216083447-5436_wm.jpg",
}
const categories = ["Recommended", "Top Styles", "Best Offers", "Best Sells", "Best Styles", "More"];
const itemHouse = {
  image: "https://file4.batdongsan.com.vn/resize/1275x717/2024/12/16/20241216083447-5436_wm.jpg",
  title: "Luxury Modern House",
  price: "$340/month",
  location: "Avenue, West Side",
}
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
  const dispatch = useAppDispatch();

  const changeLang = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      dispatch(setAppLanguage(lng));
    } catch (err) {
      console.log(err);
    }
  };

  const [selected, setSelected] = useState("Recommended");

  const onSelected = (itemChoose: string) => setSelected(itemChoose)
  return (
    <View style={styles.container} testID='home-screen'>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/* <Text>{t('home:title')}</Text>
      <Link href='/about'>
        <Text style={styles.link}>{t('home:goToAboutScreen')}</Text>
      </Link>
      <Text>{t('home:changeLang')}</Text>
      <View style={styles.btnContainer}>
        <Button title={t('home:english')} onPress={() => changeLang('en')} />
        <Button title={t('home:german')} onPress={() => changeLang('de')} />
      </View> */}
        <SafeAreaView>
          <WelcomeHeader {...itemWelcome} />
        </SafeAreaView>
        <SearchBar />
        <SafeAreaView style={{ width: "100%", marginVertical: 10 }}>
          <CategoryTabs categories={categories} selected={selected} onSelected={onSelected} />
        </SafeAreaView>
        <SafeAreaView>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={{ width: 160 }}>
              <HouseCard {...itemHouse} />
            </View>
            <View style={{ width: 160 }}>
              <HouseCard {...itemHouse} />
            </View>
            <View style={{ width: 160 }}>
              <HouseCard {...itemHouse} />
            </View>
            <View style={{ width: 160 }}>
              <HouseCard {...itemHouse} />
            </View>
            <View style={{ width: 160 }}>
              <HouseCard {...itemHouse} />
            </View>
          </ScrollView>
        </SafeAreaView>
        <SectionHeader
          title='Near You' />
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
