import { StyleSheet, Text, Image, FlatList, Button, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import LazyImage from '../../components/LazyImage';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

import comment from '../../../assets/comment.png';
import like from '../../../assets/like.png';
import send from '../../../assets/send.png';
import save from '../../../assets/save.png';
import avatar5 from '../../../assets/avatar2.png';

import { Container, Post, Header, Avatar, Name, Description, Loading } from './styles';
import { withTheme } from 'styled-components';


export default function Feed({ navigation }) {
  const [error, setError] = useState('');
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState('')
  const [comentarios, setComentarios] = useState([])

  const MAX_LENGTH = 250;

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);
    //https://demo8350856.mockable.io/feed?page=${pageNumber}&limit=4
    //utilizar server.js no jsonserver
    //https://demo8350856.mockable.io/feed
    //utilizar o server2.js no www.mockapi.io
    axios
      .get(`https://demo8350856.mockable.io/feed?page=${pageNumber}&limit=4`)
      .then(response => {
        const totalItems = response.headers["x-total-count"]
        const data = response.data
        //console.log(data)
        setLoading(false)
        setTotal(Math.floor(totalItems / 4));
        setPage(pageNumber + 1);
        setFeed(shouldRefresh ? data : [...feed, ...data]);
      })
      .catch(err => {
        setError(err.message);
        setLoading(true)
      })
  }

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  const onGet = (id) => {
    try {
      const value = AsyncStorage.getItem(id);
      if (value !== null) {
        // We have data!!
        setComentarios(value)
      }
    } catch (error) {
      // We have erro!!
    }
  }

  const onSave = async (id) => {
    try {
      alert('Comentario postado!')
      await AsyncStorage.setItem(id, text);
      setComentarios([...comentarios, ...text])
    } catch (error) {
      alert('Erro ao adicionar comentario!')
    }
  }

  useEffect(() => {
    loadPage()
  }, []);


  const renderItem = ({ item }) => {
    return (
      <Post style={styles.post}>
        <Header style={styles.postHeader}>
          <TouchableOpacity>
            <Avatar source={{ uri: item.profile.userPhoto }} />
          </TouchableOpacity>
          <Name style={styles.userName}>{item.profile.userName}</Name>
        </Header>

<ScrollView>
          <LazyImage
            aspectRatio={item.aspectRatio}
            shouldLoad={viewable.includes(item.id)}
            smallSource={{ uri: item.feedPhotoMini }}
            source={{ uri: item.feedPhoto }} 
            />
</ScrollView>

        <View style={styles.footer}>
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              <TouchableOpacity style={styles.action}>
                <Image
                  source={like}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Image
                  source={comment}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={send}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  source={save}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Curtidas')} >
              <Text style={styles.likes}>Ver {item.likes} curtidas!</Text>
            </TouchableOpacity>
            <View style={styles.subtitle}>
              <TouchableOpacity>
                <Text style={styles.descName}>{item.profile.userName}</Text>
              </TouchableOpacity>
              <Text>{item.Subtitle}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Comentários')}>
                <Text style={styles.comment}>Ver comentários...</Text>
              </TouchableOpacity>

              <View style={styles.commentLine}>
                <Image style={styles.commentPhoto} source={{ uri: item.profileComment.userPhoto1 }} />
                <Text style={styles.commentName}>{item.profileComment.userName1}</Text>
                <Text style={styles.commentCont}>{item.profileComment.comment1}</Text>
              </View>

              <View style={styles.commentLine}>
                <Image style={styles.commentPhoto} source={{ uri: item.profileComment.userPhoto2 }} />
                <Text style={styles.commentName}>{item.profileComment.userName2}</Text>
                <Text style={styles.commentCont}>{item.profileComment.comment2}</Text>
              </View>

            </View>
          </View>

          <View style={styles.commentLine}>
            <Text style={styles.commentCont}>{comentarios}</Text>
          </View>

          <View style={styles.commentSpace}>
            <View style={styles.submitImage}>
              <TouchableOpacity>
                <Image style={styles.commentPhoto} source={avatar5} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.text}
              value={text}
              multiline={true}
              onChangeText={(text) => setText(text)}
              placeholder={"Comentar..."}
            />

            <TouchableOpacity onPress={() => onSave(String(item.id))}>
              <Text style={styles.textButton}>
                Publicar
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Post>
    )
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
      />
    </Container>
  );
}

const styles = StyleSheet.create(
  {
    submitImage: {
      lineHeight: 40,
      borderTopWidth: 1,
      borderTopColor: '#a7a7a7',
      paddingTop: 10
    },
    text: {
      color: '#000',
      fontSize: 15,
      lineHeight: 40,
      width: '75%',
      borderTopWidth: 1,
      borderTopColor: '#a7a7a7',
      flexDirection: 'column'
    },
    textButton: {
      fontSize: 15,
      color: '#35AAFF',
      lineHeight: 40,
      paddingLeft: 15,
      borderTopWidth: 1,
      borderTopColor: '#a7a7a7',
    },
    commentSpace: {
      paddingTop: 15,
      paddingBottom: 10,
      flexDirection: 'row',
    },
    commentLine: {
      flexDirection: 'row',
      alignItems: "center",
      marginTop: 5,
    },
    commentPhoto: {
      width: 20,
      height: 20,
      borderRadius: 16,
      marginRight: 10
    },
    commentName: {
      paddingRight: 5,
      fontSize: 13,
      fontWeight: 'bold',
    },
    commentCont: {
      fontSize: 12,
    },
    comment: {
      color: '#a7a7a7',
    },
    post: {
      marginVertical: 5,
      backgroundColor: '#ffffff'
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: "center",
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    userName: {
      fontWeight: 'bold',
      marginRight: 260
    },
    place: {
      fontSize: 12,
      color: '#666',
    },
    footer: {
      paddingHorizontal: 15
    },
    actions: {
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    action: {
      marginRight: 8
    },
    leftActions: {
      flexDirection: 'row',
    },
    likes: {
      fontWeight: 'bold',
      fontSize: 12
    },
    description: {
      color: '#000',
      lineHeight: 18
    },
    descName: {
      fontWeight: 'bold',
      paddingRight: 5
    },
    subtitle: {
      flexDirection: 'row',
      paddingVertical: 5
    }

  })
