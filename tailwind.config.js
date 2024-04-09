const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./layouts/**/*{html,js}'],
    theme: {
        extend: {}
    },
    plugins: [
        // Iconify plugin
        addDynamicIconSelectors()
    ]
};
