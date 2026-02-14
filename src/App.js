const { useState, useEffect, useRef } = React;

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const left = Math.random() * 100;
            const size = Math.random() * (35 - 15) + 15;
            const duration = Math.random() * (12 - 6) + 6;

            setHearts(prev => [...prev, { id, left, size, duration }]);

            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, duration * 1000);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            {hearts.map(h => (
                <i
                    key={h.id}
                    className="fas fa-heart floating-heart"
                    style={{
                        left: `${h.left}%`,
                        fontSize: `${h.size}px`,
                        animationDuration: `${h.duration}s`,
                        color: h.id % 2 === 0 ? '#38BDF8' : '#7C3AED',
                        bottom: '-50px'
                    }}
                />
            ))}
        </React.Fragment>
    );
};

const BayanQuote = ({ tamil, english, title }) => (
    <div className="col-lg-6 mb-4">
        <div className="glass-card bayan-card p-5 h-100 position-relative overflow-hidden">
            <div className="bayan-quote-symbol"><i className="fas fa-quote-right"></i></div>
            <h4 className="fw-bold text-violet-primary mb-3 tamil-text" style={{ color: 'var(--violet-primary)' }}>{title}</h4>
            <p className="fs-5 fw-bold tamil-text mb-3" style={{ color: 'var(--deep-violet)' }}>"{tamil}"</p>
            <p className="fst-italic text-secondary">"{english}"</p>
        </div>
    </div>
);

