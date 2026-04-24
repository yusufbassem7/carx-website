import React from 'react';
import { motion } from 'framer-motion';
import { CARS_DATA, fadeUp, stagger } from '../constants';
import './Showroom.css';

const styles = {
    container: {
        maxWidth: '100%', 
        margin: '0 auto',
        backgroundColor: '#000',
        minHeight: '100vh'
    },
    showroomHero: {
        height: '85vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.95) 100%), url('/showroom-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        marginBottom: '40px'
    },
    contentWrapper: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px 80px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '30px',
        marginTop: '40px'
    },
    carCard: {
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
    },
    imageContainer: {
        width: '100%',
        height: '250px', 
        overflow: 'hidden',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' 
    },
    info: {
        padding: '30px'
    }
};

export default function ShowroomPage({ setPage }) {
 
    const gridCars = CARS_DATA.filter(c => 
        ['porsche', 'chiron', 'bmw'].some(name => c.name.toLowerCase().includes(name))
    );
    const aventador = CARS_DATA.find(c => c.name.toLowerCase().includes('aventador'));
    const mclaren = CARS_DATA.find(c => c.name.toLowerCase().includes('mclaren'));

    return (
        <div style={styles.container} className="showroom-wrapper">
            <section style={styles.showroomHero}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', padding: '0 20px' }}
                >
                    <p style={{ color: '#00ffff', letterSpacing: '8px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '15px' }}>
                        Curated Collection
                    </p>
                    <h1 style={{ fontSize: 'clamp(40px, 12vw, 110px)', fontWeight: '900', textTransform: 'uppercase', color: '#fff', letterSpacing: '-4px', lineHeight: '0.85' }}>
                        THE SHOWROOM
                    </h1>
                </motion.div>
            </section>

            <div style={styles.contentWrapper}>
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} style={styles.grid}>
                    {gridCars.map((car) => (
                        <motion.div 
                            key={car.id} 
                            variants={fadeUp} 
                            style={styles.carCard}
                            className="car-card group"
                            onClick={() => setPage({ name: 'DETAILS', car: car })} 
                        >
                            <div style={styles.imageContainer}>
                                <img src={car.img} alt={car.name} style={styles.image} className="group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div style={styles.info}>
                                <p style={{ color: '#00ffff', fontSize: '10px', letterSpacing: '2px', marginBottom: '10px', fontWeight: 'bold' }}>
                                    {car.type || car.brand}
                                </p>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px', color: '#fff' }}>
                                    {car.name}
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                                    <span style={{ fontWeight: 'bold' }}>{car.price}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setPage({ name: 'DETAILS', car: car }); }} 
                                        style={{ color: '#00ffff', fontSize: '11px', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        VIEW DETAILS →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {aventador && (
                    <div className="masterpiece-section" style={{ marginTop: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                onClick={() => setPage({ name: 'DETAILS', car: aventador })} 
                                style={{ cursor: 'pointer', backgroundColor: '#0a0a0a', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <img src={aventador.img} alt="Aventador SVJ" style={{ width: '100%', objectFit: 'contain' }} />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <p style={{ color: '#888', letterSpacing: '4px', fontSize: '10px', marginBottom: '20px', fontWeight: 'bold' }}>FEATURED MASTERPIECE</p>
                                <h2 style={{ fontSize: '56px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '30px', color: '#fff', lineHeight: '1' }}>{aventador.name}</h2>
                                <p style={{ color: '#a0a0a0', lineHeight: '1.8', marginBottom: '40px' }}>{aventador.description}</p>
                                <button onClick={() => setPage({ name: 'DETAILS', car: aventador })} className="bg-[#00ffff] text-black px-12 py-5 font-black text-xs tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,255,0.15)]">
                                    VIEW DETAILS
                                </button>
                            </motion.div>
                        </div>
                    </div>
                )}

                {mclaren && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{ marginTop: '100px', backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                        onClick={() => setPage({ name: 'DETAILS', car: mclaren })}
                    >
                        <div className="flex flex-col md:flex-row items-center overflow-hidden">
                            <div className="w-full md:w-1/2">
                                <img src={mclaren.img} alt="McLaren P1" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                            </div>
                            <div className="w-full md:w-1/2 p-16">
                                <p style={{ color: '#00ffff', fontSize: '10px', letterSpacing: '3px', marginBottom: '15px', fontWeight: 'bold' }}>HYBRID MASTERPIECE</p>
                                <h3 style={{ fontSize: '42px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '20px', color: '#fff' }}>{mclaren.name}</h3>
                                <p style={{ color: '#a0a0a0', marginBottom: '30px', lineHeight: '1.7' }}>{mclaren.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{mclaren.price}</span>
                                    <span style={{ color: '#00ffff', fontSize: '12px', fontWeight: 'bold' }}>VIEW DETAILS →</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <footer style={{ padding: '60px 0 20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div style={{ color: '#00ffff', fontWeight: '900', fontSize: '18px', letterSpacing: '4px', marginBottom: '20px' }}>CAR X</div>
                <p style={{ color: '#6b7280', fontSize: '10px' }}>© 2026 CAR X AUTOMOBILE. ENGINEERED FOR THE VOID.</p>
            </footer>
        </div>
    );
}