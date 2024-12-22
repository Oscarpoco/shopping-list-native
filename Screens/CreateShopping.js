import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  FlatList,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Animated
} from 'react-native';

// REDUX
import { connect, useDispatch, useSelector } from 'react-redux';
import { 
  addItem, 
  deleteItem, 
  saveList, 
  setError, 
  setSuccess,
  fetchLists
} from '../Redux/actions';

// DATABASE
import { addList, getAllLists, initializeDatabase } from '../Database/sql.js';

// EXTRA IMPORTS
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

const CreateScreen = ({ items, addItem, deleteItem, saveList, setError, setSuccess, navigation }) => {
  const dispatch = useDispatch();
  const userId  =useSelector(state => state.userId) || "";
  
  

  // Animation value
  const [scaleAnim] = useState(new Animated.Value(1));

  // Local state
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [listTag, setListTag] = useState('');
  const [description, setDescription] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [priority, setPriority] = useState('Low');
  const [budget, setBudget] = useState('1');

  // Initialize database
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const initialized = await initializeDatabase();
        if (initialized) {
          const storedList = await getAllLists(userId);
          dispatch(fetchLists(storedList));
        }
      } catch (error) {
        console.error('Database Error:', error);
      }
    };
    setupDatabase();
  }, [dispatch]);

  // Animation for item addition
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // HANDLE ADD ITEMS
  const handleAddItem = () => {
    if (inputValue.trim() === '') {
      setError('Item cannot be empty');
    } else {
      addItem(inputValue.trim());
      setError(null);
      setSuccess('Item added successfully');
      setInputValue('');
    }
  };

  // HANDLE SAVE LIST
  const handleSaveAndReset = () => {
    if (!listTitle.trim()) {
      dispatch(setError('List Title cannot be empty'));
      return;
    }

    dispatch(saveList({ listTitle, listTag, description, priority, budget,userId }));
    saveListToDatabase(listTitle, listTag, description, priority, budget, items, userId);

    dispatch(setSuccess(`List "${listTitle}" created successfully`));
  
    navigation.navigate('Shopping list');


    setListTitle('');
    setListTag('');
    setDescription('');
    setPriority('Low');
    setBudget(1);
    setConfirm(false);
    setIsModalVisible(false);
  };

  // SAVE LIST TO DATABASE
  const saveListToDatabase = async (listTitle, listTag, description, priority, budget, items, userId) => {
    try {
      if (!listTitle || !listTag || !items || !budget) {
        throw new Error('Missing required fields');
      }

      const timestamp = new Date().toISOString();
      const status = 'active'; 

      await addList(
        listTitle,
        timestamp,
        listTag,
        JSON.stringify(items),
        description,
        budget,
        status,
        priority, 
        userId
      );

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `List "${listTitle}" created successfully`,
        position: 'bottom',
      });

      const updatedLists = await getAllLists(userId);
      dispatch(fetchLists(updatedLists));
    } catch (error) {
      console.error('Error saving list:', error);
      dispatch(setError(error.message || 'Error saving the list'));
    }
  };

  const renderItem = ({ item, index }) => (
    <Animated.View style={[styles.listItem, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.listItemText}>{index + 1}. {item}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteItem(index)}
      >
        <MaterialIcons name="delete-outline" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Shopping List</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add item to list"
            placeholderTextColor="#ADB5BD"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => {
              animatePress();
              handleAddItem();
            }}
          >
            <MaterialIcons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <MaterialIcons name="shopping-cart" size={48} color="#DDD" />
              <Text style={styles.emptyText}>No items added yet</Text>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialIcons name="save" size={24} color="#FFF" />
        <Text style={styles.saveButtonText}>Save List</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {confirm ? 'Confirm Save' : 'List Details'}
              </Text>

              {!confirm && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>List Title</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter list title"
                      placeholderTextColor="#ADB5BD"
                      value={listTitle}
                      onChangeText={setListTitle}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Tag</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter list tag"
                      placeholderTextColor="#ADB5BD"
                      value={listTag}
                      onChangeText={setListTag}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                      style={[styles.modalInput, styles.textArea]}
                      placeholder="Enter description"
                      placeholderTextColor="#ADB5BD"
                      value={description}
                      onChangeText={setDescription}
                      multiline
                      numberOfLines={3}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Budget</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Enter budget"
                      placeholderTextColor="#ADB5BD"
                      value={budget}
                      onChangeText={(value) => {
                        if (/^\d*$/.test(value)) {
                          setBudget(value);
                        }
                      }}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Priority</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={priority}
                        onValueChange={(itemValue) => setPriority(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Low" value="Low" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="High" value="High" />
                      </Picker>
                    </View>
                  </View>
                </>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    if (confirm) {
                      setConfirm(false);
                    } else {
                      setIsModalVisible(false);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {confirm ? 'No, Go Back' : 'Cancel'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => {
                    if (confirm) {
                      handleSaveAndReset();
                    } else {
                      setConfirm(true);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {confirm ? 'Yes, Save' : 'Continue'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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

  container: 
  {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  header: 
  {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },

      android: 
      {
        elevation: 4,
      },
    }),
  },

  headerTitle: 
  {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    letterSpacing: 1
  },

  content: 
  {
    flex: 1,
    padding: 20,
  },

  inputContainer: 
  {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  input: 
  {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212529',
    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },

      android: 
      {
        elevation: 2,
      },
    }),
  },

  addButton: 
  {
    width: 50,
    height: 50,
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: 
      {
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },

      android: 
      {
        elevation: 4,
      },
    }),
  },

  list: 
  {
    flex: 1,
  },

  listContent: 
  {
    paddingBottom: 80,
  },

  listItem: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },

      android: 
      {
        elevation: 2,
      },
    }),
  },

  listItemText: 
  {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },

  deleteButton: 
  {
    padding: 8,
  },

  emptyList: 
  {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  emptyText: 
  {
    marginTop: 12,
    fontSize: 16,
    color: '#ADB5BD',
  },

  saveButton: 
  {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 56,
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Platform.select({
      ios: 
      {
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },

      android: 
      {
        elevation: 8,
      },
    }),
  },

  saveButtonText: 
  {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },

  modalContainer: 
  {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 25,
  },

  modalContent: 
  {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },

  modalTitle: 
  {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1
  },

  inputGroup: 
  {
    marginBottom: 20,
  },

  inputLabel: 
  {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
    marginBottom: 8,
  },

  modalInput: 
  {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#212529',
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

  modalButtons: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  modalButton: 
  {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  cancelButton: 
  {
    backgroundColor: '#ADB5BD',
  },

  confirmButton: 
  {
    backgroundColor: '#6C63FF',
  },

  buttonText: 
  {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
//   ENDS
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateScreen);

