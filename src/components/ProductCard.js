import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress && onPress(item)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.footer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.arrow}>{'›'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 6,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 110,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    color: '#5B5FE9',
    marginLeft: 6,
  },
});


const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
};

export default React.memo(ProductCard, arePropsEqual);
