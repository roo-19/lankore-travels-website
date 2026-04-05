const fs = require('fs');
const path = require('path');

const destinations = [
    {
        id: 'sigiriya',
        name: 'Sigiriya',
        desc: 'The ancient rock fortress and palace ruin, a masterpiece of ancient engineering and art.',
        fullDesc: 'Rising dramatically from the central plains, the enigmatic rocky outcrop of Sigiriya is perhaps Sri Lanka\'s single most dramatic sight. Known as the Lion Rock, it was the short-lived capital of King Kasyapa. Ascend past the fascinating frescoes of "maidens" to the ruined palace at the summit for breathtaking 360-degree views of the surrounding jungle and water gardens below.',
        image: '../src/assets/images/sigiriyacard.png',
        places: ['Sigiriya Rock Fortress', 'Pidurangala Rock', 'Sigiriya Museum', 'Water Gardens', 'Mirror Wall']
    },
    {
        id: 'kandy',
        name: 'Kandy',
        desc: 'The cultural capital hidden amidst rolling hills, home to the sacred Temple of the Tooth.',
        fullDesc: 'Set around an attractive man-made lake in scenic hill country, Kandy is Sri Lanka\'s cultural capital and the last seat of the Sinhalese kings. It is most famous for the Temple of the Sacred Tooth Relic, one of Buddhism\'s most sacred shrines. Experience traditional Kandyan dancing, stroll through the royal botanical gardens, and soak in the rich heritage.',
        image: '../src/assets/images/kandyhero.png',
        places: ['Temple of the Sacred Tooth Relic', 'Royal Botanical Gardens, Peradeniya', 'Kandy Lake', 'Bahirawakanda Vihara Buddha Statue', 'Udawatta Kele Sanctuary']
    },
    {
        id: 'ella',
        name: 'Ella',
        desc: 'A charming mountain village famous for its dramatic scenic views and lush tea plantations.',
        fullDesc: 'Ella is a small, laid-back town nestled in the mist-shrouded hills of Sri Lanka\'s tea country. Known for its cool climate, spectacular views through the "Ella Gap," and relaxed atmosphere, it\'s a haven for nature lovers and hikers. The journey to Ella via the iconic blue train is often considered one of the most beautiful railway journeys in the world.',
        image: '../src/assets/images/ellacard.png',
        places: ['Nine Arches Bridge', 'Little Adam\'s Peak', 'Ella Rock', 'Ravana Falls', 'Halpewatte Tea Factory']
    },
    {
        id: 'yala',
        name: 'Yala',
        desc: 'Experience thrilling safaris with high chances of spotting majestic leopards and elephants.',
        fullDesc: 'Yala National Park is Sri Lanka\'s premier wildlife destination, boasting one of the highest densities of leopards in the world. This vast expanse of dry woodland and open patches of grasslands fringes the Indian Ocean, creating a unique habitat. Alongside the elusive leopard, you can spot herds of elephants, sloth bears, crocodiles, and a spectacular array of birdlife.',
        image: '../src/assets/images/yalacard.png',
        places: ['Yala National Park Safari', 'Sithulpawwa Rock Temple', 'Magul Maha Viharaya', 'Kirinda Beach', 'Kumana National Park (nearby)']
    },
    {
        id: 'colombo',
        name: 'Colombo',
        desc: 'The bustling commercial capital blending colonial architecture with modern skyscrapers.',
        fullDesc: 'Colombo, the vibrant gateway to Sri Lanka, is a fascinating mix of old and new. Colonial-era buildings stand shoulder-to-shoulder with modern office blocks, while traditional street markets operate in the shadow of luxury hotels. Discover the city\'s rich history in the Fort district, stroll along the Galle Face Green at sunset, and enjoy a thriving culinary scene.',
        image: '../src/assets/images/colombocard.png',
        places: ['Galle Face Green', 'Gangaramaya Temple', 'National Museum of Colombo', 'Pettah Floating Market', 'Independence Memorial Hall']
    },
    {
        id: 'galle',
        name: 'Galle',
        desc: 'A historic coastal city known for its beautiful Dutch Fort and timeless colonial architecture.',
        fullDesc: 'The historic port city of Galle is best known for its magnificent 17th-century Dutch Fort, a UNESCO World Heritage site. Walking through its narrow, cobbled streets feels like stepping back in time, with Dutch-colonial buildings housing boutique hotels, chic cafes, and art galleries. The fort\'s robust ramparts offer fantastic views of the Indian Ocean, especially at sunset.',
        image: '../src/assets/images/gallecard.png',
        places: ['Galle Dutch Fort', 'Galle Lighthouse', 'National Maritime Museum', 'Unawatuna Beach', 'Japanese Peace Pagoda']
    },
    {
        id: 'nuwara-eliya',
        name: 'Nuwara Eliya',
        desc: 'Often called "Little England", featuring cool climates, waterfalls, and vast tea estates.',
        fullDesc: 'Nuwara Eliya, nestled in the heart of the tea country, was the favored hill station of the British during the colonial era. Known affectionately as "Little England," the town retains a distinct British countryside feel, complete with colonial-style bungalows, well-kept gardens, and a golf course. The surrounding rolling hills are covered in emerald-green tea plantations.',
        image: '../src/assets/images/nuwaraeliyacard.png',
        places: ['Gregory Lake', 'Horton Plains National Park (World\'s End)', 'Victoria Park', 'Pedro Tea Estate', 'Lover\'s Leap Waterfall']
    },
    {
        id: 'anuradhapura',
        name: 'Anuradhapura',
        desc: 'The first ancient capital, filled with monumental dagobas and sacred bodhi trees.',
        fullDesc: 'Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its beautifully preserved ruins of ancient Sinhala civilization. It serves as a major center of Sri Lankan Buddhism. The city is defined by its massive, bell-shaped stupas (dagobas) built of small sun-dried bricks, ancient pools, and the sacred Sri Maha Bodhi tree, grown from a cutting of the tree under which Buddha achieved enlightenment.',
        image: '../src/assets/images/anuradhapuracard.png',
        places: ['Sri Maha Bodhi', 'Ruwanwelisaya Dagoba', 'Jetavanaramaya', 'Abhayagiri Dagoba', 'Isurumuniya Temple']
    },
    {
        id: 'knuckles',
        name: 'Knuckles',
        desc: 'A rugged mountain range perfect for hiking, boasting unique biodiversity and misty peaks.',
        fullDesc: 'The Knuckles Mountain Range, so named because its peaks resemble the knuckles of a clenched fist, is a UNESCO World Heritage site and a paradise for hikers and nature enthusiasts. This rugged, mist-covered region features a unique mini-ecosystem, home to a high percentage of endemic flora and fauna, dramatic waterfalls, and breathtaking viewpoints off the beaten path.',
        image: '../src/assets/images/knucklescard.png',
        places: ['Mini World\'s End', 'Corbet\'s Gap', 'Meemure Village', 'Bambarella Waterfalls', 'Knuckles Peak Hike']
    },
    {
        id: 'polonnaruwa',
        name: 'Polonnaruwa',
        desc: 'The medieval capital showcasing well-preserved ruins, ancient statues, and vast reservoirs.',
        fullDesc: 'Following the decline of Anuradhapura, Polonnaruwa became the second royal capital of Sri Lanka. Today, it remains one of the best-planned archeological relic sites in the country, testifying to the discipline and greatness of the Kingdom\'s first rulers. Explore the monumental Parakrama Samudra reservoir, the stunning Gal Vihara statues carved from solid granite, and the extensive palace ruins.',
        image: '../src/assets/images/polonnaruwacard.png',
        places: ['Gal Vihara', 'Parakrama Samudra', 'Royal Palace Ruins', 'Vatadage', 'Rankoth Vehera']
    },
    {
        id: 'dambulla',
        name: 'Dambulla',
        desc: 'Famous for its magnificent cave temple complex filled with stunning ancient Buddhist statues.',
        fullDesc: 'Dambulla is renowned for the Golden Temple of Dambulla, the largest and best-preserved cave temple complex in Sri Lanka. The five main caves contain over 150 stunning Buddha statues and ceilings completely covered in intricate religious murals. Climbing to the caves offers panoramic views of the surrounding flat lands and the dramatic rock fortress of Sigiriya in the distance.',
        image: '../src/assets/images/dambullacard.png',
        places: ['Dambulla Royal Cave Temple', 'Golden Temple', 'Popham\'s Arboretum', 'Ibbankatuwa Megalithic Tombs', 'Dambulla Produce Market']
    },
    {
        id: 'jaffna',
        name: 'Jaffna',
        desc: 'The northern cultural hub featuring distinct cuisine, colorful Hindu temples, and colonial forts.',
        fullDesc: 'Located at the northernmost point of Sri Lanka, Jaffna offers a completely different experience from the rest of the island. Recovering from decades of isolation, the city is a vibrant hub of Tamil culture. Visitors are drawn to its magnificent Hindu temples, the imposing starlike Jaffna Fort overlooking the lagoon, the distinctive spicy cuisine, and the nearby unspoiled islands like Delft.',
        image: '../src/assets/images/jaffnacard.png',
        places: ['Nallur Kandaswamy Temple', 'Jaffna Fort', 'Casuarina Beach', 'Jaffna Public Library', 'Delft Island']
    },
];

