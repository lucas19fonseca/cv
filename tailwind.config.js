module.exports = {
  theme: {
    extend: {
      animation: {
        'wave-slow': 'waveFlow 15s ease-in-out infinite',
        'wave-medium': 'waveFlow 12s ease-in-out infinite reverse',
        'wave-fast': 'waveFlow 8s ease-in-out infinite'
      },
      keyframes: {
        waveFlow: {
          '0%, 100%': { 
            transform: 'translateX(0) translateY(0)',
            'background-size': 'auto 95%'
          },
          '50%': { 
            transform: 'translateX(-25%) translateY(10px)',
            'background-size': 'auto 110%'
          }
        }
      }
    }
  }
}