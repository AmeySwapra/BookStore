import React from 'react';

const CustomLoader = () => {
    const styles = {
        loader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        dot: {
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#d53f8c',
            margin: '0 5px',
            animation: 'bounce 0.6s ease infinite',
        },
        bounce: `@keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }`
    };

    return (
        <div style={styles.loader}>
            <style>{styles.bounce}</style>
            <div style={{ ...styles.dot, animationDelay: '0s' }} />
            <div style={{ ...styles.dot, animationDelay: '0.2s' }} />
            <div style={{ ...styles.dot, animationDelay: '0.4s' }} />
            <div style={{ ...styles.dot, animationDelay: '0.6s' }} />
        </div>
    );
};

export default CustomLoader;

