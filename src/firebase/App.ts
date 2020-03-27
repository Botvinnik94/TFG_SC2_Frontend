import * as Firebase from 'firebase/app'
import credentials from './Credentials'

export const App = Firebase.initializeApp(credentials.config);