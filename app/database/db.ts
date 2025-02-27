import * as SQLite from 'expo-sqlite';

// Abrir la base de datos (se crea si no existe)
const db = SQLite.openDatabase('huellitas.db');

// Función para inicializar la base de datos y crear las tablas si no existen
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );`,
      [],
      () => console.log('Tabla de usuarios creada correctamente'),
      (_, error) => {
        console.error('Error al crear la tabla de usuarios:', error);
        return false;
      }
    );
  });
};

// Función para agregar un usuario
export const addUser = (name: string, email: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email) VALUES (?, ?);',
      [name, email],
      (_, result) => console.log('Usuario agregado:', result.insertId),
      (_, error) => {
        console.error('Error al agregar usuario:', error);
        return false;
      }
    );
  });
};

// Función para obtener todos los usuarios
export const getUsers = (callback: (users: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => {
        console.error('Error al obtener usuarios:', error);
        return false;
      }
    );
  });
};

export default db;
