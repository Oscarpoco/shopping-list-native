import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// ACTIONS
import { deleteList, setError, setSuccess } from '../Redux/actions';
import { useDispatch } from 'react-redux';

// DATABASE
import { deleteListDatabase } from '../Database/sql';

const ListDetailsScreen = ({ route, navigation }) => {

    // PARAMS
  const { item } = route.params;
  const items = JSON.parse(item.items); 

//   STATE
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();

  // FFORMAT DATE
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
//   ENDS

  // PRIORITY COLOR
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#4ECDC4';
      case 'Low':
        return '#45B7D1';
      default:
        return '#45B7D1';
    }
  };
//   ENDS

// HANDLE DELETE
const handleDelete = async (item) => {
    setLoading(true);
    try {

      await deleteListDatabase(item.id);
      dispatch(deleteList(item.id));
      dispatch(setSuccess("List deleted successfully."));
      navigation.goBack();

    } catch (error) {

      console.error("Error deleting list:", error);
      dispatch(setError("Failed to delete the list."));

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.listTitle}>{item.listTitle}</Text>
              <Text style={styles.listTag}>{item.listTag}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="account-balance-wallet" size={20} color="#6C63FF" />
              <Text style={styles.infoLabel}>Budget</Text>
              <Text style={styles.infoValue}>R{item.budget.toLocaleString()}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="flag" size={20} color="#6C63FF" />
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.dateSection}>
            <MaterialIcons name="access-time" size={16} color="#6C757D" />
            <Text style={styles.dateText}>Created on {formatDate(item.timestamp)}</Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.itemsCard}>
          <Text style={styles.sectionTitle}>Shopping Items</Text>
          <View style={styles.itemsList}>
            {items.map((itemName, index) => (
              <View key={index} style={styles.itemRow}>
                <View style={styles.itemDot} />
                <Text style={styles.itemText}>{itemName}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => {/* Add edit navigation logic */}}
          >
            <MaterialIcons name="edit" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Edit List</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => {handleDelete(item)}}
          >
            {loading ? <ActivityIndicator/> :
            <View style={styles.deleteButtonWrapper}>
                <MaterialIcons name="delete" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Delete List</Text>
            </View>
        }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
 
  content: 
  {
    flex: 1,
    padding: 16,
  },

  mainCard: 
  {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },

      android: 
      {
        elevation: 4,
      },
    }),
  },

  titleRow: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  listTitle: 
  {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },

  listTag: 
  {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },

  priorityBadge: 
  {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  priorityText: 
  {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  infoRow: 
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E9ECEF',
  },

  infoItem: 
  {
    alignItems: 'center',
  },

  infoLabel: 
  {
    fontSize: 12,
    color: '#6C757D',
    marginVertical: 4,
  },

  infoValue: 
  {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },

  descriptionSection: 
  {
    marginBottom: 16,
  },

  sectionTitle: 
  {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },

  description: 
  {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },

  dateSection: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  dateText: 
  {
    fontSize: 12,
    color: '#6C757D',
  },

  itemsCard: 
  {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },

      android: 
      {
        elevation: 4,
      },
    }),
  },

  itemsList: 
  {
    gap: 12,
  },

  itemRow: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  itemDot: 
  {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
  },

  itemText: 
  {
    fontSize: 16,
    color: '#212529',
  },

  actionButtons: 
  {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },

  actionButton: 
  {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },

  deleteButtonWrapper: 
  {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  editButton: 
  {
    backgroundColor: '#6C63FF',
  },

  deleteButton: 
  {
    backgroundColor: '#FF6B6B',
  },

  buttonText: 
  {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default ListDetailsScreen;