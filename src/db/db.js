import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
    try {
        db = await SQLite.openDatabaseAsync('tasks.db');

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL
            );
        `);

        console.log('📂 Base de datos inicializada correctamente.');
    } catch (error) {
        console.error('⚠️ Error al inicializar la base de datos:', error);
    }
};

export const addTask = async (task) => {
    try {
        if (!task.trim()) throw new Error('⚠️ Escribe una tarea válida');

        const result = await db.runAsync('INSERT INTO tasks (name) VALUES (?);', [task]);
        console.log(`✅ Tarea añadida con ID: ${result.lastInsertRowId}`);
        return result.lastInsertRowId;
    } catch (error) {
        console.error('⚠️ Error al añadir tarea:', error);
    }
};

export const updateTask = async (id, newName) => {
    try {
        const result = await db.runAsync('UPDATE tasks SET name = ? WHERE id = ?;', [newName, id]);
        console.log(`✅ Tarea actualizada (${result.changes} filas modificadas)`);
    } catch (error) {
        console.error('⚠️ Error al actualizar tarea:', error);
    }
};

export const deleteTask = async (id) => {
    try {
        const result = await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
        console.log(`🗑️ Tarea eliminada (${result.changes} filas afectadas)`);
    } catch (error) {
        console.error('⚠️ Error al eliminar tarea:', error);
    }
};

export const fetchAllTasks = async () => {
    try {
        const tasks = await db.getAllAsync('SELECT * FROM tasks;');
        console.log('📋 Tareas obtenidas:', tasks);
        return tasks;
    } catch (error) {
        console.error('⚠️ Error al obtener tareas:', error);
        return [];
    }
};
