import React from 'react';
import { StyleSheet, Text, View, Pressable, StatusBar, Platform  } from 'react-native';

// ICONS
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ListScreen = ({ navigation }) => {
  return (
    <View style={styles.Parent}>

        {/* STATUS BAR */}
        {/* <StatusBar hidden={false} backgroundColor={'#f9f9f9'}/> */}

        {/* MAIN */}
        <View style={styles.main}>
            {/* FIRST */}
            <View style={styles.firstChild}>
                <Text style={styles.firstChildText}>To-Shop</Text>
                <Feather name='shopping-bag' size={25} color='#FFA1AE'/>
            </View>
            {/* ENDS */}

            {/* SECOND */}
            <View style={styles.secondChild}>

                <Pressable style={[styles.secondSiblingItem, {backgroundColor: '#5D6DFF'}]}>
                    <Text style={styles.lastChildTextTitle}>Monthly Grocery</Text>
                    <Text style={styles.lastChildTextDescription}>I have to buy grocery for my mom</Text>
                    <Text style={styles.lastChildTextDate}>28 December 2024</Text>
                </Pressable>

                <Pressable style={[styles.secondSiblingItem, {backgroundColor: '#1DBD84'}]}>
                    <Text style={styles.lastChildTextTitle}>Monthly Grocery</Text>
                    <Text style={styles.lastChildTextDescription}>I have to buy grocery for my mom</Text>
                    <Text style={styles.lastChildTextDate}>28 December 2024</Text>
                </Pressable>

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

                <Pressable style={[styles.secondSiblingItem, {backgroundColor: '#1DBD84'}]}>
                    <Text style={styles.lastChildTextTitle}>Monthly Grocery</Text>
                    <Text style={styles.lastChildTextDescription}>I have to buy grocery for my mom</Text>
                    <Text style={styles.lastChildTextDate}>28 December 2024</Text>
                </Pressable>

            </View>
            {/* ENDS */}


            {/* LAST */}
            <View style={styles.lastChild}>
                <Pressable style={styles.lastChildAddButton} onPress={() => navigation.navigate('Create Item')}>
                    <MaterialIcons name='add' size={25} color='#1DBD84'/>
                    <Text style={styles.lastChildText}>add new list</Text>
                </Pressable>
            </View>
            {/* ENDS */}
        </View>
        {/* ENDS */}


        {/* SIDEBAR */}
        <View style={styles.sideBar}>
            <View style={styles.sideBarChild}>
                <View style={styles.sideBarMenu}>
                    <Pressable style={styles.sideBarMenuButton} onPress={() => navigation.navigate('Home')}>
                        <View style={[styles.fourthChildIconWrapper]}>
                            <FontAwesome6 name='clipboard-list' size={30} color='#444'/>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.sideBarMenu}>
                    <Pressable style={styles.sideBarMenuButton} onPress={() => navigation.navigate('Home')}>
                        <View style={[styles.fourthChildIconWrapper]}>
                            <Feather name='shopping-bag' size={30} color='#FFA1AE'/>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.sideBarMenu}>
                    <Pressable style={styles.sideBarMenuButton} onPress={() => navigation.navigate('Home')}>
                        <View style={[styles.fourthChildIconWrapper]}>
                            <MaterialIcons name='shopping-cart' size={30} color='#F6C92F'/>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.sideBarMenu}>
                    <Pressable style={styles.sideBarMenuButton} onPress={() => navigation.navigate('Home')}>
                        <View style={[styles.fourthChildIconWrapper]}>
                            <MaterialIcons name='shopify' size={30} color='#1DBD84'/>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.sideBarMenu}>
                    <Pressable style={styles.sideBarMenuButton} onPress={() => navigation.navigate('Home')}>
                        <View style={[styles.fourthChildIconWrapper]}>
                            <MaterialIcons name='home' size={30} color='#333'/>
                        </View>
                    </Pressable>
                </View>
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
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 0,
    margin: 0,
    },
    // ENDS

    // SIDEBAR
    sideBar: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232429',
    width: '21.4%',
    height: '100%',
    },

    sideBarChild: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    gap: 30,
    backgroundColor: '#1DBD84',
    },

    sideBarMenu: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5ff',
    borderRadius: 5,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 50,
    height: 50,
    gap: 10
    },

    sideBarMenuButton: 
    {
    
    },
    // ENDS


    // MAIN 
    main: 
    {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    width: '78.6%',
    height: '100%',
    paddingTop: 40
    },



// FIRST
    firstChild: 
    {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10
    },

    firstChildText: 
    {
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 3
    },
// ENDS
    
    
// SECOND
    secondChild: 
    {
    flex: 1,
    justifyContent: 'flex-start',
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
    width: '100%',
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
    
    
// LAST
    lastChild: 
    {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    padding: 20,
    },

    lastChildAddButton:
    {
    width: '100%',
    height: 50,
    backgroundColor: '#A262EA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
    },

    lastChildText:
    {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 900,
    letterSpacing: 2
    },

    
// ENDS
 
});

export default ListScreen;
