import { Image, Linking, StyleSheet, Text, View } from "react-native"

const AboutUs = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>About us</Text>
        <Text style={styles.text}>
            Welcome to the Space Agency Explorer app!
        </Text>
        <Text style={styles.text}>
            This app is a project made by a team of 2 students from the University of
            Grenoble Alpes in France. We are part of the 2023-2024
            promotion of M1 MIAGE. The goal of this project
            was to create an app that allows users to explore data from the Space Devs
            API. We hope you enjoy using our app!
        </Text>
        <Text style={styles.text}>
            You can find the source code of this app on our
            <Text style={styles.git} onPress={() => Linking.openURL("https://github.com/l3miage-delagral/Space-Agency-Explorer")}> GitHub repository</Text>.
        </Text>
        <Image
            source={require('../assets/logo.png')}
            style={{ width: 400, height: 400, alignSelf: 'center' }}
        />
    </View>
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    git: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
    },
});

export default AboutUs