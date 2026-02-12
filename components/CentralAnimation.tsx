import React from 'react';

interface CentralAnimationProps {
    animationRotation: number;
}

const CentralAnimation: React.FC<CentralAnimationProps> = ({ animationRotation }) => {
    const containerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white', // The base for the white half of the Yin-Yang
    };

    const rotatingContainerStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        transform: `rotate(${-animationRotation}deg)`,
    };
    
    const textContainerStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', // This color will be inverted by the blend mode
        mixBlendMode: 'difference',
    };

    const textStyle: React.CSSProperties = {
        fontSize: '55px',
        fontFamily: 'serif',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            {/* The rotating background element containing the Yin-Yang SVG */}
            <div style={rotatingContainerStyle}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    {/* Black half (S-curve). The white half is the container's background. */}
                    <path d="M50,0 a50,50 0 0,0 0,100 a25,25 0 0,0 0,-50 a25,25 0 0,1 0,-50" fill="black" />
                    {/* White dot (moon) inside the black area */}
                    <circle cx="50" cy="80" r="6" fill="white" />
                    {/* Black sun inside the white area */}
                    <g transform="translate(50, 20)" fill="black">
                        <circle r="2.5"/>
                        <g stroke="black" strokeWidth="1.2" strokeLinecap="round">
                            <line y1="-3.5" y2="-5.5" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(45)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(90)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(135)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(180)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(225)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(270)" />
                            <line y1="-3.5" y2="-5.5" transform="rotate(315)" />
                        </g>
                    </g>
                </svg>
            </div>
            
            {/* The stationary text overlay */}
            <div style={textContainerStyle}>
                <span style={textStyle}>
                    الله
                </span>
            </div>
        </div>
    );
};

export default CentralAnimation;