import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../Redux/actions.js';

// ACTIONS
import { fetchLists } from '../Redux/actions.js';
import { getAllLists } from '../Database/sql.js';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists) || [];
    const isLoggoedIn = useSelector(state => state.isLoggoedIn);
    const userId  =useSelector(state => state.userId) || "";
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLists, setFilteredLists] = useState(lists);

    // FETCH LISTS
    useEffect(() => {
        const setupDatabase = async () => {
            if(isLoggoedIn){
                const storedList = await getAllLists(userId);
                dispatch(fetchLists(storedList));
            }
        };
        setupDatabase();
    }, [dispatch, userId, isLoggoedIn]);
    // ENDS

    // UPDATE SEARCH QUERIES
    useEffect(() => {
        const filtered = lists.filter(list => 
            list.listTitle?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLists(filtered);
    }, [lists, searchQuery]);
    // ENDS


    const renderListItem = ({ item }) => {
        return (
            <Pressable
                style={[styles.listCard]}
                onPress={() => navigation.navigate('Details', { item })}
            >
                <LinearGradient
                    colors={
                        item.priority === 'High' ? ['#FF6B6B', '#FF8787'] :
                        item.priority === 'Medium' ? ['#4ECDC4', '#6EE7E7'] :
                        ['#45B7D1', '#69D2EC']
                    }
                    style={styles.listCardGradient}
                >
                    <View style={styles.listCardContent}>
                        <View style={styles.listCardHeader}>
                            <Text style={styles.listTitle}>{item.listTitle || 'Untitled'}</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                        </View>
                        <Text style={styles.listDescription} numberOfLines={2}>
                            {item.description || 'No description'}
                        </Text>
                        <View style={styles.listFooter}>
                            <Text style={styles.listDate}>
                                {new Date(item.timestamp).toLocaleDateString()}
                            </Text>
                            <View style={styles.priorityBadge}>
                                <Text style={styles.priorityText}>{item.priority}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        );
    };

    const CategoryButton = ({ icon, title, color, gradientColors, onPress }) => (
        <Pressable style={styles.categoryButton} onPress={onPress}>
            <LinearGradient
                colors={gradientColors}
                style={styles.categoryGradient}
            >
                <View style={[styles.categoryIcon, { backgroundColor: `${color}33` }]}>
                    {icon}
                </View>
                <Text style={styles.categoryText}>{title}</Text>
            </LinearGradient>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>mShop</Text>
                    <MaterialIcons name="shopping-cart" size={18} color="#FF6B6B" style={styles.headerTitleIcon} />
                </View>
                <Pressable style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Entypo name="user" size={20} color="#333" />
                </Pressable>
            </View>

            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#666" style={{marginLeft: 10}}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search lists..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery !== '' && (
                    <Pressable onPress={() => setSearchQuery('')}>
                        <MaterialIcons name="clear" size={20} color="#666" />
                    </Pressable>
                )}
            </View>

            <View style={styles.statsContainer}>
                <Pressable style={styles.statsBox} onPress={() => {
                        dispatch(setActiveFilter('All Lists'));
                        navigation.navigate('Shopping list');
                    }}>
                    <Text style={styles.statsNumber}>{filteredLists.length}</Text>
                    <Text style={styles.statsLabel}>Lists</Text>
                </Pressable>
                <Pressable 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Create Item')}
                >
                    <LinearGradient
                        colors={['#45B7D1', '#69D2EC']}
                        style={styles.addButtonGradient}
                    >
                        <Text style={styles.addButtonText}>New List</Text>
                    </LinearGradient>
                </Pressable>
            </View>

            <View style={styles.categoriesContainer}>
                <CategoryButton
                    icon={<Feather name="shopping-bag" size={24} color="#FF6B6B" />}
                    title="To Shop"
                    color="#FFE3E3"
                    gradientColors={['#FFE3E3', '#FFD0D0']}
                    onPress={() => {
                        dispatch(setActiveFilter('to-shop'));
                        navigation.navigate('Shopping list');
                    }}
                />
                <CategoryButton
                    icon={<MaterialIcons name="shopping-cart" size={24} color="#4ECDC4" />}
                    title="Progress"
                    color="#E8FFF9"
                    gradientColors={['#E8FFF9', '#D0F7F0']}
                    onPress={() => {
                        dispatch(setActiveFilter('in-progress'));
                        navigation.navigate('Shopping list');
                    }}
                />
                <CategoryButton
                    icon={<MaterialIcons name="check-circle" size={24} color="#45B7D1" />}
                    title="Done"
                    color="#E3F6FF"
                    gradientColors={['#E3F6FF', '#D0EBFF']}
                    onPress={() => {
                        dispatch(setActiveFilter('done'));
                        navigation.navigate('Shopping list');
                    }}
                />
            </View>

            <FlatList
                data={filteredLists}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="shopping-basket" size={64} color="#DDD" />
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No matching lists found' : 'No lists yet'}
                        </Text>
                        <Text style={styles.emptySubtext}>
                            {searchQuery ? 'Try a different search term' : 'Create your first shopping list!'}
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    header: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    headerLeft: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    headerTitle: 
    {
        fontSize: 24,
        fontWeight: '800',
        color: '#333',
        letterSpacing: 1.5,
    },

    headerTitleIcon: {
        marginTop: 7,
    },
    profileButton: {
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#E3F6FF',
    },

    searchContainer: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 20,
        padding: 10,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    searchInput: 
    {
        flex: 1,
        marginLeft: 15,
        marginRight: 12,
        fontSize: 16,
        color: '#333',
    },

    statsContainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    statsBox: 
    {
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },

    statsNumber: 
    {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },

    statsLabel: 
    {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
        letterSpacing: 1.5
    },

    addButton: 
    {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
    },

    addButtonGradient: 
    {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },

    addButtonText: 
    {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 1
    },

    categoriesContainer: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },

    categoryButton: 
    {
        flex: 1,
        marginHorizontal: 6,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
    },

    categoryGradient: 
    {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    categoryIcon: 
    {
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
    },

    categoryText: 
    {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    listContainer: 
    {
        padding: 20,
        paddingHorizontal: 10,
    },
    listCard: {
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
    },

  
    listCardContent: 
    {
        flex: 1,
        position: 'relative',
        padding: 20,
    },


    listCardHeader: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,

    },

    listTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    listDescription: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 16,
    },
    listFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listDate: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    priorityBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    priorityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#999',
    },
});

export default HomeScreen;