// Application State
const AppState = {
    currentUser: null,
    currentPage: 'home',
    isLoggedIn: false,
    users: [...MOCK_USERS],
    cats: [...MOCK_CATS],
    appointments: [...MOCK_APPOINTMENTS],
    invoices: [...MOCK_INVOICES],
    receipts: [...MOCK_RECEIPTS],
    notifications: [...MOCK_NOTIFICATIONS]
};

// Initialize App
function initApp() {
    renderApp();
    attachEventListeners();
    loadSavedSession();
}

// Render Main App Structure
function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div id="public-pages">
            ${renderPublicHeader()}
            <div id="page-content"></div>
        </div>
        ${renderLoginModal()}
        ${renderRegisterModal()}
        <div id="dashboard" style="display: none;"></div>
    `;
    
    loadPage('home');
}

// Render Public Header
function renderPublicHeader() {
    return `
        <header class="public-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="../src/imports/7631b94ff39ea0252343b3e9d288394bf7fa1549.png" alt="Meowy Groom" class="logo-img" onerror="this.style.display='none'">
                    <div class="logo-text">
                        <h1>Meowy Groom</h1>
                        <p>Cat Grooming Booking Management System</p>
                    </div>
                </div>
                <nav class="nav-menu">
                    <button class="nav-link ${AppState.currentPage === 'home' ? 'active' : ''}" data-page="home">Home</button>
                    <button class="nav-link ${AppState.currentPage === 'about' ? 'active' : ''}" data-page="about">About Us</button>
                    <button class="nav-link ${AppState.currentPage === 'contact' ? 'active' : ''}" data-page="contact">Contact</button>
                    <button class="nav-link ${AppState.currentPage === 'feedback' ? 'active' : ''}" data-page="feedback">Feedback</button>
                    <button class="btn-login" id="header-login-btn">Login</button>
                </nav>
            </div>
        </header>
    `;
}

// Load Page Content
function loadPage(pageName) {
    AppState.currentPage = pageName;
    const pageContent = document.getElementById('page-content');
    
    const pages = {
        home: renderHomePage,
        about: renderAboutPage,
        contact: renderContactPage,
        feedback: renderFeedbackPage
    };
    
    pageContent.innerHTML = pages[pageName]();
    
    // Update header
    const publicPages = document.getElementById('public-pages');
    if (publicPages) {
        const header = publicPages.querySelector('.public-header');
        if (header) {
            header.outerHTML = renderPublicHeader();
        }
    }
}

// Render Footer
function renderFooter() {
    return `
        <footer class="footer">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+60 10-774 5512</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>support@meowygroom.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>G9, Jalan KNMP 2A, Kompleks Niaga Melaka Perdana, 75450 Ayer Keroh, Melaka</span>
                    </div>
                </div>
                <div class="footer-section footer-center">
                    <img src="../src/imports/7631b94ff39ea0252343b3e9d288394bf7fa1549.png" alt="Meowy Groom" class="footer-logo" onerror="this.style.display='none'">
                    <h3>Meowy Groom</h3>
                    <p>Safe, Clean, and Stress-Free Grooming.<br>Handled with care and professionalism you can trust.</p>
                    <p class="copyright">© 2026 Meowy Groom. All rights reserved.</p>
                </div>
                <div class="footer-section">
                    <h3>Follow Us</h3>
                    <div class="social-links">
                        <a href="https://www.facebook.com/meowygroom" target="_blank" class="social-icon facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/meowygroom" target="_blank" class="social-icon instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.tiktok.com/@meowygroom" target="_blank" class="social-icon tiktok">
                            <i class="fab fa-tiktok"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Render Home Page
function renderHomePage() {
    return `
        <div class="page active">
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1 class="hero-title">Welcome to Meowy Groom</h1>
                        <p class="hero-subtitle">Professional Cat Grooming Services in Ayer Keroh, Melaka</p>
                        <p class="hero-description">
                            Book your cat's grooming appointment online with ease. We provide safe, clean,
                            and stress-free grooming experiences for your feline friends.
                        </p>
                        <div class="hero-buttons">
                            <button class="btn-primary" id="hero-book-btn">Book Appointment</button>
                            <button class="btn-secondary" onclick="loadPage('about')">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features-section">
                <div class="container">
                    <h2 class="section-title">Our Services</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-cat"></i>
                            </div>
                            <h3>Professional Grooming</h3>
                            <p>Expert care for cats of all ages and breeds with patience and respect.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <h3>Easy Online Booking</h3>
                            <p>Schedule appointments online at your convenience, no more walk-ins hassle.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Safe & Hygienic</h3>
                            <p>Maintaining high standards of cleanliness and safety for your pets.</p>
                        </div>
                    </div>
                </div>
            </section>

            ${renderFooter()}
        </div>
    `;
}

