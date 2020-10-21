import React, { Component } from 'react';
import {View, Text, StatusBar} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics'
import { RSA } from 'react-native-rsa-native';

class Auth extends Component {
    state = { 
        keysExist : false,
        encrypted : false
     }

    componentDidMount () {
        this.isSensors()
    }


    isSensors = () => {
        ReactNativeBiometrics.isSensorAvailable()
            .then((resultObject) => {
            if (resultObject.biometryType === ReactNativeBiometrics.Biometrics) {
                console.log("available")
                this.checkKeysExists()
              }
        })
        .catch(error => {
            console.log(error)
        })
    }

    checkKeysExists = () => {
        ReactNativeBiometrics.biometricKeysExist()
        .then((resultObject) => {
            
            const { keysExist } = resultObject
            if (keysExist) {
                // here we encrypt with signature 
                this.setState({
                    keysExist : true
                })
                console.log('Keys exist')
            } else {
                this.createKeys()
                console.log('Keys do not exist or were deleted')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    // need to prompt first 
    createKeys = () => {
        ReactNativeBiometrics.createKeys('Confirm fingerprint')
        .then((resultObject) => {
            console.log(resultObject)
            const { publicKey } = resultObject

        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        return (
            <>
            <View>
                <Text>Test Biometric</Text>
            </View>
            </>
        );
    }
}

export default Auth;