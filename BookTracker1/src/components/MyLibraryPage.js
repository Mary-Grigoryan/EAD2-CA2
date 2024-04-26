import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';

const MyLibraryPage = () => {
    const [libraryEntries, setLibraryEntries] = useState([]);
    const [userId, setUserId] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        const fetchLibraryEntries = async () => {
            const user = await getUserId();
            setUserId(user);
            const { ok, data, error } = await fetchApi('Library', 'GET');
            if (ok) {
                console.log('Data:', data);
                const userEntries = data.filter(entry => entry.UserId === user);
                console.log('User Entries:', userEntries);
                setLibraryEntries(userEntries);
            } else {
                Alert.alert('Error', `Failed to fetch library entries: ${error}`);
            }
        };

        fetchLibraryEntries();
    }, []);

    const handleDelete = async (entryId) => {
        const { ok, data, error } = await fetchApi(`library/${entryId}`, 'DELETE');
        if (ok) {
            setRefreshing(true); // Set refreshing to true to force re-rendering
            setLibraryEntries(currentEntries => {
                return [...currentEntries.filter(entry => entry.Id !== entryId)];
            });
            setRefreshing(false); // Set refreshing to false once done
            Alert.alert('Success', 'Book deleted from library');
        } else {
            console.log('Failed to delete, status might not be 204:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={libraryEntries}
                extraData={refreshing}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.BookTitle || 'No title'}</Text>
                        <Text>{`Author: ${item.BookAuthor || 'Unknown'}`}</Text>
                        <Text>{`Status: ${item.ReadingStatus}`}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item.Id)} style={styles.deleteIcon}>
                            <Icon name="delete" size={24} color="red" />
                        </TouchableOpacity>
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
        backgroundColor: '#cad2c5',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default MyLibraryPage;
