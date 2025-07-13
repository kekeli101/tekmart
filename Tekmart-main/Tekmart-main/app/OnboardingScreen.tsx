import React, { useEffect, useRef, FC, } from 'react';
import { useFonts } from 'expo-font';
import {
  Animated,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
const { width, height } = Dimensions.get('window');


interface SlideData {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  subtitleStyle: any;
  imageStyle: any;
}

const slides: SlideData[] = [
  {
    id: '1',
    image: require('../assets/tekmart_images/student.png'),
    title: 'Student Verification',
    subtitle: 'Verify your student status to unlock full access and ensure a trusted business community.',
    subtitleStyle: {    
      position: 'absolute',
      top: 480,
      fontFamily: 'Montserrat-Regular',
      fontSize: 18,
      color: Colors.light.black,
      textAlign: 'center',
      width: '95%' },
    imageStyle: {
      //position: 'absolute',
      top: -30,
      width: 270,
      height: 270,
      resizeMode: 'contain',
    },
  },
  {
    id: '2',
    image: require('../assets/tekmart_images/chat.png'),
    title: 'In-App Messaging',
    subtitle: 'Chat securely with buyers and sellers—no need to share personal contact info.',
    subtitleStyle: {
      position: 'absolute',
      top: 480,
      fontFamily: 'Montserrat-Regular',
      fontSize: 18,
      color: Colors.light.black,
      textAlign: 'center',
      width: '90%' },
    imageStyle: {
      //position: 'absolute',
      top: -40,
      width: 270,
      height: 270,
      resizeMode: 'contain',
    }
  },
  {
    id: '3',
    image: require('../assets/tekmart_images/buyandsell.png'),
    title: 'Buying and Selling',
    subtitle: 'Easily buy and sell within your campus. List items or find what you \nneed fast!',
    subtitleStyle: {
      position: 'absolute',
      top: 480,
      fontFamily: 'Montserrat-Regular',
      fontSize: 17.5,
      color: Colors.light.black,
      textAlign: 'center',
      width: '100%' },
    imageStyle: {
      //position: 'absolute',
      top: -35,
      width: 270,  
      height: 270,
      resizeMode: 'contain',
    }  
  },
  {
    id: '4',
    image: require('../assets/tekmart_images/info.png'),
    title: 'Seller-Buyer Rating',
    subtitle: 'Rate your experience to build trust and help others make informed decisions.',
    subtitleStyle: {
      position: 'absolute',
      top: 480,
      fontFamily: 'Montserrat-Regular',
      fontSize: 18,
      color: Colors.light.black,
      textAlign: 'center',
      width: '91%' },
    imageStyle: {
      //position: 'absolute',
      top: -30,
      width: 270,
      height: 270,
      resizeMode: 'contain',
    },
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


  return (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[item.imageStyle, { transform: [{ scale }] }]}
      />
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={item.subtitleStyle}>{item.subtitle}</Text>
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

  useEffect(() => {}, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    setCurrentIndex(idx);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      ref.current?.scrollToOffset({ offset: (currentIndex + 1) * width });
    } else {
      navigation.navigate('Auth', { screen: 'Login' });
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      ref.current?.scrollToOffset({ offset: (currentIndex - 1) * width });
    }
  };

return (
  <View style={styles.container}>
    <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

    {/* Logo + Progress Bar */}
    <View style={styles.header}>
      <Image source={require('../assets/tekmart_images/TekMart 2.png')} style={styles.logo} />
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
        { useNativeDriver: false },
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
    <Text
      style={[
        styles.nextText,
        currentIndex === slides.length - 1 && styles.getStartedText,
      ]}
    >
      {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
    </Text>
    </TouchableOpacity>
  </View>
</View>
);
};


export default OnboardingScreen;

const styles = StyleSheet.create({
  header: {
  paddingTop: 50,
  alignItems: 'center',
  backgroundColor: Colors.light.background,
},
  container: { flex: 1, backgroundColor: Colors.light.background },
  
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 20,
    height: 6,
    top: 70,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.lightGreen,
  },
  logo: {
    position: 'absolute',
    top: 50,
    width: 50,
    height: 61,
    alignSelf: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: -200,
  },
  slide: {
    width,
    height: height - 280,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  /*slideImage1: {
    //position: 'absolute',
    top: 30,
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  slideImage2: {
    //position: 'absolute',
    top: 30,
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  slideImage3: {
    //position: 'absolute',
    top: 30,
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  slideImage4: {
    //position: 'absolute',
    top: 30,
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },*/
  
  slideTitle: {
    position: 'absolute',
    top: 438,
    fontFamily: 'Montserrat-Bold',
    fontSize: 26.5,
    color: Colors.light.primary,
    textAlign: 'center',
    marginBottom: 10,

  },
  
  /*slideSubtitle: {
    position: 'absolute',
    top: 542,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: Colors.light.black,
    textAlign: 'center',
  }, */

footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 30,
},
arrowButton: {
  padding: 10,
  bottom: 52,
},
arrowButtonPlaceholder: {
  width: 44, 
},
nextButton: {
  backgroundColor: Colors.light.primary,
  paddingHorizontal: 160,
  paddingVertical: 12,
  borderRadius: 5,
  right: 32,
  bottom: 62,
},
nextButtonSmall: {
  backgroundColor: Colors.light.primary,
  paddingHorizontal: 120,
  paddingVertical: 12,
  borderRadius: 5,
  left: -5,
  bottom: 52,
},
nextText: {
  color: Colors.light.background,
  fontFamily: 'InterSemi-Bold',
  fontSize: 14,
},
getStartedButton: {
  backgroundColor: Colors.light.primary,
  paddingHorizontal: 96,
  paddingVertical: 12,
  borderRadius: 5,
  bottom: 52,
  right: 5,
},
getStartedText: {
  color: Colors.light.background,
  fontFamily: 'InterSemi-Bold',
  fontSize: 14,
}
});
