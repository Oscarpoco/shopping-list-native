import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../Redux/actions.js';

// ACTIONS
import { fetchLists } from '../Redux/actions.js';

import {
    initializeDatabase,
    getAllLists,
} from '../Database/sql.js';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists) || [];
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const setupDatabase = async () => {
            try {
                const initialized = await initializeDatabase();
                if (initialized) {
                    console.log('Database initialized successfully');
                    const storedList = await getAllLists();
                    dispatch(fetchLists(storedList));
                }
            } catch (error) {
                console.error('Database initialization error:', error);
            }
        };
        setupDatabase();
    }, [dispatch]);

    const renderListItem = ({ item }) => {
        return (
            <Pressable
                style={[styles.listCard, { 
                    backgroundColor: 
                        item.priority === 'High' ? '#FF6B6B' :
                        item.priority === 'Medium' ? '#4ECDC4' : '#45B7D1'
                }]}
                onPress={() => navigation.navigate('Details', { item })}
            >
                <View style={styles.listCardContent}>
                    <Text style={styles.listTitle}>{item.listTitle || 'Untitled'}</Text>
                    <Text style={styles.listDescription} numberOfLines={2}>
                        {item.description || 'No description'}
                    </Text>
                    <Text style={styles.listDate}>
                        {new Date(item.timestamp).toLocaleDateString()}
                    </Text>
                </View>
                <View style={styles.listCardIcon}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                </View>
            </Pressable>
        );
    };

    const CategoryButton = ({ icon, title, color, onPress }) => (
        <Pressable style={[styles.categoryButton, { backgroundColor: color }]} onPress={onPress}>
            <View style={[styles.categoryIcon, { backgroundColor: `${color}33` }]}>
                {icon}
            </View>
            <Text style={styles.categoryText}>{title}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.menuButton}>
                    <Entypo name="menu" size={24} color="#333" />
                </Pressable>
                <Text style={styles.headerTitle}>Shopping Lists</Text>
                <Pressable style={styles.profileButton}>
                    <Entypo name="user" size={24} color="#333" />
                </Pressable>
            </View>

            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search lists..."
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>{lists.length} lists this month 📈</Text>
                <Pressable 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Create Item')}
                >
                    <Text style={styles.addButtonText}>+ New List</Text>
                </Pressable>
            </View>

            <View style={styles.categoriesContainer}>
                <CategoryButton
                    icon={<Feather name="shopping-bag" size={24} color="#FF6B6B" />}
                    title="To Shop"
                    color="#FFE3E3"
                    onPress={() => {
                        dispatch(setActiveFilter('to-shop'));
                        navigation.navigate('Shopping list');
                    }}
                />
                <CategoryButton
                    icon={<MaterialIcons name="shopping-cart" size={24} color="#4ECDC4" />}
                    title="Progress"
                    color="#E8FFF9"
                    onPress={() => {
                        dispatch(setActiveFilter('in-progress'));
                        navigation.navigate('Shopping list');
                    }}
                />
                <CategoryButton
                    icon={<MaterialIcons name="check-circle" size={24} color="#45B7D1" />}
                    title="Done"
                    color="#E3F6FF"
                    onPress={() => {
                        dispatch(setActiveFilter('done'));
                        navigation.navigate('Shopping list');
                    }}
                />
            </View>

            <FlatList
                data={lists}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No lists yet</Text>
                        <Text style={styles.emptySubtext}>Create your first shopping list!</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 40,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    menuButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#F8F9FA',
    },
    profileButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#E3F6FF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 20,
        padding: 12,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    statsText: 
    {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        letterSpacing: 1
    },
    addButton: {
        backgroundColor: '#45B7D1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        elevation: 2,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    categoryButton: {
        flex: 1,
        marginHorizontal: 6,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIcon: {
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    listContainer: {
        padding: 20,
    },
    listCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    listCardContent: {
        flex: 1,
    },
    listCardIcon: {
        justifyContent: 'center',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    listDescription: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
    },
    listDate: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },
});

export default HomeScreen;