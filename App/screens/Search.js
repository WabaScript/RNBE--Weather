import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { SearchItem } from '../components/List';

export default function Search({ navigation }) {
    const [query, setQuery] = useState('');

    return (
        <FlatList
            style={{ backgroundColor: 'white' }}
            data={[{ id: 1, name: 'ricky' }, { id: 2, name: "cool" }]}
            renderItem={({ item }) => (
                <SearchItem
                    name={item.name}
                    onPress={() => navigation.navigate("Details")}
                />
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={(
                <View>
                    <SearchBar
                        onSearch={() => {
                            navigation.navigate('Details', { zipcode: query })
                        }}
                        searchButtonEnabled={query.length >= 5}
                        placeholder="Zipcode"
                        onChangeText={query => setQuery(query)}
                    />
                    <Text style={{
                        marginHorizontal: 10,
                        fontSize: 16,
                        color: "#aaa",
                        marginTop: 10,
                        marginBottom: 5
                    }}
                    >
                        Recents
                    </Text>
                </View>
            )}
        />
    )
}