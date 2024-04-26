import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Alert, TextInput, StyleSheet, Button } from 'react-native';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';
import { useTransition } from 'react-i18next';

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation(); // Get navigation prop
    const { t } = useTransition();

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
        console.log('Navigating to details for book ID:', bookId);
        if (bookId === undefined) {
            console.error('Book ID is undefined');
            // Handle the error case here
            return;
        }
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
                placeholder={t('Search books by title')}
            />
            <View style={styles.buttonContainer}>
                <Button title={t('Search')} color="#8FBC8F" onPress={searchBooks} />
                <Button title={t('Go to My Library')} color="#8FBC8F" onPress={goToMyLibrary} />
            </View>
            <FlatList
                data={books}
                keyExtractor={(item, index) => item?.id?.toString() ?? `default-${index}`}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.Title} - {item.Author} ({item.PublicationYear})</Text>
                        <Button title={t('View Details')} onPress={() => navigateToBookDetails(item.Id)} />
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
        borderColor: '#D3D3D3', // light grey border
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 20,
    },
    listContainer: {
        padding: 20,
    },
    bookItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3', // light grey border for items
        marginBottom: 10,
    },
    bookText: {
        color: '#2F4F4F', // sage green text
    },
});

export default SearchPage;
