import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { setupDatabase } from '../database/db';
import { insertUser, getUsers } from '../database/userService';

const SQLiteScreen = () => {
    const [users, setUsers] = useState<Array<any>>([]);

    useEffect(() => {
        setupDatabase();
        loadUsers();
    }, []);

    const loadUsers = () => {
        getUsers(setUsers);
    };

    return (
        <View>
            <Button title="Agregar Usuario" onPress={() => {
                insertUser("Usuario " + (users.length + 1));
                loadUsers();
            }} />
            {users.map((user, index) => (
                <Text key={index}>{user.name}</Text>
            ))}
        </View>
    );
};

export default SQLiteScreen;
