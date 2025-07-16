import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { FC, useRef } from 'react';
import { router } from 'expo-router';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

interface SlideData {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: '1',
    image: require('../assets/tekmart_images/student.png'),
    title: 'Student Verification',
    subtitle:
      'Verify your student status to unlock \nfull access and ensure a trusted \nbusiness community.',
  },
  {
    id: '2',
    image: require('../assets/tekmart_images/chat.png'),
    title: 'In-App Messaging',
    subtitle:
      'Chat securely with buyers and \nsellers—no need to share personal contact info.',
  },
  {
    id: '3',
    image: require('../assets/tekmart_images/buyandsell.png'),
    title: 'Buying and Selling',
    subtitle:
      'Easily buy and sell within your campus. \nList items or find what you \nneed fast!',
  },
  {
    id: '4',
    image: require('../assets/tekmart_images/info.png'),
    title: 'Seller-Buyer Rating',
    subtitle:
      'Rate your experience to build trust \nand help others make informed \ndecisions.',
  },
];

interface SlideProps {
  item: SlideData;
  index: number;
  scrollX: Animated.Value;
}

const Slide: FC<SlideProps> = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'InterSemi-Bold': require('../assets/fonts/Inter-SemiBold.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[styles.image, { transform: [{ scale }] }]}
      />
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
    </View>
  );
};

interface OnboardingProps {
  navigation: NavigationProp<ParamListBase>;
}

const OnboardingScreen: FC<OnboardingProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const ref = useRef<FlatList<SlideData>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    setCurrentIndex(idx);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      ref.current?.scrollToOffset({ offset: (currentIndex + 1) * width });
    } else {
      router.push('/Login')
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      ref.current?.scrollToOffset({ offset: (currentIndex - 1) * width });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.light.background}
        barStyle="dark-content"
      />

      {/* Logo + Progress Bar */}
      <View style={styles.header}>
        <Image
          source={require('../assets/tekmart_images/TekMart 2.png')}
          style={styles.logo}
        />
        <View style={styles.progressContainer}>
          {slides.map((_, idx) => {
            const isDone = idx <= currentIndex;
            const isLast = idx === slides.length - 1;
            return (
              <View
                key={idx}
                style={[
                  styles.progressSegment,
                  isDone
                    ? { backgroundColor: Colors.light.primary }
                    : { backgroundColor: Colors.light.lightGreen, opacity: 0.3 },
                  !isLast && { marginRight: 6 },
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => (
          <Slide item={item} index={index} scrollX={scrollX} />
        )}
      />

      {/* Footer Buttons */}
      <View style={styles.footer}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={goBack} style={styles.arrowButton}>
            <Image
              source={require('../assets/tekmart_images/Frame 3.png')}
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.arrowButtonPlaceholder} />
        )}

        <TouchableOpacity
          onPress={goNext}
          style={[
            currentIndex === slides.length - 1
              ? styles.getStartedButton
              : currentIndex > 0
              ? styles.nextButtonSmall
              : styles.nextButton,
          ]}
        >
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20,
    height: 6,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.lightGreen,
  },
  logo: {
    width: 50,
    height: 61,
    marginBottom: 22,
    top: height * 0.02,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    top: height * -0.13,
  },
  image: {
    width: width * 0.6,
    aspectRatio: 1,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  slideTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.065,
    color: Colors.light.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  slideSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.04,
    color: Colors.light.black,
    textAlign: 'center',
    lineHeight: width * 0.055,
  },
  footer: {
    position: 'absolute',
    bottom: width * 0.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  arrowButton: { padding: 10,  },
  arrowButtonPlaceholder: { width: 44, },
  nextButton: {
    width: width * 0.85,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    right: width * 0.080,
    bottom: width * 0.021,
    //marginBottom: 1,
  },
  nextButtonSmall: {
    width: width * 0.66,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    left: width * 0.06,

  },
    getStartedButton: {
    width: width * 0.66,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    left: width * 0.06,
  },
  nextText: {
    color: Colors.light.background,
    fontFamily: 'InterSemi-Bold',
    fontSize: width * 0.035,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
});
