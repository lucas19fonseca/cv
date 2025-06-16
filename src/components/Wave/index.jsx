import "./index.css";

export default function Wave() {
    return (
        <div className="relative w-full overflow-hidden" style={{ 
            height: '15vh',  // Aumentei para 25vh (era 15vh)
            minHeight: '145px',  // Aumentei o mínimo
            maxHeight: '200px',  // Aumentei o máximo
            transform: 'translateY(0)'  // Removi o translateY para não cortar
        }}>
            <svg 
                className="waves w-full h-full"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 24 150 28" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
            >
                <defs>
                    <path 
                        id="gentle-wave" 
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" 
                    />
                </defs>
                <g className="parallax">
                    <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use href="#gentle-wave" x="48" y="7" fill="#E2E2E2" />
                </g>
            </svg>
        </div>
    );
}