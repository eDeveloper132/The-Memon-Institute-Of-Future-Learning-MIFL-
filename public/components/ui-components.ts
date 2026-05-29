/**
 * MIFL General UI Components (TypeScript)
 */

class UINavbar extends HTMLElement {
    private mobileMenuOpen = false;

    connectedCallback(): void {
        const title = this.getAttribute('title') || 'MIFL';
        this.innerHTML = `
            <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-[1000]">
                <div class="flex items-center space-x-8">
                    <h1 id="navTitle" class="text-2xl font-bold text-blue-600 cursor-pointer whitespace-nowrap">${title}</h1>
                    <!-- Desktop Links -->
                    <div id="navLinks" class="hidden lg:flex space-x-1 xl:space-x-2">
                        <!-- Links injected here -->
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <!-- Connection Status -->
                    <div id="connectionStatus" class="w-2.5 h-2.5 rounded-full bg-gray-300 transition-colors duration-500" title="Checking connection..."></div>

                    <div class="hidden sm:flex flex-col text-right mr-2">
                        <span id="userName" class="text-gray-900 font-bold text-sm leading-none">Loading...</span>
                        <span id="userRoleBadge" class="text-[10px] text-blue-500 font-black uppercase tracking-tighter mt-1">...</span>
                    </div>
                    
                    <button id="logoutBtn" class="hidden sm:flex text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-xl">
                        <i class="fa-solid fa-power-off text-lg"></i>
                    </button>

                    <!-- Mobile Menu Toggle -->
                    <button id="mobileMenuToggle" class="lg:hidden text-gray-600 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-xl active:scale-95">
                        <i class="fa-solid fa-bars-staggered text-2xl"></i>
                    </button>
                </div>
            </nav>

            <!-- Mobile Slide-over Menu -->
            <div id="mobileMenuOverlay" class="fixed inset-0 bg-black/50 z-[2000] hidden transition-opacity duration-300 opacity-0"></div>
            <div id="mobileSidebar" class="fixed inset-y-0 left-0 w-80 bg-white z-[2001] transform -translate-x-full transition-transform duration-300 ease-out shadow-2xl flex flex-col">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-blue-600">${title}</h2>
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Navigation Menu</p>
                    </div>
                    <button id="closeMobileMenu" class="text-gray-400 hover:text-gray-600 p-2 text-2xl">&times;</button>
                </div>
                
                <!-- Mobile User Info -->
                <div class="p-6 bg-gray-50 flex items-center gap-4 sm:hidden">
                    <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <p id="mobileUserName" class="font-bold text-gray-900 leading-none">Loading...</p>
                        <p id="mobileUserRole" class="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">...</p>
                    </div>
                </div>

                <div id="mobileNavLinks" class="flex-1 overflow-y-auto p-4 space-y-1">
                    <!-- Mobile links injected here -->
                </div>

                <div class="p-4 border-t border-gray-100 space-y-3">
                    <button id="mobileLogoutBtn" class="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition active:scale-95">
                        <i class="fa-solid fa-power-off"></i> Sign Out
                    </button>
                    <p class="text-[10px] text-gray-300 text-center font-medium">MIFL Education System v1.0</p>
                </div>
            </div>
        `;
        
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.querySelector('#navTitle')?.addEventListener('click', () => window.location.href = '/');
        
        const toggleBtn = this.querySelector('#mobileMenuToggle');
        const closeBtn = this.querySelector('#closeMobileMenu');
        const overlay = this.querySelector('#mobileMenuOverlay');
        const logoutBtn = this.querySelector('#logoutBtn');
        const mobileLogoutBtn = this.querySelector('#mobileLogoutBtn');

        const toggleMenu = (open: boolean) => {
            const sidebar = this.querySelector('#mobileSidebar');
            const overlay = this.querySelector('#mobileMenuOverlay');
            if (!sidebar || !overlay) return;

            if (open) {
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
                sidebar.classList.remove('-translate-x-full');
            } else {
                overlay.classList.remove('opacity-100');
                sidebar.classList.add('-translate-x-full');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            }
            this.mobileMenuOpen = open;
        };

        toggleBtn?.addEventListener('click', () => toggleMenu(true));
        closeBtn?.addEventListener('click', () => toggleMenu(false));
        overlay?.addEventListener('click', () => toggleMenu(false));

        const handleLogout = async () => {
            try {
                const res = await fetch('/api/auth/logout', { method: 'POST' });
                if (res.ok) window.location.href = '/api/auth/login';
            } catch (err) {
                console.error('Logout failed', err);
            }
        };

        logoutBtn?.addEventListener('click', handleLogout);
        mobileLogoutBtn?.addEventListener('click', handleLogout);
    }

