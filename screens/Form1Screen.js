import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext'; // Import UserContext
import { ThemeContext } from '../contexts/ThemeContext';
import { validateEmail, validatePhone } from '../utils/validation';

const Form1Screen = ({ navigation }) => {
  const { formData, updateFormData } = useContext(FormContext);
  const { updateUser } = useContext(UserContext); // Get updateUser from UserContext
  const { theme } = useContext(ThemeContext);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Function to check form validity
  const isFormValid = () => {
    return (
      formData.name &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone)
    );
  };

  useEffect(() => {
    // Update button state based on form validity
    setIsButtonDisabled(!isFormValid());
  }, [formData]);

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';

    if (Object.keys(newErrors).length === 0) {
      // Update UserContext with the form data
      updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      // Navigate to the AddressDetails screen
      navigation.navigate('AddressDetails');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TextInput
        value={formData.name}
        onChangeText={(text) => updateFormData({ name: text })}
        placeholder="Name"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        value={formData.email}
        onChangeText={(text) => updateFormData({ email: text })}
        placeholder="Email"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        value={formData.phone}
        onChangeText={(text) => updateFormData({ phone: text })}
        placeholder="Phone"
        style={[styles.input, { color: theme.textColor }]}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      <Button title="Next" onPress={handleSubmit} disabled={isButtonDisabled} />
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

export default Form1Screen;
