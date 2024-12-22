import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

// DATABASE
import {registerUser, LoginUser} from "../Database/sql.js";
// ENDS

// REDUX
import {useDispatch} from 'react-redux';
import { setLoggedInUser } from '../Redux/actions.js';
// ENDS

// ICONS
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
// ENDS

export default function RegisterScreen({ navigation }) {

    // LOCAL STATES
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // ENDS

    const dispatch = useDispatch();
    

    // HANDLE REGISTER
    const handleRegister = async () => {
        setLoading(true);

        const name = '';
        const phone = '';
        const status = 'active';

        try {
            if (!email || !password) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Email and password are required.',
                    position: 'bottom',
                });
                return;
            }

            // VALIDATE EMAIL
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Email',
                    text2: 'Please enter a valid email address.',
                    position: 'bottom',
                });
                return;
            }

            // VALIDATE PASWWORD
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                Toast.show({
                    type: 'error',
                    text1: 'Weak Password',
                    text2: 'Password must be at least 8 characters long and contain both letters and numbers.',
                    position: 'bottom',
                });
                return;
            }

            // REGISTER
            const response = await registerUser(name, email, password, phone, status);

            if (response) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Registration Successful',
                    position: 'bottom',
                });

                // SIGN IN
                const signIn = await LoginUser(email, password);
                const userId = signIn.id;
                dispatch(setLoggedInUser(userId));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Logged in Successfully',
                    position: 'bottom',
                });
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error during registration or login:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong, please try again.',
                position: 'bottom',
            });
        } finally {
            setLoading(false);
        }
    };
    // ENDS


    const handleGoogleSignIn = () => {
        // Handle Google Sign In logic here
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.registerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create an Account</Text>
                </View>

                <View style={styles.form}>
                    {/* Email Input */}
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="email" size={22} color="#2D3748" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#718096"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="lock" size={22} color="#2D3748" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Create a password"
                            placeholderTextColor="#718096"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <MaterialIcons
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={22}
                                color="#2D3748"
                            />
                        </Pressable>
                    </View>

                    {/* Register Button */}
                    <Pressable
                        style={styles.registerButton}
                        onPress={handleRegister}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.registerButtonText}>
                            {loading ? <ActivityIndicator size={'small'} color={'#fff'}/> : 'Create Account'}
                        </Text>
                    </Pressable>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Google Sign In Button */}
                    <Pressable
                        style={styles.googleButton}
                        onPress={handleGoogleSignIn}
                    >
                        <Ionicons name="logo-google" size={24} color="#4285F4" style={styles.googleIcon} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </Pressable>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerContainer: {
        paddingHorizontal: 24,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
   
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 8,
        textAlign: 'center',
    },

    form: {
        width: '100%',
        maxWidth: 400,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 60,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#2D3748',
        fontSize: 16,
        letterSpacing: 0.3,
    },
    eyeIcon: {
        padding: 8,
    },
    registerButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 16,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#6C63FF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    dividerText: {
        color: '#718096',
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        color: '#1A202C',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#4A5568',
    },
    loginLink: {
        fontSize: 16,
        color: '#6C63FF',
        fontWeight: '600',
    },
});