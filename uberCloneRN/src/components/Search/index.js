import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function Search(props) {
    const { onLocationSelected } = props;
    const [searchFocused, setSearchFocused] = useState(null);


    handleFocused = (props) => {
        setSearchFocused({ searchFocused: props });
    }


    return <GooglePlacesAutocomplete 
        placeholder="Para onde?"
        placeholderTextColor='#333'
        onPress={onLocationSelected}
        query={{
            key: 'AIzaSyDsS2DspdDuZTAZNXDyDqPivN7VseN53Co',
            language: 'pt',
        }}
        textInputProps={{
            onFocus: () => handleFocused(true),
            onBlur: () => handleFocused(false),
            autoCaptalize: 'none',
            autoCorrect: false,
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={styles}
    />;
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: Platform.select({ ios: 60, android: 40 }),
        width: "100%",
    },
    textInputContainer: {
        flex: 1,
        backgroundColor: "transparent",
        height: 54,
        marginHorizontal: 20,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    textInput: {
        height: 54,
        margin: 0,
        borderRadius: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 18,
    },
    listView: {
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
        marginTop: 10,
        marginHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 15,
    },
    description: { fontSize: 16 },
    row: {
        padding: 20,
        height: 58
    },
});

export default Search;