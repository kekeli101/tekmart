import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  cartContainer: {
    width: screenWidth < 350 ? 50 : 60, // Responsive cart size
    height: screenWidth < 350 ? 50 : 60,
    borderRadius: screenWidth < 350 ? 25 : 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top: -10, // Reduced elevation to prevent overlap
  },
  cartIcon: {
    width: screenWidth < 350 ? 30 : 30, // Responsive icon size
    height: screenWidth < 350 ? 30 : 30,
    
  },
  cartInnerContainer:{
    backgroundColor: '#1C9174',
    borderRadius: 50,
    padding: 8,
  },
  Icons: {
    width: screenWidth < 350 ? 20 : 24, // Responsive icon size
    height: screenWidth < 350 ? 20 : 24,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 2, // Prevent overflow
    minHeight: 50, // Ensure consistent height
  },
  label: {
    fontSize: screenWidth < 350 ? 10 : 10, // Adjusted responsive font size
    marginTop: 1,
    width: '100%',
    color: 'gray',
    textAlign: 'center',
    flexShrink: 1, // Allow text to shrink if needed
    // Removed maxWidth to allow full text to show, relying on flexShrink and fontSize
  },
  focusedLabel: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  // Responsive tab bar styles
  tabBarStyle: {
    height: screenWidth < 350 ? 65 : 70, // Responsive height
    backgroundColor: '#ECEDEE',
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: screenWidth < 350 ? 10 : 20, // Responsive margins
    right: screenWidth < 350 ? 10 : 20,
    borderRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 8 : 6,
    paddingTop: 8,
    paddingHorizontal: 5, // Add horizontal padding
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="a_home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name="home-outline"
                size={screenWidth < 350 ? 20 : 24}
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="b_message"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../../assets/icons/mail.png')}
                style={[
                  styles.Icons,
                  { tintColor: focused ? Colors.light.primary : 'gray' },
                ]}
                resizeMode="contain"
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
              >
                Message
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="c_cart"
        options={{
          tabBarIcon: () => (
            <View style={styles.cartContainer}>
              <View style={styles.cartInnerContainer}>
              <Image
                source={require('../../assets/icons/cart.png')}
                style={[styles.cartIcon]}
                resizeMode="contain"
              />
              </View>
            </View>
          ),
          tabBarItemStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            top: -5, // Reduced offset
          },
        }}
      />
      <Tabs.Screen
        name="d_history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../../assets/icons/message.png')}
                style={[
                  styles.Icons,
                  { tintColor: focused ? Colors.light.primary : 'gray' },
                ]}
                resizeMode="contain"
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
              >
                History
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="e_profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name="person-outline"
                size={screenWidth < 350 ? 20 : 24}
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}