const plugin = require('tailwindcss/plugin')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {
            fontSize : {
                'text-300px' : '300px',
                '10px' : '10px'
            },
            outline: {
                blue: '2px solid #2196f3',
                black : '1px solid #000',
                red : '1px solid red'
            },
            width : {
                '100' : '26rem'
            }
        },
    },
    variants: {
        extend: {
            rotate: ['active', 'group-hover'],
        },
    },
    plugins: [
        // require('tailwindcss-pseudo-elements'),
        // plugin(({addUtilities}) => {
        //   const newUtilities = {
        //     ".empty-content": {
        //       content: "''",
        //     },
        //   }
        //   addUtilities(newUtilities, {
        //     variants: ["before", "after"],
        //   });
        // })
      ],
};




