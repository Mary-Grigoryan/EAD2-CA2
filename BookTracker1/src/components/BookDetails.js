import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';

const BookDetails = ({ route }) => {
    const [book, setBook] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const { bookId } = route.params;
        getBookDetails(bookId);
        fetchUserId();
    }, []);

    const getBookDetails = async (bookId) => {
        const { ok, data, error } = await fetchApi(`Books/${bookId}`, 'GET');
        if (ok) {
            console.log('Book details received:', data);
            setBook(data);
        } else {
            Alert.alert('Error Fetching Book Details', error);
        }
    };

    const fetchUserId = async () => {
        const id = await getUserId();
        setUserId(id);
    };

    const addToLibrary = async () => {
        if (!userId) {
            Alert.alert('User ID not found', 'Cannot add book to library.');
            return;
        }
        if (!book || !book.Id) {
            Alert.alert('Error', 'Book information is incomplete.');
            return;
        }

        const payload = {
            BookId: book.Id,
            UserId: userId,
            ReadingStatus: 'to read',
        };

        console.log('Sending data to Library:', payload);

        const { ok, data, error } = await fetchApi('Library', 'POST', payload);

        if (ok) {
            console.log('Book added to library:', data);
            Alert.alert('Success', 'Book added to library!');
        } else {
            console.error('Error while adding book:', error);
            Alert.alert('Error', `Could not add book to library: ${error}`);
        }
    };

    if (!book) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Title: {book.Title}</Text>
            <Text>Author: {book.Author}</Text>
            <Text>ISBN: {book.ISBN}</Text>
            <Text>Genre: {book.Genre}</Text>
            <Text>Publication Year: {book.PublicationYear}</Text>
            <Text>Synopsis: {book.Synopsis || 'N/A'}</Text>
            <Button title="Add to My Library" onPress={() => addToLibrary(book.Id)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'left',
        justifyContent: 'center',
        padding: 20,
    },
});

export default BookDetails;
