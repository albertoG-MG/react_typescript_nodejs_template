import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getEnvVariable = (key: string): string => {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`La variable de entorno ${key} no está definida`);
    }
    return value;
};

// Configuración de la base de datos
const dbConfig: mssql.config = {
    user: getEnvVariable('DB_USER'),
    password: getEnvVariable('DB_PASSWORD'),
    server: getEnvVariable('DB_HOST'),
    port: Number(getEnvVariable('DB_PORT')),
    database: getEnvVariable('DB_NAME'),
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Pool de conexión global
let connectionPool: mssql.ConnectionPool | null = null;

// Función para obtener la conexión
const getConnection = async (): Promise<mssql.ConnectionPool> => {
    if (!connectionPool) {
        try {
            connectionPool = await mssql.connect(dbConfig);
            console.log('Conectado a la base de datos MSSQL');
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    }
    return connectionPool;
};

export { getConnection };
