import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { fetchApi } from '../services/api';

const SearchPage = () => {
    const [books, setBooks] = useState([]);

    // Fetch all books when component mounts
    useEffect(() => {
        const getAllBooks = async () => {
            const { ok, data, error } = await fetchApi('Books', 'GET');
            if (ok) {
                console.log('Fetched all books:', data);
                setBooks(data);  // Ensure the data structure fits the expected format of your state
            } else {
                console.error('Error fetching all books:', error);
                Alert.alert('Error Fetching Books', error);
            }
        };

        getAllBooks();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