const App = () => {
    const [proposalAccepted, setProposalAccepted] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const yesBtnRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const moveNoButton = () => {
        const yesRect = yesBtnRef.current?.getBoundingClientRect();
        const padding = window.innerWidth < 768 ? 100 : 200;
        const btnWidth = 250;
        const btnHeight = 80;

        let randomX, randomY;
        let attempts = 0;

        do {
            // Keep button away from screen edges
            randomX = Math.random() * (window.innerWidth - btnWidth - 40) + 20;
            randomY = Math.random() * (window.innerHeight - btnHeight - 40) + 20;
            attempts++;
        } while (
            attempts < 50 &&
            yesRect &&
            randomX > yesRect.left - padding &&
            randomX < yesRect.right + padding &&
            randomY > yesRect.top - padding &&
            randomY < yesRect.bottom + padding
        );

        setNoBtnPos({
            top: `${randomY}px`,
            left: `${randomX}px`,
            position: 'fixed',
            zIndex: 1000,
            transition: 'all 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
        });
    };

    const tamilQuotes = [
        {
            title: "நித்திய காதல் (Eternal Love)",
            tamil: "அல்லாஹ்வின் அனுமதியோடு தொடங்கும் காதலே ஜன்னத்திற்கு அழைத்துச் செல்லும்.",
            english: "Love that begins with Allah's permission is the one that leads to Jannah."
        },
        {
            title: "உண்மையான அன்பு (True Love)",
            tamil: "உண்மையான அன்பு என்பது உன் இணையை இறைவனுக்கு நெருக்கமாக மாற்றுவதே.",
            english: "True love is when you bring your partner closer to the Creator."
        },
        {
            title: "என் துஆ (My Dua)",
            tamil: "ஜன்னத்திலும் உன்னோடு இருக்க வேண்டும் என்பதே என் வாழ்க்கையின் சிறந்த துஆ.",
            english: "Being with you in Jannah too is the best Dua of my life."
        },
        {
            title: "மார்க்கம் தந்த பரிசு (Gift of Deen)",
            tamil: "நல்லதொரு துணை கிடைப்பது நாம் செய்த புண்ணியம் அல்ல, அது அல்லாஹ்வின் மிகப்பெரிய அருள்.",
            english: "A righteous spouse is not a result of our deeds, but a magnificent mercy from Allah."
        }
    ];

    return (
        <div className="main-wrapper">
            <FloatingHearts />

            {/* Hero Section */}
            <section className="hero-gradient text-center">
                <div className="hero-overlay"></div>
                <div className={`container transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="badge mb-3 px-3 py-2 rounded-pill glow-text pulse-violet" style={{ backgroundColor: 'var(--violet-primary)', color: 'white' }}>Halal & Pure Love</span>
                    <h1 className="display-3 fw-bold mb-4 arabic-text" style={{ color: 'var(--deep-violet)' }}>
                        WILL YOU BE MY VALENTINE<br />
                        <span className="text-sky-blue" style={{ color: 'var(--sky-blue)' }}>My Jannah 🤍</span>
                    </h1>
                    <p className="arabic-text fs-1 mb-3">أحبك في الله ❤️</p>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <p className="lead tamil-text mb-5 fs-4">
                                "நம்முடைய காதல் இம்மையோடு முடிந்து விடுவதல்ல... <br />
                                அது மறுமையிலும் ஜன்னத்தில் தொடர வேண்டும் என்பதே என் ஆசை."
                            </p>
                        </div>
                    </div>
                    <a href="#proposal" className="btn-premium">InshaAllah, Yes 💍</a>
                </div>
            </section>

            {/* Hadith Section - Mini Cards */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row g-4">
                        {[
                            { ar: "خيركم خيركم لأهله", en: "The best among you is the one who is best to his family." },
                            { ar: "الدنيا متاع و خير متاعها المرأة الصالحة", en: "The world is provision and its best provision is a righteous woman." }
                        ].map((item, idx) => (
                            <div key={idx} className="col-md-6">
                                <div className="glass-card p-4 border-0 text-center" style={{ background: '#F5F3FF' }}>
                                    <h5 className="arabic-text fs-3 mb-2" style={{ color: 'var(--violet-primary)' }}>{item.ar}</h5>
                                    <p className="mb-0 text-muted small">{item.en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tamil Bayan Love Quotes Section */}
            <section className="section-padding py-5" style={{ background: 'linear-gradient(to bottom, #ffffff, var(--bg-light))' }}>
                <div className="container text-center">
                    <h2 className="section-title mb-5">Tamil Love Bayan Quotes</h2>
                    <div className="row g-4 text-start">
                        {tamilQuotes.map((q, idx) => (
                            <BayanQuote key={idx} {...q} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Heartfelt Message Section */}
            <section className="py-5">
                <div className="container">
                    <div className="glass-card p-0 overflow-hidden shadow-lg border-0">
                        <div className="row g-0">
                            <div className="col-lg-6 d-none d-lg-block" style={{
                                backgroundImage: `url('./assets/muslim_couple_dua.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                            </div>
                            <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
                                <h2 className="fw-bold mb-4 tamil-text">என் அன்பே... 🤍</h2>
                                <p className="fs-5 tamil-text mb-4" style={{ lineHeight: '1.8' }}>
                                    அல்லாஹ் நம்மை சந்திக்க வைத்ததில் ஒரு பெரிய அர்த்தம் உண்டு. நம் இணை என்பது
                                    ஒருவரை ஒருவர் சொர்க்கத்திற்கு கைகோர்த்து அழைத்துச் செல்வதற்காகவே. <br /><br />
                                    <strong>"யா அல்லாஹ், நம்முடைய அன்பை ஜன்னத்துல் பிர்தௌஸில் என்றும் நிலைத்திருக்க செய்வாய்."</strong>
                                </p>
                                <div className="d-flex gap-3">
                                    <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: 'var(--sky-light)', color: 'var(--deep-violet)' }}>#HalalLove</span>
                                    <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: 'var(--violet-primary)', color: 'white' }}>#TowardsJannah</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Proposal Section */}
            <section id="proposal" className="interactive-proposal">
                <div className="container text-center">
                    {proposalAccepted ? (
                        <div className="fade-in-custom visible">
                            <div className="display-1 mb-4">✨ 💍 ✨</div>
                            <h2 className="display-4 fw-bold mb-3 tamil-text" style={{ color: 'var(--violet-primary)' }}>அல்ஹம்துலில்லாஹ்! (Alhamdulillah!)</h2>
                            <p className="fs-3 tamil-text">அல்லாஹ்விற்கே எல்லா புகழும்! நம் இருவரையும் அவன் ஈருலகிலும் சந்தோஷமாக வைக்கட்டும். 🤍💍</p>
                            <div className="mt-5">
                                <div className="spinner-grow text-primary" style={{ color: 'var(--violet-primary)' }} role="status"></div>
                                <div className="spinner-grow text-info ms-2" style={{ color: 'var(--sky-blue)' }} role="status"></div>
                                <div className="spinner-grow text-primary ms-2" style={{ color: 'var(--violet-primary)' }} role="status"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="position-relative">
                            <h2 className="display-4 fw-bold mb-5 tamil-text" style={{ color: 'var(--deep-violet)' }}>
                                என் வாழ்நாள் துணையாக வர சம்மதமா? <br />
                                <span className="fs-3" style={{ color: 'var(--violet-primary)' }}>(Will you walk with me to Jannah?)</span>
                            </h2>
                            <div className="d-flex justify-content-center gap-5 align-items-center flex-column flex-md-row" style={{ minHeight: '150px' }}>
                                <button
                                    ref={yesBtnRef}
                                    className="btn-premium px-5 py-3 fs-4"
                                    onClick={() => setProposalAccepted(true)}
                                >
                                    ஆம், இன்ஷா அல்லாஹ்! 🤍
                                </button>
                                <button
                                    id="no-btn"
                                    className="btn-soft px-4 py-2"
                                    onMouseEnter={moveNoButton}
                                    onClick={moveNoButton}
                                    style={noBtnPos}
                                >
                                    இன்னும் கொஞ்சம் யோசிக்கிறேன் 😅
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Dua Footer Section */}
            <section className="py-5" style={{ background: 'var(--deep-violet)' }}>
                <div className="container text-center text-white">
                    <p className="arabic-text fs-1 mb-4" style={{ color: 'var(--sky-light)' }}>رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ</p>
                    <p className="fs-4 tamil-text mb-2">"எங்கள் இறைவனே! எங்கள் துணைகளிலிருந்தும், எங்கள் சந்ததியினரிலிருந்தும் எங்களுக்குக் கண் குளிர்ச்சியைத் தந்தருள்வாயாக!"</p>
                    <p className="text-light small opacity-75">(25:74)</p>
                </div>
            </section>

            <footer className="py-4 text-center">
                <p className="opacity-50 tamil-text">அல்லாஹ்வின் திருப்திக்காக உருவான காதல் 🤍 | 2026</p>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
