// Garage Manager App
class GarageManager {
    constructor() {
        this.vehicles = [];
        this.parkingSpots = {};
        this.bikeOrder = []; // Track bike order in bike storage
        this.currentEditingVehicleId = null;
        this.currentViewingVehicleId = null;
        this.currentVehicleType = 'car';
        this.draggedVehicleType = null; // Track type during drag
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderVehicles();
        this.setupDragAndDrop();
    }

    // Data Management
    loadData() {
        const savedVehicles = localStorage.getItem('garageVehicles');
        const savedSpots = localStorage.getItem('parkingSpots');
        const savedBikeOrder = localStorage.getItem('bikeOrder');

        if (savedVehicles) {
            this.vehicles = JSON.parse(savedVehicles);
        }

        if (savedSpots) {
            this.parkingSpots = JSON.parse(savedSpots);
        }

        if (savedBikeOrder) {
            this.bikeOrder = JSON.parse(savedBikeOrder);
        }
    }

    saveData() {
        localStorage.setItem('garageVehicles', JSON.stringify(this.vehicles));
        localStorage.setItem('parkingSpots', JSON.stringify(this.parkingSpots));
        localStorage.setItem('bikeOrder', JSON.stringify(this.bikeOrder));
    }

    // Event Listeners
    setupEventListeners() {
        // Add Car Button
        document.getElementById('addCarBtn').addEventListener('click', () => {
            this.openVehicleModal('car');
        });

        // Add Bike Button
        document.getElementById('addBikeBtn').addEventListener('click', () => {
            this.openVehicleModal('bike');
        });

        // Vehicle Form Submit
        document.getElementById('vehicleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveVehicle();
        });

        // Modal Close Buttons
        const closeButtons = document.querySelectorAll('.close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModals();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Service History Buttons
        document.getElementById('addServiceBtn').addEventListener('click', () => {
            document.getElementById('addServiceForm').classList.remove('hidden');
            this.clearServiceForm();
        });

        document.getElementById('cancelServiceBtn').addEventListener('click', () => {
            document.getElementById('addServiceForm').classList.add('hidden');
        });

        document.getElementById('saveServiceBtn').addEventListener('click', () => {
            this.saveServiceRecord();
        });

        // Vehicle Details Modal Buttons
        document.getElementById('editVehicleBtn').addEventListener('click', () => {
            if (this.currentViewingVehicleId) {
                const vehicle = this.vehicles.find(v => v.id === this.currentViewingVehicleId);
                if (vehicle) {
                    this.closeModals();
                    this.openVehicleModal(vehicle.vehicleType || 'car', vehicle.id);
                }
            }
        });

        document.getElementById('deleteVehicleBtn').addEventListener('click', () => {
            if (this.currentViewingVehicleId && confirm('Are you sure you want to delete this vehicle?')) {
                this.deleteVehicle(this.currentViewingVehicleId);
            }
        });
    }

    // Vehicle Modal
    openVehicleModal(vehicleType = 'car', vehicleId = null) {
        const modal = document.getElementById('vehicleModal');
        const form = document.getElementById('vehicleForm');
        const title = document.getElementById('modalTitle');

        this.currentVehicleType = vehicleType;
        document.getElementById('vehicleType').value = vehicleType;

        // Show/hide appropriate form sections
        if (vehicleType === 'car') {
            document.getElementById('carFieldsSection').style.display = 'block';
            document.getElementById('bikeFieldsSection').style.display = 'none';
            title.textContent = vehicleId ? 'Edit Car' : 'Add New Car';
        } else {
            document.getElementById('carFieldsSection').style.display = 'none';
            document.getElementById('bikeFieldsSection').style.display = 'block';
            title.textContent = vehicleId ? 'Edit Bike' : 'Add New Bike';
        }

        if (vehicleId) {
            const vehicle = this.vehicles.find(v => v.id === vehicleId);
            if (vehicle) {
                this.currentEditingVehicleId = vehicleId;
                this.populateForm(vehicle);
            }
        } else {
            this.currentEditingVehicleId = null;
            form.reset();
            document.getElementById('vehicleType').value = vehicleType;
        }

        modal.classList.add('show');
    }

