import React, { FC, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  StatusBar as RNStatusBar,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onComplete }) => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [overlayVisible, setOverlayVisible] = useState(true);
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setOverlayVisible(false);
      });
    }, 300);

      Animated.timing(fadeAnim2, {
        toValue: 3,
        duration: 9000,
        useNativeDriver: false,
    }).start();

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <RNStatusBar backgroundColor={Colors.light.background} barStyle="light-content" />
        {overlayVisible && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: Colors.light.primary,
                opacity: fadeAnim,
                zIndex: 10,
              },
            ]}
          />
        )}

      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/tekmart_images/TekMart 2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
        <TouchableOpacity
          style={styles.getStartedImage}
          onPress={() => router.push('/OnboardingScreen')}
        >
          <Animated.Image source={require('../assets/tekmart_images/Frame 2.png')} style={{ width: 45, height: 45, opacity: fadeAnim2 }} resizeMode='contain'/>
        </TouchableOpacity>

        <Animated.Text style={[styles.getStartedText, { opacity: fadeAnim2 }]} onPress={() => router.push('/OnboardingScreen')}>Get Started</Animated.Text>

        <View style={styles.FooterText}>
          <Text style={styles.FooterTextContent}>TekMart</Text>
        </View>
      </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    flex: 3,
    justifyContent: 'center',
    width,
  },
  logo: {
    position: 'absolute',
    top: 180,
    width: 160,
    height: 200,
    alignSelf: 'center',
  },
  getStartedImage: {
    position: 'absolute',
    top: 478,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  getStartedText: {
    position: 'absolute',
    top: 537,
    color: Colors.light.black,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  FooterText: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  FooterTextContent: {
    color: Colors.light.lightGreen,
    fontSize: 26,
    fontFamily: 'Inter-Bold',
  },
});



/* Initial Code Snippet (Unknown) */

// import React, { useEffect, useState } from 'react';
// import { View, Text, Dimensions, Image } from 'react-native';
// import { router } from 'expo-router';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSpring,
//   withSequence,
//   withDelay,
//   runOnJS,
//   Easing,
// } from 'react-native-reanimated';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface SplashScreenProps {
//   onComplete?: () => void;
// }

// export default function SplashScreen({ onComplete }: SplashScreenProps) {
//   const [currentStage, setCurrentStage] = useState<'green' | 'logo' | 'ball'>('green');
  
//   // Animation values
//   const greenScreenScale = useSharedValue(0);
//   const greenScreenOpacity = useSharedValue(1);
//   const logoScale = useSharedValue(0);
//   const logoOpacity = useSharedValue(0);
//   const ballY = useSharedValue(-100);
//   const ballScale = useSharedValue(1);
//   const shadowOpacity = useSharedValue(0);
//   const shadowScale = useSharedValue(0.5);

//   useEffect(() => {
//     startAnimationSequence();
//   }, []);

//   const startAnimationSequence = () => {
//     // Stage 1: Green screen spreads from center to edges
//     greenScreenScale.value = withTiming(1, {
//       duration: 800,
//       easing: Easing.out(Easing.quad),
//     });

//     // Green screen stays for 1 second after spreading, then fades out
//     setTimeout(() => {
//       greenScreenOpacity.value = withTiming(0, {
//         duration: 600,
//         easing: Easing.inOut(Easing.quad),
//       }, () => {
//         runOnJS(setCurrentStage)('logo');
//         runOnJS(showLogo)();
//       });
//     }, 1500);
//   };

//   const showLogo = () => {
//     // Stage 2: Show logo with scale animation
//     logoOpacity.value = withTiming(1, { duration: 300 });
//     logoScale.value = withSpring(1, {
//       damping: 8,
//       stiffness: 100,
//     });

//     // Logo stays for 2 seconds then disappears
//     setTimeout(() => {
//       logoOpacity.value = withTiming(0, { duration: 500 }, () => {
//         runOnJS(setCurrentStage)('ball');
//         runOnJS(startBallAnimation)();
//       });
//     }, 2000);
//   };

//   const startBallAnimation = () => {
//     // Stage 3: Ball animation sequence
//     const ballCenterY = 0;
    
//     // Ball drops from top to center
//     ballY.value = withTiming(0, {
//       duration: 800,
//       easing: Easing.out(Easing.quad),
//     }, () => {
//       runOnJS(startBounceSequence)(0);
//     });

//     // Show shadow when ball is dropping
//     shadowOpacity.value = withDelay(400, withTiming(0.3, { duration: 400 }));
//   };

//   const startBounceSequence = (centerY: number) => {
//     const bounceToTop = -300;

