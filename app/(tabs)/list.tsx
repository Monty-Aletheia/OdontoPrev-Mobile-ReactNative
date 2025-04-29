import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ListItems from '../../components/Item'

const DATA = [
  { id: "1", name: "Pedro Lucca Medeiros Miranda", date: "11/08/2004", price: "R$20.000" },
  { id: "2", name: "Pedro Lucca Medeiros Miranda", date: "11/08/2004", price: "R$20.000" },
  { id: "3", name: "Pedro Lucca Medeiros Miranda", date: "11/08/2004", price: "R$20.000" },
  { id: "4", name: "Pedro Lucca Medeiros Miranda", date: "11/08/2004", price: "R$20.000" },
];


const List = () => {
  return (
    <View className='mt-14'>
      <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => 

        <ListItems name={item.name} date={item.date} price={item.price} />

      } 
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({})