import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import COLORS from '../constants/colors'; // Assuming COLORS is exported from this path
import { generateEmojiForItem } from '../api/emoji';

const ShowRecipe = ({ route }) => {
  const { location, name, image, marketName, ingredients, instructions } = route.params;
  const [emojiMap, setEmojiMap] = useState({});

  useEffect(() => {
    const fetchEmojis = async () => {
      const newEmojiMap = {};
      for (const ingredient of ingredients) {
        const emoji = await generateEmojiForItem(ingredient);
        newEmojiMap[ingredient] = emoji;
      }
      setEmojiMap(newEmojiMap);
    };
    fetchEmojis();
  }, [ingredients]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/838485a2e58427926bfd76783e93dcecc690e4e96073aa11272a2c82be1b4d5b?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={{ flex: 1 }}>
      <ScrollView style={styles.scrollContainer}>
        <View style = {{alignItems: "center"}}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>Find in {marketName}, {location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Ingredients</Text>
          <View style={styles.list}>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientBox}>
                  <Text style={styles.ingredientText}>
                    {emojiMap[ingredient] || '🛒'} {ingredient}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.item}>No ingredients listed.</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Instructions</Text>
          <View style={styles.list}>
            {instructions.length > 0 ? (
              instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionBox}>
                  <Text style={styles.instructionIndex}>{index + 1}.</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.item}>No instructions listed.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
  },
  scrollContainer: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
    textAlign: "center"
  },
  location: {
    fontSize: 18,
    color: COLORS.brown,
    marginBottom: 20,
    textAlign: "center"
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  list: {
    marginLeft: 10,
    marginBottom: 20,
  },
  ingredientBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.light_gray,
    borderRadius: 8,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: COLORS.black,
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: COLORS.light_gray,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructionIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 10,
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.black,
    flexShrink: 1,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
    color: COLORS.black,
  },
});

export default ShowRecipe;