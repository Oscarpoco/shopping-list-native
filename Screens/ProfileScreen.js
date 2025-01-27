import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Switch } from 'react-native';

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOutUser } from '../Redux/actions';
// ENDS

// ICONS
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = ({navigation}) => {

    // LOCAL STATE
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists);
    const user = useSelector((state) => state.user);
    console.log("User Details", user);
    const complete = lists.filter((list) => list.status === 'done').length;
    const listItems = lists
        .filter((list) => list.items)
        .reduce((count, list) => count + JSON.parse(list.items).length, 0);
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
                    <Text style={styles.profileName}>{user?.name || ''}</Text>
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
                    onPress={() => {}}
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
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
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
});

export default ProfileScreen;