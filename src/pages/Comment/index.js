import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Button,
    Animated,
    Keyboard
} from 'react-native';

import like from '../../../assets/like.png';
import avatar1 from '../../../assets/avatar1.png';
import avatar2 from '../../../assets/avatar2.png';
import avatar3 from '../../../assets/avatar3.png';
import avatar4 from '../../../assets/avatar4.png';
import avatar5 from '../../../assets/avatar5.png';
import avatar6 from '../../../assets/avatar6.png';
import avatar7 from '../../../assets/avatar7.png';
import avatar8 from '../../../assets/avatar8.png';
import avatar9 from '../../../assets/avatar9.png';

export default function index({ navigation }) {
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

    const onSave = async (id) => {
        try {
            await AsyncStorage.setItem(id, text);
            setComentarios([...comentarios, ...text])
        } catch (error) {
            // Error saving data
        }
    }
    //const renderItem = ({ item }) => {
    return (
        <View style={styles.post}>
            <View style={styles.footer}>
                <ScrollView>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar1} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Carlos Augusto</Text>
                            <Text>Muito bonita.</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar2} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>João Valio</Text>
                            <Text>Bater foto é comigo mesmo.</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar3} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Giovanna Lacerda</Text>
                            <Text>Fly with me</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar4} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Larissa Barbosa</Text>
                            <Text>Wow!</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar5} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Isabela Silva</Text>
                            <Text>Não curti muito</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar6} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Dona Benta</Text>
                            <Text>Muito lindo.</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar7} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Jotinha</Text>
                            <Text>Perfeito!</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar8} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Bruno Covas</Text>
                            <Text>Ai ai ai, ui ui.</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentLine}>
                        <View style={styles.commentCont}>
                            <TouchableOpacity>
                                <Image style={styles.commentPhoto} source={avatar9} />
                            </TouchableOpacity>
                            <Text style={styles.commentName}>Petkovic</Text>
                            <Text>Ta legal</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={like} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

            <View style={styles.commentSubmit}>

                <View style={styles.submitImage}>
                    <TouchableOpacity>
                        <Image style={styles.subPhoto} source={avatar2} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.textSubmit}
                    value={text}
                    multiline={true}
                    onChangeText={(text) => setText(text)}
                    placeholder={"Comentar..."}
                />

                <TouchableOpacity onPress={() => onSave(String(item.id))}>
                    <Text style={styles.textButtonSubmit}>
                        Publicar
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        post: {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        footer: {
            paddingHorizontal: 5,
            paddingBottom: 10,
        },
        commentLine: {
            marginTop: 5,
            marginBottom: 5,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#a7a7a7',
            alignItems: "center",
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        commentPhoto: {
            width: 32,
            height: 32,
            borderRadius: 16,
            marginRight: 10
        },
        commentName: {
            fontSize: 15,
            fontWeight: 'bold',
            paddingRight: 5,
        },
        commentCont: {
            alignItems: "center",
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        commentSubmit: {
            paddingTop: 20,
            flexDirection: 'row',
            height: 70,
            justifyContent: 'center',
        },
        textSubmit: {
            width: '75%',
            color: '#000',
            fontSize: 15,
            borderTopWidth: 1,
            borderTopColor: '#a7a7a7',
        },
        textButtonSubmit: {
            fontSize: 15,
            color: '#35AAFF',
            paddingLeft: 5,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#a7a7a7',
        },
        submitImage: {
            lineHeight: 40,
            borderTopWidth: 1,
            borderTopColor: '#a7a7a7',
            paddingTop: 15,
        },
        subPhoto:{
            width: 20,
            height: 20,
            borderRadius: 16,
            marginRight: 10
        }
    }
)
