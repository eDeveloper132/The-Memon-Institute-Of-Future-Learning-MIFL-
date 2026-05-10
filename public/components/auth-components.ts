/**
 * MIFL UI Components (TypeScript)
 * Reusable components for authentication pages
 */

console.log("MIFL Auth Components Loaded");

class AuthCard extends HTMLElement {
  connectedCallback(): void {
    this.classList.add("max-w-md", "w-full", "bg-white", "rounded-2xl", "shadow-xl", "overflow-hidden", "p-8", "space-y-8");
    this.style.display = "block";
  }
}

class AuthInput extends HTMLElement {
  get value(): string {
    const input = this.querySelector('input');
    return input ? input.value : '';
  }

  set value(val: string) {
    const input = this.querySelector('input');
    if (input) input.value = val;
  }

  connectedCallback(): void {
    this.style.display = "block";

    const type = this.getAttribute("type") || "text";
    const label = this.getAttribute("label") || "";
    const placeholder = this.getAttribute("placeholder") || "";
    const name = this.getAttribute("name") || "";
    const icon = this.getAttribute("icon") || "";
    const required = this.hasAttribute("required") ? "required" : "";
    const value = this.getAttribute("value") || "";

    this.innerHTML = `
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
        <div class="relative">
          ${icon ? `
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <i class="fa-solid fa-${icon}"></i>
            </span>` : ""
          }
          <input
            type="${type}"
            ${required}
            name="${name}"
            value="${value}"
            class="block w-full ${icon ? "pl-10" : "px-3"} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="${placeholder}"
          >
        </div>
      </div>
    `;
  }
}

class AuthButton extends HTMLElement {
  private _loading = false;
  private _originalText = '';

  get loading() { return this._loading; }
  set loading(value: boolean) {
    this._loading = value;
    this.render();
  }

  connectedCallback(): void {
    this._originalText = this.textContent?.trim() || 'Submit';
    this.render();
  }

  render(): void {
    this.style.display = 'block';
    const type = this.getAttribute('type') || 'submit';
    this.innerHTML = `
      <button type="${type}" ${this._loading ? 'disabled' : ''}
        class="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${this._loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 transform hover:scale-[1.01] active:scale-[0.99]">
        ${this._loading ? '<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Processing...' : this._originalText}
      </button>
    `;
  }
}

class AuthHeader extends HTMLElement {
  connectedCallback(): void {
    this.style.display = "block";
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";

    this.innerHTML = `
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">${title}</h1>
        <p class="text-gray-500 mt-2">${subtitle}</p>
      </div>
    `;
  }
}

// Register custom elements
if (!customElements.get("auth-card")) customElements.define("auth-card", AuthCard);
if (!customElements.get("auth-input")) customElements.define("auth-input", AuthInput);
if (!customElements.get("auth-button")) customElements.define("auth-button", AuthButton);
if (!customElements.get("auth-header")) customElements.define("auth-header", AuthHeader);
