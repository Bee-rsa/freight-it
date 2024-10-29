import React from 'react'; 
import truckFreightImage from '../assets/Untitled design_20241028_121819_0000.png';

const TruckingHero: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Image */}
      <img
        src={truckFreightImage}
        alt="Ocean Freight Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Overlay Content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end', // Align to the right
          justifyContent: 'center',
          color: '#fff',
          padding: '40px', // Increase padding for more space
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '600px', width: '100%' }}> {/* Increase maxWidth */}
          <h1 
            style={{ 
              fontSize: '2.5rem', 
              marginBottom: '1rem', 
              textAlign: 'center', 
              fontWeight: 'bold', // Make the text bold
              marginRight: '10px', // Move it away from the right
              font: 'poppins' 
            }}
          >
            Spend Less Time, <br /> Selling More Freight. {/* Use <br /> for proper JSX syntax */}
          </h1>
          <p 
            style={{ 
              textAlign: 'right', 
              fontSize: '1.8rem', 
              marginBottom: '2rem', 
              font: 'poppins', 
              marginRight: '30px' // Move it away from the right
            }}
          >
            Sign Up With Freight iT   
          </p>
        </div>
      </div>
    </div>
  );
};

export default TruckingHero;