    populateForm(vehicle) {
        document.getElementById('vehicleId').value = vehicle.id || '';
        document.getElementById('vehicleMake').value = vehicle.make || '';
        document.getElementById('vehicleModel').value = vehicle.model || '';
        document.getElementById('vehicleYear').value = vehicle.year || '';
        document.getElementById('vehicleColor').value = vehicle.color || '';
        document.getElementById('vehicleOwner').value = vehicle.owner || '';
        document.getElementById('vehiclePlate').value = vehicle.plate || '';

        if (vehicle.vehicleType === 'car') {
            document.getElementById('engineType').value = vehicle.engineType || '';
            document.getElementById('engineSize').value = vehicle.engineSize || '';
            document.getElementById('horsepower').value = vehicle.horsepower || '';
            document.getElementById('zeroToHundred').value = vehicle.zeroToHundred || '';
            document.getElementById('curbWeight').value = vehicle.curbWeight || '';
            document.getElementById('tirePressureFront').value = vehicle.tirePressureFront || '';
            document.getElementById('tirePressureRear').value = vehicle.tirePressureRear || '';
            document.getElementById('storageNotes').value = vehicle.storageNotes || '';
        } else {
            document.getElementById('bikeType').value = vehicle.bikeType || '';
            document.getElementById('bikeEngineSize').value = vehicle.bikeEngineSize || '';
            document.getElementById('bikeHorsepower').value = vehicle.bikeHorsepower || '';
            document.getElementById('bikeWeight').value = vehicle.bikeWeight || '';
            document.getElementById('bikeStorageNotes').value = vehicle.bikeStorageNotes || '';
        }
    }

    saveVehicle() {
        const vehicleType = document.getElementById('vehicleType').value;
        const vehicleId = document.getElementById('vehicleId').value || this.generateId();

        const baseData = {
            id: vehicleId,
            vehicleType: vehicleType,
            make: document.getElementById('vehicleMake').value,
            model: document.getElementById('vehicleModel').value,
            year: document.getElementById('vehicleYear').value,
            color: document.getElementById('vehicleColor').value,
            owner: document.getElementById('vehicleOwner').value,
            plate: document.getElementById('vehiclePlate').value
        };

        let vehicleData;

        if (vehicleType === 'car') {
            vehicleData = {
                ...baseData,
                engineType: document.getElementById('engineType').value,
                engineSize: document.getElementById('engineSize').value,
                horsepower: document.getElementById('horsepower').value,
                zeroToHundred: document.getElementById('zeroToHundred').value,
                curbWeight: document.getElementById('curbWeight').value,
                tirePressureFront: document.getElementById('tirePressureFront').value,
                tirePressureRear: document.getElementById('tirePressureRear').value,
                storageNotes: document.getElementById('storageNotes').value
            };
        } else {
            vehicleData = {
                ...baseData,
                bikeType: document.getElementById('bikeType').value,
                bikeEngineSize: document.getElementById('bikeEngineSize').value,
                bikeHorsepower: document.getElementById('bikeHorsepower').value,
                bikeWeight: document.getElementById('bikeWeight').value,
                bikeStorageNotes: document.getElementById('bikeStorageNotes').value
            };
        }

        // Preserve service history if editing
        const existingVehicle = this.vehicles.find(v => v.id === vehicleId);
        if (existingVehicle) {
            vehicleData.serviceHistory = existingVehicle.serviceHistory || [];
        } else {
            vehicleData.serviceHistory = [];
        }

        if (this.currentEditingVehicleId) {
            // Update existing vehicle
            const index = this.vehicles.findIndex(v => v.id === vehicleId);
            if (index !== -1) {
                this.vehicles[index] = vehicleData;
            }
        } else {
            // Add new vehicle
            this.vehicles.push(vehicleData);
        }

        this.saveData();
        this.renderVehicles();
        this.closeModals();
    }

    deleteVehicle(vehicleId) {
        // Remove from vehicles array
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);

        // Remove from parking spots
        Object.keys(this.parkingSpots).forEach(spot => {
            if (this.parkingSpots[spot] === vehicleId) {
                delete this.parkingSpots[spot];
            }
        });

