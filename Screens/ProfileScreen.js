import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TextInput, ActivityIndicator } from 'react-native';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOutUser, saveUserData } from '../Redux/actions';
// ENDS

// DATABASE
import { UpdateUser, getUserById } from '../Database/sql';
// ENDS

// ICONS
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';


const ProfileScreen = ({navigation}) => {

    // LOCAL STATE

    // FORM DATA
    const user = useSelector((state) => state.user);
    console.log("User Details", user);


    const [updateDetailsModal, setUpdateDetailsModal] = useState(false);
    const [name, setName] = useState(user.name || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists);
    const complete = lists.filter((list) => list.status === 'done').length;
    const listItems = lists
        .filter((list) => list.items)
        .reduce((count, list) => count + JSON.parse(list.items).length, 0);
    // ENDS

    // HANDLE UPDATE
    const handleUpdate = async () => {
        try {
          // Validate inputs
          if (!name.trim()) {
            Toast.show({
              type: 'error',
              text1: 'Name Required',
              text2: 'Please enter your name',
              position: 'bottom',
            });
            return;
          }
    
          if (!phone.trim()) {
            Toast.show({
              type: 'error',
              text1: 'Phone Required',
              text2: 'Please enter your phone number',
              position: 'bottom',
            });
            return;
          }
    
          // Phone number validation (basic)
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(phone)) {
            Toast.show({
              type: 'error',
              text1: 'Invalid Phone',
              text2: 'Please enter a valid 10-digit phone number',
              position: 'bottom',
            });
            return;
          }
    
          setIsLoading(true);
    
          // Update in database
          await UpdateUser(user.id, name, phone);
    
          // Fetch updated user data
          const userData = await getUserById(user.id);
    
          // Update Redux store
          dispatch(saveUserData(userData));
    
          Toast.show({
            type: 'success',
            text1: 'Profile Updated',
            text2: 'Your details have been updated successfully',
            position: 'bottom',
          });
    
          setUpdateDetailsModal(false);
    
        } catch (error) {
          console.error('Profile update error:', error);
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: 'Failed to update profile. Please try again.',
            position: 'bottom',
          });
        } finally {
          setIsLoading(false);
        }
      };

    // ENDS


    // HANDLE LOGOUT
    const handleLogout = () => {
        dispatch(setLoggedOutUser());
        navigation.navigate("Login");
    }
    // ENDS

    const ProfileCard = ({ icon, title, subtitle, onPress }) => (
        <Pressable style={styles.profileCard} onPress={onPress}>
            <View style={styles.profileCardIcon}>
                {icon}
            </View>
            <View style={styles.profileCardContent}>
                <Text style={styles.profileCardTitle}>{title}</Text>
                <Text style={styles.profileCardSubtitle}>{subtitle}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
        </Pressable>
    );


    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#45B7D1', '#69D2EC']}
                style={styles.header}
            >
                
                <View style={styles.profileInfo}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../assets/icon.png')}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.profileName}>{name}</Text>
                    <Text style={styles.profileEmail}>{phone}</Text>
                    <Text style={styles.profileEmail}>{user?.email || ''}</Text>
                </View>
            </LinearGradient>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{lists.length}</Text>
                    <Text style={styles.statLabel}>Lists</Text>
                </View>
                <View style={[styles.statItem, styles.statItemBorder]}>
                    <Text style={styles.statNumber}>{listItems}</Text>
                    <Text style={styles.statLabel}>Items</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{complete}</Text>
                    <Text style={styles.statLabel}>Complete</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <ProfileCard
                    icon={<Feather name="user" size={20} color="#45B7D1" />}
                    title="Personal Information"
                    subtitle="Update your profile details"
                    onPress={() => {setUpdateDetailsModal(true)}}
                />
            </View>


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Help & Support</Text>
                <ProfileCard
                    icon={<Feather name="message-circle" size={20} color="#4ECDC4" />}
                    title="Contact Support"
                    subtitle="Get help with your account"
                    onPress={() => {}}
                />
            </View>

            <Pressable style={styles.logoutButton} onPress={() => handleLogout()}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>

            {/* DEATAILS MODAL*/}
            <Modal
                visible={updateDetailsModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setUpdateDetailsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>User Details</Text>
                        <Text style={styles.modalSubtitle}>Update your details</Text>

                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="verified-user" size={22} color="#2D3748" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#718096"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="phone-iphone" size={22} color="#2D3748" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#718096"
                                value={phone}
                                onChangeText={setPhone}
                                 keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setUpdateDetailsModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleUpdate}
                            >
                                <Text style={styles.submitButtonText}>
                                    {isLoading ? <ActivityIndicator size={'small'} color={'#fff'} /> : 'Submit'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileInfo: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    editAvatarButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#45B7D1',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: -25,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statItemBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#eee',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileCardIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    profileCardContent: {
        flex: 1,
    },
    profileCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    profileCardSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    settingsContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingItemTitle: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        margin: 20,
        marginTop: 32,
        backgroundColor: '#FF6B6B',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    // MODAL
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
});

export default ProfileScreen;