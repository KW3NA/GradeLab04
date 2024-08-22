import React, { useContext } from 'react';
import { View, FlatList, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.backgroundColor }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ color: theme.textColor }}>{item.name}</Text>
        <Text style={{ color: theme.textColor }}>Quantity: {item.quantity}</Text>
        <Text style={{ color: theme.textColor }}>R{(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Button title="-" onPress={() => updateQuantity(item.id, item.quantity - 1)} />
          <Text style={{ color: theme.textColor, marginHorizontal: 10 }}>{item.quantity}</Text>
          <Button title="+" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
        </View>
        <Button title="Remove" onPress={() => removeFromCart(item.id)} />
      </View>
    </View>
  );

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Your total is R${totalCost.toFixed(2)}. Do you want to place this order?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            Alert.alert('Order Confirmed', 'Your order has been placed successfully!');
            clearCart();
            navigation.navigate('Menu');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={[styles.total, { color: theme.textColor }]}>Total: R{totalCost.toFixed(2)}</Text>
      <Button 
        title="Checkout" 
        onPress={handleCheckout}
        disabled={cart.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column', // Display children in a column
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default CartScreen;
