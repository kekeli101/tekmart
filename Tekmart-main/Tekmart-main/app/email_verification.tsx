import React, { useState, useEffect, FC, useRef } from "react";
import { router, Link } from 'expo-router';
import { 
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    logoContainer:{
        alignItems: 'center',
        marginBottom: height * 0.04,
        paddingTop: height * 0.02,
    },  

    logo:{
        width: width * 0.25,
        height: width * 0.25,
    }, 

    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    otpInput: {
        width: width * 0.13,
        height: width * 0.15,
        borderWidth: 2,
        borderColor: '#e1e5e9',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#333',
    },
    otpInputFocused: {
        borderColor: 'gray',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    otpInputFilled: {
        borderColor: Colors.light.primary,
        backgroundColor: '#f8fff9',
    },
    verifyButton: {
        backgroundColor:Colors.light.primary ,
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    verifyButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#dc3545',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
    },
    resendContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resendText: {
        color: '#666',
        fontSize: 14,
    },
    resendLink: {
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
});

const EmailVerification: FC = () => {
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const input1Ref = useRef<TextInput>(null);
    const input2Ref = useRef<TextInput>(null);
    const input3Ref = useRef<TextInput>(null);
    const input4Ref = useRef<TextInput>(null);
    const input5Ref = useRef<TextInput>(null);
    const input6Ref = useRef<TextInput>(null);
    
    const inputRefs = [input1Ref, input2Ref, input3Ref, input4Ref, input5Ref, input6Ref];
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    // Focus first input on component mount
    useEffect(() => {
        if (input1Ref.current) {
            input1Ref.current.focus();
        }
    }, []);

    // Update code when otp changes
    const code = otp.join('');

    const handleOtpChange = (text: string, index: number) => {
        // Only allow numeric input
        const numericText = text.replace(/[^0-9]/g, '');
        
        const newOtp = [...otp];
        newOtp[index] = numericText;
        setOtp(newOtp);
        setError(''); // Clear error when user types

        // Auto-focus next input
        if (numericText && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace') {
            const newOtp = [...otp];
            
            if (otp[index]) {
                // Clear current input
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // Move to previous input and clear it
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        try {
            const response = await fetch('###', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();

            if (data.success) {
                setVerified(true);
                router.push('/(tabs)/a_home');
            } else {
                setError("Incorrect verification code.");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const renderOtpInput = (index: number) => {
        const isFocused = focusedIndex === index;
        const isFilled = otp[index] !== '';
        
        return (
            <TextInput
                key={index}
                ref={inputRefs[index]}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                maxLength={1}
                keyboardType="numeric"
                returnKeyType="next"
                style={[
                    styles.otpInput,
                    isFocused && styles.otpInputFocused,
                    isFilled && styles.otpInputFilled,
                ]}
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
            />
        );
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/tekmart_images/TekMart 2.png')} style={styles.logo}/>
                        </View>
                        <Text style={styles.title}>Email Verification</Text>
                        <Text style={styles.subtitle}>
                            Enter the 6-digit code sent to your email eg. xxx.gmail.com
                        </Text>
                        
                        {/* OTP Input Container */}
                        <View style={styles.otpContainer}>
                            {Array.from({ length: 6 }, (_, index) => renderOtpInput(index))}
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <TouchableOpacity 
                            style={styles.verifyButton} 
                            onPress={handleVerify}
                            disabled={code.length !== 6}
                        >
                            <Text style={styles.verifyButtonText}>Verify Code</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>
                                Didn't receive the code?{' '}
                                <Text style={styles.resendLink}>Resend</Text>
                            </Text>
                        </View>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default EmailVerification;