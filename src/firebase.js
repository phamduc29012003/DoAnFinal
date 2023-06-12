import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG7gVl5fWo9mKrH20F3WWFcAiqFPwwI9Q",
  authDomain: "otpdemo-8ccad.firebaseapp.com",
  projectId: "otpdemo-8ccad",
  storageBucket: "otpdemo-8ccad.appspot.com",
  messagingSenderId: "357351716177",
  appId: "1:357351716177:web:090cf62c3ae2b439f98f70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
