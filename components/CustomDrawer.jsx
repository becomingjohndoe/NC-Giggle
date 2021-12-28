import React from "react";
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#344CB7" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#344CB7" }}
      >
        <ImageBackground
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/11/22/19/04/crowd-1056764_960_720.jpg",
          }}
          style={{ height: 100, width: Dimensions.get("window").width }}
        >
          {/* <Image
            source={require("../images/5.png")}
            style={{ height: 40, width: 40 }}
          /> */}
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
