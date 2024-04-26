import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchApi } from '../services/api';
import { getUserId } from '../services/userServices';
import { useTranslation } from 'react-i18next';

const MyLibraryPage = () => {
    const [libraryEntries, setLibraryEntries] = useState([]);
    const [userId, setUserId] = useState('');
    const { t } = useTranslation();
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
                        <Text style={styles.title}>{item.BookTitle || t('No title')}</Text>
                        <Text>{t('Author')}: ${item.BookAuthor || t('Unknown')}</Text>
                        <Text>{t('Status')} ${item.ReadingStatus}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item.Id)} style={styles.deleteIcon}>
                            <Icon name="delete" size={24} color="red" />
                        </TouchableOpacity>
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
        backgroundColor: '#F5F5F5', // light grey background
        paddingTop: 20,
    },
    item: {
        backgroundColor: '#FAFAFA', // lighter grey for items
        padding: 20,
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2, // subtle shadow for material design elevation
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // spacing out elements
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2F4F4F', // sage green text for titles
    },
    detailText: {
        color: '#2F4F4F', // consistent sage green text for details
    },
    deleteIcon: {
        padding: 10, // easier to tap
    },
    listContainer: {
        paddingBottom: 20, // padding at the bottom of the list
    },
});

export default MyLibraryPage;
