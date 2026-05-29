# Research: Responsive Chat Layout

## Decision: View-Switching via CSS Classes
**Rationale**: For mobile devices, we will use Tailwind's `hidden` and `flex` (or `block`) utility classes to toggle between the Sidebar and the Chat Window. 
- `sidebar`: `w-full md:w-80`
- `chat-window`: `w-full md:flex-1`
We will introduce a state-based logic in JavaScript to manage which component is "active" on mobile.

## Decision: Mobile "Back" Button
**Rationale**: A simple chevron-left icon in the header will allow users to return to the list. 
**Logic**: 
```javascript
const showList = () => {
    sidebar.classList.remove('hidden');
    chatWindow.classList.add('hidden');
    activeChat = null; // Optional: deselect
};
const showChat = () => {
    sidebar.classList.add('hidden', 'md:block'); // hidden on mobile, block on md+
    chatWindow.classList.remove('hidden');
};
```

## Decision: Responsive Height Management
**Rationale**: `h-[calc(100vh-120px)]` can be problematic on mobile browsers due to the address bar. We will evaluate using `h-[calc(100dvh-120px)]` or keeping it simple with `flex-1` and a container overflow.
**Verdict**: Use `flex-1` and ensure the `main` container is properly constrained.
