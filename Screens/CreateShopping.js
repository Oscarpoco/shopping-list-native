import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import { addItem, deleteItem, saveList, setError, setSuccess } from '../Redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CreateScreen = ({
  items,
  addItem,
  deleteItem,
  saveList,
  setError,
  setSuccess,
  shoppingList
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listTitle, setlistTitle] = useState('');  
  const [listTag, setlistTag] = useState('');  
  const [description, setDescription] = useState('');  

  const handleAddItem = () => {
    if (inputValue.trim() === '') {
      setError('Item cannot be empty');
    } else {
      addItem(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSave = () => {
    if (!listTitle.trim()) {
      setError('Please provide a list title');
    } else {
      saveList({ listTitle, listTag, description });
      setSuccess("Created a list", shoppingList);
      console.log("Created a list", shoppingList);
      setIsModalVisible(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{index + 1}. {item}</Text>
      <Pressable style={styles.deleteButton} onPress={() => deleteItem(index)}>
        <MaterialIcons name="delete" size={24} color="#FF6B6B" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.Parent}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Shopping List</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add item"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Pressable style={styles.addButton} onPress={handleAddItem}>
            <MaterialIcons name="add" size={25} color="#f9f9f9" />
          </Pressable>
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>

      <View style={styles.lastChild}>
        <Pressable style={styles.lastChildAddButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.lastChildText}>Save List</Text>
          <MaterialIcons name="done" size={25} color="#f9f9f9" />
        </Pressable>
      </View>

      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Item</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="List Title"
                value={listTitle}
                onChangeText={setlistTitle}
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Item Tag (Optional)"
                value={listTag}
                onChangeText={setlistTag}
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Description (Optional)"
                value={description}
                onChangeText={setDescription}
              />
              
              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.modalCancelButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.modalAddButton} onPress={handleSave}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  shoppingList: state.shoppingList,
});

const mapDispatchToProps = {
  addItem,
  deleteItem,
  saveList,
  setError,
  setSuccess,
};


const styles = StyleSheet.create({

    // PARENT
  Parent: 
  {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

//   MAIN
  main: 
  {
    flex: 1,
    padding: 20,
  },

  header: 
  {
    marginBottom: 20,
  },

  headerText: 
  {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  inputContainer: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    gap: 10
  },

  input: 
  {
  flex: 1,
  borderRadius: 5, 
  paddingHorizontal: 15,
  fontSize: 16,
  backgroundColor: '#f5f5ff',
  height: 50,
  alignSelf: 'center',
  elevation: 2, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1, 
  shadowRadius: 6, 
  borderWidth: 1, 
  borderColor: 'rgba(0, 0, 0, .1)',
  },

  addButton: 
  {
    backgroundColor: '#00B894',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  list: 
  {
    flex: 1,
  },

  listContent: 
  {
    paddingVertical: 10,
  },

  listItem: 
  {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  listItemText: 
  {
    fontSize: 16,
    color: '#333',
  },

//   LAST
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
    backgroundColor: '#00B894',
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

  // NEW MODAL STYLES
  modalContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: 
  {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  modalInput: 
  {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 10,
  },

  modalButtonContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  modalCancelButton: 
  {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },

  modalAddButton: 
  {
    backgroundColor: '#00B894',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },

  modalButtonText: 
  {
    color: 'white',
    fontWeight: 'bold',
  },
//   ENDS
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);

