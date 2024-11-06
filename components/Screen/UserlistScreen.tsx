
import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text, FlatList, ActivityIndicator } from 'react-native';
interface Post {
    id: number;
    title: string;
    body: string;
  }
  
const UserlistScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
       
      }
    };

    fetchPosts();
  }, []);

  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
    <Text style={styles.header}>User List</Text>
    <FlatList
      data={posts}
      keyExtractor={post => post.id.toString()}
      renderItem={({ item }: { item: Post }) => ( 
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postBody}>{item.body}</Text>
        </View>
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#d6c4c4',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    postContainer: {
      marginBottom: 15,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postBody: {
      fontSize: 16,
      color: '#555',
    },
    error: {
      color: 'red',
      textAlign: 'center',
    },
   
  });
  


export default UserlistScreen;
