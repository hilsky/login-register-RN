import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Register'>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
        />
        </Stack.Navigator>
        
    );
}

export default AuthStack;