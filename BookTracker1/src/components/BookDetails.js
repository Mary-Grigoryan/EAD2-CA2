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

    const addToLibrary = async (bookId) => {
        if (!userId) {
            Alert.alert('User ID not set', 'Cannot add book to library.');
            return;
        }

        const payload = {
            BookId: bookId,
            UserId: userId,
            ReadingStatus: 'to read', // or any default status
        };

        console.log('Sending data to Library:', payload);

        const { ok, data, error } = await fetchApi('Library', 'POST', payload);

        if (ok) {
            Alert.alert('Success', 'Book added to library!');
        } else {
            // The error might contain more details about why the request failed
            console.error('Error while adding book:', error);
            Alert.alert('Error Adding Book', error);
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
            <Text>Title: {book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>ISBN: {book.isbn}</Text>
            <Text>Genre: {book.genre}</Text>
            <Text>Publication Year: {book.publicationYear}</Text>
            <Text>Synopsis: {book.synopsis || 'N/A'}</Text>
            <Button title="Add to My Library" onPress={() => addToLibrary(book.id)} />
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
