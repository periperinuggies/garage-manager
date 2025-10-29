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

## How to Use

1. **Open the Application**
   - Simply open `index.html` in a web browser
   - Works on Chrome, Firefox, Safari, Edge

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
- **Local Storage**: All data saved in browser (no server needed)
- **Responsive Design**: Works on desktop and tablet
- **Drag-and-Drop**: Intuitive vehicle management
- **Visual Feedback**: Clear indicators for all actions

## Storage

All vehicle and parking data is stored locally in your browser's LocalStorage. Data persists between sessions on the same device/browser.

## Sharing with Friends

To share with your friends:

1. **Option 1 - GitHub Pages (Recommended)**
   - Each friend can visit the GitHub Pages URL
   - Everyone has their own separate data

2. **Option 2 - Download and Run Locally**
   - Share the repository
   - Friends download and open `index.html` in their browser
   - Each person manages their own garage setup

## Browser Compatibility

- Chrome/Edge: ✅ Fully Supported
- Firefox: ✅ Fully Supported
- Safari: ✅ Fully Supported

## Project Structure

```
garage-manager/
├── index.html      # Main HTML structure
├── styles.css      # All styling and layout
├── app.js          # Application logic and drag-and-drop
└── README.md       # This file
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
