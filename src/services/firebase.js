import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD_ZYpQ5QKRZso8PUfd2DPTkJBMzGfRbLg',
  authDomain: 'cruditosdelmar-47ee3.firebaseapp.com',
  projectId: 'cruditosdelmar-47ee3',
  storageBucket: 'cruditosdelmar-47ee3.firebasestorage.app',
  messagingSenderId: '168813272257',
  appId: '1:168813272257:web:b9c5f9cb39cda4553e4840',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
