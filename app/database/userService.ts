import db from './db';


export const insertUser = (name: string) => {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO users (name) VALUES (?);", [name]);
    });
};

export const getUsers = (callback: (users: any[]) => void) => {
    db.transaction(tx => {
        tx.executeSql("SELECT * FROM users;", [], (_, { rows }) => {
            callback(rows._array);
        });
    });
};
