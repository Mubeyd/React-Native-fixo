
import React from 'react';
import { StyleSheet, View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';



const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <Text>FIXO</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
