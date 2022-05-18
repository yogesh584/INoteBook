module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
            "./src/components/Notes/*.{js,jsx,ts,tsx}",
            "./public/index.html"  
  ],
  theme: {
    extend: {
      keyframes:{
        showalert:{
          '0%':{
            transform: 'translateX(100%)'
          },
          '40%':{
            transform: 'translateX(-10%)'
          },
          '80%':{
            transform: 'translateX(0%)'
          },
          '100%':{
            transform: 'translateX(-10px)'
          }
        },
        hidealert:{
          '0%':{
            transform: 'translateX(-10px)'
          },
          '40%':{
            transform: 'translateX(0%)'
          },
          '80%':{
            transform: 'translateX(-10%)'
          },
          '100%':{
            transform: 'translateX(120%)'
          }
        }
      },
      animation:{
        showalert: 'showalert 1s ease forwards',
        hidealert: 'hidealert 1s ease forwards'
      }
    },
  },
  plugins: [],
}
