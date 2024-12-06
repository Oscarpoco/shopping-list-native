import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, FlatList, Modal } from 'react-native';

// REDUX
import { connect } from 'react-redux';
import { addItem, deleteItem, saveList, setError, setSuccess } from '../Redux/actions';

// PICKER
import { Picker } from '@react-native-picker/picker';

// ICONS
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

  // LOCAL USE STATE
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listTitle, setlistTitle] = useState('');
  const [listTag, setlistTag] = useState('');
  const [description, setDescription] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [priority, setPriority] = useState('Low');
  const [budget, setBudget] = useState(1);
  // ENDS

  // HANDLE ADD ITEMS
  const handleAddItem = () => {
    if (inputValue.trim() === '') {
      setError('Item cannot be empty');
    } else {
      addItem(inputValue.trim());
      setError(null); 
      setSuccess('Item added successfully');
      console.log('Item added successfully', items);
      setInputValue('');
    }
  };
  // ENDS


  // HANDLE SAVE LIST
  const handleSaveAndReset = () => {
    if (!listTitle.trim()) {
      setError('List Title cannot be empty');
      return;
    }
  
    saveList({ listTitle, listTag, description, priority, budget });
    setSuccess(`List "${listTitle}" created successfully`);
    console.log(
      `List "${listTitle}" created with priority: ${priority} and budget: ${budget}`
    );
    setlistTitle('');
    setlistTag('');
    setDescription('');
    setPriority('Low');
    setBudget(1); 
    setConfirm(false);
    setIsModalVisible(false);
  };

  // ENDS

  console.log('Shopping list', shoppingList)

  // RENDER ITEMS
  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{index + 1}. {item}</Text>
      <Pressable style={styles.deleteButton} onPress={() => deleteItem(index)}>
        <MaterialIcons name="delete" size={24} color="#FF6B6B" />
      </Pressable>
    </View>
  );
  // ENDS

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

              <TextInput
                style={styles.modalInput}
                placeholder="Budget (e.g., 5000)"
                value={budget}
                onChangeText={(value) => {
                  if (/^\d*$/.test(value)) {
                    setBudget(value);
                  }
                }}
                keyboardType="numeric"
              />

              {/* THE DROPVDOWN FOR PRIORITY  */}
              <Text style={styles.modalLabel}>Set Priority:</Text>
              <Picker
                selectedValue={priority}
                onValueChange={(itemValue) => setPriority(itemValue)}
                style={styles.modalPicker}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>

              {confirm ? (
                <View style= {{flexDirection: 'column', padding: 10, backgroundColor: '#f5f5ff', justifyContent: 'center', alignItems: 'center', gap: 15, borderRadius: 5, flexDirection: 'column'}}>
                  <Text style={[{textTransform: 'uppercase', color: '#333', width: '100%'}]}>Are you sure you want to save?</Text>
                  <View style={styles.modalButtonContainer}>
                    <Pressable style={styles.modalCancelButton} onPress={() => setConfirm(false)}>
                      <Text>No</Text>
                    </Pressable>
                    <Pressable style={styles.modalAddButton} onPress={handleSaveAndReset}>
                      <Text>Yes</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View style={styles.modalButtonContainer}>
                  <Pressable style={styles.modalCancelButton} onPress={() => setIsModalVisible(false)}>
                    <Text>Cancel</Text>
                  </Pressable>
                  <Pressable style={styles.modalAddButton} onPress={() => setConfirm(true)}>
                    <Text>Save</Text>
                  </Pressable>
                </View>
              )}
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

  modalLabel: 
  {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 8,
    marginLeft: 5,
    alignSelf: 'left',
  },

  modalPicker: 
  {
    height: 50,
    width: '100%',
    backgroundColor: '#f5f5ff',
    borderRadius: 10,
    marginBottom: 16,
  },
//   ENDS
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);

