import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, TextInput, StyleSheet, Button } from 'react-native';
import { fetchApi } from '../services/api';

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        const { ok, data, error } = await fetchApi('Books', 'GET');
        if (ok) {
            console.log('Data received:', data);
            setBooks(data);
        } else {
            Alert.alert('Error Fetching Books', error);
        }
    };

    const searchBooks = async () => {
        const { ok, data, error } = await fetchApi(`Books/search?title=${encodeURIComponent(searchQuery)}`, 'GET');
        if (ok) {
            console.log('Data received:', data);
            setBooks(data);
        } else {
            Alert.alert('Error Searching Books', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search books by title"
            />
            <Button title="Search" onPress={searchBooks} />
            <FlatList
                data={books}
                keyExtractor={(item) => item?.id?.toString() ?? 'default-value'}
                renderItem={({ item }) => (
                    <Text>{item.title} - {item.author} ({item.publicationYear})</Text>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // changed to flex-start to have search on top
        paddingTop: 20 // add some padding at the top
    },
    searchInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    listContainer: {
        padding: 20,
    },
});

export default SearchPage;
