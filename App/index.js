import React from 'react';
import { TouchableOpacity, Image, StatusBar } from 'react-native';
import Details from './screens/Details';
import Search from './screens/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HeaderRightButton = ({ onPress, style, icon }) => (
    <TouchableOpacity onPress={onPress}>
        <Image
            source={icon}
            resizeMode="contain"
            style={[
                {
                    marginRight: 10,
                    width: 20,
                    height: 20,
                    tintColor: 'white'
                },
                style
            ]}
        />
    </TouchableOpacity>
)

const MainStack = () => (
    <Stack.Navigator
        mode="modal"
    >
        <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation, route }) => ({
                headerTitle: route.params?.title ?? '...',
                headerRight: () => (
                    <React.Fragment>
                        <StatusBar barStyle="light-content" />
                        <HeaderRightButton icon={require('./assets/search.png')} onPress={() => navigation.navigate('Search')} />
                    </React.Fragment>
                ),
                headerStyle: {
                    backgroundColor: '#3145b7',
                    shadowColor: 'transparent'
                },
                headerTintColor: 'white'
            })
            }
        />
        <Stack.Screen
            name="Search"
            component={Search}
            mode="modal"
            options={({ route, navigation }) => ({
                headerTitle: 'Search',
                headerRight: () => (
                    <React.Fragment>
                        <StatusBar barStyle="dark-content" />
                        <HeaderRightButton
                            icon={require('./assets/close.png')}
                            onPress={() => navigation.pop()}
                            style={{ tintColor: '#000' }}
                        />
                    </React.Fragment>
                ),
                headerLeft: null,
                headerTintColor: 'blue',
                headerStyle: {
                    backgroundColor: route.params?.color,
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