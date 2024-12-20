import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  FlatList,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '../Redux/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ListScreen = ({ navigation }) => {
  const lists = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.activeFilter);
  const [scaleAnim] = useState(new Animated.Value(1));

  // Animation for button press
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

  const filteredLists = lists.filter((item) => {
    switch (activeFilter) {
      case 'to-shop':
        return item.status === 'to-shop';
      case 'in-progress':
        return item.status === 'in-progress';
      case 'done':
        return item.status === 'done';
      default:
        return true;
    }
  });

  const renderListItem = ({ item }) => {
    const { listTitle, description, timestamp, priority, status } = item;

    const priorityColors = {
      High: '#FF6B6B',
      Medium: '#4ECDC4',
      Low: '#45B7D1'
    };

    const statusIcons = {
      'to-shop': 'shopping-bag',
      'in-progress': 'shopping-cart',
      'done': 'check-circle'
    };

    return (
      <Animated.View style={[styles.listItem, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity 
          style={[styles.listItemContent, { borderLeftColor: priorityColors[priority] }]}
          onPress={() => {
            animatePress();
            navigation.navigate('Details', {item});
          }}
        >
          <View style={styles.listItemHeader}>
            <Text style={styles.listItemTitle}>{listTitle || 'Untitled List'}</Text>
            <MaterialIcons 
              name={statusIcons[status]} 
              size={24} 
              color={priorityColors[priority]} 
            />
          </View>
          
          <Text style={styles.listItemDescription}>{description || 'No description provided'}</Text>
          
          <View style={styles.listItemFooter}>
            <Text style={styles.listItemDate}>
              {new Date(timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColors[priority] }]}>
              <Text style={styles.priorityText}>{priority}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const sidebarButtons = [
    { key: 'All Lists', icon: 'dashboard', color: '#444', label: 'All' },
    { key: 'to-shop', icon: 'shopping-bag', color: '#FFA1AE', label: 'To Shop' },
    { key: 'in-progress', icon: 'shopping-cart', color: '#F6C92F', label: 'Shopping' },
    { key: 'done', icon: 'check-circle', color: '#1DBD84', label: 'Done' },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarContent}>
          {sidebarButtons.map((button) => (
            <TouchableOpacity
              key={button.key}
              style={[
                styles.sidebarButton,
                activeFilter === button.key && styles.sidebarButtonActive
              ]}
              onPress={() => dispatch(setActiveFilter(button.key))}
            >
              <MaterialIcons name={button.icon} size={24} color={activeFilter === button.key ? '#FFF' : button.color} />
              <Text style={[
                styles.sidebarButtonLabel,
                activeFilter === button.key && styles.sidebarButtonLabelActive
              ]}>
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="home" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{activeFilter}</Text>
          <View style={styles.headerIconContainer}>
            <MaterialIcons
              name={sidebarButtons.find(btn => btn.key === activeFilter)?.icon || 'dashboard'}
              size={24}
              color="#333"
            />
          </View>
        </View>

        {/* List Content */}
        <FlatList
          data={filteredLists}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="shopping-basket" size={48} color="#DDD" />
              <Text style={styles.emptyText}>No items found</Text>
            </View>
          }
        />

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Create Item')}
        >
          <MaterialIcons name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add New List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: 
  {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
  },
  
  // SIDE STYLES
  sidebar: 
  {
    width: '25%',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E9ECEF',
    padding: 5,
    justifyContent: 'space-between',

    ...Platform.select({
      ios: 
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: 
      {
        elevation: 4,
      },
    }),
  },

  sidebarContent: 
  {
    flex: 1,
    gap: 25,
    marginTop: 50,
  },

  sidebarButton: 
  {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#d3ddda',
  },

  sidebarButtonActive: 
  {
    backgroundColor: '#6C63FF',
  },

  sidebarButtonLabel: 
  {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 1
  },

  sidebarButtonLabelActive: 
  {
    color: '#FFF',
  },

  homeButton: 
  {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#d3ddda',
    alignItems: 'center',
  },

  // MAIN STYLING
  main: 
  {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    width: '75%',
    paddingTop: 48,

  },

  header: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    height: 50
  },

  headerTitle: 
  {
    fontSize: 25,
    fontWeight: '700',
    color: '#212529',
    marginRight: 12,
    padding: 0,
    backgroundColor: '#F8F9FA',
    letterSpacing: 1.5
  },

  headerIconContainer: 
  {
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // LIST STYLE
  listContainer: 
  {
    paddingBottom: 70,
  },

  listItem: 
  {
    marginBottom: 16,
  },

  listItemContent: 
  {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
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

  listItemHeader: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  listItemTitle: 
  {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },

  listItemDescription: 
  {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },

  listItemFooter: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listItemDate: 
  {
    fontSize: 12,
    color: '#ADB5BD',
  },
  priorityBadge: 
  {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: 
  {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },

  // EMPTY CONTAINER
  emptyContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },

  emptyText: 
  {
    marginTop: 16,
    fontSize: 16,
    color: '#ADB5BD',
    fontWeight: '500',
  },


  addButton: 
  {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
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

  addButtonText: 
  {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ListScreen;