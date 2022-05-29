import React, { useState, useEffect } from 'react';
import { ImageBackground,SafeAreaView,View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as axios from 'axios';


const Login = ({ navigation }) => {

    useEffect(() => {
        getData();
    }, []);

    const [data, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getData = () => {
        axios.get('https://arcane-coast-59669.herokuapp.com/user')
        .then(res => {
            setData(res.data);
        })
    }

    const handleLogin = () => {
        if(username === '' || password === ''){
              Alert.alert('Data tidak boleh kosong')
        }
        else {
            if(data.find(item => item.username === username && item.password === password)){
                navigation.navigate('Home', {
                    username: username
                })
            }
            else{
                Alert.alert('Username atau password salah')
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ImageBackground source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>PT. Cemerlang Jaya</Text>
            </View>
            <View style={styles.body}>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#000"
                        onChangeText={(username) => setUsername(username)}
                    />                
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#000"
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                    />                
                </KeyboardAvoidingView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.end}>
                    <Text style={styles.text}>Dont have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.text1}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
        marginBottom: 10,
        marginTop: 100,
    },
    logo: {
        width: 120,
        height: 120,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.8)',
    },
    body: {
        marginTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bodyContent: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 300,
        borderRadius: 10,
        backgroundColor: '#C8E9EB',
        padding: 10,
    },
    footer : {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 20,
    },
    button : {
        backgroundColor: '#50C2C9',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    end : {
        flexDirection: 'row',
        marginTop: 10,
    },
    text: {
        fontWeight: '500',
        fontSize: 15,
    },
    text1 : {
        color: '#50C2C9',
        fontWeight: '500',
        fontSize: 15,
        marginLeft: 5,
    }
})