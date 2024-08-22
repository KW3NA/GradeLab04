import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { theme, updateTheme } = useContext(ThemeContext);

  // Define color options
  const [isDefaultColor, setIsDefaultColor] = useState(true);
  const defaultTextColor = '#000000'; // Default text color
  const alternateTextColor = '#FF6347'; // Alternate text color

  const defaultBackgroundColor = '#FFFFFF'; // Default background color
  const alternateBackgroundColor = '#1a1625'; // Alternate background color

  const toggleTextColor = () => {
    updateTheme({ textColor: isDefaultColor ? alternateTextColor : defaultTextColor });
    setIsDefaultColor(!isDefaultColor);
  };

  const toggleBackgroundColor = () => {
    updateTheme({ backgroundColor: isDefaultColor ? alternateBackgroundColor : defaultBackgroundColor });
    setIsDefaultColor(!isDefaultColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Personal Details</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>{user.name}</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>{user.email}</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>{user.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Address Details</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>{user.address}</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>{user.city}, {user.state} {user.zipCode}</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Theme Settings</Text>
        <Button title="Toggle Text Color" onPress={toggleTextColor} />
        <Button title="Toggle Background Color" onPress={toggleBackgroundColor} />
      </View>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ProfileScreen;
