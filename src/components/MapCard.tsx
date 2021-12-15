import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { space, windowDimension } from '../config/styleConstants'
import StarRating from './StartRating'

interface Props {
  name: string
  logo: string
  ratings: number
  reviews: number
  price: number
  description1: string
  description2: string
  orderState?: 'waiting' | 'processing' | 'cancelled' | 'done'
  imageSource: any
  onPress: () => void
}
const boxSize = (windowDimension.width - space * 2) / 2 - space / 2
const MapCard = (props: Props) => {
  let color = '#ffffff'

  if (props.orderState === 'waiting') {
    color = '#fcba03'
  } else if (props.orderState === 'processing') {
    color = '#00a0fc'
  } else if (props.orderState === 'cancelled') {
    color = '#ff0000'
  } else if (props.orderState === 'done') {
    color = '#00ff11'
  }

  return (
    <View style={styles.conatiner}>
      <ImageBackground
        style={styles.gradientImage}
        source={require('../assets/icons/orderscomp.png')}>
        <View style={styles.columnLeft}>
          <View style={{ marginTop: 2 }}>
            <Image
              source={props.imageSource}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.userName}>{props.name}</Text>
          <StarRating ratings={props.ratings} reviews={props.reviews} />
          <Text style={styles.price}>Price: {props.price} TL</Text>
        </View>

        <View style={styles.columnRight}>
          <View style={styles.explainTextView}>
            <Text numberOfLines={2} style={styles.explainText}>
              {props.description1}
            </Text>
            <Text numberOfLines={2} style={styles.explainText}>
              {props.description2}
            </Text>
          </View>

          <View style={styles.buttonsView}>
            {/* <TouchableOpacity
                            onPress={() => { }}
                            style={[styles.orderStateTouch, { backgroundColor: color, }]}
                        >
                            <Text> {props.orderState} </Text>
                        </TouchableOpacity> */}

            <TouchableOpacity
              onPress={props.onPress}
              style={styles.detailsTouch}>
              <Text style={{ color: '#fff' }}> Order Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default MapCard

const styles = StyleSheet.create({
  conatiner: {
    // borderRadius: 15,
    // margin: space * 1,
    backgroundColor: '#fff',
    height: 220,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
  },
  gradientImage: {
    flex: 1,
    resizeMode: 'stretch',
    flexDirection: 'row',
    borderRadius: 15,
  },
  columnLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 12,
    marginBottom: 24,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 48,
    margin: 12,
    marginLeft: 12,
  },
  price: {
    fontWeight: 'bold',
    color: '#36A7E7',
    margin: 12,
    marginLeft: 12,
  },
  columnRight: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 18,
    marginRight: 6,
    marginBottom: 0,
  },
  explainTextView: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 14,
  },
  explainText: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 12,
    color: '#36A7E7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  orderStateTouch: {
    // backgroundColor: '#b4a3f7',
    padding: 5,
    borderRadius: 6,
  },
  detailsTouch: {
    backgroundColor: '#36A7E7',
    padding: 5,
    borderRadius: 6,
    marginLeft: 58,
    marginBottom: 28,
    height: 32,
    width: 88,
  },
  cardImage: {
    // flex: 3,
    width: 76,
    height: 76,
    alignSelf: 'flex-end',
    marginRight: 0,
    marginTop: 28,
    resizeMode: 'stretch',
  },
})
