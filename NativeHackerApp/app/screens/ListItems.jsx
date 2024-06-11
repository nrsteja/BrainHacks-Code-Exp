import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useContext } from 'react';
import { SupermarketsContext } from './MapContext';

export default function ListItems() {
    const { items } = useContext(SupermarketsContext);

    return (
        <SafeAreaView>
            <Text>
                Hello!
            </Text>
        </SafeAreaView>
    );
}