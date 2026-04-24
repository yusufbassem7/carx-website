import React, { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Vision received from ${formData.name}`);
        setFormData({ name: '', email: '', message: '' });
    };

    const styles = {
        wrapper: {
            backgroundColor: '#080b10',
            color: 'white',
            minHeight: '100vh',
            padding: '100px 24px 40px',
            fontFamily: 'sans-serif'
        },
        container: {
            maxWidth: '1100px',
            margin: '0 auto'
        },
        neonTitle: {
            fontSize: 'clamp(50px, 10vw, 100px)',
            fontWeight: '900',
            letterSpacing: '8px',
            marginBottom: '10px',
            color: '#fff',
            textShadow: '0 0 10px #7df9ff, 0 0 20px #7df9ff'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            marginTop: '40px'
        },
        input: {
            width: '100%',
            backgroundColor: 'transparent',
            border: '1px solid #1f2937',
            padding: '16px',
            color: 'white',
            marginTop: '10px',
            outline: 'none',
            fontSize: '14px'
        },
        button: {
            backgroundColor: '#7df9ff',
            color: 'black',
            padding: '16px 32px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase',
            marginTop: '20px',
            letterSpacing: '2px'
        },
        card: {
            backgroundColor: '#11151c',
            border: '1px solid #1f2937',
            padding: '30px'
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>

                <header style={{ marginBottom: '60px' }}>
                    <h1 style={styles.neonTitle}>CONTACT</h1>
                    <p style={{ color: '#6b7280', letterSpacing: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                        ENTER THE VOID. CONNECT WITH THE FUTURE.
                    </p>
                </header>

                <div style={styles.grid}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px' }}>NAME</label>
                            <input 
                                style={styles.input} 
                                placeholder="YOUR FULL NAME" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required 
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px' }}>EMAIL</label>
                            <input 
                                type="email" 
                                style={styles.input} 
                                placeholder="EMAIL@DOMAIN.COM" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required 
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px' }}>MESSAGE</label>
                            <textarea 
                                style={{...styles.input, resize: 'none'}} 
                                rows="5" 
                                placeholder="DESCRIBE YOUR VISION" 
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required 
                            />
                        </div>
                        <button type="submit" style={styles.button}>Send Message →</button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', letterSpacing: '4px', marginBottom: '24px' }}>BESPOKE INQUIRIES</h2>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ background: '#11151c', padding: '15px', border: '1px solid #1f2937' }}>💎</div>
                                <div>
                                    <span style={{ fontSize: '10px', color: '#6b7280', display: 'block' }}>CUSTOM COMMISSION</span>
                                    <a href="mailto:bespoke@carx.void" style={{ color: 'white', textDecoration: 'none' }}>bespoke@carx.void</a>
                                </div>
                            </div>
                        </div>

                        <div style={styles.card}>
                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '2px' }}>ENGINEERING SUPPORT</h3>
                            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.6' }}>
                                For technical assistance regarding vehicle maintenance or software updates, our elite technician pool is available 24/7.
                            </p>
                        </div>
                    </div>
                </div>

                <footer style={{ marginTop: '80px', borderTop: '1px solid #1f2937', padding: '40px 0', textAlign: 'center' }}>
                    <div style={{ color: '#7df9ff', fontWeight: 'bold', letterSpacing: '3px', fontSize: '14px' }}>CAR X</div>
                    <p style={{ color: '#6b7280', fontSize: '10px', marginTop: '20px' }}>© 2026 CAR X. ENGINEERED FOR THE VOID.</p>
                </footer>
            </div>
        </div>
    );
}