        this.saveData();
        this.renderVehicles();
        this.closeModals();
    }

    closeModals() {
        document.getElementById('vehicleModal').classList.remove('show');
        document.getElementById('vehicleDetailsModal').classList.remove('show');
        this.currentEditingVehicleId = null;
        this.currentViewingVehicleId = null;
    }

    // Vehicle Details Modal
    openVehicleDetailsModal(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return;

        this.currentViewingVehicleId = vehicleId;
        const modal = document.getElementById('vehicleDetailsModal');
        const displayName = vehicle.vehicleType === 'bike' ?
            `${vehicle.year} ${vehicle.make} ${vehicle.model} (Bike)` :
            `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

        document.getElementById('detailsVehicleName').textContent = displayName;

        this.renderVehicleDetails(vehicle);
        this.renderServiceHistory(vehicle);

        modal.classList.add('show');
    }

    renderVehicleDetails(vehicle) {
        const detailsInfo = document.getElementById('vehicleDetailsInfo');

        let details = [
            { label: 'Owner', value: vehicle.owner },
            { label: 'License Plate', value: vehicle.plate || 'N/A' },
            { label: 'Color', value: vehicle.color || 'N/A' }
        ];

        if (vehicle.vehicleType === 'car') {
            details.push(
                { label: 'Engine Type', value: vehicle.engineType || 'N/A' },
                { label: 'Engine Size', value: vehicle.engineSize || 'N/A' },
                { label: 'Horsepower', value: vehicle.horsepower ? `${vehicle.horsepower} HP` : 'N/A' },
                { label: '0-100 km/h', value: vehicle.zeroToHundred ? `${vehicle.zeroToHundred}s` : 'N/A' },
                { label: 'Tire Pressure (Front)', value: vehicle.tirePressureFront ? `${vehicle.tirePressureFront} PSI` : 'N/A' },
                { label: 'Tire Pressure (Rear)', value: vehicle.tirePressureRear ? `${vehicle.tirePressureRear} PSI` : 'N/A' },
                { label: 'Curb Weight', value: vehicle.curbWeight ? `${vehicle.curbWeight} kg` : 'N/A' },
                { label: 'Storage Notes', value: vehicle.storageNotes || 'N/A' }
            );
        } else {
            details.push(
                { label: 'Bike Type', value: vehicle.bikeType || 'N/A' },
                { label: 'Engine Size', value: vehicle.bikeEngineSize || 'N/A' },
                { label: 'Horsepower', value: vehicle.bikeHorsepower ? `${vehicle.bikeHorsepower} HP` : 'N/A' },
                { label: 'Weight', value: vehicle.bikeWeight ? `${vehicle.bikeWeight} kg` : 'N/A' },
                { label: 'Storage Notes', value: vehicle.bikeStorageNotes || 'N/A' }
            );
        }

        detailsInfo.innerHTML = details.map(detail => `
            <div class="detail-row">
                <span class="detail-label">${detail.label}:</span>
                <span class="detail-value">${detail.value}</span>
            </div>
        `).join('');
    }

    // Service History
    renderServiceHistory(vehicle) {
        const serviceList = document.getElementById('serviceHistoryList');
        const services = vehicle.serviceHistory || [];

        if (services.length === 0) {
            serviceList.innerHTML = '';
            return;
        }

        serviceList.innerHTML = services.map(service => `
            <div class="service-item">
                <div class="service-item-header">
                    <span class="service-type">${service.type}</span>
                    <span class="service-date">${this.formatDate(service.date)}</span>
                </div>
                <div class="service-details">
                    ${service.mileage ? `<div>Mileage: ${service.mileage.toLocaleString()} mi</div>` : ''}
                    ${service.notes ? `<div>${service.notes}</div>` : ''}
                    ${service.cost ? `<div class="service-cost">Cost: $${parseFloat(service.cost).toFixed(2)}</div>` : ''}
                </div>
            </div>
        `).join('');
    }

    clearServiceForm() {
        document.getElementById('serviceDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('serviceType').value = 'Oil Change';
        document.getElementById('serviceMileage').value = '';
        document.getElementById('serviceNotes').value = '';
        document.getElementById('serviceCost').value = '';
    }

    saveServiceRecord() {
        if (!this.currentViewingVehicleId) return;

        const serviceData = {
            date: document.getElementById('serviceDate').value,
            type: document.getElementById('serviceType').value,
            mileage: document.getElementById('serviceMileage').value,
            notes: document.getElementById('serviceNotes').value,
            cost: document.getElementById('serviceCost').value
        };

        // Find the vehicle and add service record
        const vehicle = this.vehicles.find(v => v.id === this.currentViewingVehicleId);
        if (vehicle) {
            if (!vehicle.serviceHistory) {
                vehicle.serviceHistory = [];
            }
            vehicle.serviceHistory.unshift(serviceData); // Add to beginning

            this.saveData();
            this.renderServiceHistory(vehicle);
            document.getElementById('addServiceForm').classList.add('hidden');
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Render Vehicles
    renderVehicles() {
        // Clear all parking spots
        document.querySelectorAll('.parking-spot').forEach(spot => {
            const vehicleCard = spot.querySelector('.vehicle-card');
            if (vehicleCard) {
                vehicleCard.remove();
            }
            spot.classList.remove('occupied');
        });

        // Clear bike storage
        const bikeStorage = document.getElementById('bikeStorage');
        bikeStorage.innerHTML = '';

        // Clear available vehicle pools
        const availableCarsList = document.getElementById('availableCarsList');
        const availableBikesList = document.getElementById('availableBikesList');
        availableCarsList.innerHTML = '';
        availableBikesList.innerHTML = '';

        // Separate cars and bikes
        const cars = this.vehicles.filter(v => v.vehicleType === 'car');
        const bikes = this.vehicles.filter(v => v.vehicleType === 'bike');

        // Place parked cars
        Object.keys(this.parkingSpots).forEach(spotId => {
            const vehicleId = this.parkingSpots[spotId];
            const vehicle = cars.find(v => v.id === vehicleId);
            if (vehicle) {
                const spot = document.querySelector(`[data-position="${spotId}"]`);
                if (spot) {
                    this.renderVehicleCard(vehicle, spot);
                    spot.classList.add('occupied');
                }
            }
        });

        // Show unparked cars in available cars pool
        const parkedCarIds = Object.values(this.parkingSpots);
        const unparkedCars = cars.filter(v => !parkedCarIds.includes(v.id));

        unparkedCars.forEach(vehicle => {
            this.renderVehicleCard(vehicle, availableCarsList);
        });

        // Update bike order to remove deleted bikes
        const bikeIds = bikes.map(b => b.id);
        this.bikeOrder = this.bikeOrder.filter(id => bikeIds.includes(id));

        // Render bikes that are in storage (in bikeOrder)
        this.bikeOrder.forEach(bikeId => {
            const bike = bikes.find(b => b.id === bikeId);
            if (bike) {
                this.renderBikeCard(bike, bikeStorage);
            }
        });

        // Show bikes that are NOT in storage in the available bikes pool
        const availableBikes = bikes.filter(b => !this.bikeOrder.includes(b.id));
        availableBikes.forEach(bike => {
            this.renderBikeCard(bike, availableBikesList);
        });

        this.saveData();
    }

    renderVehicleCard(vehicle, container) {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.draggable = true;
        card.dataset.vehicleId = vehicle.id;
        card.dataset.vehicleType = 'car';

        // Set color gradient for border
        const { startColor, endColor } = this.getColorGradient(vehicle.color);
        card.style.setProperty('--card-color-start', startColor);
        card.style.setProperty('--card-color-end', endColor);

        card.innerHTML = `
            <div class="vehicle-card-header">
                <div class="vehicle-title">
                    <div class="vehicle-name">${vehicle.make} ${vehicle.model}</div>
                    <div class="vehicle-year">${vehicle.year}</div>
                </div>
                <div class="charging-indicator">
                    <input type="checkbox" ${vehicle.isCharging ? 'checked' : ''} data-vehicle-id="${vehicle.id}" onclick="event.stopPropagation()">
                    <span>⚡</span>
                </div>
            </div>
            <div class="vehicle-info">
                ${vehicle.horsepower ? `<div>${vehicle.horsepower} HP</div>` : ''}
                ${vehicle.plate ? `<div>${vehicle.plate}</div>` : ''}
            </div>
        `;

        // Add checkbox change event
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            this.toggleCharging(vehicle.id, e.target.checked);
        });

        // Add click event to view details
        card.addEventListener('click', (e) => {
            if (!card.classList.contains('dragging') && e.target.tagName !== 'INPUT') {
                this.openVehicleDetailsModal(vehicle.id);
            }
        });

        container.appendChild(card);
    }

    renderBikeCard(bike, container) {
        const card = document.createElement('div');
        card.className = 'vehicle-card bike-card';
        card.draggable = true;
        card.dataset.vehicleId = bike.id;
        card.dataset.vehicleType = 'bike';

        // Set color gradient for border
        const { startColor, endColor } = this.getColorGradient(bike.color);
        card.style.setProperty('--card-color-start', startColor);
        card.style.setProperty('--card-color-end', endColor);

        card.innerHTML = `
            <div class="vehicle-card-header">
                <div class="vehicle-title">
                    <div class="vehicle-name">${bike.make} ${bike.model}</div>
                    <div class="vehicle-year">${bike.year}</div>
                </div>
                <div class="charging-indicator">
                    <input type="checkbox" ${bike.isCharging ? 'checked' : ''} data-vehicle-id="${bike.id}" onclick="event.stopPropagation()">
                    <span>⚡</span>
                </div>
            </div>
            <div class="vehicle-info">
                ${bike.bikeEngineSize ? `<div>${bike.bikeEngineSize}</div>` : ''}
            </div>
        `;

        // Add checkbox change event
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            this.toggleCharging(bike.id, e.target.checked);
        });

        // Add click event to view details
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT' && !card.classList.contains('dragging')) {
                this.openVehicleDetailsModal(bike.id);
            }
        });

        container.appendChild(card);
    }

    // Drag and Drop
    setupDragAndDrop() {
        this.setupDragListeners();
    }

    setupDragListeners() {
        // Add event listeners to all car parking spots
        document.querySelectorAll('.parking-spot[data-vehicle-type="car"]').forEach(spot => {
            spot.addEventListener('dragover', this.handleDragOver.bind(this));
            spot.addEventListener('drop', this.handleDrop.bind(this));
            spot.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });

        // Add to available cars pool
        const availableCarsList = document.getElementById('availableCarsList');
        if (availableCarsList) {
            availableCarsList.addEventListener('dragover', this.handleDragOver.bind(this));
            availableCarsList.addEventListener('drop', this.handleDrop.bind(this));
            availableCarsList.addEventListener('dragleave', this.handleDragLeave.bind(this));
        }

        // Add to bike storage area
        const bikeStorage = document.getElementById('bikeStorage');
        if (bikeStorage) {
            bikeStorage.addEventListener('dragover', this.handleBikeDragOver.bind(this));
            bikeStorage.addEventListener('drop', this.handleBikeDrop.bind(this));
            bikeStorage.addEventListener('dragleave', this.handleDragLeave.bind(this));
        }

        // Add to available bikes pool
        const availableBikesList = document.getElementById('availableBikesList');
        if (availableBikesList) {
            availableBikesList.addEventListener('dragover', this.handleBikeDragOver.bind(this));
            availableBikesList.addEventListener('drop', this.handleBikeDrop.bind(this));
            availableBikesList.addEventListener('dragleave', this.handleDragLeave.bind(this));
        }

        // Delegate drag events for vehicle cards
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('vehicle-card')) {
                e.target.classList.add('dragging');
                this.draggedVehicleType = e.target.dataset.vehicleType;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', e.target.innerHTML);
                e.dataTransfer.setData('vehicleId', e.target.dataset.vehicleId);
                e.dataTransfer.setData('vehicleType', e.target.dataset.vehicleType);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('vehicle-card')) {
                e.target.classList.remove('dragging');
                this.draggedVehicleType = null;
                // Remove any drag-over indicators
                document.querySelectorAll('.bike-card').forEach(card => {
                    card.classList.remove('drag-over');
                });
                document.querySelectorAll('.parking-spot').forEach(spot => {
                    spot.classList.remove('drag-over');
                });
                document.querySelectorAll('.vehicle-pool').forEach(pool => {
                    pool.classList.remove('drag-over');
                });
            }
        });
    }

    handleDragOver(e) {
        // Only allow cars in car parking spots
        if (this.draggedVehicleType !== 'car') {
            return;
        }

        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (e.currentTarget.classList.contains('parking-spot')) {
            e.currentTarget.classList.add('drag-over');
        } else if (e.currentTarget.classList.contains('vehicle-pool')) {
            e.currentTarget.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        if (e.currentTarget.classList.contains('parking-spot')) {
            e.currentTarget.classList.remove('drag-over');
        } else if (e.currentTarget.classList.contains('vehicle-pool')) {
            e.currentTarget.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        const vehicleId = e.dataTransfer.getData('vehicleId');
        const vehicleType = e.dataTransfer.getData('vehicleType');

        if (!vehicleId) return;

        // Only allow cars in car parking spots and available cars pool
        if (vehicleType !== 'car') {
            return;
        }

        // Remove drag-over class
        document.querySelectorAll('.parking-spot').forEach(spot => {
            spot.classList.remove('drag-over');
        });
        document.querySelectorAll('.vehicle-pool').forEach(pool => {
            pool.classList.remove('drag-over');
        });

        // Remove vehicle from previous spot
        Object.keys(this.parkingSpots).forEach(spot => {
            if (this.parkingSpots[spot] === vehicleId) {
                delete this.parkingSpots[spot];
            }
        });

        // Add to new spot if it's a parking spot
        if (e.currentTarget.classList.contains('parking-spot')) {
            const position = e.currentTarget.dataset.position;
            this.parkingSpots[position] = vehicleId;
        }
        // Otherwise, it's being moved to the available cars pool (unparked)

        this.saveData();
        this.renderVehicles();
        this.setupDragListeners(); // Re-attach listeners to new elements
    }

    handleBikeDragOver(e) {
        // Only allow bikes in bike storage
        if (this.draggedVehicleType !== 'bike') {
            return;
        }

        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Check if this is the available bikes pool
        const isAvailablePool = e.currentTarget.id === 'availableBikesList';

        if (isAvailablePool) {
            // For available pool, highlight the whole pool
            e.currentTarget.classList.add('drag-over');
        } else {
            // Clear all previous indicators
            document.querySelectorAll('.bike-card').forEach(card => {
                card.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            // For bike storage, show insertion point
            const insertionInfo = this.getBikeInsertionPoint(e.currentTarget, e.clientY);

            if (insertionInfo.position === 'before' && insertionInfo.element) {
                insertionInfo.element.classList.add('drag-over-top');
            } else if (insertionInfo.position === 'after' && insertionInfo.element) {
                insertionInfo.element.classList.add('drag-over-bottom');
            } else if (insertionInfo.position === 'empty') {
                // Empty storage, show drop zone
                e.currentTarget.classList.add('drag-over');
            }
        }
    }

    handleBikeDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        const vehicleId = e.dataTransfer.getData('vehicleId');
        const vehicleType = e.dataTransfer.getData('vehicleType');

        if (!vehicleId || vehicleType !== 'bike') return;

        // Remove drag-over class
        document.querySelectorAll('.bike-card').forEach(card => {
            card.classList.remove('drag-over-top', 'drag-over-bottom');
        });
        document.querySelectorAll('.vehicle-pool').forEach(pool => {
            pool.classList.remove('drag-over');
        });
        document.querySelectorAll('#bikeStorage').forEach(storage => {
            storage.classList.remove('drag-over');
        });

        // Check if dropping into available bikes pool or bike storage
        const isAvailablePool = e.currentTarget.id === 'availableBikesList';

        // Remove bike from current position in bikeOrder
        const currentIndex = this.bikeOrder.indexOf(vehicleId);
        if (currentIndex > -1) {
            this.bikeOrder.splice(currentIndex, 1);
        }

        // If dropping into bike storage (not available pool), insert at new position
        if (!isAvailablePool) {
            const insertionInfo = this.getBikeInsertionPoint(e.currentTarget, e.clientY);

            if (insertionInfo.position === 'empty') {
                // Empty storage, add as first bike
                this.bikeOrder.push(vehicleId);
            } else if (insertionInfo.position === 'before' && insertionInfo.element) {
                // Insert before the element
                const targetId = insertionInfo.element.dataset.vehicleId;
                const targetIndex = this.bikeOrder.indexOf(targetId);
                if (targetIndex !== -1) {
                    this.bikeOrder.splice(targetIndex, 0, vehicleId);
                } else {
                    this.bikeOrder.unshift(vehicleId);
                }
            } else if (insertionInfo.position === 'after' && insertionInfo.element) {
                // Insert after the element
                const targetId = insertionInfo.element.dataset.vehicleId;
                const targetIndex = this.bikeOrder.indexOf(targetId);
                if (targetIndex !== -1) {
                    this.bikeOrder.splice(targetIndex + 1, 0, vehicleId);
                } else {
                    this.bikeOrder.push(vehicleId);
                }
            }
        }
        // If dropping into available pool, just leave it out of bikeOrder

        this.saveData();
        this.renderVehicles();
        this.setupDragListeners();
    }

    getBikeInsertionPoint(container, y) {
        const draggableElements = [...container.querySelectorAll('.bike-card:not(.dragging)')];

        // If no bikes in storage
        if (draggableElements.length === 0) {
            return { position: 'empty', element: null };
        }

        // Find the closest element and whether to insert before or after
        for (let i = 0; i < draggableElements.length; i++) {
            const element = draggableElements[i];
            const box = element.getBoundingClientRect();
            const middle = box.top + box.height / 2;

            // If hovering over top half of first element
            if (i === 0 && y < middle) {
                return { position: 'before', element: element };
            }

            // If hovering over bottom half of last element
            if (i === draggableElements.length - 1 && y > middle) {
                return { position: 'after', element: element };
            }

            // If hovering over bottom half of current or top half of next
            if (y > middle) {
                if (i < draggableElements.length - 1) {
                    const nextElement = draggableElements[i + 1];
                    const nextBox = nextElement.getBoundingClientRect();
                    const nextMiddle = nextBox.top + nextBox.height / 2;

                    if (y < nextMiddle) {
                        return { position: 'after', element: element };
                    }
                }
            } else {
                return { position: 'before', element: element };
            }
        }

        // Default to after last element
        return { position: 'after', element: draggableElements[draggableElements.length - 1] };
    }

    // Utility
    generateId() {
        return 'vehicle_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getColorGradient(color) {
        // Default to grey if no color or invalid color
        if (!color || color.trim() === '') {
            return {
                startColor: '#64748b',
                endColor: '#475569'
            };
        }

        // Ensure color starts with #
        let cleanColor = color.trim();
        if (!cleanColor.startsWith('#')) {
            cleanColor = '#' + cleanColor;
        }

        // Validate hex color
        if (!/^#[0-9A-F]{6}$/i.test(cleanColor)) {
            return {
                startColor: '#64748b',
                endColor: '#475569'
            };
        }

        // Convert color to RGB to create gradient
        const lightenColor = (col, percent) => {
            const num = parseInt(col.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) + amt;
            const G = (num >> 8 & 0x00FF) + amt;
            const B = (num & 0x0000FF) + amt;
            return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                (B < 255 ? B < 1 ? 0 : B : 255))
                .toString(16).slice(1);
        };

        const darkenColor = (col, percent) => {
            const num = parseInt(col.replace('#', ''), 16);
            const amt = Math.round(2.55 * percent);
            const R = (num >> 16) - amt;
            const G = (num >> 8 & 0x00FF) - amt;
            const B = (num & 0x0000FF) - amt;
            return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 +
                (G > 0 ? G : 0) * 0x100 +
                (B > 0 ? B : 0))
                .toString(16).slice(1);
        };

        return {
            startColor: lightenColor(cleanColor, 20),
            endColor: darkenColor(cleanColor, 10)
        };
    }

    toggleCharging(vehicleId, isCharging) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            vehicle.isCharging = isCharging;
            this.saveData();
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.garageManager = new GarageManager();
});