    renderLinks(role: string): void {
        const navLinks = this.querySelector('#navLinks');
        const mobileNavLinks = this.querySelector('#mobileNavLinks');
        const userRoleBadge = this.querySelector('#userRoleBadge');
        const mobileUserRole = this.querySelector('#mobileUserRole');
        
        if (userRoleBadge) userRoleBadge.textContent = role;
        if (mobileUserRole) mobileUserRole.textContent = role;

        if (!navLinks && !mobileNavLinks) return;

        const links: Record<string, { label: string, href: string, icon: string }[]> = {
            admin: [
                { label: 'Dashboard', href: '/protected/admin/index.html', icon: 'fa-chart-pie' },
                { label: 'Students', href: '/protected/admin/students.html', icon: 'fa-users' },
                { label: 'Parents', href: '/protected/admin/parents.html', icon: 'fa-children' },
                { label: 'Teachers', href: '/protected/admin/teachers.html', icon: 'fa-chalkboard-user' },
                { label: 'Departments', href: '/protected/admin/departments.html', icon: 'fa-sitemap' },
                { label: 'Classes', href: '/protected/admin/classes.html', icon: 'fa-school' },
                { label: 'Courses', href: '/protected/admin/courses.html', icon: 'fa-book' },
                { label: 'Staff Attendance', href: '/protected/admin/teacher-attendance.html', icon: 'fa-user-clock' },
                { label: 'Student Attendance', href: '/protected/admin/student-attendance.html', icon: 'fa-calendar-check' },
                { label: 'Fees', href: '/protected/admin/fees.html', icon: 'fa-file-invoice-dollar' },
                { label: 'Messages', href: '/protected/messages.html', icon: 'fa-comments' }
            ],
            teacher: [
                { label: 'Dashboard', href: '/protected/index.html', icon: 'fa-house' },
                { label: 'Attendance', href: '/protected/teacher/attendance.html', icon: 'fa-calendar-day' },
                { label: 'Assignments', href: '/protected/teacher/assignments.html', icon: 'fa-clipboard-list' },
                { label: 'Curriculum', href: '/protected/teacher/curriculum.html', icon: 'fa-layer-group' },
                { label: 'Results', href: '/protected/teacher/results.html', icon: 'fa-square-poll-vertical' },
                { label: 'Stopwatch', href: '/protected/teacher/stopwatch.html', icon: 'fa-stopwatch' },
                { label: 'Reviews', href: '/protected/teacher/reviews.html', icon: 'fa-star' },
                { label: 'Inventory', href: '/protected/staff/index.html', icon: 'fa-boxes-stacked' }
            ],
            student: [
                { label: 'Dashboard', href: '/protected/index.html', icon: 'fa-house' },
                { label: 'Attendance', href: '/protected/student/registration-attendance.html', icon: 'fa-user-check' },
                { label: 'Fees', href: '/protected/student/vouchers.html', icon: 'fa-money-bill-wave' },
                { label: 'Results', href: '/protected/student/results.html', icon: 'fa-graduation-cap' },
                { label: 'Profile', href: '/protected/student/details.html', icon: 'fa-user-gear' },
                { label: 'Assignments', href: '/protected/student/assignments.html', icon: 'fa-file-lines' },
                { label: 'Quizzes', href: '/protected/student/quizzes.html', icon: 'fa-bolt' },
                { label: 'Resources', href: '/protected/student/course-files.html', icon: 'fa-folder-open' },
                { label: 'Messages', href: '/protected/messages.html', icon: 'fa-comments' }
            ],
            parent: [
                { label: 'Dashboard', href: '/protected/index.html', icon: 'fa-house' },
                { label: 'Children', href: '/protected/parent/index.html', icon: 'fa-children' },
                { label: 'Results', href: '/protected/parent/results.html', icon: 'fa-award' },
                { label: 'Attendance', href: '/protected/parent/attendance.html', icon: 'fa-clock-rotate-left' },
                { label: 'Payments', href: '/protected/parent/fees.html', icon: 'fa-credit-card' },
                { label: 'Notice Board', href: '/protected/parent/notices.html', icon: 'fa-bullhorn' },
                { label: 'Messages', href: '/protected/messages.html', icon: 'fa-comments' }
            ]
        };

        const roleLinks = links[role] || [];
        const currentPath = window.location.pathname;

        if (navLinks) {
            navLinks.innerHTML = roleLinks.map(link => {
                const active = currentPath.includes(link.href);
                return `
                    <a href="${link.href}" class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 
                        ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}">
                        <i class="fa-solid ${link.icon} text-xs opacity-70"></i>
                        <span>${link.label}</span>
                    </a>
                `;
            }).join('');
        }

        if (mobileNavLinks) {
            mobileNavLinks.innerHTML = roleLinks.map(link => {
                const active = currentPath.includes(link.href);
                return `
                    <a href="${link.href}" class="flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-bold transition-all
                        ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}">
                        <div class="w-8 flex justify-center">
                            <i class="fa-solid ${link.icon} text-xl"></i>
                        </div>
                        <span>${link.label}</span>
                    </a>
                `;
            }).join('');
        }
    }
}

