import React, { useState, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { fetchBooks } from '../services/api';


const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const inputRef = useRef();

    const handleSearch = async () => {
        try {
            const results = await fetchBooks(query);
            setBooks(results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <TextInput
                ref={inputRef}
                placeholder="Search for books"
                value={query}
                onChangeText={setQuery}
                onFocus={() => console.log('Input focused')}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text> // Customize the book item view
                )}
            />
        </View>
    );
};

export default SearchPage;