// Render About Page
function renderAboutPage() {
    return `
        <div class="page active">
            <main class="main-content" style="background: var(--primary-purple); padding-top: 0;">
                <div class="container-narrow" style="padding-top: 3rem; padding-bottom: 3rem;">
                    <div class="page-title-section">
                        <h2 style="color: white;">About Meowy Groom</h2>
                        <p style="color: rgba(255,255,255,0.9);">We are a professional cat grooming service dedicated to providing the best care for your feline friends.</p>
                    </div>

                    <div class="info-card">
                        <div class="icon-circle">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>Company Overview</h3>
                        <p>Meowy Groom is a local cat grooming business in Ayer Keroh, Melaka, established in 2020 by Mr. Mohamad Hanafi bin Zulkipli and his wife. We provide trusted grooming services that prioritise cat well-being, professional care, and customer satisfaction.</p>
                        <p>Our skilled groomers handle each cat with patience and respect, ensuring a safe, clean, and stress-free grooming experience. We offer services such as basic and full grooming, nail trimming, ear cleaning, fur trimming, and flea care.</p>
                    </div>

                    <div class="grid-2">
                        <div class="info-card">
                            <div class="icon-circle">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h3>Vision</h3>
                            <p>To provide every cat with a safe, clean, and stress-free grooming experience while maintaining high standards of care and professionalism.</p>
                        </div>
                        <div class="info-card">
                            <div class="icon-circle">
                                <i class="fas fa-award"></i>
                            </div>
                            <h3>Mission</h3>
                            <p>- Deliver grooming services that prioritise cat safety, comfort, and well-being.</p>
                            <p>- Ensure professional and hygienic care through skilled and dedicated groomers.</p>
                            <p>- Offer convenient and reliable services via walk-ins and WhatsApp appointments.</p>
                            <p>- Continuously improve operations to enhance efficiency and customer satisfaction.</p>
                        </div>
                    </div>
                </div>
            </main>
            ${renderFooter()}
        </div>
    `;
}

// Render Contact Page
function renderContactPage() {
    return `
        <div class="page active">
            <main class="main-content" style="background: var(--primary-purple); padding-top: 0;">
                <div class="container-narrow" style="padding-top: 3rem; padding-bottom: 3rem;">
                    <div class="page-title-section">
                        <h2 style="color: white;">Contact Us</h2>
                        <p style="color: rgba(255,255,255,0.9);">Get in touch with us for any inquiries or to book an appointment.</p>
                    </div>

                    <div class="info-card">
                        <h3>Contact Information</h3>
                        <div class="contact-item" style="margin: 1.5rem 0;">
                            <i class="fas fa-phone"></i>
                            <div>
                                <strong>Phone:</strong><br>
                                +60 10-774 5512
                            </div>
                        </div>
                        <div class="contact-item" style="margin: 1.5rem 0;">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>Email:</strong><br>
                                support@meowygroom.com
                            </div>
                        </div>
                        <div class="contact-item" style="margin: 1.5rem 0;">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Address:</strong><br>
                                G9, Jalan KNMP 2A, 2, Kompleks Niaga Melaka Perdana,<br>
                                75450 Ayer Keroh, Melaka
                            </div>
                        </div>
                        <div class="contact-item" style="margin: 1.5rem 0;">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Operating Hours:</strong><br>
                                Monday - Saturday: 9:00 AM - 6:00 PM<br>
                                Sunday: Closed
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ${renderFooter()}
        </div>
    `;
}

