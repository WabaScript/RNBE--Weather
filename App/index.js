import React from "react";
import { StatusBar, TouchableOpacity, Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import List from "./screens/List";
import Details from "./screens/Details";

const HeaderRightButton = ({ onPress, icon, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      style={[
        {
          marginRight: 10,
          width: 20,
          height: 20,
          tintColor: "#fff"
        },
        style
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const AppStack = createStackNavigator(
  {
    Details: {
      screen: Details,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("title", ""),
        headerRight: (
          <React.Fragment>
            <StatusBar barStyle="light-content" />
            <HeaderRightButton
              onPress={() => navigation.navigate("List")}
              icon={require("./assets/search.png")}
            />
          </React.Fragment>
        ),
        headerStyle: {
          backgroundColor: "#3145b7",
          borderBottomColor: "#3145b7"
        },
        headerTintColor: "#fff"
      })
    },
    List: {
      screen: List,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Search",
        headerRight: (
          <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <HeaderRightButton
              onPress={() => navigation.pop()}
              icon={require("./assets/close.png")}
              style={{ tintColor: "#000" }}
            />
          </React.Fragment>
        ),
        headerTintColor: "#000",
        headerLeft: null
      })
    }
  },
  {
    mode: "modal"
  }
);

export default createAppContainer(AppStack);