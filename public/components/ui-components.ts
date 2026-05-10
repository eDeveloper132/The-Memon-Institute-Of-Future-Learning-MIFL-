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
