import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, Dimensions, FlatList, View, ImageBackground, Button } from 'react-native';
import { useContext } from 'react';
import { SupermarketsContext } from './MapContext';
import { MarketItem } from './Search';
import COLORS from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ListItems() {
    const { items, selectedMarket } = useContext(SupermarketsContext);
    const navigation = useNavigation();

    const filterItems = (markets) => {
        const marketItems = markets.filter(item => item.location === selectedMarket);
        return marketItems;
    }

    const renderMarket = ({ item }) => (
        <MarketItem
          marketName={item.marketName}
          location={item.location}
          image={item.image}
          name={item.name}
          expiryDate={item.expiryDate}
          itemsOnSale={item.itemsOnSale}
        />
      );

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.white}}>
            <ImageBackground
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/838485a2e58427926bfd76783e93dcecc690e4e96073aa11272a2c82be1b4d5b?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Entypo name = "back" style = {{paddingLeft: 0.01 * height, paddingTop: 0.01 * height}} size = {0.1 * width} color={COLORS.brown}/>
                </TouchableOpacity>
                <View style = {{flex: 0.1, justifyContent: "center", alignItems: "center", marginTop: 0.05 * height }}>
                    <Text style = {{fontFamily: "Avenir", fontSize: 0.1 * width}}>Items </Text>
                </View>
                <View style = {{flex: 0.9, marginHorizontal: 0.05 * width}}>
                    <FlatList
                        data={filterItems(items)}
                        renderItem={renderMarket}
                        keyExtractor={(item) => item.id}
                        persistentScrollbar={true}
                    />
                </View>
        </ImageBackground>
        </SafeAreaView>
    );
}