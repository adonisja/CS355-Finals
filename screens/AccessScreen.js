// import * as SQLite from 'expo-sqlite';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// async function openDB() {
//     const dbDir = FileSystem.documentDirectory + 'SQLite';
//     const dbPath = `${dbDir}/imdb.db`;
//     const assetPath = Asset.fromModule(require('../assets/database/imdb.db')).uri;

//     try {
//         const dirExists = await FileSystem.getInfoAsync(dbDir);
//         if (!dirExists.exists) {
//             await FileSystem.makeDirectoryAsync(dbDir);
//         }

//         const fileExists = await FileSystem.getInfoAsync(dbPath);
//         if (!fileExists.exists) {
//             console.log('Copying imdb.db to device storage...');
//             await FileSystem.downloadAsync(assetPath, dbPath);
//             console.log('Database installed successfully');
//         }
//     } catch (error) {
//         console.error('Error copying database:', error);
//     }

//     const db = SQLite.openDatabaseAsync('imdb.db');
//     return db;
// }

// export default openDB;

// Supabase
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://esmyhyxbfjucakgchvrr.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)