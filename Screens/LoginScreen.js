import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Modal,
    TouchableOpacity
} from 'react-native';

// REDUX 
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Redux/actions.js';

// AUTHENTICATION DATABASE
import {LoginUser, initializeDatabase} from "../Database/sql.js";

// ICONS
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const dispatch = useDispatch();

    // INITIALIZE DATABASE
    useEffect(() => {
        const setupDatabase = async () => {
            try {
                await initializeDatabase();
            } catch (error) {
                console.error('Database initialization error:', error);
            }
        };
        setupDatabase();
    }, []);
    // ENDS

    // HANDLE LOGIN
    const handleSubmitLogin = async () => 
        {
            setLoading(true);

            const user = {
                email,
                password
            }
            try {
                const response = await LoginUser(user);
                const userId = response.id;
                dispatch(setLoggedInUser(userId));
                navigation.navigate('Home');

            } catch (error) {
                console.error('Login failed:', error); 
                Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: error.message || 'Something went wrong. Please try again.',
                    position: 'bottom'
                });

            } finally {
                setLoading(false);
            }
        }
    // ENDS

    const handleForgotPassword = () => {
        console.log('Reset password for:', resetEmail);
        setForgotPasswordModal(false);
        setResetEmail('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Welcome back! 👋</Text>
                    <Text style={styles.title}>Login to your account</Text>
                    <Text style={styles.subtitle}>Good to see you again</Text>
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
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="lock" size={22} color="#2D3748" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
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

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => setForgotPasswordModal(true)}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Pressable
                        style={styles.loginButton}
                        onPress={() => {handleSubmitLogin()}}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.loginButtonText}>
                            {loading ? <ActivityIndicator size={'small'} color={'#fff'} /> : 'Sign In'}
                        </Text>
                    </Pressable>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* FORGOT PASSWORD MODAL*/}
            <Modal
                visible={forgotPasswordModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setForgotPasswordModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reset Password</Text>
                        <Text style={styles.modalSubtitle}>Enter your email to reset your password</Text>

                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="email" size={22} color="#2D3748" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#718096"
                                value={resetEmail}
                                onChangeText={setResetEmail}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setForgotPasswordModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleForgotPassword}
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginContainer:
    {
        paddingHorizontal: 24,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    header:
    {
        alignItems: 'center',
        marginBottom: 40,
    },

    welcomeText:
    {
        fontSize: 24,
        fontWeight: '600',
        color: '#2B6CB0',
        marginBottom: 12,
    },

    title:
    {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle:
    {
        fontSize: 16,
        color: '#4A5568',
        letterSpacing: 0.3,
        textAlign: 'center',
    },

    form:
    {
        width: '100%',
        maxWidth: 400,
    },

    inputWrapper:
    {
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

    inputIcon:
    {
        marginRight: 12,
    },

    input:
    {
        flex: 1,
        color: '#2D3748',
        fontSize: 16,
        letterSpacing: 0.3,
    },

    eyeIcon:
    {
        padding: 8,
    },

    forgotPassword:
    {
        alignSelf: 'flex-end',
        marginBottom: 24,
        marginTop: 4,
    },

    forgotPasswordText:
    {
        color: '#2B6CB0',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },

    loginButton:
    {
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

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    registerText: {
        fontSize: 16,
        color: '#4A5568',
    },
    registerLink: {
        fontSize: 16,
        color: '#6C63FF',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#4A5568',
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    modalButton: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    cancelButton: {
        backgroundColor: '#EDF2F7',
    },
    submitButton: {
        backgroundColor: '#6C63FF',
    },
    cancelButtonText: {
        color: '#4A5568',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});