
//   SQLite
import { openDatabaseAsync } from 'expo-sqlite';

let db;

export const initializeDatabase = async () => {
  try {
    if (!db) {
      db = await openDatabaseAsync('shoppingList.db');
    }

    // CREATE TABLE IF NOT EXISTS WITH PRAGMA JOURNAL MODE
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS shoppingList (
        id INTEGER PRIMARY KEY NOT NULL,
        listTitle TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        listTag TEXT NOT NULL,
        items TEXT NOT NULL,
        description TEXT NOT NULL,
        budget NUMBER NOT NULL,
        status TEXT NOT NULL,
        priority TEXT NOT NULL
      );
    `);

    console.log('DATABASE INITIALIZED SUCCESSFULLY AND TABLE CREATED (IF NOT EXISTS).');
    return true;
  } catch (error) {
    console.error('ERROR INITIALIZING THE DATABASE:', error);
    throw new Error('Failed to initialize database');
  }
};
// ENDS



// ADD SHOPPING LIST TO DATABASE
export const addList = async (listTitle, timestamp, listTag, items, description, budget, status, priority) => {
  try {
    if (!db) throw new Error('DATABASE NOT INITIALIZED');
  
    const result = await db.runAsync(
      'INSERT INTO shoppingList (listTitle, timestamp, listTag, items, description, budget, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      listTitle, timestamp, listTag, items, description, budget, status, priority
    );
  
    console.log('SHOPPING LIST INSERTED SUCCESSFULLY. ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('ERROR ADDING SHOPPING LIST:', error);
    throw new Error('Failed to add SHOPPING LIST to database');
  }
};


  
// GET ALL SHOPPING LIST FROM DATABASE
export const getAllLists = async () => {
  try {
    if (!db) throw new Error('DATABASE NOT INITIALIZED');
  
    const rows = await db.getAllAsync('SELECT * FROM shoppingList');
    console.log(`RETRIEVED ${rows.length} SHOPPING LIST SUCCESSFULLY`);
    return rows.map((row) => ({

        id: row.id,
        listTitle: row.listTitle,
        listTag: row.listTag,
        timestamp: row.timestamp,
        items: row.items,   
        description: row.description,
        priority: row.priority,
        budget: row.budget,
        status: row.status,

    }));
  } catch (error) {
    console.error('ERROR RETRIEVING IMAGES:', error);
    throw new Error('Failed to retrieve images from database');
  }
};


  
// UPDATE SHOPPING LIST IN DATABASE
export const updateList = async (id, listTitle, timestamp, listTag, items, description, budget, status, priority) => {
  try {
    if (!db) throw new Error('DATABASE NOT INITIALIZED');
  
    const result = await db.runAsync(
      'UPDATE shoppingList SET listTitle = ?, timestamp = ?, listTag = ?, items = ?, description = ?, budget = ?, status = ?, priority = ? WHERE id = ?',
      [listTitle, timestamp, listTag, items, description, budget, status, priority, id]
    );
  
    if (result.changes === 0) {
      console.warn(`NO ROWS UPDATED FOR SHOPPING LIST ID: ${id}`);
      throw new Error('No list found with the specified ID');
    }
    
    console.log(`SHOPPING LIST UPDATED SUCCESSFULLY. ROWS MODIFIED: ${result.changes}`);
    return result.changes;
  } catch (error) {
    console.error('ERROR UPDATING SHOPPING LIST:', error);
    throw new Error('Failed to update list in database');
  }
};




// DELETE IMAGE FROM DATABASE
export const deleteListDatabase = async (id) => {
  try {
    if (!db) throw new Error('DATABASE NOT INITIALIZED');
  
    const result = await db.runAsync('DELETE FROM shoppingList WHERE id = ?', id);
    
    if (result.changes === 0) {
      console.warn(`NO SHOPPING LIST FOUND WITH ID: ${id}`);
      throw new Error('No list found with the specified ID');
    }
    
    console.log(`SHOPPING LIST WITH ID ${id} DELETED SUCCESSFULLY`);
    return result.changes;
  } catch (error) {
    console.error('ERROR DELETING SHOPPING LIST:', error);
    throw new Error('Failed to delete list from database');
  }
};



  
// FETCH SINGLE IMAGE BY ID
export const getListById = async (id) => {
  try {
    if (!db) throw new Error('DATABASE NOT INITIALIZED');
  
    const row = await db.getFirstAsync('SELECT * FROM shoppingList WHERE id = ?', id);
    
    if (!row) {
      console.warn(`NO SHOPPING LIST FOUND WITH ID: ${id}`);
      throw new Error('No list found with the specified ID');
    }
    
    console.log(`SHOPPING LIST WITH ID ${id} RETRIEVED SUCCESSFULLY`);
    return row;
  } catch (error) {
    console.error('ERROR RETRIEVING IMAGE:', error);
    throw new Error('Failed to retrieve list from database');
  }
};