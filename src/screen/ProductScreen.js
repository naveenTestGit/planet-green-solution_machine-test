import React, { useCallback } from 'react';
import {
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';

const ProductScreen = () => {
  const {
    products,
    loading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    onRefresh,
  } = useProducts();

  // useCallback so renderItem's reference stays stable across re-renders,
  // which helps React.memo on ProductCard actually skip re-renders
  const renderItem = useCallback(
    ({ item }) => <ProductCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#5B5FE9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.heading}>Product Listing</Text>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5B5FE9']}
            tintColor="#5B5FE9"
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FB' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    color: '#111',
  },
  listContent: { paddingHorizontal: 10, paddingBottom: 20, flexGrow: 1 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#888' },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 16,
  },
});

export default ProductScreen;
