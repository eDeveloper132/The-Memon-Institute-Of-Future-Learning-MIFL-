/**
 * MIFL General UI Components (TypeScript)
 */

class UINavbar extends HTMLElement {
    private mobileMenuOpen = false;
    private _userData: any = null;
    private _rendered = false;

    set userData(value: any) {
        this._userData = value;
        if (this._rendered && value) {
            this.renderLinks(value);
            this.loadNotifications();
        }
    }

    get userData() {
        return this._userData;
    }

    connectedCallback(): void {
        const title = this.getAttribute('title') || 'MIFL';
        this.innerHTML = `
            <nav class="bg-white shadow-md sticky top-0 z-[1000]">
                <div class="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    <div class="flex items-center space-x-4 xl:space-x-8">
                        <h1 id="navTitle" class="text-xl xl:text-2xl font-bold text-blue-600 cursor-pointer whitespace-nowrap">${title}</h1>
                        <!-- Desktop Links -->
                        <div id="navLinks" class="hidden xl:flex space-x-1">
                            <!-- Links injected here -->
                        </div>
                    </div>

                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <!-- Connection Status -->
                        <div id="connectionStatus" class="w-2.5 h-2.5 rounded-full bg-gray-300 transition-colors duration-500" title="Checking connection..."></div>

                        <!-- Notification Bell -->
                        <div class="relative">
                            <button id="notificationBellBtn" class="text-gray-400 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-xl relative">
                                <i class="fa-solid fa-bell text-lg"></i>
                                <span id="notificationBadge" class="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center hidden">0</span>
                            </button>
                            <!-- Dropdown -->
                            <div id="notificationDropdown" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 hidden z-[1001] max-h-96 flex-col">
                                <div class="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                                    <h3 class="font-bold text-gray-700 text-sm">Notifications</h3>
                                    <button id="markAllReadBtn" class="text-xs text-blue-600 hover:underline">Mark all read</button>
                                </div>
                                <div id="notificationList" class="overflow-y-auto flex-1 p-2 space-y-1">
                                    <div class="text-center text-sm text-gray-500 py-4 italic">Loading...</div>
                                </div>
                            </div>
                        </div>

                        <!-- User Profile Area -->
                        <div id="profileTrigger" class="flex items-center gap-3 px-3 py-1.5 rounded-2xl hover:bg-gray-50 cursor-pointer transition active:scale-95 group">
                            <div class="hidden md:flex flex-col text-right">
                                <span id="userName" class="text-gray-900 font-bold text-sm leading-none truncate max-w-[120px]">Loading...</span>
                                <span id="userRoleBadge" class="text-[10px] text-blue-500 font-black uppercase tracking-tighter mt-1">...</span>
                            </div>
                            <div class="w-10 h-10 rounded-xl bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                                <img id="navAvatar" src="" alt="User" class="w-full h-full object-cover hidden">
                                <i id="navAvatarPlaceholder" class="fa-solid fa-user text-blue-400"></i>
                            </div>
                        </div>
                        
                        <button id="logoutBtn" class="hidden sm:flex text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-xl">
                            <i class="fa-solid fa-power-off text-lg"></i>
                        </button>

                        <!-- Mobile Menu Toggle -->
                        <button id="mobileMenuToggle" class="xl:hidden text-gray-600 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-xl active:scale-95">
                            <i class="fa-solid fa-bars-staggered text-2xl"></i>
                        </button>
                    </div>
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
        
        this._rendered = true;
        this.setupEventListeners();
        if (this._userData) {
            this.renderLinks(this._userData);
            this.loadNotifications();
        }
    }

    private setupEventListeners(): void {
        this.querySelector('#navTitle')?.addEventListener('click', () => window.location.href = '/');
        
        const toggleBtn = this.querySelector('#mobileMenuToggle');
        const closeBtn = this.querySelector('#closeMobileMenu');
        const overlay = this.querySelector('#mobileMenuOverlay');
        const logoutBtn = this.querySelector('#logoutBtn');
        const mobileLogoutBtn = this.querySelector('#mobileLogoutBtn');
        const notificationBellBtn = this.querySelector('#notificationBellBtn');
        const notificationDropdown = this.querySelector('#notificationDropdown');
        const markAllReadBtn = this.querySelector('#markAllReadBtn');

        // Toggle Notification Dropdown
        notificationBellBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown?.classList.toggle('hidden');
            notificationDropdown?.classList.toggle('flex');
            if (!notificationDropdown?.classList.contains('hidden')) {
                this.loadNotifications();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationDropdown?.classList.contains('hidden') && !this.contains(e.target as Node)) {
                notificationDropdown?.classList.add('hidden');
                notificationDropdown?.classList.remove('flex');
            }
        });

        markAllReadBtn?.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                const res = await fetch('/api/notifications/read-all', { method: 'PATCH' });
                if (res.ok) {
                    this.loadNotifications();
                    const badge = this.querySelector('#notificationBadge');
                    if (badge) badge.classList.add('hidden');
                }
            } catch (err) {
                console.error('Failed to mark all read', err);
            }
        });

        // Listen for real-time notifications
        document.addEventListener('newNotification', () => {
            this.loadNotifications();
        });

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

        // Profile Modal Trigger
        this.querySelector('#profileTrigger')?.addEventListener('click', () => {
            this.renderProfileModal();
        });
    }

    private async renderProfileModal() {
        // Ensure we have fresh user data
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                this._userData = data.user;
            }
        } catch (err) {
            console.error('Failed to refresh user data', err);
        }

        const user = this._userData;
        const modalId = 'profileModal';
        
        // Remove existing modal if any
        document.getElementById(modalId)?.remove();

        const modalHtml = `
            <div id="${modalId}" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-300 flex flex-col max-h-[90vh]">
                    <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h3 class="text-xl font-black text-gray-900 tracking-tight">Update Profile</h3>
                            <p class="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-0.5">User Settings & Preferences</p>
                        </div>
                        <button id="closeProfileModal" class="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-500 text-gray-400 transition flex items-center justify-center text-2xl font-bold">&times;</button>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto p-8 space-y-8">
                        <!-- Avatar Section -->
                        <div class="flex flex-col items-center gap-6">
                            <div class="relative group">
                                <div class="w-32 h-32 rounded-[2.5rem] bg-blue-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center group-hover:shadow-blue-200 transition-all duration-500">
                                    <img id="modalAvatar" src="${user.profilePicture || ''}" class="w-full h-full object-cover ${user.profilePicture ? '' : 'hidden'}">
                                    <i id="modalAvatarPlaceholder" class="fa-solid fa-user text-4xl text-blue-200 ${user.profilePicture ? 'hidden' : ''}"></i>
                                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <i class="fa-solid fa-camera text-white text-2xl"></i>
                                    </div>
                                    <input type="file" id="avatarInput" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*">
                                </div>
                                <div id="avatarLoading" class="absolute inset-0 bg-white/80 rounded-[2.5rem] flex items-center justify-center hidden">
                                    <i class="fa-solid fa-circle-notch fa-spin text-blue-600 text-2xl"></i>
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button id="changeAvatarBtn" class="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition">Change Photo</button>
                                ${user.profilePicture ? `<button id="removeAvatarBtn" class="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-xl transition">Remove</button>` : ''}
                            </div>
                        </div>

                        <!-- Info Form -->
                        <form id="profileForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                <input type="text" name="name" value="${user.name || ''}" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold" required>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                                <input type="text" name="phoneNumber" value="${user.phoneNumber || ''}" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold" required>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address (Read-only)</label>
                                <input type="email" value="${user.email || ''}" class="w-full px-5 py-3.5 bg-gray-100 border border-gray-100 rounded-2xl text-gray-400 font-bold outline-none cursor-not-allowed" disabled>
                            </div>

                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Address</label>
                                <textarea name="address" rows="2" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold resize-none">${user.address || ''}</textarea>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Date of Birth</label>
                                <input type="date" name="dateOfBirth" value="${user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''}" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold">
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Gender</label>
                                <select name="gender" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold">
                                    <option value="">Select Gender</option>
                                    <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                                    <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
                                    <option value="other" ${user.gender === 'other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>

                            <!-- Role Specific Fields -->
                            ${user.role === 'teacher' ? `
                                <div class="md:col-span-2">
                                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Qualifications (Comma separated)</label>
                                    <input type="text" name="qualification" value="${(user.qualification || []).join(', ')}" class="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition font-bold" placeholder="e.g. M.Phil, PhD">
                                </div>
                            ` : ''}

                            ${user.role === 'student' ? `
                                <div class="md:col-span-2 bg-gray-50 p-6 rounded-[2rem] space-y-4">
                                    <h4 class="text-xs font-black text-gray-900 uppercase tracking-widest">Emergency Contact</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Contact Name</label>
                                            <input type="text" name="emergencyContact_name" value="${user.emergencyContact?.name || ''}" class="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-sm">
                                        </div>
                                        <div>
                                            <label class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Contact Phone</label>
                                            <input type="text" name="emergencyContact_phoneNumber" value="${user.emergencyContact?.phoneNumber || ''}" class="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-sm">
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </form>
                    </div>

                    <div class="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                        <button id="cancelProfileBtn" class="flex-1 py-4 rounded-2xl bg-white border border-gray-100 text-gray-600 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition active:scale-95">Cancel</button>
                        <button id="saveProfileBtn" class="flex-[2] py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95">Save Changes</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById(modalId)!;
        const modalContent = modal.querySelector('div')!;

        // Animate in
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
        }, 10);

        // Listeners
        const close = () => {
            modal.classList.add('opacity-0');
            modalContent.classList.add('scale-95');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('#closeProfileModal')?.addEventListener('click', close);
        modal.querySelector('#cancelProfileBtn')?.addEventListener('click', close);

        // Avatar Upload
        const avatarInput = modal.querySelector('#avatarInput') as HTMLInputElement;
        const modalAvatar = modal.querySelector('#modalAvatar') as HTMLImageElement;
        const modalPlaceholder = modal.querySelector('#modalAvatarPlaceholder') as HTMLElement;
        const avatarLoading = modal.querySelector('#avatarLoading') as HTMLElement;

        const handleAvatarUpload = async (file: File) => {
            avatarLoading.classList.remove('hidden');
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/auth/profile/avatar', {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    const data = await res.json();
                    modalAvatar.src = data.profilePicture;
                    modalAvatar.classList.remove('hidden');
                    modalPlaceholder.classList.add('hidden');
                    
                    // Update Navbar Immediately
                    const navAvatar = this.querySelector('#navAvatar') as HTMLImageElement;
                    const navPlaceholder = this.querySelector('#navAvatarPlaceholder') as HTMLElement;
                    if (navAvatar) {
                        navAvatar.src = data.profilePicture;
                        navAvatar.classList.remove('hidden');
                        navPlaceholder.classList.add('hidden');
                    }
                    (window as any).showToast('Profile picture updated!');
                } else {
                    throw new Error('Upload failed');
                }
            } catch (err) {
                (window as any).showToast('Failed to upload image', 'error');
            } finally {
                avatarLoading.classList.add('hidden');
            }
        };

        avatarInput?.addEventListener('change', (e: any) => {
            const file = e.target.files[0];
            if (file) handleAvatarUpload(file);
        });

        modal.querySelector('#removeAvatarBtn')?.addEventListener('click', async () => {
            if (!confirm('Remove profile picture?')) return;
            try {
                const res = await fetch('/api/auth/profile', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profilePicture: null })
                });
                if (res.ok) {
                    modalAvatar.classList.add('hidden');
                    modalPlaceholder.classList.remove('hidden');
                    const navAvatar = this.querySelector('#navAvatar') as HTMLImageElement;
                    const navPlaceholder = this.querySelector('#navAvatarPlaceholder') as HTMLElement;
                    navAvatar?.classList.add('hidden');
                    navPlaceholder?.classList.remove('hidden');
                    (window as any).showToast('Profile picture removed');
                }
            } catch (err) {
                (window as any).showToast('Failed to remove picture', 'error');
            }
        });

        // Save Form
        modal.querySelector('#saveProfileBtn')?.addEventListener('click', async () => {
            const form = modal.querySelector('#profileForm') as HTMLFormElement;
            const formData = new FormData(form);
            const data: any = {};
            
            formData.forEach((value, key) => {
                if (key.startsWith('emergencyContact_')) {
                    if (!data.emergencyContact) data.emergencyContact = {};
                    data.emergencyContact[key.replace('emergencyContact_', '')] = value;
                } else if (key === 'qualification') {
                    data.qualification = (value as string).split(',').map(s => s.trim()).filter(Boolean);
                } else {
                    data[key] = value;
                }
            });

            const saveBtn = modal.querySelector('#saveProfileBtn') as HTMLButtonElement;
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Saving...';

            try {
                const res = await fetch('/api/auth/profile', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    (window as any).showToast('Profile updated successfully!');
                    const updated = await res.json();
                    this._userData = updated.user;
                    this.renderLinks(this._userData);
                    close();
                } else {
                    throw new Error('Update failed');
                }
            } catch (err) {
                (window as any).showToast('Failed to save changes', 'error');
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerHTML = 'Save Changes';
            }
        });
    }

    private async loadNotifications() {
        try {
            const res = await fetch('/api/notifications?status=unread');
            if (!res.ok) throw new Error('Failed to fetch notifications');
            const data = await res.json();
            
            const list = this.querySelector('#notificationList');
            const badge = this.querySelector('#notificationBadge');
            
            if (badge) {
                if (data.notifications.length > 0) {
                    badge.textContent = data.notifications.length.toString();
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }

            if (list) {
                if (data.notifications.length === 0) {
                    list.innerHTML = '<div class="text-center text-sm text-gray-500 py-4 italic">No new notifications</div>';
                    return;
                }

                list.innerHTML = data.notifications.map((n: any) => `
                    <div class="p-3 border-b border-gray-50 hover:bg-blue-50 cursor-pointer rounded-lg transition group" data-id="${n._id}">
                        <div class="flex justify-between items-start mb-1">
                            <h4 class="font-bold text-gray-800 text-sm">${n.title}</h4>
                            <span class="text-[10px] text-gray-400 whitespace-nowrap ml-2">${new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p class="text-xs text-gray-600 line-clamp-2">${n.content}</p>
                    </div>
                `).join('');

                // Add click events to mark as read
                list.querySelectorAll('[data-id]').forEach(el => {
                    el.addEventListener('click', async (e) => {
                        e.stopPropagation(); // Prevent dropdown from closing immediately
                        const id = el.getAttribute('data-id');
                        try {
                            const readRes = await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
                            if (readRes.ok) {
                                el.remove();
                                this.loadNotifications(); // Refresh count
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    });
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    renderLinks(user: string | any): void {
        const role = typeof user === 'string' ? user : user.role;
        this._userData = typeof user === 'string' ? { role } : user;

        const navLinks = this.querySelector('#navLinks');
        const mobileNavLinks = this.querySelector('#mobileNavLinks');
        const userRoleBadge = this.querySelector('#userRoleBadge');
        const mobileUserRole = this.querySelector('#mobileUserRole');
        const userName = this.querySelector('#userName');
        const mobileUserName = this.querySelector('#mobileUserName');
        
        if (userRoleBadge) userRoleBadge.textContent = role;
        if (mobileUserRole) mobileUserRole.textContent = role;
        if (typeof user === 'object' && user.name) {
            if (userName) userName.textContent = user.name;
            if (mobileUserName) mobileUserName.textContent = user.name;
        }

        // Update Avatar in Navbar
        const navAvatar = this.querySelector('#navAvatar') as HTMLImageElement;
        const navPlaceholder = this.querySelector('#navAvatarPlaceholder') as HTMLElement;
        if (navAvatar) {
            if (user.profilePicture) {
                navAvatar.src = user.profilePicture;
                navAvatar.classList.remove('hidden');
                navPlaceholder.classList.add('hidden');
            } else {
                navAvatar.classList.add('hidden');
                navPlaceholder.classList.remove('hidden');
            }
        }

        if (!navLinks && !mobileNavLinks) return;

        const links: Record<string, { label: string, href: string, icon: string }[]> = {
            admin: [
                { label: 'Dashboard', href: '/protected/admin/index.html', icon: 'fa-chart-pie' },
                { label: 'Notices', href: '/protected/admin/notices.html', icon: 'fa-bullhorn' },
                { label: 'Students', href: '/protected/admin/students.html', icon: 'fa-users' },
                { label: 'Parents', href: '/protected/admin/parents.html', icon: 'fa-children' },
                { label: 'Teachers', href: '/protected/admin/teachers.html', icon: 'fa-chalkboard-user' },
                { label: 'Departments', href: '/protected/admin/departments.html', icon: 'fa-sitemap' },
                { label: 'Classes', href: '/protected/admin/classes.html', icon: 'fa-school' },
                { label: 'Courses', href: '/protected/admin/courses.html', icon: 'fa-book' },
                { label: 'Enrollment', href: '/protected/admin/enrollment-requests.html', icon: 'fa-file-signature' },
                { label: 'Staff Attendance', href: '/protected/admin/teacher-attendance.html', icon: 'fa-user-clock' },
                { label: 'Student Attendance', href: '/protected/admin/student-attendance.html', icon: 'fa-calendar-check' },
                { label: 'Fees', href: '/protected/admin/fees.html', icon: 'fa-file-invoice-dollar' },
                { label: 'Messages', href: '/protected/messages.html', icon: 'fa-comments' }
            ],
            teacher: [
                { label: 'Dashboard', href: '/protected/index.html', icon: 'fa-house' },
                { label: 'Notices', href: '/protected/teacher/notices.html', icon: 'fa-bullhorn' },
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
                { label: 'Roadmap', href: '/protected/student/curriculum.html', icon: 'fa-map-location-dot' },
                { label: 'Fees', href: '/protected/student/vouchers.html', icon: 'fa-money-bill-wave' },
                { label: 'Results', href: '/protected/student/results.html', icon: 'fa-graduation-cap' },
                { label: 'Profile', href: '/protected/student/details.html', icon: 'fa-user-gear' },
                { label: 'Assignments', href: '/protected/student/assignments.html', icon: 'fa-file-lines' },
                { label: 'Quizzes', href: '/protected/student/quizzes.html', icon: 'fa-bolt' },
                { label: 'Resources', href: '/protected/student/course-files.html', icon: 'fa-folder-open' },
                { label: 'Notices', href: '/protected/student/notices.html', icon: 'fa-bullhorn' },
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
                    <a href="${link.href}" class="flex items-center gap-1 xl:gap-1.5 px-1.5 py-1.5 2xl:px-3 2xl:py-2 rounded-xl text-[10px] 2xl:text-sm font-bold transition-all duration-200 
                        ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}">
                        <i class="fa-solid ${link.icon} text-[10px] 2xl:text-xs opacity-70"></i>
                        <span class="whitespace-nowrap">${link.label}</span>
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

/**
 * Public Navbar for Login, Signup, and Info Center
 */
class UIPublicNavbar extends HTMLElement {
    connectedCallback(): void {
        const title = this.getAttribute('title') || 'MIFL';
        this.innerHTML = `
            <nav class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-[1000]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16 items-center">
                        <div class="flex items-center gap-8">
                            <a href="/" class="text-2xl font-bold text-blue-600 flex items-center gap-2">
                                <i class="fa-solid fa-graduation-cap"></i>
                                <span>${title}</span>
                            </a>
                            <div class="hidden md:flex items-center space-x-4">
                                <a href="/unprotected/information_center/information-center.html" class="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-2">
                                    <i class="fa-solid fa-circle-info"></i> Information Center
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <a href="/api/auth/login" class="text-gray-600 hover:text-blue-600 font-bold text-sm transition">Sign In</a>
                            <a href="/api/auth/signup" class="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">Get Started</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

if (!customElements.get('ui-public-navbar')) customElements.define('ui-public-navbar', UIPublicNavbar);

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
    socket.on('notification', (data: any) => {
        const title = data.title || 'Notification';
        const content = data.content || data.message || '';
        showToast(`<strong>${title}</strong><br>${content}`, 'info');
        document.dispatchEvent(new CustomEvent('newNotification', { detail: data }));
    });
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
