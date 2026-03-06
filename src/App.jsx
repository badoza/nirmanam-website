import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Building2, Hammer, KeySquare, 
  ShieldCheck, Clock, Eye, ChevronRight, Phone, 
  Mail, MapPin, Instagram, ArrowUpRight, Newspaper
} from 'lucide-react';

// Custom Colors matching the logo
const COLORS = {
  primary: '#11223F', // Dark Blue
  gold: '#C5A059',    // Gold
  light: '#F8F9FA',
  white: '#FFFFFF',
  dark: '#0A1526'
};

const FEEDS = [
  'https://kannada.oneindia.com/rss/feeds/kannada-news-fb.xml',
  'https://www.prajavani.net/rssfeeds/karnataka.xml',
  'https://kannada.news18.com/rss/state.xml'
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loadingNews, setLoadingNews] = useState(true);

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch News Logic
  useEffect(() => {
    async function fetchLiveNews() {
      setLoadingNews(true);
      const proxy = "https://api.rss2json.com/v1/api.json?rss_url=";
      let items = [];
      for (let url of FEEDS) {
        try {
          const res = await fetch(proxy + encodeURIComponent(url));
          const data = await res.json();
          if (data.status === 'ok') items = [...items, ...data.items];
        } catch (e) { 
          console.error("Source Error fetching news"); 
        }
      }
      items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setNews(items.slice(0, 10)); // Keeping it to 10 for performance on mobile view
      setLoadingNews(false);
    }

    fetchLiveNews();
    const interval = setInterval(fetchLiveNews, 3600000); // 1-Hour Auto Refresh
    return () => clearInterval(interval);
  }, []);

  const toggleBodyScroll = (disable) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
  };

  const openNews = (item) => {
    setSelectedNews(item);
    toggleBodyScroll(true);
  };

  const closeNews = () => {
    setSelectedNews(null);
    toggleBodyScroll(false);
  };

  const services = [
    { title: 'Residential Construction', icon: <Home size={32} />, desc: 'Building dream homes with unmatched quality and modern aesthetics.' },
    { title: 'Commercial Projects', icon: <Building2 size={32} />, desc: 'State-of-the-art commercial spaces designed for efficiency and growth.' },
    { title: 'Renovation', icon: <Hammer size={32} />, desc: 'Transforming existing spaces into contemporary masterpieces.' },
    { title: 'Turnkey Solutions', icon: <KeySquare size={32} />, desc: 'End-to-end project management from concept to final handover.' }
  ];

  const values = [
    { title: 'Quality', icon: <ShieldCheck size={40} color={COLORS.gold} />, desc: 'Premium materials and superior craftsmanship.' },
    { title: 'Transparency', icon: <Eye size={40} color={COLORS.gold} />, desc: 'Clear communication and honest pricing every step of the way.' },
    { title: 'Timely Delivery', icon: <Clock size={40} color={COLORS.gold} />, desc: 'Strict adherence to schedules without compromising quality.' }
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-4'} `}
           style={{ backgroundColor: scrolled ? COLORS.primary : 'rgba(17, 34, 63, 0.95)' }}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex flex-col cursor-pointer">
            <h1 className="text-2xl md:text-3xl font-serif tracking-widest font-bold" style={{ color: COLORS.gold }}>
              NIRMANAM
            </h1>
            <p className="text-[10px] md:text-xs tracking-[0.2em] text-white mt-1 border-t border-white/30 pt-1">
              DESIGN & CONSTRUCTIONS
            </p>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-white tracking-wide">
            <a href="#home" className="hover:text-[#C5A059] transition-colors">HOME</a>
            <a href="#about" className="hover:text-[#C5A059] transition-colors">ABOUT</a>
            <a href="#services" className="hover:text-[#C5A059] transition-colors">SERVICES</a>
            <a href="#news" className="hover:text-[#C5A059] transition-colors">UPDATES</a>
            <a href="#contact" 
               className="px-5 py-2 rounded-full border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all">
              CONTACT US
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full shadow-2xl border-t border-white/10 flex flex-col"
               style={{ backgroundColor: COLORS.primary }}>
            {['Home', 'About', 'Services', 'News', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-6 py-4 text-white font-medium border-b border-white/5 hover:bg-white/5 flex justify-between items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
                <ChevronRight size={16} style={{ color: COLORS.gold }} />
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
             style={{ 
               backgroundImage: `url('https://images.unsplash.com/photo-1541881451970-179dc8cceb55?q=80&w=2070&auto=format&fit=crop')`,
               backgroundPosition: 'center 30%'
             }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10, 21, 38, 0.7)' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-block mb-6 px-4 py-1 border rounded-full text-sm font-semibold tracking-wider"
               style={{ borderColor: COLORS.gold, color: COLORS.gold }}>
            BUILDING YOUR DREAMS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Excellence in <br/> <span style={{ color: COLORS.gold }}>Design & Construction</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We undertake residential, commercial, renovation, and turnkey construction projects with a focus on quality, transparency, and timely delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="px-8 py-4 rounded font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
               style={{ backgroundColor: COLORS.gold }}>
              Our Services
            </a>
            <a href="https://www.instagram.com/nirmanam.constructions?igsh=ZTdhZDdwb2k2cjVn" 
               target="_blank" rel="noreferrer"
               className="px-8 py-4 rounded font-bold text-white border-2 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
               style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              <Instagram size={20} /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Nirmanam?</h3>
            <div className="w-20 h-1 mx-auto rounded" style={{ backgroundColor: COLORS.gold }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow text-center group">
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold mb-3" style={{ color: COLORS.primary }}>{val.title}</h4>
                <p className="text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20" style={{ backgroundColor: COLORS.light }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h3>
              <div className="w-20 h-1 rounded" style={{ backgroundColor: COLORS.gold }}></div>
            </div>
            <p className="text-gray-600 max-w-md md:text-right">
              Delivering comprehensive construction and design solutions tailored to your unique requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div key={idx} 
                   className="group relative overflow-hidden rounded-xl p-8 transition-all hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-2xl bg-white border border-gray-100">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity" 
                     style={{ color: COLORS.primary }}>
                  {service.icon}
                </div>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-md text-white"
                     style={{ backgroundColor: COLORS.gold }}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3" style={{ color: COLORS.primary }}>{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                
                <div className="mt-6 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ color: COLORS.gold }}>
                  Learn More <ArrowUpRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local News Feed Section */}
      <section id="news" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Latest Local Updates</h3>
            <p className="text-gray-500 mb-4">Stay updated with regional news and happenings.</p>
            <div className="w-20 h-1 mx-auto rounded" style={{ backgroundColor: COLORS.gold }}></div>
          </div>

          {loadingNews ? (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: COLORS.gold }}></div>
             </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {news.map((item, idx) => {
                const img = item.thumbnail || (item.enclosure && item.enclosure.link) || 'https://via.placeholder.com/400?text=News';
                return (
                  <div key={idx} 
                       onClick={() => openNews({...item, image: img})}
                       className="snap-start shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="h-48 overflow-hidden">
                      <img src={img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">{item.author || "News Update"}</p>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-3 leading-snug group-hover:text-[#C5A059] transition-colors">{item.title}</h4>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* News Reader Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100" style={{ backgroundColor: COLORS.primary }}>
              <span className="font-bold text-white flex items-center gap-2">
                <Newspaper size={18} style={{ color: COLORS.gold }} />
                {selectedNews.author || "ಕರ್ನಾಟಕ ಟೈಮ್ಸ್"}
              </span>
              <button onClick={closeNews} className="text-white hover:text-[#C5A059] p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">{selectedNews.title}</h2>
              <img src={selectedNews.image} alt="News" className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-sm" />
              
              <div 
                className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedNews.description }} 
              />
              
              <div className="text-center mt-auto border-t border-gray-100 pt-6">
                <a href={selectedNews.link} target="_blank" rel="noreferrer" 
                   className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                   style={{ backgroundColor: COLORS.gold }}>
                  ಮೂಲ ಲೇಖನ ಓದಿ (Read Full Article) <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact / Footer Section */}
      <footer id="contact" style={{ backgroundColor: COLORS.dark }} className="text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="flex flex-col mb-6">
                <h1 className="text-3xl font-serif tracking-widest font-bold" style={{ color: COLORS.gold }}>
                  NIRMANAM
                </h1>
                <p className="text-xs tracking-[0.2em] text-gray-400 mt-1">
                  DESIGN & CONSTRUCTIONS
                </p>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                Building trust through quality, transparency, and timely delivery. We turn your vision into structurally sound and aesthetically pleasing realities.
              </p>
              <a href="https://www.instagram.com/nirmanam.constructions?igsh=ZTdhZDdwb2k2cjVn" target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 text-white hover:text-[#C5A059] transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <Instagram size={20} /> @nirmanam.constructions
              </a>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 tracking-wide uppercase" style={{ color: COLORS.gold }}>Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">Local Updates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 tracking-wide uppercase" style={{ color: COLORS.gold }}>Contact Info</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-1 flex-shrink-0" style={{ color: COLORS.gold }} />
                  <span>+91 98765 43210 <br/> +91 98765 01234</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="flex-shrink-0" style={{ color: COLORS.gold }} />
                  <span>info@nirmanamconstructions.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={24} className="mt-1 flex-shrink-0" style={{ color: COLORS.gold }} />
                  <span>123, Builders Boulevard, Main Road, Karnataka, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Nirmanam Design & Constructions. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Mobile & Web</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
