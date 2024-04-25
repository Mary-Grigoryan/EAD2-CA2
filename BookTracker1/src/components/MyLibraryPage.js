// MyLibraryPage.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, StyleSheet } from 'react-native';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';

const MyLibraryPage = () => {
    const [libraryEntries, setLibraryEntries] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchLibraryEntries = async () => {
            const user = await getUserId();
            setUserId(user);
            const { ok, data, error } = await fetchApi('Library', 'GET');
            if (ok) {
                console.log('Data:', data); // Log to check what's coming from backend
                const userEntries = data.filter(entry => entry.userId === user);
                console.log('User Entries:', userEntries); // Verify the filtering
                setLibraryEntries(userEntries);
            } else {
                Alert.alert('Error', `Failed to fetch library entries: ${error}`);
            }
        };

        fetchLibraryEntries();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={libraryEntries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.bookTitle || 'No title'}</Text>
                        <Text>{`Author: ${item.bookAuthor || 'Unknown'}`}</Text>
                        <Text>{`Status: ${item.readingStatus}`}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});

export default MyLibraryPage;
