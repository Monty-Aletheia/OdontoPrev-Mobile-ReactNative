import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";

const TabsFooter = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#6B889D",
          height: 80,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/profile_icon.png")}
              style={{
                width: 65,
                height: 65,
                marginTop: 40,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          headerShown: false,

          title: "add",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/add_icon.png")}
              style={{
                width: 65,
                height: 65,
                marginTop: 40,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          headerShown: false,
          title: "List",
          tabBarIcon: () => (
            <Image
              source={require("../assets/images/list_icon.png")}
              style={{
                width: 75,
                height: 65,
                marginTop: 40,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsFooter;
