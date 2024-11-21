import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

const GoogleSignin = ()=>{

    // Configure Google Sign-In
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'AIzaSyBjHF7REaSQb4OcnbrvSMwDdZOQjZtyOyo',
        });
    }, []);
    
    // Google Sign-In function
    const signInWithGoogle = async () => {
        try {
            // Get the user's ID token
            const { idToken } = await GoogleSignin.signIn();
            
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            
            // Sign in with Firebase using the credential
            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log('User signed in with Google:', userCredential.user);
        } catch (error) {
            console.error(error);
        }
    };
    
}
export default GoogleSignin