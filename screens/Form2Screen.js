import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import { ThemeContext } from '../contexts/ThemeContext';

const Form2Screen = ({ navigation }) => {
  const { formData, updateFormData } = useContext(FormContext);
  const { updateUser } = useContext(UserContext); // Get updateUser from UserContext
  const { theme } = useContext(ThemeContext);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';

    if (Object.keys(newErrors).length === 0) {
      // Update UserContext with the form data
      updateUser({
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      });

      // Navigate to the PaymentDetails screen
      navigation.navigate('PaymentDetails');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TextInput
        value={formData.address}
        onChangeText={(text) => updateFormData({ address: text })}
        placeholder="Address"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}
      <TextInput
        value={formData.city}
        onChangeText={(text) => updateFormData({ city: text })}
        placeholder="City"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.city && <Text style={styles.error}>{errors.city}</Text>}
      <TextInput
        value={formData.state}
        onChangeText={(text) => updateFormData({ state: text })}
        placeholder="State"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.state && <Text style={styles.error}>{errors.state}</Text>}
      <TextInput
        value={formData.zipCode}
        onChangeText={(text) => updateFormData({ zipCode: text })}
        placeholder="Zip Code"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.zipCode && <Text style={styles.error}>{errors.zipCode}</Text>}
      <Button title="Next" onPress={handleSubmit} />
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Form2Screen;
