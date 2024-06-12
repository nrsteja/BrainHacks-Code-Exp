import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet, Dimensions, FlatList, View } from 'react-native';
import { useContext } from 'react';
import { SupermarketsContext } from './MapContext';
import { MarketItem } from './Search';
import COLORS from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ListItems() {
    const { items, selectedMarket } = useContext(SupermarketsContext);

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
            <View style = {{flex: 0.1, justifyContent: "center", alignItems: "center"}}>
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
        </SafeAreaView>
    );
}