const template = (dest) => {
    // Read the destinations images directory
    const dir = path.join(__dirname, 'src', 'assets', 'images', 'destinations');
    let images = [];
    try {
        const files = fs.readdirSync(dir);
        images = files.filter(f => f.toLowerCase().startsWith(dest.id.toLowerCase() + '') && (f.endsWith('.png') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.endsWith('.JPG')));
    } catch(e) { console.error(e); }

    // If no images found, fallback to something
    if (images.length === 0) images = ['dummy.png'];

    const slidesHtml = images.map((img, index) => {
        const activeClass = index === 0 ? ' active' : '';
        return `            <div class="slide${activeClass}" style="background-image: url('../src/assets/images/destinations/${img}');"></div>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${dest.name} | Lankore Travels</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Specific page styles for destinations */
        .dest-hero {
            position: relative;
            height: 60vh;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
        }
        
        /* The slider elements */
        .hero-slider {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
        }
        .slide {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 0.8s ease-in-out, transform 4s ease-in-out;
            transform: scale(1.05);
        }
        .slide.active {
            opacity: 1;
            transform: scale(1);
        }
        .hero-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(11,43,71,0.8) 100%);
            z-index: 2;
        }

        .dest-hero-content {
            position: relative;
            z-index: 3;
            padding-top: 80px;
            max-width: 800px;
            margin: 0 auto;
        }
        .dest-hero h1 {
            font-size: 4.5rem;
            color: white;
            margin-bottom: 1rem;
            text-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .dest-subtitle {
            color: var(--accent);
            font-size: 1.25rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 500;
        }
        
        .dest-info-section {
            padding: 5rem 0;
            background-color: var(--bg-light);
        }
        
        .dest-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
        }
        
        @media (max-width: 900px) {
            .dest-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .dest-hero h1 {
                font-size: 3rem;
            }
        }
        
        .about-text h2 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 1rem;
        }
        
        .about-text h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background-color: var(--accent);
        }
        
        .about-text p {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #555;
            margin-bottom: 1.5rem;
        }
        
        .places-card {
            background: white;
            border-radius: 16px;
            padding: 3rem;
            box-shadow: 0 15px 40px rgba(0,0,0,0.05);
            border-top: 5px solid var(--accent);
        }
        
        .places-card h3 {
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }
        
        .places-list {
            list-style: none;
            padding: 0;
        }
        
        .places-list li {
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            font-size: 1.1rem;
            color: #444;
        }
        
        .places-list li:last-child {
            border-bottom: none;
        }
        
        .places-list li i {
            color: var(--accent);
            margin-right: 15px;
            font-size: 1.2rem;
        }
        
        .dest-action {
            margin-top: 4rem;
            text-align: center;
            padding: 5rem 3rem;
            background: linear-gradient(135deg, var(--bg-light) 0%, #e0ece4 100%);
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(30, 70, 49, 0.08);
            border: 1px solid rgba(30, 70, 49, 0.1);
        }
        
        .dest-action-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        
        /* Override btn-outline for light background */
        .dest-action-buttons .btn-outline {
            color: var(--color-primary);
            border-color: rgba(11, 43, 71, 0.3);
        }
        
        .dest-action-buttons .btn-outline:hover {
            background-color: var(--color-primary);
            color: white;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <div class="logo">
                <a href="/index.html#home"><img src="../src/assets/images/logo1.png" alt="Lankore Travels Logo" style="height: 60px; width: auto;"></a>
            </div>
            <div class="nav-links">
                <a href="/index.html#home">Home</a>
                <a href="/index.html#destinations">Destinations</a>
                <a href="/index.html#tailor-made">Tailor Made Tours</a>
                <a href="/transports.html">Transports</a>
                <a href="/about-us.html">About Us</a>
                <a href="/index.html#blog">Blog</a>
                <a href="/contact-us.html">Contact Us</a>
            </div>
            <div class="nav-actions">
                <a href="/contact-us.html" class="btn btn-primary btn-nav">Book Tour</a>
                <div class="hamburger"><i class="fas fa-bars"></i></div>
            </div>
        </div>
    </nav>
    <div class="mobile-menu">
        <div class="close-menu"><i class="fas fa-times"></i></div>
        <div class="mobile-links">
            <a href="/index.html#home">Home</a>
            <a href="/index.html#destinations">Destinations</a>
            <a href="/index.html#tailor-made">Tailor Made Tours</a>
            <a href="/transports.html">Transports</a>
            <a href="/about-us.html">About Us</a>
            <a href="/index.html#blog">Blog</a>
            <a href="/contact-us.html">Contact Us</a>
        </div>
    </div>

    <!-- Page Header (Image Banner with Slider) -->
    <header class="dest-hero reveal">
        <div class="hero-slider">
${slidesHtml}
        </div>
        <div class="hero-overlay"></div>
        <div class="dest-hero-content">
            <span class="dest-subtitle">Sri Lanka Destinations</span>
            <h1>${dest.name}</h1>
            <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">${dest.desc}</p>
        </div>
    </header>

    <!-- Content Section -->
    <section class="dest-info-section">
        <div class="container reveal">
            <div class="dest-grid">
                
                <!-- Left: Full Description -->
                <div class="about-text">
                    <h2>About ${dest.name}</h2>
                    <p>${dest.fullDesc}</p>
                    <p>Visiting ${dest.name} offers a unique blend of heritage, natural beauty, and unforgettable experiences that perfectly embody the spirit of Sri Lanka.</p>
                </div>
                
                <!-- Right: Places to Visit -->
                <div class="places-card">
                    <h3>Top Places to Visit</h3>
                    <ul class="places-list">
                        ${dest.places.map(place => `<li><i class="fa-solid fa-location-dot"></i> ${place}</li>`).join('')}
                    </ul>
                </div>
                
            </div>
            
            <!-- Bottom CTA -->
            <div class="dest-action reveal">
                <h2 style="font-family: 'Playfair Display', serif; color: var(--color-secondary); font-size: 2.5rem; margin-bottom: 1rem;">Ready to experience ${dest.name}?</h2>
                <p style="color: #555; margin-bottom: 2.5rem; font-size: 1.2rem;">Include this marvelous destination in your tailor-made Sri Lankan itinerary today.</p>
                <div class="dest-action-buttons">
                    <a href="/index.html#home" class="btn btn-outline" style="padding: 15px 30px; font-size: 1.1rem;"><i class="fas fa-home" style="margin-right: 8px;"></i> Back to Home</a>
                    <a href="/index.html#destinations" class="btn btn-outline" style="padding: 15px 30px; font-size: 1.1rem;"><i class="fas fa-map-marked-alt" style="margin-right: 8px;"></i> All Destinations</a>
                    <a href="/contact-us.html" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.1rem; background-color: var(--color-secondary); border-color: var(--color-secondary);"><i class="fas fa-paper-plane" style="margin-right: 8px;"></i> Plan Your Tour</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col brand-col">
                    <div class="logo">
                        <a href="/index.html#home"><img src="../src/assets/images/logo1.png" alt="Lankore Travels Logo" style="height: 180px; width: auto; margin-bottom: 1rem;"></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="/index.html#home">Home</a></li>
                        <li><a href="/about-us.html">About Us</a></li>
                        <li><a href="/index.html#destinations">Destinations</a></li>
                        <li><a href="/transports.html">Transports</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <script type="module" src="/src/main.js"></script>
</body>
</html>`;
};

destinations.forEach(dest => {
    fs.writeFileSync(path.join(__dirname, 'destinations', dest.id + '.html'), template(dest));
});

console.log('Created 12 detailed destination files with auto-sliding hero sections.');
