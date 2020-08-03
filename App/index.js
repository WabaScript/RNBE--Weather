import React from 'react';
import Details from './screens/Details';
import Search from './screens/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Details"
            component={Details}
            options={{ title: 'xxxx' }}
        />
        <Stack.Screen
            name="Search"
            component={Search}
            options={({ route }) => ({
                headerTitle: route.params?.title ?? 'title',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: route.params?.color,
                    shadowColor: 'transparent'
                }
            })
            }
        />
    </Stack.Navigator>
);


export default function Index() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
};