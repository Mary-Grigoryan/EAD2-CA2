import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Alert, TextInput, StyleSheet, Button } from 'react-native';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation(); // Get navigation prop

    useEffect(() => {
        const initializeUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };

        getAllBooks();
        initializeUserId();
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

    const navigateToBookDetails = (bookId) => {
        navigation.navigate('Book Details', { bookId });
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

    const goToMyLibrary = () => {
        navigation.navigate('My Library');
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
            <Button title="Go to My Library" onPress={goToMyLibrary} />
            <FlatList
                data={books}
                keyExtractor={(item) => item?.id?.toString() ?? 'default-value'}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title} - {item.author} ({item.publicationYear})</Text>
                        <Button title="View Details" onPress={() => navigateToBookDetails(item.id)} />
                    </View>
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
