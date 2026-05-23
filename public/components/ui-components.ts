/**
 * MIFL General UI Components (TypeScript)
 */

class UINavbar extends HTMLElement {
    connectedCallback(): void {
        const title = this.getAttribute('title') || 'MIFL';
        this.innerHTML = `
            <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-8">
                    <h1 id="navTitle" class="text-2xl font-bold text-blue-600 cursor-pointer">${title}</h1>
                    <div id="navLinks" class="hidden md:flex space-x-4">
                        <!-- Links injected here -->
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <span id="userName" class="text-gray-700 font-medium">Loading...</span>
                    <button id="logoutBtn" class="text-red-500 hover:text-red-700 transition">
                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>
            </nav>
        `;
        
        // Securely attach the redirect listener for CSP compliance
        this.querySelector('#navTitle')?.addEventListener('click', () => window.location.href = '/');
    }

    static renderLinks(role: string): void {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks) return;

        const links: Record<string, { label: string, href: string }[]> = {
            admin: [
                { label: 'Dashboard', href: '/protected/index.html' },
                { label: 'Students', href: '/protected/admin/students.html' },
                { label: 'Teachers', href: '/protected/admin/teachers.html' },
                { label: 'Classes', href: '/protected/admin/classes.html' },
                { label: 'Batches', href: '/protected/admin/batches.html' },
                { label: 'Courses', href: '/protected/admin/courses.html' },
                { label: 'Time Tracking', href: '/protected/admin/teacher-time.html' },
                { label: 'Staff Attendance', href: '/protected/admin/teacher-attendance.html' },
                { label: 'Student Attendance', href: '/protected/admin/student-attendance.html' },
                { label: 'Pending Fees', href: '/protected/admin/fees.html' }
            ],
            teacher: [
                { label: 'Dashboard', href: '/protected/index.html' },
                { label: 'Attendance', href: '/protected/teacher/attendance.html' },
                { label: 'Assignments', href: '/protected/teacher/assignments.html' },
                { label: 'Curriculum', href: '/protected/teacher/curriculum.html' },
                { label: 'Results', href: '/protected/teacher/results.html' },
                { label: 'Stopwatch', href: '/protected/teacher/stopwatch.html' },
                { label: 'Student Reviews', href: '/protected/teacher/reviews.html' },
                { label: 'Inventory', href: '/protected/staff/index.html' }
            ],
            student: [
                { label: 'Dashboard', href: '/protected/index.html' },
                { label: 'Registration & Attendance', href: '/protected/student/registration-attendance.html' },
                { label: 'Fee Vouchers', href: '/protected/student/vouchers.html' },
                { label: 'My Results', href: '/protected/student/results.html' },
                { label: 'My Details', href: '/protected/student/details.html' },
                { label: 'Assignments', href: '/protected/student/assignments.html' },
                { label: 'Quizzes', href: '/protected/student/quizzes.html' },
                { label: 'Course Files', href: '/protected/student/course-files.html' }
            ],
            parent: [
                { label: 'Dashboard', href: '/protected/index.html' },
                { label: 'My Children', href: '/protected/parent/index.html' },
                { label: 'Academic Results', href: '/protected/parent/results.html' },
                { label: 'Attendance', href: '/protected/parent/attendance.html' },
                { label: 'Fees & Payments', href: '/protected/parent/fees.html' },
                { label: 'Notice Board', href: '/protected/parent/notices.html' },
                { label: 'Messages', href: '/protected/parent/messages.html' }
            ]
        };

        const roleLinks = links[role] || [];
        navLinks.innerHTML = roleLinks.map(link => `
            <a href="${link.href}" class="text-gray-600 hover:text-blue-600 font-medium transition px-2 py-1 rounded hover:bg-gray-50">${link.label}</a>
        `).join('');
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
            <div class="flex flex-col items-center justify-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p class="mt-4 text-gray-600 font-medium">${text}</p>
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
 * Socket.IO Initialization
 */
let socket: any = null;

export const initSocket = async (user: any) => {
    if (socket) return socket;

    // Dynamically load Socket.IO client if not already present
    if (typeof (window as any).io === 'undefined') {
        console.log('[Socket] Loading Socket.IO client script...');
        await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/socket.io/socket.io.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Socket.IO script'));
            document.head.appendChild(script);
        });
    }

    const io = (window as any).io;
    socket = io();

    // Join personal room
    if (user._id) {
        socket.emit('join', user._id);
        console.log(`[Socket] Joined personal room: ${user._id}`);
    }
    
    // Join role room
    if (user.role) {
        socket.emit('joinRole', user.role);
        console.log(`[Socket] Joined role room: ${user.role}`);
    }

    // Join class room if applicable
    if (user.currentClass) {
        const classId = typeof user.currentClass === 'object' ? user.currentClass._id : user.currentClass;
        socket.emit('joinClass', classId);
        console.log(`[Socket] Joined class room: ${classId}`);
    }

    // Listeners
    socket.on('notification', (data: any) => {
        showToast(data.message, 'info');
    });

    socket.on('receiveMessage', (message: any) => {
        showToast('New message received!', 'info');
        // Dispatch a custom event in case a specific view (like chat) needs to update its UI
        document.dispatchEvent(new CustomEvent('newMessage', { detail: message }));
    });

    return socket;
};

(window as any).initSocket = initSocket;
