import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Layout, Tab, TabView } from '@ui-kitten/components';
import { space } from '../config/styleConstants';
import OrderCard from '../components/OrderCard';

export interface Props { }

const MyOrders = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <View style={styles.container}>
            <TabView style={styles.tabViewContainer}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                // tabBarStyle={{backgroundColor: '#456468'}}
                indicatorStyle={{ backgroundColor: '#009387' }}
            >

                <Tab
                    title={
                        <Text
                            style={selectedIndex ? styles.text : styles.texthint}
                        >
                            CURRENT ORDERS
                        </Text>
                    }
                    style={styles.tabContainer}
                >
                    <Layout style={styles.layoutContainer}>
                        <OrderCard />
                    </Layout>
                </Tab>

                <Tab
                    title={
                        <Text
                            style={selectedIndex ? styles.texthint : styles.text}
                        >
                            PAST ORDERS
                        </Text>
                    }
                    style={styles.tabContainer}
                >
                    <Layout style={styles.layoutContainer}>
                        <OrderCard />
                        <OrderCard />
                    </Layout>
                </Tab>

            </TabView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        margin: space
    },
    tabViewContainer: {
        // backgroundColor: '#eb2d2d',
        borderRadius: 12,

    },
    tabContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        margin: space * 1,
        borderRadius: space,
        // backgroundColor: '#36A7E7',
        textDecorationColor: '#456566'


    },
    layoutContainer: {
        // height: 156,
        alignItems: 'center',
        justifyContent: 'center',
        margin: space * 1,
        borderRadius: 12,

    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#456566',
        fontFamily: 'Lato-Regular',
    },
    texthint: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#009387',
        fontFamily: 'Lato-Regular',
    },
});