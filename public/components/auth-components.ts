/**
 * MIFL UI Components (TypeScript)
 * A simple component library for the School Management System
 */

class AuthCard extends HTMLElement {
  connectedCallback(): void {
    this.style.display = "block";
    this.className = "max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 space-y-8";
  }
}

class AuthInput extends HTMLElement {
  connectedCallback(): void {
    // Prevent re-rendering if already content exists
    if (this.innerHTML.trim() !== "") return;

    this.style.display = "block"; // Custom elements are inline by default

    const type: string = this.getAttribute("type") || "text";
    const label: string = this.getAttribute("label") || "";
    const placeholder: string = this.getAttribute("placeholder") || "";
    const name: string = this.getAttribute("name") || "";
    const icon: string = this.getAttribute("icon") || "";
    const required: string = this.hasAttribute("required") ? "required" : "";
    const value: string = this.getAttribute("value") || "";

    this.innerHTML = `
      <div class="w-full">
        <label class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
        <div class="relative">
          ${
            icon
              ? `
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <i class="fa-solid fa-${icon}"></i>
            </span>`
              : ""
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
  connectedCallback(): void {
    if (this.innerHTML.trim() !== "") return;

    this.style.display = "block";

    const text: string = this.textContent?.trim() || "Submit";
    const type: string = this.getAttribute("type") || "submit";

    this.innerHTML = `
      <button
        type="${type}"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 transform hover:scale-[1.01] active:scale-[0.99]"
      >
        ${text}
      </button>
    `;
  }
}

class AuthHeader extends HTMLElement {
  connectedCallback(): void {
    if (this.innerHTML.trim() !== "") return;

    this.style.display = "block";

    const title: string = this.getAttribute("title") || "";
    const subtitle: string = this.getAttribute("subtitle") || "";

    this.innerHTML = `
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">${title}</h1>
        <p class="text-gray-500 mt-2">${subtitle}</p>
      </div>
    `;
  }
}

// Register components safely
type ComponentDef = {
  tag: string;
  element: CustomElementConstructor;
};

const components: ComponentDef[] = [
  { tag: "auth-card", element: AuthCard },
  { tag: "auth-input", element: AuthInput },
  { tag: "auth-button", element: AuthButton },
  { tag: "auth-header", element: AuthHeader },
];

components.forEach(({ tag, element }) => {
  if (!customElements.get(tag)) {
    customElements.define(tag, element);
  }
});