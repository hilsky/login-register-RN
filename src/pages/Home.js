import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as axios from 'axios';

const Home = ({ navigation, route }) => {
    const [username] = useState(route.params.username);
    return (
        <View style={{marginTop: 50}}>
            <Text>Welcome {username}</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text>Logout</Text>
             </TouchableOpacity>
        </View>
    )
}

export default Home;