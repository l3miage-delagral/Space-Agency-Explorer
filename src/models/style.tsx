import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    Card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },  
    Cover: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    Description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    Status: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      }
});

export default styles;