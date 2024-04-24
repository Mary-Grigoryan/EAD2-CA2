import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { fetchBooks } from '../services/api';


const SearchPage = () => {
    const [title, setTitle] = useState('');
    const [books, setBooks] = useState([]);
    const inputRef = useRef();

    const handleSearch = async () => {
        console.log('Search triggered for title:', title);
        try {
            const results = await fetchBooks(title);
            console.log('Fetched results:', results);
            setBooks(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    useEffect(() => {
        if (books.length > 0) {
            console.log('Books have been updated:', books);
        }
    }, [books]);

    return (
        <View>
            <TextInput
                ref={inputRef}
                placeholder="Search for books"
                value={title}
                onChangeText={setTitle}
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
