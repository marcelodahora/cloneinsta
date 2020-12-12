import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Button,
    Animated,
    Keyboard
} from 'react-native';

export default function index({ navigation }) {

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }))
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 190, y: 54 }));

    useEffect(() => {
        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 30
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
            })
        ]).start();

    }, []);

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.containerLogo}>
                <Animated.Image
                    style={{
                        width: logo.x,
                        height: logo.y,
                    }}
                    source={require('../../../assets/logo.png')} />
            </View>

            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opacity,
                        transform: [
                            { translateY: offset.y }
                        ]
                    }
                ]}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={() => { }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    onChangeText={() => { }}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={styles.btnSubmit}>
                    <Text style={styles.submitText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.btnRegister}>
                    <Text style={styles.registerText}>Registre-se</Text>
                </TouchableOpacity>
            </Animated.View >

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    containerLogo: {
        flex: 1,
        justifyContent: "center",
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50
    },

    input: {
        backgroundColor: '#fafafa',
        width: '90%',
        height: 30,
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#a7a7a7',
        paddingLeft: 5
    },

    btnSubmit: {
        backgroundColor: '#35AAFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    submitText: {
        color: '#fff',
        fontSize: 18
    },

    btnRegister: {
        width: '90%',
        marginTop: 15,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#a7a7a7',
        alignItems: "center",
    },

    registerText: {
        color: '#a7a7a7'
    }
})