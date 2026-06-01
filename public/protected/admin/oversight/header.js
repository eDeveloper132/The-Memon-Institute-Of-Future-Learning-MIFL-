/**
 * Admin Oversight Header
 * Injected into oversight views to provide context and return path.
 */

export function injectOversightHeader(role, userName) {
    const header = document.createElement('div');
    header.className = 'bg-gray-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-[1000] shadow-xl';
    header.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl">
                <i class="fa-solid fa-user-shield"></i>
            </div>
            <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-blue-400">Admin Oversight Mode</p>
                <h1 class="text-lg font-bold">Viewing ${role}: <span class="text-blue-200">${userName}</span></h1>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <button id="oversightBackBtn" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-bold transition flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Back to List
            </button>
            <a href="/protected/admin/index.html" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <i class="fa-solid fa-house"></i> Admin Console
            </a>
        </div>
    `;
    document.body.prepend(header);

    // Attach listener to avoid CSP inline-script violations
    document.getElementById('oversightBackBtn').onclick = () => window.history.back();
}