// Render Feedback Page
function renderFeedbackPage() {
    return `
        <div class="page active">
            <main class="main-content" style="background: var(--primary-purple); padding-top: 0;">
                <div class="container-narrow" style="padding-top: 3rem; padding-bottom: 3rem;">
                    <div class="page-title-section">
                        <h2 style="color: white;">We Value Your Feedback</h2>
                        <p style="color: rgba(255,255,255,0.9);">Help us improve our services by sharing your experience.</p>
                    </div>

                    <div class="info-card">
                        <h3>Submit Feedback</h3>
                        <form id="feedback-form">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label>Rating</label>
                                <select class="form-input" required>
                                    <option value="">Select rating...</option>
                                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                                    <option value="4">⭐⭐⭐⭐ Good</option>
                                    <option value="3">⭐⭐⭐ Average</option>
                                    <option value="2">⭐⭐ Below Average</option>
                                    <option value="1">⭐ Poor</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Your Feedback</label>
                                <textarea class="form-input" rows="5" required></textarea>
                            </div>
                            <button type="submit" class="btn-primary btn-block">Submit Feedback</button>
                        </form>
                    </div>
                </div>
            </main>
            ${renderFooter()}
        </div>
    `;
}

// Render Login Modal
function renderLoginModal() {
    return `
        <div id="login-modal" class="modal">
            <div class="modal-content">
                <button class="modal-close" id="close-login">&times;</button>
                <div class="modal-header">
                    <img src="../src/imports/7631b94ff39ea0252343b3e9d288394bf7fa1549.png" alt="Meowy Groom" class="modal-logo" onerror="this.style.display='none'">
                    <h2>Login to Meowy Groom</h2>
                    <p>Enter your credentials to access your account</p>
                </div>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-username">Username</label>
                        <input type="text" id="login-username" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" class="form-input" required>
                    </div>
                    <button type="submit" class="btn-primary btn-block">Login</button>
                </form>
                <div class="modal-footer">
                    <p>Don't have an account? <button type="button" class="link-btn" id="show-register">Register here</button></p>
                </div>
            </div>
        </div>
    `;
}

// Render Register Modal
function renderRegisterModal() {
    return `
        <div id="register-modal" class="modal">
            <div class="modal-content">
                <button class="modal-close" id="close-register">&times;</button>
                <div class="modal-header">
                    <img src="../src/imports/7631b94ff39ea0252343b3e9d288394bf7fa1549.png" alt="Meowy Groom" class="modal-logo" onerror="this.style.display='none'">
                    <h2>Create Account</h2>
                    <p>Join Meowy Groom to book appointments online</p>
                </div>
                <form id="register-form">
                    <div class="form-group">
                        <label for="register-fullname">Full Name</label>
                        <input type="text" id="register-fullname" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="register-username">Username</label>
                        <input type="text" id="register-username" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="register-phone">Phone Number</label>
                        <input type="tel" id="register-phone" class="form-input" placeholder="+60123456789" required>
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="register-confirm-password">Confirm Password</label>
                        <input type="password" id="register-confirm-password" class="form-input" required>
                    </div>
                    <button type="submit" class="btn-primary btn-block">Create Account</button>
                </form>
                <div class="modal-footer">
                    <p>Already have an account? <button type="button" class="link-btn" id="show-login">Login here</button></p>
                </div>
            </div>
        </div>
    `;
}

// Handle Login
function handleLogin(username, password) {
    const user = AppState.users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === password
    );
    
    if (user) {
        AppState.currentUser = user;
        AppState.isLoggedIn = true;
        storage.set('currentUser', user);
        showDashboard();
        showToast(`Welcome back, ${user.fullname}!`, 'success');
        return true;
    } else {
        showToast('Invalid username or password', 'error');
        return false;
    }
}

// Handle Register
function handleRegister(formData) {
    // Check if username exists (except for wawa2)
    const isWawa2 = formData.username.toLowerCase() === 'wawa2';
    if (!isWawa2) {
        const exists = AppState.users.find(u => 
            u.username.toLowerCase() === formData.username.toLowerCase()
        );
        if (exists) {
            showToast('Username has been used', 'error');
            return false;
        }
    }
    
    // Validate email
    if (!isValidEmail(formData.email)) {
        showToast('Invalid email format', 'error');
        return false;
    }
    
    // Validate phone
    if (!isValidPhone(formData.phone)) {
        showToast('Invalid phone number format', 'error');
        return false;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        fullname: formData.fullname,
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: 'customer'
    };
    
    AppState.users.push(newUser);
    storage.set('users', AppState.users);
    
    showToast('Account created successfully! Please login.', 'success');
    return true;
}

