import auth from '@react-native-firebase/auth';

// Signup function
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created:', userCredential.user);
  } catch (error) {
    console.error('Error during signup:', error);
  }
};

// Login function
const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error during login:', error);
  }
};
