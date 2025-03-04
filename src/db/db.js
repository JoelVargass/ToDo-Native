import * as SQLite from 'expo-sqlite';

let db;

const initDB = async () => {
    try {
        db = await SQLite.openDatabaseAsync('tasks.db');

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL,
                status TEXT CHECK( status IN ('pendiente', 'completada') ) DEFAULT 'pendiente'
            );
        `);

        console.log('📂 Base de datos inicializada correctamente.');
    } catch (error) {
        console.error('⚠️ Error al inicializar la base de datos:', error);
    }
};

const addTask = async (task) => {
    try {
        if (!task.trim()) throw new Error('⚠️ Escribe una tarea válida');

        const result = await db.runAsync('INSERT INTO tasks (name, status) VALUES (?, ?);', [task, 'pendiente']);
        console.log(`✅ Tarea añadida con ID: ${result.lastInsertRowId}`);
        return result.lastInsertRowId;
    } catch (error) {
        console.error('⚠️ Error al añadir tarea:', error);
    }
};

const updateTask = async (id, newName) => {
    try {
        const result = await db.runAsync('UPDATE tasks SET name = ? WHERE id = ?;', [newName, id]);
        console.log(`✅ Tarea actualizada (${result.changes} filas modificadas)`);
    } catch (error) {
        console.error('⚠️ Error al actualizar tarea:', error);
    }
};

const updateTaskStatus = async (id, newStatus) => {
    try {
        if (!['pendiente', 'completada'].includes(newStatus)) {
            throw new Error('⚠️ Estado inválido. Usa "pendiente" o "completada"');
        }
        const result = await db.runAsync('UPDATE tasks SET status = ? WHERE id = ?;', [newStatus, id]);
        console.log(`✅ Estado de tarea actualizado (${result.changes} filas modificadas)`);
    } catch (error) {
        console.error('⚠️ Error al actualizar estado de tarea:', error);
    }
};

const deleteTask = async (id) => {
    try {
        const result = await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
        console.log(`🗑️ Tarea eliminada (${result.changes} filas afectadas)`);
    } catch (error) {
        console.error('⚠️ Error al eliminar tarea:', error);
    }
};

const fetchAllTasks = async () => {
    try {
        const tasks = await db.getAllAsync('SELECT * FROM tasks;');
        console.log('📋 Tareas obtenidas:', tasks);
        return tasks;
    } catch (error) {
        console.error('⚠️ Error al obtener tareas:', error);
        return [];
    }
};

module.exports = {
    initDB,
    fetchAllTasks,
    addTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
};