// Show Dashboard
function showDashboard() {
    document.getElementById('public-pages').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    renderDashboard();
}

// Hide Dashboard
function hideDashboard() {
    document.getElementById('public-pages').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

// Logout
function handleLogout() {
    AppState.currentUser = null;
    AppState.isLoggedIn = false;
    storage.remove('currentUser');
    hideDashboard();
    loadPage('home');
    showToast('Logged out successfully', 'info');
}

// Load Saved Session
function loadSavedSession() {
    const savedUser = storage.get('currentUser');
    if (savedUser) {
        const user = AppState.users.find(u => u.id === savedUser.id);
        if (user) {
            AppState.currentUser = user;
            AppState.isLoggedIn = true;
            showDashboard();
        }
    }
}

// Render Dashboard
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    const role = AppState.currentUser.role;
    
    dashboard.innerHTML = `
        <div class="dashboard-layout">
            ${renderSidebar(role)}
            <main class="dashboard-main">
                <div id="dashboard-content"></div>
            </main>
        </div>
    `;
    
    // Load default page based on role
    loadDashboardPage(role === 'customer' ? 'my-profile' : 'user-info');
}

// Render Sidebar
function renderSidebar(role) {
    const menuItems = getSidebarMenu(role);
    
    return `
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="../src/imports/7631b94ff39ea0252343b3e9d288394bf7fa1549.png" alt="Meowy Groom" class="sidebar-logo" onerror="this.style.display='none'">
                <h2>Meowy Groom</h2>
                <p style="color: rgba(255,255,255,0.8); font-size: 0.875rem; margin-top: 0.5rem;">
                    ${role.charAt(0).toUpperCase() + role.slice(1)} Portal
                </p>
            </div>
            <nav class="sidebar-nav" id="sidebar-nav">
                ${menuItems.map(item => `
                    <button class="sidebar-link" data-page="${item.id}">
                        <i class="fas ${item.icon}"></i>
                        <span>${item.label}</span>
                    </button>
                `).join('')}
            </nav>
            <div class="sidebar-footer">
                <div style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.75rem;">Logged in as:</p>
                    <p style="color: white; font-weight: 600;">${AppState.currentUser.fullname}</p>
                </div>
                <button id="logout-btn" class="btn-logout">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        </aside>
    `;
}

// Get Sidebar Menu Items
function getSidebarMenu(role) {
    const menus = {
        customer: [
            { id: 'my-profile', label: 'My Profile', icon: 'fa-user' },
            { id: 'my-cats', label: 'My Cats', icon: 'fa-cat' },
            { id: 'book-appointment', label: 'Book Appointment', icon: 'fa-calendar-plus' },
            { id: 'my-appointments', label: 'My Appointments', icon: 'fa-calendar-check' },
            { id: 'my-invoices', label: 'My Invoices', icon: 'fa-file-invoice' },
            { id: 'my-receipts', label: 'My Receipts', icon: 'fa-receipt' },
            { id: 'notifications', label: 'Notifications', icon: 'fa-bell' }
        ],
        staff: [
            { id: 'user-info', label: 'User Info', icon: 'fa-id-card' },
            { id: 'manage-appointments', label: 'Manage Appointments', icon: 'fa-calendar-alt' },
            { id: 'approve-bookings', label: 'Approve Bookings', icon: 'fa-check-circle' },
            { id: 'manage-invoices', label: 'Manage Invoices', icon: 'fa-file-invoice-dollar' },
            { id: 'manage-receipts', label: 'Manage Receipts', icon: 'fa-receipt' },
            { id: 'send-notifications', label: 'Send Notifications', icon: 'fa-paper-plane' }
        ],
        owner: [
            { id: 'user-info', label: 'User Info', icon: 'fa-id-card' },
            { id: 'user-management', label: 'User Management', icon: 'fa-users-cog' },
            { id: 'manage-appointments', label: 'Manage Appointments', icon: 'fa-calendar-alt' },
            { id: 'approve-bookings', label: 'Approve Bookings', icon: 'fa-check-circle' },
            { id: 'manage-invoices', label: 'Manage Invoices', icon: 'fa-file-invoice-dollar' },
            { id: 'manage-receipts', label: 'Manage Receipts', icon: 'fa-receipt' },
            { id: 'sales-reports', label: 'Sales Reports', icon: 'fa-chart-line' },
            { id: 'send-notifications', label: 'Send Notifications', icon: 'fa-paper-plane' }
        ]
    };
    
    return menus[role] || [];
}

