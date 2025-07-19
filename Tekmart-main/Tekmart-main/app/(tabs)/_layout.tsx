import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  cartContainer: {
    width: screenWidth < 350 ? 50 : 60,
    height: screenWidth < 350 ? 50 : 60,
    borderRadius: screenWidth < 350 ? 25 : 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // Android-specific shadow fix
    ...(Platform.OS === 'android' ? {
      elevation: 8,
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }),
    top: -10,
  },
  cartIcon: {
    width: screenWidth < 350 ? 30 : 30,
    height: screenWidth < 350 ? 30 : 30,
  },
  cartInnerContainer: {
    backgroundColor: '#1C9174',
    borderRadius: 50,
    padding: 8,
  },
  Icons: {
    width: screenWidth < 350 ? 20 : 24,
    height: screenWidth < 350 ? 20 : 24,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 2,
    minHeight: 50,
    // Android-specific padding fix
    paddingVertical: Platform.OS === 'android' ? 4 : 2,
  },
  label: {
    fontSize: screenWidth < 350 ? 10 : 10,
    marginTop: Platform.OS === 'android' ? 2 : 1, // Android spacing fix
    width: '100%',
    color: 'gray',
    textAlign: 'center',
    flexShrink: 1,
    // Android text rendering fix
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  focusedLabel: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  tabBarStyle: {
    height: screenWidth < 350 ? 65 : 70,
    backgroundColor: '#ECEDEE',
    borderTopWidth: 0,
    // Android-specific shadow and positioning fixes
    ...(Platform.OS === 'android' ? {
      elevation: 10,
      position: 'absolute',
      bottom: 15, // Adjusted for Android
      left: screenWidth < 350 ? 10 : 20,
      right: screenWidth < 350 ? 10 : 20,
      borderRadius: 16,
      paddingBottom: 8, // Consistent padding for Android
      paddingTop: 8,
      paddingHorizontal: 5,
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      position: 'absolute',
      bottom: 20,
      left: screenWidth < 350 ? 10 : 20,
      right: screenWidth < 350 ? 10 : 20,
      borderRadius: 16,
      paddingBottom: 8,
      paddingTop: 8,
      paddingHorizontal: 5,
    }),
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
          // Android-specific item style fixes
          ...(Platform.OS === 'android' && {
            paddingVertical: 4,
            minHeight: 50,
          }),
        },
        // Android-specific screen options
        ...(Platform.OS === 'android' && {
          tabBarActiveTintColor: Colors.light.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is open
        }),
      }}
    >
      <Tabs.Screen
        name="a_home"
        options={{
          title: 'Home', // Add explicit title for Android
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name="home-outline"
                size={screenWidth < 350 ? 20 : 24}
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
                numberOfLines={1}
                adjustsFontSizeToFit={Platform.OS === 'android'} // Android text scaling fix
              >
                Home
              </Text>
            </View>
          ),
          // Android-specific lazy loading fix
          lazy: false,
        }}
      />
      <Tabs.Screen
        name="b_message"
        options={{
          title: 'Message', // Add explicit title for Android
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name='mail-outline'
                size={screenWidth < 350 ? 20 : 24}
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
                numberOfLines={1}
                adjustsFontSizeToFit={Platform.OS === 'android'}
              >
                Message
              </Text>
            </View>
          ),
          lazy: false, // Disable lazy loading for Android
        }}
      />
      <Tabs.Screen
        name="c_cart"
        options={{
          title: 'Cart', // Add explicit title for Android
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
            top: Platform.OS === 'android' ? -3 : -5, // Platform-specific offset
          },
          lazy: false,
        }}
      />
      <Tabs.Screen
        name="d_history"
        options={{
          title: 'History', // Add explicit title for Android
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name='cube-outline'
                size={screenWidth < 350 ? 20 : 24} // Fixed responsive sizing
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
                numberOfLines={1}
                adjustsFontSizeToFit={Platform.OS === 'android'}
              >
                History
              </Text>
            </View>
          ),
          lazy: false,
        }}
      />
      <Tabs.Screen
        name="e_profile"
        options={{
          title: 'Profile', // Add explicit title for Android
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons
                name="person-outline"
                size={screenWidth < 350 ? 20 : 24}
                color={focused ? Colors.light.primary : 'gray'}
              />
              <Text 
                style={[styles.label, focused && styles.focusedLabel]}
                numberOfLines={1}
                adjustsFontSizeToFit={Platform.OS === 'android'}
              >
                Profile
              </Text>
            </View>
          ),
          lazy: false,
        }}
      />
    </Tabs>
  );
}