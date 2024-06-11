import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function ListItems() {
    const { items } = useContext(SupermarketsContext);

    return (
        <SafeAreaView>
            <View>
                Hello!
            </View>
        </SafeAreaView>
    );
}