import React, {useState,useRef,useEffect,FC} from "react";
import { useFonts } from "expo-font";
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
    ScrollView
 } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingTop: height * 0.05, // 5% from top for safe area
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: height * 0.05, // 5% spacing after logo
        paddingTop: height * 0.02, // 2% padding from top
    },

    logo: {
        width: width * 0.25, // 25% of screen width
        height: width * 0.25, // Keep it square
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: height * 0.6, // Minimum height to ensure content fits
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: width * 0.03, // 3% of screen width
        borderRadius: 6,
        fontSize: width * 0.04, // 4% of screen width
        marginBottom: height * 0.01, // 1% of screen height
        justifyContent: 'center',
        paddingHorizontal: width * 0.05, // 5% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.005, // 0.5% of screen height
    },

    button:{
        backgroundColor: '#1C9174',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: height * 0.015, // 1.5% of screen height
        borderRadius: 6,
        fontWeight: 'bold',
        fontSize: width * 0.04, // 4% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
    },

    header: {
        marginLeft: width * 0.06, // 6% of screen width
        fontSize: width * 0.035, // 3.5% of screen width
        fontWeight: 'bold',
        marginBottom: height * 0.005, // 0.5% of screen height
        color: '#333',
    },

    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        paddingHorizontal: width * 0.04, // 4% of screen width
    },

    rememberMeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.01, // 1% of screen height
    },

    rememberText:{
        fontSize: width * 0.035, // 3.5% of screen width
    },

    forgotContainer:{
        marginVertical: height * 0.01, // 1% of screen height
    },

    forgotText:{
        fontSize: width * 0.035, // 3.5% of screen width
        color: '#1C9174',
    },

    dividerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03, // 3% of screen height
        marginHorizontal: width * 0.04, // 4% of screen width
    },

    divider:{
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
        marginHorizontal: width * 0.02, // 2% of screen width
    },

    dividerOR:{
        fontSize: width * 0.035, // 3.5% of screen width
        paddingHorizontal: width * 0.02, // 2% of screen width
    },

    googleContainer:{
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#ccc',
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.01, // 1% of screen height
        padding: height * 0.01, // 1% of screen height
        alignItems: 'center',
        justifyContent: 'center',
    },

    googlelogo:{
        width: width * 0.12, // 12% of screen width
        height: width * 0.12, // Keep it square
        marginRight: width * 0.03, // 3% of screen width
    },

    googleText:{
        fontSize: width * 0.035, // 3.5% of screen width
        fontWeight: 'bold',
    },

    signupContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.02, // 2% of screen height
        marginBottom: height * 0.03, // 3% bottom margin for safe area
    },

    checkboxRow:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkBox:{
        width: width * 0.05, // 5% of screen width
        height: width * 0.05, // Keep it square
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 4,
        marginRight: width * 0.02, // 2% of screen width
    },

    checkboxchecked:{
        backgroundColor: '#1C9174',
    },

    passwordWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: width * 0.03, // 3% of screen width
        marginHorizontal: width * 0.04, // 4% of screen width
        marginVertical: height * 0.005, // 0.5% of screen height
        borderColor: '#ccc',
    },

    passwordInput:{
        flex: 1,
        paddingVertical: height * 0.015, // 1.5% of screen height
        fontSize: width * 0.04, // 4% of screen width
    },

    toggleText:{
        color: '#1C9174',
        fontWeight: 'bold',
        marginLeft: width * 0.02, // 2% of screen width
        fontSize: width * 0.035, // 3.5% of screen width
    },
})

const LoginScreen: FC = () => {
    const [studentID,setstudentID] = useState('');
    const [password,setpassword] = useState('');
    const [rememberMe, setrememberMe] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    const handleLogin = () => {
        if (!studentID || !password){
            Alert.alert('Enter a valid email and password');
            return;
        }
        
        router.push('/(tabs)/home')
    }

    return(
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style= {{flex: 1}}
    >
    <SafeAreaView style={styles.container}>
        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/tekmart_images/TekMart 2.png')} style={styles.logo}/>
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                {/* Student ID Input */}
                <Text style={styles.header}>Student ID</Text>
                <TextInput 
                    value={studentID} 
                    onChangeText={setstudentID} 
                    placeholder="Enter your student reference number"
                    placeholderTextColor='#999'
                    style={styles.input}
                />

                {/* Password Input */}
                <Text style={styles.header}>Password</Text>
                <View style={styles.passwordWrapper}>
                    <TextInput 
                        value={password} 
                        onChangeText={setpassword} 
                        placeholder="Enter your password"
                        placeholderTextColor='#999'
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                        <Text style={styles.toggleText}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Remember Me and Forgot Password Row */}
                <View style={styles.row}>
                    <View style={styles.rememberMeContainer}>
                        <TouchableOpacity onPress={() => setrememberMe(!rememberMe)} style={styles.checkboxRow}>
                            <View style={[styles.checkBox, rememberMe && styles.checkboxchecked]}/>
                            <Text style={styles.rememberText}>Remember me</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotContainer}>
                        <Link href='/explore'>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </Link>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider}/>
                    <Text style={styles.dividerOR}>OR</Text>
                    <View style={styles.divider}/>
                </View>

                {/* Sign In with Google */}
                <TouchableOpacity style={styles.googleContainer}>
                    <Image source={require('../assets/tekmart_images/googleimage.jpg')} style={styles.googlelogo}/>
                    <Text style={styles.googleText}>Sign In with Google</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <TouchableOpacity style={styles.signupContainer}>
                    <Text style={{marginRight: 5, fontSize: width * 0.035}}>Don't have an account?</Text>
                    <Link href="/signup">
                        <Text style={{color: '#1C9174', fontSize: width * 0.035}}>Signup</Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
    );
};

export default LoginScreen;