// Load Dashboard Page
function loadDashboardPage(pageId) {
    const content = document.getElementById('dashboard-content');
    
    // Update active sidebar link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    // Render page content
    const pages = {
        // Customer pages
        'my-profile': () => renderSimplePage('My Profile', 'fa-user', `
            <div class="info-card" style="max-width: 800px;">
                <h3>${AppState.currentUser.fullname}</h3>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-user"></i> Username:</div>
                    <div class="detail-value">${AppState.currentUser.username}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-envelope"></i> Email:</div>
                    <div class="detail-value">${AppState.currentUser.email}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-phone"></i> Phone:</div>
                    <div class="detail-value">${AppState.currentUser.phone}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-id-badge"></i> User ID:</div>
                    <div class="detail-value">${AppState.currentUser.id}</div>
                </div>
            </div>
        `),
        'my-cats': renderMyCats,
        'my-appointments': renderMyAppointments,
        'my-invoices': renderMyInvoices,
        'my-receipts': renderMyReceipts,
        'notifications': renderNotifications,
        'user-info': () => renderSimplePage('User Information', 'fa-id-card', `
            <div class="info-card" style="max-width: 800px;">
                <h3>${AppState.currentUser.fullname}</h3>
                <p><span class="badge badge-info">${AppState.currentUser.role.toUpperCase()}</span></p>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-user"></i> Username:</div>
                    <div class="detail-value">${AppState.currentUser.username}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-envelope"></i> Email:</div>
                    <div class="detail-value">${AppState.currentUser.email}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label"><i class="fas fa-phone"></i> Phone:</div>
                    <div class="detail-value">${AppState.currentUser.phone}</div>
                </div>
            </div>
        `),
        'user-management': renderUserManagement,
        'manage-appointments': renderManageAppointments,
        'approve-bookings': renderApproveBookings,
        'manage-invoices': renderManageInvoices,
        'manage-receipts': renderManageReceipts,
        'sales-reports': renderSalesReports
    };
    
    content.innerHTML = pages[pageId] ? pages[pageId]() : '<h2>Page Not Found</h2>';
}

// Simple Page Template
function renderSimplePage(title, icon, body) {
    return `
        <div class="page-header">
            <h1><i class="fas ${icon}"></i> ${title}</h1>
        </div>
        ${body}
    `;
}

