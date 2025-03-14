import { Text, View,Image } from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router';

const Footer = () => {
    return (
      <View className='w-[100%] bg-dark_blue h-auto items-center justify-around flex-row pt-3 pb-3 ' >
        
        <Link href="">
            <Image source={require("../assets/images/profile_icon.png")} className="w-20 h-20 self-center" />
        </Link>

        <Link href="">
            <Image source={require("../assets/images/add_icon.png")} className="w-20 h-20 self-center" />
        </Link>


        <Link href="">
            <Image source={require("../assets/images/list_icon.png")} className="w-20 h-20 self-center" />
        </Link>

      </View>
    );
};

export default Footer;