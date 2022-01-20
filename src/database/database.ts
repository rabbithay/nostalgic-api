import { getConnectionManager, getConnection, createConnection } from 'typeorm';

export default async function connect() {
  try {
    const connection = getConnection('default');
    return connection;
  } catch (err) {
    const connection = await createConnection();
    return connection;
  }
}

export const close = async (): Promise<void> => {
  const connectionManager = getConnectionManager();
  const connectionName = 'default';

  if (connectionManager.has(connectionName)) {
    await connectionManager.get(connectionName).close();
  }
};