class UICard extends HTMLElement {
    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'value' && oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback(): void {
        this.render();
    }

    render(): void {
        const title = this.getAttribute('title') || '';
        const value = this.getAttribute('value') || '';
        const color = this.getAttribute('color') || 'blue';
        
        const borderColors: Record<string, string> = {
            blue: 'border-blue-500',
            green: 'border-green-500',
            purple: 'border-purple-500',
            orange: 'border-orange-500',
            red: 'border-red-500',
            indigo: 'border-indigo-500',
            pink: 'border-pink-500',
            yellow: 'border-yellow-500'
        };

        this.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColors[color] || 'border-blue-500'} h-full transition transform hover:scale-[1.02]">
                <h3 class="text-lg font-bold text-gray-700">${title}</h3>
                <p class="text-3xl font-bold mt-2 text-gray-900">${value}</p>
            </div>
        `;
    }
}

class UISpinner extends HTMLElement {
    connectedCallback(): void {
        const text = this.getAttribute('text') || 'Loading...';
        this.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 w-full">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
                <p class="mt-4 text-gray-400 font-bold text-sm tracking-widest uppercase">${text}</p>
            </div>
        `;
    }
}

if (!customElements.get('ui-navbar')) customElements.define('ui-navbar', UINavbar);
if (!customElements.get('ui-card')) customElements.define('ui-card', UICard);
if (!customElements.get('ui-spinner')) customElements.define('ui-spinner', UISpinner);

/**
 * Toast Notification System
 */
class UIToastContainer extends HTMLElement {
    connectedCallback() {
        this.className = "fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none";
        this.id = "toast-container";
    }
}

if (!customElements.get('ui-toast-container')) customElements.define('ui-toast-container', UIToastContainer);

// Ensure container exists
if (!document.getElementById('toast-container')) {
    document.body.appendChild(document.createElement('ui-toast-container'));
}

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };

    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-2xl transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-auto flex items-center min-w-[300px]`;
    
    const icon = type === 'success' ? 'circle-check' : type === 'error' ? 'circle-xmark' : 'circle-info';
    
    toast.innerHTML = `
        <i class="fa-solid fa-${icon} mr-3 text-lg"></i>
        <span class="flex-1 font-medium">${message}</span>
        <button class="ml-4 hover:opacity-70">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    const remove = () => {
        toast.classList.add('opacity-0', 'translate-x-10');
        setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('button')?.addEventListener('click', remove);
    setTimeout(remove, 5000);
};

// Make it globally accessible for non-module scripts if needed
(window as any).showToast = showToast;

/**
 * Socket.IO Initialization & Polling Fallback
 */
let socket: any = null;
let syncInterval: any = null;
let lastSyncTimestamp: string = new Date().toISOString();

