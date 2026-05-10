/**
 * MIFL General UI Components (TypeScript)
 */

class UINavbar extends HTMLElement {
    connectedCallback(): void {
        const title = this.getAttribute('title') || 'MIFL';
        this.innerHTML = `
            <nav class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold text-blue-600">${title}</h1>
                <div class="flex items-center space-x-4">
                    <span id="userName" class="text-gray-700 font-medium">Loading...</span>
                    <button id="logoutBtn" class="text-red-500 hover:text-red-700 transition">
                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>
            </nav>
        `;
    }
}

class UICard extends HTMLElement {
    connectedCallback(): void {
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
