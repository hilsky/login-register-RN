import React, { useState, useEffect } from 'react';
import { Pressable,Alert,ImageBackground,View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as axios from 'axios';

const Register = ({ navigation }) => {

    useEffect(() => {
        getData();
    }, []);

    const [data, setData] = useState([]);
    const [namaDepan, setNamaDepan] = useState('');
    const [namaBelakang, setNamaBelakang] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState(require('../assets/eye.png'));

    const getData = async () => {
        try {
            const response = await axios.get('https://arcane-coast-59669.herokuapp.com/user');
            setData(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handlePasswordVisibility = () => {
        if(rightIcon === require('../assets/eye.png')){
            setRightIcon(require('../assets/eye-off.png'));
            setPasswordVisibility(!passwordVisibility);
        }else{
            setRightIcon(require('../assets/eye.png'));
            setPasswordVisibility(!passwordVisibility);
        }
    }

    const handleRegister = () => {
        if(namaDepan === '' || namaBelakang === '' || username === '' || email === '' || password === ''){
           Alert.alert('Data tidak boleh kosong')
        }
        else if (password.length < 8) {
            setErrorPassword(true);
            setErrorPassword('Password harus lebih dari 4 karakter');
        }
        else if (username.length < 4) {
            setErrorUsername(true);
            setErrorUsername('Username harus lebih dari 8 karakter');
        }
        else if(!email.includes('@')){
            setErrorEmail(true);
            setErrorEmail('Email tidak valid');
        }
        else if(data.find(item => item.username === username)){
            setErrorUsername(true);
            setErrorUsername('Username sudah digunakan');
        }
        else {
            axios.post('https://arcane-coast-59669.herokuapp.com/user/signup', {
                namaDepan: namaDepan,
                namaBelakang: namaBelakang,
                username: username,
                email: email,
                password: password
            })
            .then(function (response) {
                console.log("Data berhasil ditambahkan", {
                    namaDepan: namaDepan,
                    namaBelakang: namaBelakang,
                    username: username,
                    email: email,
                    password: password
                });
                Alert.alert('Registrasi berhasil',
                'Silahkan login untuk melanjutkan',
                [
                    {text: 'OK', onPress: () => navigation.navigate('Login')}
                ],
                {cancelable: false}
                )
            })
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
                        placeholder="Nama Depan"
                        placeholderTextColor="#000"
                        onChangeText={(namaDepan) => setNamaDepan(namaDepan)}
                    />                
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}> 
                    <TextInput
                        style={styles.input}
                        placeholder="Nama Belakang"
                        placeholderTextColor="#000"
                        onChangeText={(namaBelakang) => setNamaBelakang(namaBelakang)}
                    />                
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#000"
                        onChangeText={(username) => setUsername(username)}
                    />
                    {errorUsername && <Text style={styles.error}>{errorUsername}</Text>}   
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        onChangeText={(email) => setEmail(email)}
                    />
                    {errorEmail && <Text style={styles.error}>{errorEmail}</Text>}              
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.bodyContent} focusable={true}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#000"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={passwordVisibility}
                        />
                        <Pressable onPress={handlePasswordVisibility}>
                            <Image source={rightIcon} style={styles.rightIcon}/>
                        </Pressable>     
                    </View>
                    {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}              
                </KeyboardAvoidingView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.end}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.text1}>Sign In!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;

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
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    rightIcon : {
        width: 25,
        height: 25,
        marginLeft: 10,
        position: 'absolute',
        right: 10,
        top: 7,

    },
})