export const initSocket = async (user: any) => {
    if (socket && socket.connected) return socket;

    console.log('[Socket] Initializing real-time connection...');

    // 1. Try Socket.IO First
    if (typeof (window as any).io === 'undefined') {
        await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.socket.io/4.8.3/socket.io.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Socket.IO script'));
            document.head.appendChild(script);
        });
    }

    const io = (window as any).io;
    
    // Configure socket with a timeout for connection
    socket = io({
        reconnectionAttempts: 2,
        timeout: 3000,
        transports: ['websocket', 'polling']
    });

    const indicator = document.getElementById('connectionStatus');
    const updateStatus = (mode: 'socket' | 'polling' | 'disconnected') => {
        if (!indicator) return;
        indicator.style.display = 'block';
        if (mode === 'socket') {
            indicator.style.backgroundColor = '#22c55e'; // green
            indicator.title = 'Real-time: Connected (Socket.IO)';
        } else if (mode === 'polling') {
            indicator.style.backgroundColor = '#eab308'; // yellow
            indicator.title = 'Real-time: Connected (Polling Fallback)';
        } else {
            indicator.style.backgroundColor = '#ef4444'; // red
            indicator.title = 'Real-time: Disconnected';
        }
    };

    // Helper for REST fallback sending
    const sendViaRest = async (data: any) => {
        console.log('[Sync Fallback] Attempting to send message via REST...', data);
        try {
            const res = await fetch('/api/chat/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender: data.sender,
                    receiver: data.receiver,
                    groupId: data.groupId,
                    content: data.content,
                    attachments: data.attachments || []
                })
            });
            if (res.ok) {
                const { message } = await res.json();
                console.log('[Sync Fallback] Message sent successfully via REST:', message._id);
                // Dispatch locally so the sender sees their own message immediately
                document.dispatchEvent(new CustomEvent('newMessage', { detail: message }));
                return true;
            } else {
                const err = await res.json();
                console.error('[Sync Fallback] API error:', err);
                showToast(err.message || 'Failed to send message', 'error');
            }
        } catch (e) {
            console.error('[Sync Fallback] REST network error:', e);
            showToast('Connection error, try again.', 'error');
        }
        return false;
    };

    // Socket Success
    socket.on('connect', () => {
        console.log('[Socket] Connected successfully');
        updateStatus('socket');
        if (syncInterval) {
            clearTimeout(syncInterval);
            syncInterval = null;
        }
        
        if (user._id) socket.emit('join', user._id);
        if (user.role) socket.emit('joinRole', user.role);
    });

    // Socket Failure - Trigger Polling Fallback
    socket.on('connect_error', (err: any) => {
        if (!syncInterval) {
            console.warn('[Socket] Connection failed, switching to Polling Fallback:', err.message);
            
            // Stop socket retries to clean up console
            socket.close();
            socket.connected = false;

            // Override emit for this instance
            socket.emit = (event: string, data: any) => {
                if (event === 'sendMessage') {
                    sendViaRest(data);
                } else if (event !== 'typing' && event !== 'stopTyping' && event !== 'messagesRead') {
                    console.log(`[Sync Fallback] Event "${event}" ignored.`);
                }
            };

            startPollingFallback(user, updateStatus);
        }
    });

    socket.on('disconnect', () => {
        console.warn('[Socket] Disconnected');
        updateStatus('disconnected');
    });

    // Unified Event Listeners (Same for Sockets and Polling)
    socket.on('notification', (data: any) => showToast(data.message, 'info'));
    socket.on('receiveMessage', (message: any) => {
        showToast('New message received!', 'info');
        document.dispatchEvent(new CustomEvent('newMessage', { detail: message }));
    });

    return socket;
};

const startPollingFallback = (user: any, updateStatus: Function) => {
    if (syncInterval) return; // Already polling
    
    updateStatus('polling');
    console.log('[Sync] Polling engine started');

    const sync = async () => {
        try {
            const res = await fetch(`/api/chat/sync?since=${lastSyncTimestamp}`);
            if (res.ok) {
                const data = await res.json();
                lastSyncTimestamp = data.timestamp;
                
                // Dispatch messages
                if (data.newMessages && data.newMessages.length > 0) {
                    data.newMessages.forEach((msg: any) => {
                        document.dispatchEvent(new CustomEvent('newMessage', { detail: msg }));
                        // Also trigger a toast if not on the messages page
                        if (!window.location.pathname.includes('messages.html')) {
                            showToast(`New message from ${msg.sender.name}`, 'info');
                        }
                    });
                }
            }
        } catch (err) {
            console.error('[Sync] Polling error:', err);
        } finally {
            // Schedule next sync
            syncInterval = setTimeout(sync, 5000);
        }
    };

    // Start the first sync
    syncInterval = setTimeout(sync, 1000);
};

(window as any).initSocket = initSocket;

