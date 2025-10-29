// Firebase Configuration for ACME Warehouse
const firebaseConfig = {
  apiKey: "AIzaSyDfC42zZj4irWMBJY0iAwUTNBjR-0WI5w4",
  authDomain: "acme-warehouse-43dfb.firebaseapp.com",
  databaseURL: "https://acme-warehouse-43dfb-default-rtdb.firebaseio.com",
  projectId: "acme-warehouse-43dfb",
  storageBucket: "acme-warehouse-43dfb.firebasestorage.app",
  messagingSenderId: "612608098510",
  appId: "1:612608098510:web:a16f00ee87530e3b39109f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
window.database = firebase.database();