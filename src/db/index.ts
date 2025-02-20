// db.js
import { openDB } from 'idb';

const DB_NAME = 'QuizAppDB';
const STORE_NAME = 'quizHistory';

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Save quiz result to IndexedDB
interface QuizResult {
    id?: number;
    score: number;
    date: string;
    time: string;
    answers: string[];
}

export const saveQuizResult = async (result: QuizResult): Promise<number> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const id = await store.add(result) as number; // Get the auto-generated ID
  await tx.done;
  return id; // Return the ID
};


// Fetch all quiz history from IndexedDB
export const getQuizHistory = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

// Fetch quiz history by ID from IndexedDB
export const getQuizHistoryById = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return store.get(id);
};