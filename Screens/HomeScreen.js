import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

// DATABASE
import {
    initializeDatabase,
    addList,
    getListById,
    updateList,
    deleteList,
    getAllLists,
  } from '../Database/sql.js';

//   ENDS

// REACT
import { useEffect } from 'react';
// ENDS

// REDUX
import { useDispatch, useSelector } from 'react-redux';
// ENDS

// ICONS
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {

    // INITIALIZE DATABASE
 const dispatch = useDispatch();
 const lists = useSelector(state => state.lists); 


 // INITIALIZE DATABASE
 useEffect(() => {
    const setupDatabase = async () => {
      try {
        const initialized = await initializeDatabase();
        if (initialized) {
          console.log('DATABASE INITIALIZED SUCCESSFULLY!');
          const storedList = await getAllLists();
          dispatch(fetchLists(storedList)); 
        }
        console.log('Overall Shopping list', lists)

      } catch (error) {
        Alert.alert('Database Error', error.message || 'Failed to initialize database', [
          { text: 'OK' },
        ]);
      }
    };

    setupDatabase();
  }, [dispatch]);

  console.log('Overall Shopping list', lists)



  return (
    <View style={styles.Parent}>

        {/* FIRST */}
        <View style={styles.firstChild}>

            <Pressable style={styles.firstChildItem}>
                <Entypo name='menu' size={30} />
            </Pressable>

            <Text style={[styles.secondChildLargeText, {marginBottom: 20, letterSpacing: 2}]}>Welcome back, Oscar!</Text>


            <Pressable style={styles.firstChildUser}>
                <Entypo name='user' size={25} />
            </Pressable>
            
        </View>
        {/* ENDS */}

        {/* SECOND */}
        <View style={styles.secondChild}>

            <View style={[styles.secondChildSibling, {backgroundColor: '#f5f5ff'}]}>
                <Text style={styles.secondChildLargeText}>You have 49 lists this month 🙂</Text>
                <View style={[styles.fourthChildIconWrapper, {backgroundColor: '#F7E5E7', borderColor: '#E91E63'}]}>
                    <Feather name='shopping-bag' size={30} color='#FFA1AE'/>
                </View>
            </View>

            <View style={[styles.secondChildSibling, {backgroundColor: '#f5f5ff'}]}>
                <Text style={styles.secondChildSmallText}>Want to add a list ?</Text>
                <Pressable style={styles.secondChildButton} onPress={() => navigation.navigate('Create Item')}>
                    <Text style={styles.secondChildButtonText}>Get Started</Text>
                </Pressable>
            </View>
        </View>
        {/* ENDS */}

        {/* THIRD */}
        <View style={styles.thirdChild}>
            <View style={styles.firstSibling}>
                <Feather name='search' size={30} color="#888" style={styles.icon}/>
                <TextInput
                    placeholder='Search shopping list by name'
                    placeholderTextColor="#aaa"
                    style={styles.SearchTextInput}
                />
            </View>
        </View>
        {/* ENDS */}

        {/* FOURTH */}
        <View style={styles.fourthChild}>
            <Pressable style={styles.fourthChildButton} onPress={() => navigation.navigate('Shopping list')}>
                <View style={[styles.fourthChildIconWrapper, {backgroundColor: '#F7E5E7', borderColor: '#E91E63'}]}>
                    <Feather name='shopping-bag' size={30} color='#FFA1AE'/>
                </View>
                <Text style={styles.fourthChildText}>To-Shop</Text>
            </Pressable>

            <Pressable style={styles.fourthChildButton} onPress={() => navigation.navigate('Shopping list')}>
                <View style={[styles.fourthChildIconWrapper, {backgroundColor: '#FFF4E0', borderColor: '#F39C12'}]}>
                    <MaterialIcons name='shopping-cart' size={30} color='#F6C92F'/>
                </View>
                <Text style={styles.fourthChildText}>Progress</Text>
            </Pressable>

            <Pressable style={styles.fourthChildButton} onPress={() => navigation.navigate('Shopping list')}>
                <View style={[styles.fourthChildIconWrapper, {backgroundColor: '#DAFEF2', borderColor: '#00B894'}]}>
                    <MaterialIcons name='shopify' size={30} color='#1DBD84'/>
                </View>
                <Text style={styles.fourthChildText}>Done</Text>
            </Pressable>
        </View>
        {/* ENDS */}

        {/* LAST */}
        <View style={styles.lastChild}>
            <Text style={styles.lastChildText}>Today's lists</Text>

            <View style={styles.secondSibling}>

                <Pressable style={[styles.secondSiblingItem, {backgroundColor: '#5D6DFF'}]}>
                    <Text style={styles.lastChildTextTitle}>Monthly Grocery</Text>
                    <Text style={styles.lastChildTextDescription}>I have to buy grocery for my mom</Text>
                    <Text style={styles.lastChildTextDate}>28 December 2024</Text>
                </Pressable>

                <Pressable style={[styles.secondSiblingItem, {backgroundColor: '#E4516E'}]}>
                    <Text style={styles.lastChildTextTitle}>Monthly Grocery</Text>
                    <Text style={styles.lastChildTextDescription}>I have to buy grocery for my mom</Text>
                    <Text style={styles.lastChildTextDate}>28 December 2024</Text>
                </Pressable>

            </View>
        </View>
        {/* ENDS */}
      
    </View>
  );
};

const styles = StyleSheet.create({

// PARENT
    Parent: 
    {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingVertical: 20
    },
// ENDS


// FIRST
    firstChild: 
    {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 20,
    },

    firstChildItem: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5ff',
    width: 50,
    height: 50,
    borderRadius: 15,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    },

    firstChildUser: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAFEF2',
    width: 50,
    height: 50,
    borderRadius: 15,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    },

    secondChildSmallText: 
    {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
    textAlign: 'center'
    },
// ENDS
    
    
// SECOND
    secondChild: 
    {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10
    },

    secondChildSibling: 
    {
    justifyContent: 'center',
    alignItems: 'center', 
    height: 160,
    width: '48%',
    borderRadius: 15,
    elevation: 6, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    gap: 10,
    padding: 10,
    },

    secondChildLargeText: 
    {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
    textAlign: 'center'
    },

    secondChildButton: 
    {
    borderWidth: 1,
    borderColor: '#00B894',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
    },

    secondChildButtonText: 
    {
    fontWeight: 900,
    fontSize: 16,
    color: '#333',
    },
// ENDS
    
    
// THIRD
    thirdChild: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    paddingHorizontal: 20,
    },

    firstSibling:
    {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5ff',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '100%',
    alignSelf: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    },

      
    icon: 
    {
    marginRight: 10, 
    },

    textInput: 
    {
    flex: 1, 
    fontSize: 16,
    color: '#333',
    },
// ENDS
    
    
// FOURTH
    fourthChild: 
    {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    },

    fourthChildButton: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5ff',
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 100,
    height: 120,
    gap: 10
    },

    fourthChildText:    
    {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
    letterSpacing: 1
    },

    fourthChildIconWrapper:    
    {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 35
    },
// ENDS
    
    
// LAST
    lastChild: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    paddingHorizontal: 20
    },

    lastChildText: 
    {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start'
    },

    secondSibling: 
    {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    },

    secondSiblingItem: 
    {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },

    lastChildTextTitle: 
    {
    fontSize: 18,
    fontWeight: '600',
    color: '#E0E0E0',
    marginBottom: 5,
    },

    lastChildTextDescription: 
    {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 8,
    },

    lastChildTextDate: 
    {
    fontSize: 12,
    color: '#E0E0E0',
    },
// ENDS
 
});

export default HomeScreen;