// Render My Cats
function renderMyCats() {
    const myCats = AppState.cats.filter(cat => cat.ownerId === AppState.currentUser.id);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-cat"></i> My Cats</h1>
        </div>
        
        ${myCats.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-cat" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                <h3>No Cats Yet</h3>
                <p>Add your first cat to start booking appointments</p>
            </div>
        ` : `
            <div class="cats-grid">
                ${myCats.map(cat => `
                    <div class="cat-card">
                        <div class="cat-icon">
                            <i class="fas fa-cat"></i>
                        </div>
                        <h3>${cat.name}</h3>
                        <div class="cat-details">
                            <p><strong>Breed:</strong> ${cat.breed}</p>
                            <p><strong>Age:</strong> ${cat.age} years</p>
                            <p><strong>Weight:</strong> ${cat.weight} kg</p>
                            <p><strong>Hair Type:</strong> ${cat.hairType}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `}
    `;
}

// Render My Appointments
function renderMyAppointments() {
    const myAppointments = AppState.appointments.filter(apt => apt.customerId === AppState.currentUser.id);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-calendar-check"></i> My Appointments</h1>
        </div>
        
        ${myAppointments.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-calendar-alt" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                <h3>No Appointments Yet</h3>
                <p>Book your first grooming appointment for your cat</p>
            </div>
        ` : `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Cat Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Services</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myAppointments.map(apt => `
                            <tr>
                                <td>${apt.catName}</td>
                                <td>${formatDate(apt.date)}</td>
                                <td>${formatTime(apt.time)}</td>
                                <td>${apt.services.join(', ')}</td>
                                <td>${formatCurrency(apt.totalPrice)}</td>
                                <td>
                                    <span class="badge badge-${apt.status === 'confirmed' ? 'success' : 'pending'}">
                                        ${apt.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// Render My Invoices
function renderMyInvoices() {
    const myInvoices = AppState.invoices.filter(inv => inv.customerId === AppState.currentUser.id);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-file-invoice"></i> My Invoices</h1>
        </div>
        
        ${myInvoices.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-file-invoice" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                <h3>No Invoices Yet</h3>
                <p>Your invoices will appear here after booking appointments</p>
            </div>
        ` : `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myInvoices.map(inv => `
                            <tr>
                                <td>${inv.id}</td>
                                <td>${formatDate(inv.date)}</td>
                                <td>${formatCurrency(inv.amount)}</td>
                                <td>
                                    <span class="badge badge-${inv.status === 'PAID' ? 'success' : 'danger'}">
                                        ${inv.status}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// Render My Receipts
function renderMyReceipts() {
    const myReceipts = AppState.receipts.filter(rec => rec.customerId === AppState.currentUser.id);
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-receipt"></i> My Receipts</h1>
        </div>
        
        ${myReceipts.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-receipt" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                <h3>No Receipts Yet</h3>
                <p>Your payment receipts will appear here</p>
            </div>
        ` : `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Receipt ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myReceipts.map(rec => `
                            <tr>
                                <td>${rec.id}</td>
                                <td>${formatDate(rec.date)}</td>
                                <td>${formatCurrency(rec.amount)}</td>
                                <td>${rec.paymentMethod}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// Render Notifications
function renderNotifications() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-bell"></i> Notifications</h1>
        </div>
        
        <div class="notifications-list">
            ${AppState.notifications.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-bell-slash" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                    <h3>No Notifications</h3>
                    <p>You're all caught up!</p>
                </div>
            ` : AppState.notifications.map(notif => `
                <div class="notification-card ${notif.read ? 'read' : 'unread'}">
                    <div class="notif-icon ${notif.type}">
                        <i class="fas fa-${notif.type === 'success' ? 'check-circle' : notif.type === 'reminder' ? 'bell' : 'info-circle'}"></i>
                    </div>
                    <div class="notif-content">
                        <h4>${notif.title}</h4>
                        <p>${notif.message}</p>
                        <small>From: ${notif.senderName}</small>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render User Management
function renderUserManagement() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-users-cog"></i> User Management</h1>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.users.map(user => `
                        <tr>
                            <td>${user.fullname}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td><span class="badge badge-info">${user.role.toUpperCase()}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Render Manage Appointments
function renderManageAppointments() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-calendar-alt"></i> Manage Appointments</h1>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Cat Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.appointments.map(apt => {
                        const customer = AppState.users.find(u => u.id === apt.customerId);
                        return `
                            <tr>
                                <td>${customer ? customer.fullname : 'Unknown'}</td>
                                <td>${apt.catName}</td>
                                <td>${formatDate(apt.date)}</td>
                                <td>${formatTime(apt.time)}</td>
                                <td>${formatCurrency(apt.totalPrice)}</td>
                                <td>
                                    <span class="badge badge-${apt.status === 'confirmed' ? 'success' : 'pending'}">
                                        ${apt.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Render Approve Bookings
function renderApproveBookings() {
    const pendingBookings = AppState.appointments.filter(apt => apt.status === 'pending');
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-check-circle"></i> Approve Pending Bookings</h1>
        </div>
        
        ${pendingBookings.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--gray-200); margin-bottom: 1rem;"></i>
                <h3>No Pending Bookings</h3>
                <p>All bookings have been processed</p>
            </div>
        ` : `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Cat Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pendingBookings.map(apt => {
                            const customer = AppState.users.find(u => u.id === apt.customerId);
                            return `
                                <tr>
                                    <td>${customer ? customer.fullname : 'Unknown'}</td>
                                    <td>${apt.catName}</td>
                                    <td>${formatDate(apt.date)}</td>
                                    <td>${formatTime(apt.time)}</td>
                                    <td>${formatCurrency(apt.totalPrice)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// Render Manage Invoices
function renderManageInvoices() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-file-invoice-dollar"></i> Manage Invoices</h1>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.invoices.map(inv => {
                        const customer = AppState.users.find(u => u.id === inv.customerId);
                        return `
                            <tr>
                                <td>${inv.id}</td>
                                <td>${customer ? customer.fullname : 'Unknown'}</td>
                                <td>${formatDate(inv.date)}</td>
                                <td>${formatCurrency(inv.amount)}</td>
                                <td>
                                    <span class="badge badge-${inv.status === 'PAID' ? 'success' : 'danger'}">
                                        ${inv.status}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Render Manage Receipts
function renderManageReceipts() {
    return `
        <div class="page-header">
            <h1><i class="fas fa-receipt"></i> Manage Receipts</h1>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Receipt ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    ${AppState.receipts.map(rec => {
                        const customer = AppState.users.find(u => u.id === rec.customerId);
                        return `
                            <tr>
                                <td>${rec.id}</td>
                                <td>${customer ? customer.fullname : 'Unknown'}</td>
                                <td>${formatDate(rec.date)}</td>
                                <td>${formatCurrency(rec.amount)}</td>
                                <td>${rec.paymentMethod}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Render Sales Reports
function renderSalesReports() {
    const totalRevenue = AppState.receipts.reduce((sum, rec) => sum + rec.amount, 0);
    const paidInvoices = AppState.invoices.filter(inv => inv.status === 'PAID').length;
    const unpaidInvoices = AppState.invoices.filter(inv => inv.status === 'UNPAID').length;
    const totalAppointments = AppState.appointments.length;
    
    return `
        <div class="page-header">
            <h1><i class="fas fa-chart-line"></i> Sales Reports</h1>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: #D1FAE5; color: #065F46;">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-info">
                    <h3>${formatCurrency(totalRevenue)}</h3>
                    <p>Total Revenue</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #DBEAFE; color: #1E40AF;">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-info">
                    <h3>${totalAppointments}</h3>
                    <p>Total Appointments</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #D1FAE5; color: #065F46;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h3>${paidInvoices}</h3>
                    <p>Paid Invoices</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #FEE2E2; color: #991B1B;">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="stat-info">
                    <h3>${unpaidInvoices}</h3>
                    <p>Unpaid Invoices</p>
                </div>
            </div>
        </div>
    `;
}

// Event Listeners
function attachEventListeners() {
    document.addEventListener('click', (e) => {
        // Navigation links
        if (e.target.classList.contains('nav-link') && e.target.dataset.page) {
            loadPage(e.target.dataset.page);
        }
        
        // Login button
        if (e.target.id === 'header-login-btn' || e.target.id === 'hero-book-btn') {
            document.getElementById('login-modal').classList.add('active');
        }
        
        // Close modals
        if (e.target.id === 'close-login') {
            document.getElementById('login-modal').classList.remove('active');
        }
        if (e.target.id === 'close-register') {
            document.getElementById('register-modal').classList.remove('active');
        }
        
        // Show register from login
        if (e.target.id === 'show-register') {
            document.getElementById('login-modal').classList.remove('active');
            document.getElementById('register-modal').classList.add('active');
        }
        
        // Show login from register
        if (e.target.id === 'show-login') {
            document.getElementById('register-modal').classList.remove('active');
            document.getElementById('login-modal').classList.add('active');
        }
        
        // Sidebar navigation
        if (e.target.closest('.sidebar-link')) {
            const page = e.target.closest('.sidebar-link').dataset.page;
            loadDashboardPage(page);
        }
        
        // Logout
        if (e.target.id === 'logout-btn' || e.target.closest('#logout-btn')) {
            handleLogout();
        }
        
        // Close modal on background click
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Forms
    document.addEventListener('submit', (e) => {
        // Login form
        if (e.target.id === 'login-form') {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            if (handleLogin(username, password)) {
                document.getElementById('login-modal').classList.remove('active');
            }
        }
        
        // Register form
        if (e.target.id === 'register-form') {
            e.preventDefault();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            const formData = {
                fullname: document.getElementById('register-fullname').value,
                username: document.getElementById('register-username').value,
                phone: document.getElementById('register-phone').value,
                email: document.getElementById('register-email').value,
                password: password
            };
            
            if (handleRegister(formData)) {
                document.getElementById('register-modal').classList.remove('active');
                document.getElementById('login-modal').classList.add('active');
                e.target.reset();
            }
        }
        
        // Feedback form
        if (e.target.id === 'feedback-form') {
            e.preventDefault();
            showToast('Thank you for your feedback!', 'success');
            e.target.reset();
        }
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
