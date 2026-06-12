/**
 * Landing Page Dynamic Logic & Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchInstituteData();
    initRevealAnimations();
});

/**
 * Initialize Intersection Observer for reveal-on-scroll effects
 */
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial reveal elements
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Export observer to handle dynamically injected content
    window.observeNewElements = (selector) => {
        document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
    };
}

async function fetchInstituteData() {
    try {
        const response = await fetch('/api/public/information-center');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        
        renderStatistics(data);
        renderFeaturedCourses(data.courses);
        updateFooterContact(data.systemInfo.contact, data.systemInfo.motto);
        
        // Observe newly rendered dynamic sections
        if (window.observeNewElements) {
            window.observeNewElements('.reveal-dynamic');
        }
        
    } catch (error) {
        console.error('Error loading institute data:', error);
        const programsSection = document.getElementById('programsSection');
        if (programsSection) {
            programsSection.innerHTML = `
                <div class="text-center text-red-500 py-10">
                    <i class="fa-solid fa-triangle-exclamation text-4xl mb-4"></i>
                    <p class="font-bold">Failed to load programs. Please try again later.</p>
                </div>
            `;
        }
    }
}

function renderStatistics(data) {
    const statsContainer = document.getElementById('statsSection');
    if (!statsContainer) return;

    const courseCount = data.courses ? data.courses.length : 0;
    const deptCount = data.departments ? data.departments.length : 0;
    const classCount = data.classes ? data.classes.length : 0;

    statsContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div class="group">
                    <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition duration-500">
                        <i class="fa-solid fa-book-open-reader"></i>
                    </div>
                    <div class="text-5xl font-black text-gray-900 mb-2">${courseCount}+</div>
                    <div class="text-xs font-black text-blue-500 uppercase tracking-[0.2em]">Active Programs</div>
                </div>
                <div class="group">
                    <div class="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition duration-500">
                        <i class="fa-solid fa-sitemap"></i>
                    </div>
                    <div class="text-5xl font-black text-gray-900 mb-2">${deptCount}</div>
                    <div class="text-xs font-black text-green-500 uppercase tracking-[0.2em]">Expert Departments</div>
                </div>
                <div class="group">
                    <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition duration-500">
                        <i class="fa-solid fa-school"></i>
                    </div>
                    <div class="text-5xl font-black text-gray-900 mb-2">${classCount}</div>
                    <div class="text-xs font-black text-purple-500 uppercase tracking-[0.2em]">Academic Classes</div>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedCourses(courses) {
    const programsContainer = document.getElementById('programsSection');
    if (!programsContainer || !courses || courses.length === 0) return;

    // Show up to 6 featured courses
    const featured = courses.slice(0, 6);

    programsContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="programs">
            <div class="text-center mb-20">
                <h2 class="text-4xl font-black text-gray-900 mb-4">Featured Programs</h2>
                <div class="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto font-medium">Explore our most popular courses designed to equip you with the skills of tomorrow.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                ${featured.map((course, index) => `
                    <div class="reveal-dynamic bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-500 group flex flex-col h-full" style="transition-delay: ${index * 100}ms">
                        <div class="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition duration-500 shadow-sm">
                            <i class="fa-solid ${getCourseIcon(course.title)}"></i>
                        </div>
                        <h3 class="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition duration-300 leading-tight">${course.title}</h3>
                        <p class="text-xs font-black text-blue-400 uppercase tracking-widest mb-8 bg-blue-50/50 self-start px-3 py-1.5 rounded-lg border border-blue-100/50">Code: ${course.code}</p>
                        
                        <div class="mt-auto pt-8 border-t border-gray-50 flex justify-between items-end">
                            <div>
                                <span class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Investment</span>
                                <span class="text-2xl font-black text-gray-900">PKR ${(course.monthlyFee || 0).toLocaleString()}</span>
                                <span class="text-[10px] font-bold text-gray-400">/ month</span>
                            </div>
                            <a href="/unprotected/information_center/information-center.html" class="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group/link">
                                <i class="fa-solid fa-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="text-center mt-20">
                <a href="/unprotected/information_center/information-center.html" class="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all duration-500 shadow-xl hover:shadow-blue-200">
                    View All Programs <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </a>
            </div>
        </div>
    `;
    
    // Trigger reveal for dynamic cards
    if (window.observeNewElements) {
        window.observeNewElements('.reveal-dynamic');
    }
}

/**
 * Assign relevant icons based on course titles
 */
function getCourseIcon(title) {
    const t = title.toLowerCase();
    if (t.includes('web') || t.includes('software')) return 'fa-code';
    if (t.includes('design') || t.includes('graphic')) return 'fa-palette';
    if (t.includes('business') || t.includes('management')) return 'fa-briefcase';
    if (t.includes('data') || t.includes('ai')) return 'fa-brain';
    if (t.includes('network') || t.includes('security')) return 'fa-shield-halved';
    if (t.includes('marketing')) return 'fa-bullhorn';
    if (t.includes('language')) return 'fa-language';
    return 'fa-graduation-cap';
}

function updateFooterContact(contact, motto) {
    if (motto) {
        const mottoEl = document.getElementById('footerMotto');
        if (mottoEl) mottoEl.textContent = motto;
    }
    
    if (contact) {
        const contactList = document.getElementById('footerContact');
        if (contactList) {
            contactList.innerHTML = `
                <li class="flex items-start gap-4 group">
                    <div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                        <i class="fa-solid fa-location-dot text-sm"></i>
                    </div>
                    <span class="text-gray-400 group-hover:text-gray-200 transition duration-300 leading-relaxed">${contact.address || 'Address not available'}</span>
                </li>
                <li class="flex items-center gap-4 group">
                    <div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                        <i class="fa-solid fa-envelope text-sm"></i>
                    </div>
                    <a href="mailto:${contact.email}" class="text-gray-400 group-hover:text-gray-200 transition duration-300">${contact.email || 'Email not available'}</a>
                </li>
                <li class="flex items-center gap-4 group">
                    <div class="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                        <i class="fa-solid fa-phone text-sm"></i>
                    </div>
                    <a href="tel:${contact.phone}" class="text-gray-400 group-hover:text-gray-200 transition duration-300">${contact.phone || 'Phone not available'}</a>
                </li>
            `;
        }
    }
}