//     // First bounce: up to top, fall back to center
//     ballY.value = withSequence(
//       withTiming(bounceToTop, { duration: 700, easing: Easing.out(Easing.quad) }),
//       withTiming(centerY, { duration: 500, easing: Easing.in(Easing.quad) })
//     );

//     ballScale.value = withSequence(
//       withTiming(1.2, { duration: 150 }),
//       withTiming(1, { duration: 150 })
//     );

//     shadowScale.value = withSequence(
//       withTiming(0.8, { duration: 150 }),
//       withTiming(0.5, { duration: 150 })
//     );

//     // Second bounce after 1400ms
//     setTimeout(() => {
//       ballY.value = withSequence(
//         withTiming(bounceToTop, { duration: 600, easing: Easing.out(Easing.quad) }),
//         withTiming(centerY, { duration: 500, easing: Easing.in(Easing.quad) })
//       );

//       ballScale.value = withSequence(
//         withTiming(1.15, { duration: 120 }),
//         withTiming(1, { duration: 120 })
//       );

//       shadowScale.value = withSequence(
//         withTiming(0.7, { duration: 120 }),
//         withTiming(0.5, { duration: 120 })
//       );
//     }, 1400);

//     // Final bounce to top and navigate to onboarding
//     setTimeout(() => {
//       ballY.value = withTiming(bounceToTop, {
//         duration: 600,
//         easing: Easing.in(Easing.quad),
//       });

//       shadowOpacity.value = withTiming(0, { duration: 300 });

//       setTimeout(() => {
//         // TODO: Replace '/onboarding' with your actual onboarding route
//         // For now, navigate directly to tabs until onboarding is built
//         runOnJS(() => router.replace('/home'))();
//       }, 400);
//     }, 2800);
//   };

//   // Animated styles
//   const greenScreenStyle = useAnimatedStyle(() => ({
//     opacity: greenScreenOpacity.value,
//     transform: [{ scale: greenScreenScale.value }],
//   }));

//   const logoStyle = useAnimatedStyle(() => ({
//     opacity: logoOpacity.value,
//     transform: [{ scale: logoScale.value }],
//   }));

//   const ballStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateY: ballY.value },
//       { scale: ballScale.value }
//     ],
//   }));

//   const shadowStyle = useAnimatedStyle(() => ({
//     opacity: shadowOpacity.value,
//     transform: [{ scaleX: shadowScale.value }],
//   }));

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       {/* Green Screen - Spreads from center */}
//       {currentStage === 'green' && (
//         <Animated.View style={[
//           greenScreenStyle, 
//           { 
//             position: 'absolute', 
//             top: SCREEN_HEIGHT / 2, 
//             left: SCREEN_WIDTH / 2, 
//             width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 2, 
//             height: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 2, 
//             backgroundColor: '#10B981',
//             borderRadius: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT),
//             marginLeft: -Math.max(SCREEN_WIDTH, SCREEN_HEIGHT),
//             marginTop: -Math.max(SCREEN_WIDTH, SCREEN_HEIGHT)
//           }
//         ]} />
//       )}
      

//       {/* Logo Stage */}
//       {currentStage === 'logo' && (
//         <Animated.View style={[logoStyle, { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }]}>
//           <View style={{ 
//             width: 120, 
//             height: 120, 
//             borderRadius: 60, 
//             justifyContent: 'center', 
//             alignItems: 'center',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 8,
//             elevation: 8
//           }}>
//             <Image
//               source={require('../assets/tekmart_images/TekMart 2.png')}
//               style={{width: 200, height: 200, resizeMode: 'contain'}}
//             />
//           </View>
//         </Animated.View>
//       )}

//       {/* Ball Stage */}
//       {currentStage === 'ball' && (
//         <View style={{ flex: 1, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' }}>
//           {/* Shadow positioned at center of screen */}
//           <Animated.View 
//             style={[
//               shadowStyle,
//               {
//                 position: 'absolute',
//                 top: SCREEN_HEIGHT / 2 + 40,
//                 width: 100,
//                 height: 15,
//                 borderRadius: 40,
//                 backgroundColor: 'rgba(0,0,0,0.6)'
//               }
//             ]} 
//           />
          
//           {/* Ball */}
//           <Animated.View style={[
//             ballStyle, 
//             { 
//               width: 60, 
//               height: 60, 
//               borderRadius: 30, 
//               backgroundColor: 'white', 
//               position: 'absolute',
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.25,
//               shadowRadius: 4,
//               elevation: 5
//             }
//           ]} />
//         </View>
//       )}
//     </View>
//   );
// }

