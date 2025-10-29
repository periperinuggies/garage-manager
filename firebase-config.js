// Firebase Configuration
// IMPORTANT: Replace this with your own Firebase project configuration
// Instructions:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Click "Add app" and select "Web" (</> icon)
// 4. Copy the firebaseConfig object
// 5. Go to "Realtime Database" in the left menu
// 6. Click "Create Database" and start in test mode
// 7. Replace the config below with your config

const firebaseConfig = {
    apiKey: "AIzaSyD7kZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
window.database = firebase.database();
