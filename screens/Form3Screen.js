import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { validateCreditCard, validateExpirationDate, validateCVV } from '../utils/validation';

const Form3Screen = ({ navigation }) => {
  const { formData, updateFormData } = useContext(FormContext);
  const { updateUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!validateCreditCard(formData.creditCard)) newErrors.creditCard = 'Invalid credit card number';
    if (!validateExpirationDate(formData.expirationDate)) newErrors.expirationDate = 'Invalid expiration date';
    if (!validateCVV(formData.cvv)) newErrors.cvv = 'Invalid CVV';

    if (Object.keys(newErrors).length === 0) {
      Alert.alert(
        'Confirm Details',
        'Are you sure you want to save these details?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              updateUser({
                creditCard: formData.creditCard,
                expirationDate: formData.expirationDate,
                cvv: formData.cvv,
                // Include any other relevant form data here
              });
              navigation.navigate('Profile');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TextInput
        value={formData.creditCard}
        onChangeText={(text) => updateFormData({ creditCard: text })}
        placeholder="Credit Card Number"
        keyboardType="numeric"
        maxLength={16}
        style={[styles.input, { color: theme.textColor }]}
      />
      <TextInput
        value={formData.expirationDate}
        onChangeText={(text) => updateFormData({ expirationDate: text })}
        placeholder="Expiration Date (MM/YY)"
        maxLength={5}
        style={[styles.input, { color: theme.textColor }]}
      />
      <TextInput
        value={formData.cvv}
        onChangeText={(text) => updateFormData({ cvv: text })}
        placeholder="CVV"
        keyboardType="numeric"
        maxLength={3}
        style={[styles.input, { color: theme.textColor }]}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default Form3Screen;
