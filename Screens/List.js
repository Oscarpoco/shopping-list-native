import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const ListScreen = ({ navigation }) => {
  return (
    <View style={styles.Parent}>

        {/* FIRST */}
        <View style={styles.firstChild}></View>
        {/* ENDS */}

        {/* SECOND */}
        <View style={styles.secondChild}></View>
        {/* ENDS */}

        {/* THIRD */}
        <View style={styles.thirdChild}></View>
        {/* ENDS */}

        {/* FOURTH */}
        <View style={styles.fourthChild}></View>
        {/* ENDS */}

        {/* LAST */}
        <View style={styles.lastChild}></View>
        {/* ENDS */}
      
    </View>
  );
};

const styles = StyleSheet.create({

    // PARENT
    Parent: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
    // ENDS


// FIRST
    firstChild: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
// ENDS
    
    
// SECOND
    secondChild: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
// ENDS
    
    
// THIRD
    thirdChild: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
// ENDS
    
    
// FOURTH
    fourthChild: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
// ENDS
    
    
// LAST
    lastChild: 
    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: '100%',
    },
// ENDS
 
});

export default ListScreen;
