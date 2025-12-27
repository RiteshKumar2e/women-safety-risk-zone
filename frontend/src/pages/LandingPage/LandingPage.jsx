import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="container flex justify-between items-center">
                    <div className="landing-logo">
                        <span className="logo-icon">🛡️</span>
                        <span className="logo-text">SafeZone AI</span>
                    </div>
                    <div className="nav-links flex gap-4 items-center">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#solutions" className="nav-link">Solutions</a>
                        <button onClick={() => navigate('/login')} className="btn-secondary">Login</button>
                        <button onClick={() => navigate('/register')} className="btn-primary">Get Started</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Enterprise-Grade <span className="text-brand">Women Safety</span> & Risk Analytics
                        </h1>
                        <p className="hero-subtitle">
                            Empowering urban safety with AI-driven risk zone prediction, real-time incident classification, and advanced geo-spatial analytics.
                        </p>
                        <div className="hero-actions flex gap-4">
                            <button onClick={() => navigate('/register')} className="btn-primary-lg">Launch SafeZone AI</button>
                            <button className="btn-outline-lg">View Safety Analytics</button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="mockup-container">
                            <div className="mockup-header">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                            <div className="mockup-body">
                                <div className="mockup-chart">
                                    {/* Visual representation of a chart/map */}
                                    <div className="chart-bar-glow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container grid-3">
                    <div className="stat-card">
                        <h3 className="stat-value">98%</h3>
                        <p className="stat-label">Prediction Accuracy</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-value">1.2M</h3>
                        <p className="stat-label">Zones Analyzed</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-value">Real-time</h3>
                        <p className="stat-label">AI Classification</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Intelligent Safety Infrastructure</h2>
                        <p className="section-desc">Advanced algorithms working behind the scenes to ensure smarter, safer cities.</p>
                    </div>
                    <div className="features-grid grid-3">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3 className="feature-name">Risk Prediction</h3>
                            <p className="feature-text">AI models trained on geo-spatial data to predict high-risk zones before incidents occur.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📋</div>
                            <h3 className="feature-name">Smarter Classification</h3>
                            <p className="feature-text">Automated incident reporting with priority-based NLP classification for rapid response.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🗺️</div>
                            <h3 className="feature-name">Safety Analytics</h3>
                            <p className="feature-text">Comprehensive dashboards for administrative oversight and urban planning safety audits.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to transform urban safety?</h2>
                        <p>Join the movement towards data-driven, safer environments for everyone.</p>
                        <button onClick={() => navigate('/register')} className="btn-primary-lg">Get Started Now</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container flex justify-between items-center">
                    <p>&copy; 2024 SafeZone AI. All rights reserved.</p>
                    <div className="footer-links flex gap-4">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
