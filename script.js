const products = [
            {
                id: 1,
                name: "Etherix Elite Pro",
                category: "wireless",
                price: 349.99,
                rating: 5,
                description: "Premium wireless headphones with ANC",
                tag: "bestseller",
                image: "etherix_elite_pro.png"
            },
            {
                id: 2,
                name: "Etherix Bass Max",
                category: "wireless",
                price: 279.99,
                rating: 4.5,
                description: "Deep bass and immersive sound",
                tag: "hot",
                image: "etherix_bass_max.png"
            },
            {
                id: 3,
                name: "Etherix Studio HD",
                category: "wired",
                price: 199.99,
                rating: 5,
                description: "Studio-quality wired headphones",
                tag: "new",
                image: "etherix_studio_hd.png"
            },
            {
                id: 4,
                name: "Etherix Gaming X",
                category: "gaming",
                price: 229.99,
                rating: 4.8,
                description: "7.1 surround sound for gaming",
                tag: "gaming",
                image: "etherix_gaming_x.png"
            },
            {
                id: 5,
                name: "Etherix Run Fit",
                category: "sport",
                price: 189.99,
                rating: 4.6,
                description: "Lightweight and water resistant",
                tag: "new",
                image: "etherix_run_fit.png"
            },
            {
                id: 6,
                name: "Etherix Comfort Plus",
                category: "wireless",
                price: 259.99,
                rating: 4.7,
                description: "All-day comfort with memory foam",
                tag: "bestseller",
                image: "etherix_comfort_plus.png"
            }
        ];

        // Cart
        let cart = [];
        let isLoggedIn = false;
        let currentUser = null;

        // Auth Functions
        function openAuthModal() {
            document.getElementById('authModal').classList.add('active');
            document.getElementById('userMenu').classList.remove('active');
        }

        function closeAuthModal() {
            document.getElementById('authModal').classList.remove('active');
        }

        function switchAuthTab(tab) {
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');

            // Update forms
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            if (tab === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('signupForm').classList.add('active');
            }
        }

        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = event.currentTarget.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulate login (in real app, this would be an API call)
            currentUser = {
                name: email.split('@')[0],
                email: email
            };
            
            isLoggedIn = true;
            updateUserUI();
            closeAuthModal();
            showToast('Welcome back! Successfully logged in.');
        }

        function handleSignup(event) {
            event.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match!');
                return;
            }
            
            // Simulate signup (in real app, this would be an API call)
            currentUser = {
                name: name,
                email: email
            };
            
            isLoggedIn = true;
            updateUserUI();
            closeAuthModal();
            showToast('Account created successfully! Welcome to Etherix.');
        }

        function handleSocialLogin(provider) {
            // Simulate social login
            currentUser = {
                name: `${provider} User`,
                email: `user@${provider}.com`
            };
            
            isLoggedIn = true;
            updateUserUI();
            closeAuthModal();
            showToast(`Successfully logged in with ${provider}!`);
        }

        function handleLogout() {
            isLoggedIn = false;
            currentUser = null;
            updateUserUI();
            document.getElementById('userMenu').classList.remove('active');
            showToast('Logged out successfully');
        }

        function updateUserUI() {
            const userBtn = document.querySelector('.user-btn');
            const userInfo = document.getElementById('userInfo');
            const guestMenu = document.getElementById('guestMenu');
            const loggedInMenu = document.getElementById('loggedInMenu');
            const userName = document.getElementById('userName');
            const userEmail = document.getElementById('userEmail');
            
            if (isLoggedIn && currentUser) {
                userBtn.classList.add('logged-in');
                userInfo.style.display = 'block';
                guestMenu.style.display = 'none';
                loggedInMenu.style.display = 'block';
                userName.textContent = currentUser.name;
                userEmail.textContent = currentUser.email;
                
                // Update profile page
                document.getElementById('profileName').textContent = currentUser.name;
                document.getElementById('profileEmail').textContent = currentUser.email;
                const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                document.getElementById('avatarInitials').textContent = initials;
            } else {
                userBtn.classList.remove('logged-in');
                userInfo.style.display = 'none';
                guestMenu.style.display = 'block';
                loggedInMenu.style.display = 'none';
            }
        }

        // Profile Functions
        function showProfile(tab = 'info') {
            // Hide all main sections
            document.querySelectorAll('.hero, .section, .showcase, .testimonials').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show profile section
            document.getElementById('profileSection').classList.add('active');
            
            // Switch to requested tab
            switchProfileTab(tab);
            
            // Close user menu
            document.getElementById('userMenu').classList.remove('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showHome() {
            // Hide profile section
            document.getElementById('profileSection').classList.remove('active');
            
            // Show all main sections
            document.querySelectorAll('.hero, .section, .showcase, .testimonials').forEach(el => {
                el.style.display = 'block';
            });
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function switchProfileTab(tab) {
            // Update sidebar navigation
            document.querySelectorAll('.profile-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event?.currentTarget?.classList.add('active');
            
            // Update content
            document.querySelectorAll('.profile-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const tabMap = {
                'info': 'infoTab',
                'orders': 'ordersTab',
                'wishlist': 'wishlistTab',
                'addresses': 'addressesTab',
                'settings': 'settingsTab'
            };
            
            const targetTab = document.getElementById(tabMap[tab]);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        }

        // Toggle user menu
        document.getElementById('userBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            const userMenu = document.getElementById('userMenu');
            userMenu.classList.toggle('active');
        });

        // Close user menu when clicking outside
        document.addEventListener('click', (e) => {
            const userMenu = document.getElementById('userMenu');
            const userBtn = document.getElementById('userBtn');
            
            if (!userMenu.contains(e.target) && !userBtn.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });

        // Close auth modal on outside click
        document.getElementById('authModal').addEventListener('click', (e) => {
            if (e.target.id === 'authModal') {
                closeAuthModal();
            }
        });

        // Render Products
        function renderProducts(filter = 'all') {
            const grid = document.getElementById('productsGrid');
            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
            
            grid.innerHTML = filtered.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <span class="product-tag ${product.tag === 'new' ? 'new' : ''}">${product.tag.toUpperCase()}</span>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-rating">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                            ${product.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        </div>
                        <p class="product-desc">${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        <div class="product-actions">
                            <button class="btn-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn-wishlist">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter Products
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProducts(btn.dataset.filter);
            });
        });

        // Add to Cart
        function addToCart(name, price, image) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }
            
            updateCart();
            showToast(`${name} added to cart!`);
        }

        // Update Cart
        function updateCart() {
            const cartCount = document.querySelector('.cart-count');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Your cart is empty</p>';
                cartTotal.textContent = '$0.00';
                return;
            }
            
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p style="color: var(--primary-color);">${item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span style="padding: 0 1rem;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="qty-btn" onclick="removeFromCart(${index})" style="background: var(--accent); margin-left: 0.5rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `${total.toFixed(2)}`;
        }

        // Update Quantity
        function updateQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCart();
        }

        // Remove from Cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showToast('Item removed from cart');
        }

        // Open/Close Cart
        document.getElementById('cartBtn').addEventListener('click', () => {
            document.getElementById('cartModal').classList.add('active');
        });

        function closeCart() {
            document.getElementById('cartModal').classList.remove('active');
        }

        // Close modal on outside click
        document.getElementById('cartModal').addEventListener('click', (e) => {
            if (e.target.id === 'cartModal') {
                closeCart();
            }
        });

        // Toast Notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Search Functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                if (name.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Initialize
        renderProducts();

        const DB = { users: 'etherix_users', orders: 'etherix_orders', wishlist: 'etherix_wishlist', addresses: 'etherix_addresses' };
        
        const dbHelpers = {
            createUser: (userData) => {
                const users = JSON.parse(localStorage.getItem(DB.users) || '[]');
                const newUser = { id: Date.now(), ...userData, createdAt: new Date().toISOString(), totalSpent: 0, orderCount: 0 };
                users.push(newUser);
                localStorage.setItem(DB.users, JSON.stringify(users));
                return newUser;
            },
            getUserByEmail: (email) => JSON.parse(localStorage.getItem(DB.users) || '[]').find(u => u.email === email),
            updateUser: (userId, updates) => {
                const users = JSON.parse(localStorage.getItem(DB.users) || '[]');
                const index = users.findIndex(u => u.id === userId);
                if (index !== -1) {
                    users[index] = { ...users[index], ...updates };
                    localStorage.setItem(DB.users, JSON.stringify(users));
                    return users[index];
                }
                return null;
            },
            addToWishlist: (userId, productId) => {
                const wishlist = JSON.parse(localStorage.getItem(DB.wishlist) || '[]');
                const item = { id: Date.now(), userId, productId, addedAt: new Date().toISOString() };
                wishlist.push(item);
                localStorage.setItem(DB.wishlist, JSON.stringify(wishlist));
                return item;
            },
            getWishlist: (userId) => JSON.parse(localStorage.getItem(DB.wishlist) || '[]').filter(item => item.userId === userId),
            removeFromWishlist: (userId, productId) => {
                const wishlist = JSON.parse(localStorage.getItem(DB.wishlist) || '[]');
                localStorage.setItem(DB.wishlist, JSON.stringify(wishlist.filter(item => !(item.userId === userId && item.productId === productId))));
            },
            addAddress: (userId, addressData) => {
                const addresses = JSON.parse(localStorage.getItem(DB.addresses) || '[]');
                if (addressData.isDefault) addresses.forEach(addr => { if (addr.userId === userId) addr.isDefault = false; });
                const newAddress = { id: Date.now(), userId, ...addressData, createdAt: new Date().toISOString() };
                addresses.push(newAddress);
                localStorage.setItem(DB.addresses, JSON.stringify(addresses));
                return newAddress;
            },
            getAddresses: (userId) => JSON.parse(localStorage.getItem(DB.addresses) || '[]').filter(addr => addr.userId === userId),
            updateAddress: (addressId, updates) => {
                const addresses = JSON.parse(localStorage.getItem(DB.addresses) || '[]');
                const index = addresses.findIndex(a => a.id === addressId);
                if (index !== -1) {
                    if (updates.isDefault) {
                        const userId = addresses[index].userId;
                        addresses.forEach(addr => { if (addr.userId === userId && addr.id !== addressId) addr.isDefault = false; });
                    }
                    addresses[index] = { ...addresses[index], ...updates };
                    localStorage.setItem(DB.addresses, JSON.stringify(addresses));
                    return addresses[index];
                }
                return null;
            },
            deleteAddress: (addressId) => {
                const addresses = JSON.parse(localStorage.getItem(DB.addresses) || '[]');
                localStorage.setItem(DB.addresses, JSON.stringify(addresses.filter(a => a.id !== addressId)));
            },
            getOrders: (userId) => JSON.parse(localStorage.getItem(DB.orders) || '[]').filter(order => order.userId === userId)
        };

        const PRODUCTS = [
            { id: 1, name: "Etherix Elite Pro", category: "wireless", price: 349.99, rating: 5, description: "Premium wireless headphones with ANC", tag: "bestseller", image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop" },
            { id: 2, name: "Etherix Bass Max", category: "wireless", price: 279.99, rating: 4.5, description: "Deep bass and immersive sound", tag: "hot", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop" },
            { id: 3, name: "Etherix Studio HD", category: "wired", price: 199.99, rating: 5, description: "Studio-quality wired headphones", tag: "new", image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop" },
            { id: 4, name: "Etherix Gaming X", category: "gaming", price: 229.99, rating: 4.8, description: "7.1 surround sound for gaming", tag: "gaming", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop" },
            { id: 5, name: "Etherix Run Fit", category: "sport", price: 189.99, rating: 4.6, description: "Lightweight and water resistant", tag: "new", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" },
            { id: 6, name: "Etherix Comfort Plus", category: "wireless", price: 259.99, rating: 4.7, description: "All-day comfort with memory foam", tag: "bestseller", image: "https://images.unsplash.com/photo-1577174881658-0f30157d315a?w=400&h=400&fit=crop" }
        ];

        let state = {
            currentUser: null, cart: [], wishlist: [], addresses: [], orders: [],
            currentView: 'home', profileTab: 'info', filter: 'all', searchQuery: '',
            showAuthModal: false, showCart: false, showUserMenu: false, authTab: 'login',
            showPassword: {}, editingInfo: null, showAddressForm: false,
            newAddress: { type: 'home', label: '', street: '', city: '', state: '', zip: '', phone: '', isDefault: false }
        };

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-8 right-8 bg-gray-800 border border-blue-500 px-6 py-3 rounded-lg shadow-xl z-50 animate-slide-in';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        function loadUserData(userId) {
            state.wishlist = dbHelpers.getWishlist(userId);
            state.addresses = dbHelpers.getAddresses(userId);
            state.orders = dbHelpers.getOrders(userId);
        }

        function handleLogin(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const user = dbHelpers.getUserByEmail(formData.get('email'));
            if (user && user.password === formData.get('password')) {
                state.currentUser = user;
                localStorage.setItem('etherix_current_user', JSON.stringify(user));
                loadUserData(user.id);
                state.showAuthModal = false;
                showToast('Welcome back!');
                render();
            } else showToast('Invalid credentials');
        }

        function handleSignup(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const password = formData.get('password');
            if (password !== formData.get('confirmPassword')) return showToast('Passwords do not match!');
            if (dbHelpers.getUserByEmail(formData.get('email'))) return showToast('Email already exists!');
            const newUser = dbHelpers.createUser({ name: formData.get('name'), email: formData.get('email'), password, phone: '', dob: '', gender: '' });
            state.currentUser = newUser;
            localStorage.setItem('etherix_current_user', JSON.stringify(newUser));
            state.showAuthModal = false;
            showToast('Welcome to Etherix!');
            render();
        }

        function handleLogout() {
            state.currentUser = null;
            localStorage.removeItem('etherix_current_user');
            state.cart = []; state.wishlist = []; state.addresses = []; state.orders = [];
            state.currentView = 'home'; state.showUserMenu = false;
            showToast('Logged out');
            render();
        }

        function addToCart(productId) {
            const product = PRODUCTS.find(p => p.id === productId);
            if (!product) return;
            const existing = state.cart.find(item => item.id === product.id);
            if (existing) existing.quantity++;
            else state.cart.push({ ...product, quantity: 1 });
            showToast(`${product.name} added to cart!`);
            render();
        }

        function updateQuantity(productId, change) {
            const item = state.cart.find(i => i.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) state.cart = state.cart.filter(i => i.id !== productId);
            }
            render();
        }

        function toggleWishlist(productId) {
            if (!state.currentUser) {
                showToast('Please login');
                state.showAuthModal = true;
                render();
                return;
            }
            const exists = state.wishlist.find(item => item.productId === productId);
            if (exists) {
                dbHelpers.removeFromWishlist(state.currentUser.id, productId);
                state.wishlist = state.wishlist.filter(item => item.productId !== productId);
                showToast('Removed from wishlist');
            } else {
                dbHelpers.addToWishlist(state.currentUser.id, productId);
                state.wishlist.push({ userId: state.currentUser.id, productId, addedAt: new Date().toISOString() });
                showToast('Added to wishlist');
            }
            render();
        }

        function addAddress() {
            if (!state.currentUser || !state.newAddress.street || !state.newAddress.city) return showToast('Fill required fields');
            const newAddr = dbHelpers.addAddress(state.currentUser.id, state.newAddress);
            state.addresses.push(newAddr);
            state.newAddress = { type: 'home', label: '', street: '', city: '', state: '', zip: '', phone: '', isDefault: false };
            state.showAddressForm = false;
            showToast('Address added');
            render();
        }

        function updateAddress(addressId, updates) {
            const updated = dbHelpers.updateAddress(addressId, updates);
            if (updated) {
                state.addresses = state.addresses.map(addr => addr.id === addressId ? updated : addr);
                showToast('Address updated');
                render();
            }
        }

        function deleteAddress(addressId) {
            dbHelpers.deleteAddress(addressId);
            state.addresses = state.addresses.filter(addr => addr.id !== addressId);
            showToast('Address deleted');
            render();
        }

        function updateUserInfo(field, value) {
            if (!state.currentUser) return;
            const updated = dbHelpers.updateUser(state.currentUser.id, { [field]: value });
            if (updated) {
                state.currentUser = updated;
                localStorage.setItem('etherix_current_user', JSON.stringify(updated));
                state.editingInfo = null;
                showToast('Profile updated');
                render();
            }
        }