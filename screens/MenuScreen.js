// src/screens/MenuScreen.js
import React, { useContext } from 'react';
import { View, FlatList, Text, Image, Button, StyleSheet } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { menuItems } from '../data/menuItems';

const MenuScreen = () => {
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.backgroundColor }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.textColor }]}>{item.name}</Text>
      <Text style={[styles.description, { color: theme.textColor }]}>{item.description}</Text>
      <Text style={[styles.price, { color: theme.textColor }]}>R{item.price.toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MenuScreen;