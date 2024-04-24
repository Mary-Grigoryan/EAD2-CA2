import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, TextInput } from 'react-native';
import { fetchApi } from '../services/api';

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all books when component mounts
    useEffect(() => {
        const getBooksByTitle = async () => {
            const { ok, data, error } = await fetchApi(`Books?title=${searchQuery}`, 'GET');
            if (ok) {
            console.log('Fetched books by title:', data);
            setBooks(data);  // Ensure the data structure fits the expected format of your state
            } else {
            console.error('Error fetching books by title:', error);
            Alert.alert('Error Fetching Books', error);
            }
        };

        getBooksByTitle();

    }, [searchQuery]);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Search by title"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title} - {item.author} ({item.publicationYear})</Text>
                )}
                contentContainerStyle={{ padding: 20 }}
            />
        </View>
    );
};

export default SearchPage;

