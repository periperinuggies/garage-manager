# ACME Warehouse Manager

A visual digital twin for managing shared vehicle storage in a warehouse with triple car stackers and bike storage.

## Features

- **Visual Garage Layout**
  - 2 triple car stackers (6 spots total)
  - 3 floor parking bays
  - 1 working lift bay
  - Dedicated bike storage column

- **Vehicle Management**
  - Add cars and bikes with detailed specifications
  - Drag-and-drop to park/unpark vehicles
  - Color-coded borders matching vehicle colors
  - Charging status tracking with ⚡ indicators

- **Car Details**
  - Make, Model, Year
  - Owner, License Plate
  - Engine specs (Type, Size, HP)
  - Performance (0-100 km/h, Curb Weight)
  - Tire pressures
  - Storage notes

- **Bike Details**
  - Make, Model, Year
  - Owner, License Plate
  - Engine Size
  - Bike Type, Weight, HP
  - Storage notes

- **Service History**
  - Track maintenance records for each vehicle
  - Log service type, date, mileage, cost, and notes

## Firebase Setup (Required for Shared Access)

**IMPORTANT:** Before using the app, you need to set up Firebase so everyone can see the same garage!

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project" or "Create a project"
   - Enter a project name (e.g., "ACME-Warehouse")
   - Disable Google Analytics (not needed)
   - Click "Create project"

2. **Enable Realtime Database**
   - In your Firebase project, click "Realtime Database" in the left menu
   - Click "Create Database"
   - Choose a location closest to you
   - Start in **"Test mode"** (allows read/write for 30 days)
   - Click "Enable"

3. **Get Your Firebase Config**
   - Click the ⚙️ (Settings) icon next to "Project Overview"
   - Click "Project settings"
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Register your app with a nickname (e.g., "Warehouse Web")
   - Copy the `firebaseConfig` object

4. **Update firebase-config.js**
   - Open `firebase-config.js` in your code editor
   - Replace the placeholder config with your copied config
   - Make sure to keep the `databaseURL` field!
   - Save the file

5. **Set Database Rules (Optional - for longer access)**
   - In Firebase Console, go to "Realtime Database"
   - Click the "Rules" tab
   - Replace with these rules for shared access:
   ```json
   {
     "rules": {
       "garage": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```
   - Click "Publish"

## How to Use

1. **Open the Application**
   - Simply open `index.html` in a web browser
   - Works on Chrome, Firefox, Safari, Edge
   - All users visiting the same deployed site will see the same garage!

2. **Add Vehicles**
   - Click "+ Add Car" or "+ Add Bike"
   - Fill in vehicle details
   - Choose a color for visual identification
   - Click "Save Vehicle"

3. **Park Vehicles**
   - New vehicles appear in the "Available" pools at the bottom
   - **Cars**: Drag from Available Cars to any stacker, floor bay, or lift
   - **Bikes**: Drag from Available Bikes to the bike storage column
   - Hover to see insertion points (blue highlights)

4. **Reorder Bikes**
   - Drag bikes within the storage column to reorder
   - Blue border shows where the bike will be placed

5. **Unpark Vehicles**
   - **Cars**: Drag back to Available Cars pool
   - **Bikes**: Drag back to Available Bikes pool

6. **View Details**
   - Click any vehicle card to see full details
   - Add service history records
   - Edit vehicle information
   - Delete vehicles

7. **Track Charging**
   - Check the ⚡ checkbox on any vehicle to mark it as charging

## Technical Details

- **No Installation Required**: Pure HTML, CSS, and JavaScript
- **Firebase Realtime Database**: Shared data across all users
- **Real-time Sync**: Changes appear instantly for everyone
- **Responsive Design**: Works on desktop and tablet
- **Drag-and-Drop**: Intuitive vehicle management
- **Visual Feedback**: Clear indicators for all actions
- **Offline Fallback**: Uses localStorage if Firebase is unavailable

## Storage

All vehicle and parking data is stored in **Firebase Realtime Database**, which means:
- **Everyone sees the same garage in real-time!**
- Changes made by one person appear instantly for everyone
- Works across all devices - phone, tablet, laptop
- No manual syncing needed

## Sharing with Friends

Once you've set up Firebase and deployed to GitHub Pages:

1. **Share the GitHub Pages URL** with your friends
   - Example: `https://periperinuggies.github.io/garage-manager/`
   - Everyone who visits will see the SAME garage
   - Changes sync in real-time across all devices

2. **Everyone sees the same data**
   - When anyone adds/moves a vehicle, everyone sees it
   - Perfect for managing a shared warehouse
   - No need to tell each other what's where - just check the app!

## Browser Compatibility

- Chrome/Edge: ✅ Fully Supported
- Firefox: ✅ Fully Supported
- Safari: ✅ Fully Supported

## Project Structure

```
garage-manager/
├── index.html         # Main HTML structure
├── styles.css         # All styling and layout
├── app.js             # Application logic and drag-and-drop
├── firebase-config.js # Firebase configuration (update with your credentials)
└── README.md          # This file
```

## Tips

- **Visual Organization**: Use different colors for each owner's vehicles
- **Stacker Access**: Remember that cars must be removed from bottom to top!
- **Service Tracking**: Keep tire pressures and service records up to date
- **Bike Storage**: Reorder bikes frequently accessed to the bottom for easier retrieval

## License

MIT License - Feel free to use and modify for your garage needs!

---

Built for shared warehouse vehicle management 🏎️
