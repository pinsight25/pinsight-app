import React, { useState } from 'react';
import { Home, Search, Plus, Settings, MapPin, ThumbsUp, ThumbsDown, MessageCircle, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';

const mockPosts = [
  {
    id: "1",
    anonymousDisplayName: "LocalResident_4738",
    pinCode: "600001",
    area: "T. Nagar",
    city: "Chennai",
    content: "Living here for 3 years. Great connectivity to markets and restaurants. The area is generally safe but can get crowded during evenings. Water supply is consistent. Metro connectivity is excellent.",
    upvotes: 12,
    downvotes: 2,
    commentCount: 5,
    timeAgo: "2 hours ago",
    tags: ["connectivity", "safety", "water"]
  },
  {
    id: "2", 
    anonymousDisplayName: "AreaExpert_2901",
    pinCode: "600028",
    area: "Velachery",
    city: "Chennai",
    content: "Just moved here last month. The rent prices are fair compared to nearby areas. IT corridor access is great. However, traffic during peak hours can be challenging. Good schools and hospitals nearby.",
    upvotes: 8,
    downvotes: 1,
    commentCount: 3,
    timeAgo: "5 hours ago",
    tags: ["rent", "IT corridor", "traffic"]
  },
  {
    id: "3",
    anonymousDisplayName: "LocalGuide_1234",
    pinCode: "600096", 
    area: "OMR",
    city: "Chennai",
    content: "Lived here for 10+ years on OMR. Seen lots of development. New infrastructure coming up. Great for IT professionals but monsoon flooding can be an issue in some pockets.",
    upvotes: 15,
    downvotes: 0,
    commentCount: 8,
    timeAgo: "1 day ago",
    tags: ["IT professionals", "infrastructure", "flooding"]
  }
];

const mockLocationData = {
  pinCode: "600001",
  area: "T. Nagar",
  city: "Chennai",
  safetyMetrics: {
    floodRisk: "Low",
    airQuality: "Moderate",
    crimeRate: "Safe", 
    waterAvailability: "Good"
  },
  nearbyEssentials: [
    { type: "ATM", distance: 0.5, count: 8 },
    { type: "Grocery", distance: 0.3, count: 15 },
    { type: "Pharmacy", distance: 0.8, count: 5 },
    { type: "School", distance: 1.2, count: 12 }
  ],
  totalPosts: 34
};

const indianCities = [
  { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "bangalore", name: "Bangalore", state: "Karnataka" },
  { id: "delhi", name: "Delhi", state: "Delhi" }
];

const BottomNavigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'post', icon: Plus, label: 'Post' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentPage === id 
                ? 'text-black bg-gray-100' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  const [votes, setVotes] = useState({ upvotes: post.upvotes, downvotes: post.downvotes });
  const [userVote, setUserVote] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const handleVote = (type) => {
    if (userVote === type) {
      setVotes(prev => ({
        ...prev,
        [type === 'up' ? 'upvotes' : 'downvotes']: prev[type === 'up' ? 'upvotes' : 'downvotes'] - 1
      }));
      setUserVote(null);
    } else {
      setVotes(prev => {
        const newVotes = { ...prev };
        if (userVote) {
          newVotes[userVote === 'up' ? 'upvotes' : 'downvotes'] -= 1;
        }
        newVotes[type === 'up' ? 'upvotes' : 'downvotes'] += 1;
        return newVotes;
      });
      setUserVote(type);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <div>
            <span className="font-semibold text-black">{post.anonymousDisplayName}</span>
            <span className="text-gray-500 text-sm ml-2">{post.timeAgo}</span>
          </div>
        </div>
        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
          {post.pinCode}
        </span>
      </div>

      <div className="mb-3">
        <span className="text-sm text-gray-600 font-medium">{post.area}, {post.city}</span>
      </div>
      
      <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              userVote === 'up' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ThumbsUp size={16} />
            <span className="text-sm font-medium">{votes.upvotes}</span>
          </button>
          
          <button
            onClick={() => handleVote('down')}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              userVote === 'down' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ThumbsDown size={16} />
            <span className="text-sm">{votes.downvotes}</span>
          </button>
        </div>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <MessageCircle size={16} />
          <span className="text-sm">{post.commentCount} comments</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs">A</span>
                </div>
                <span className="font-medium text-sm">Anonymous_1234</span>
                <span className="text-gray-500 text-xs ml-2">1h ago</span>
              </div>
              <p className="text-sm text-gray-700">Thanks for the detailed review! Very helpful.</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black"
              />
              <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = ({ setCurrentPage }) => {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = mockPosts.filter(post => {
    const cityMatch = post.city === selectedCity;
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => 
      post.tags?.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
    );
    return cityMatch && tagMatch;
  });

  const popularTags = ['Safety', 'Connectivity', 'Traffic', 'Water Supply', 'Schools'];

  const handleTagFilter = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-black mb-1">Community Insights</h1>
        <p className="text-gray-500 text-sm mb-4">Anonymous reviews from real residents</p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-3">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path 
                    d="M50 8 C32 8, 18 22, 18 40 C18 58, 50 88, 50 88 C50 88, 82 58, 82 40 C82 22, 68 8, 50 8 Z" 
                    fill="#000000"
                  />
                  <circle 
                    cx="50" 
                    cy="40" 
                    r="13" 
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="font-medium text-gray-800 bg-transparent border-none focus:outline-none"
              >
                {indianCities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
            >
              {showFilters ? 'Hide Filters' : 'Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Filter by topics:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagFilter(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-gray-500 mt-2 hover:text-gray-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredPosts.length} posts in {selectedCity}
          </p>
          <button 
            onClick={() => setCurrentPage('search')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Change Location
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No posts found for your filters</p>
            <button
              onClick={() => setSelectedTags([])}
              className="text-black hover:text-gray-700 font-medium transition-colors"
            >
              Clear filters to see all posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const VerificationServices = ({ onBack, onSelectPackage, locationData }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-black">Professional Verification</h2>
          <p className="text-sm text-gray-600">{locationData.area}, {locationData.city}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-black mb-4">Why Professional Verification?</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <div>
              <strong>Before investing ₹50+ lakhs,</strong> get ground reality from local experts who know the area inside-out.
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-blue-600 text-xs font-bold">✓</span>
            </div>
            <div>
              <strong>Unbiased insights:</strong> No vested interests, just honest assessments from anonymous community + professional verification.
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-green-600 text-xs font-bold">₹</span>
            </div>
            <div>
              <strong>Avoid costly mistakes:</strong> Discover hidden issues before signing agreements or transferring money.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-black mb-4">Perfect For:</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">🏠</span>
            <span className="text-sm font-medium">Planning to buy or rent in this area</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">💧</span>
            <span className="text-sm font-medium">Concerned about flooding, water supply, or power issues</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">📋</span>
            <span className="text-sm font-medium">Need legal document verification and compliance check</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">🔍</span>
            <span className="text-sm font-medium">Want to verify online reviews with ground reality</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-black mb-3">Success Story</h3>
        <div className="text-sm text-gray-700 italic">
          "I was about to buy a flat in Velachery for ₹85 lakhs. PinSight verification revealed major drainage issues and legal complications. Saved me from a huge mistake! Worth every rupee."
        </div>
        <div className="text-xs text-gray-500 mt-2">- Anonymous Buyer, Chennai</div>
      </div>

      <button 
        onClick={() => onSelectPackage()}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
      >
        Choose Your Verification Package
      </button>
    </div>
  );
};

const PackageSelection = ({ onBack, onSelectPackage, locationData }) => {
  const packages = [
    {
      id: 'basic',
      name: 'Quick Reality Check',
      price: '₹499',
      popular: false,
      features: [
        'On-site photos & videos',
        'Basic safety assessment (water, power, flooding)',
        'Neighborhood overview',
        'Written summary report',
        '24-48 hour delivery'
      ]
    },
    {
      id: 'standard',
      name: 'Smart Investment Research',
      price: '₹999',
      popular: true,
      features: [
        'Everything in Quick Reality Check',
        'Infrastructure deep-dive (roads, transport)',
        'Market rate analysis (rent/buy comparison)',
        'Local amenities mapping',
        '15-minute phone consultation',
        '2-3 day comprehensive report'
      ]
    },
    {
      id: 'premium',
      name: 'Complete Due Diligence',
      price: '₹1,999',
      popular: false,
      features: [
        'Everything in Smart Investment Research',
        'Legal document verification',
        '30-minute lawyer consultation',
        'Investment advice (buy vs rent analysis)',
        'Future development insights',
        'Detailed video walkthrough',
        'Priority support & 3-5 day delivery'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-black">Choose Your Package</h2>
          <p className="text-sm text-gray-600">{locationData.area}, {locationData.city}</p>
        </div>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-lg p-6 shadow-sm border-2 ${pkg.popular ? 'border-green-500' : 'border-gray-200'} relative`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">{pkg.name}</h3>
                <div className="text-2xl font-bold text-green-600 mt-1">{pkg.price}</div>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onSelectPackage(pkg)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                pkg.popular 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              Select {pkg.name}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-blue-800 font-medium">💡 Smart Tip</div>
          <div className="text-xs text-blue-700 mt-1">
            Most buyers choose "Smart Investment Research" for the perfect balance of insights and value.
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingForm = ({ locationData, selectedPackage, onBack, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    specificRequirements: '',
    agreedToTerms: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.preferredDate && formData.agreedToTerms) {
      setShowConfirmation(true);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.preferredDate && formData.agreedToTerms;

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 text-gray-600">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-black">Booking Confirmed!</h2>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Verification Request Submitted</h3>
            <p className="text-gray-600">We'll contact you within 24 hours to confirm your appointment</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Package:</span>
              <span className="font-medium">{selectedPackage?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{locationData.area}, {locationData.city}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Service Fee:</span>
              <span className="font-medium text-green-600">{selectedPackage?.price}</span>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Location Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-black">Complete Your Booking</h2>
          <p className="text-sm text-gray-600">{selectedPackage?.name} - {selectedPackage?.price}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-black mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements</label>
            <textarea
              value={formData.specificRequirements}
              onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
              placeholder="Any specific areas or concerns you'd like us to focus on..."
              className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black resize-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the terms. Payment will be collected after report delivery.
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Booking - {selectedPackage?.price}
          </button>
        </div>
      </div>
    </div>
  );
};

const PinSearch = ({ setCurrentPage }) => {
  const [pinCode, setPinCode] = useState(['', '', '', '', '', '']);
  const [showInsights, setShowInsights] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newPin = [...pinCode];
      newPin[index] = value;
      setPinCode(newPin);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleGetInsights = () => {
    const fullPin = pinCode.join('');
    if (fullPin.length === 6) {
      setShowInsights(true);
    }
  };

  const handleBackToSearch = () => {
    setShowInsights(false);
    setShowServices(false);
    setShowPackages(false);
    setShowBooking(false);
    setSelectedPackage(null);
    setPinCode(['', '', '', '', '', '']);
  };

  const handleBookVerification = () => {
    setShowServices(true);
  };

  const handleSelectPackage = (pkg = null) => {
    if (pkg) {
      setSelectedPackage(pkg);
      setShowBooking(true);
    } else {
      setShowPackages(true);
    }
  };

  const handleBookingComplete = () => {
    alert('Booking submitted successfully! We will contact you within 24 hours.');
    setShowBooking(false);
    setShowServices(false);
    setShowPackages(false);
    setShowInsights(false);
    setSelectedPackage(null);
    setPinCode(['', '', '', '', '', '']);
    setCurrentPage('home');
  };

  if (showBooking) {
    return (
      <BookingForm 
        locationData={mockLocationData}
        selectedPackage={selectedPackage}
        onBack={() => setShowBooking(false)}
        onBookingComplete={handleBookingComplete}
      />
    );
  }

  if (showPackages) {
    return (
      <PackageSelection 
        locationData={mockLocationData}
        onBack={() => setShowPackages(false)}
        onSelectPackage={handleSelectPackage}
      />
    );
  }

  if (showServices) {
    return (
      <VerificationServices 
        locationData={mockLocationData}
        onBack={() => setShowServices(false)}
        onSelectPackage={handleSelectPackage}
      />
    );
  }

  if (showInsights) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-20">
        <button 
          onClick={handleBackToSearch}
          className="mb-4 text-black hover:text-gray-700 flex items-center transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Search
        </button>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black mb-2">Location Insights</h2>
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin size={16} className="mr-1" />
            <span className="font-medium">{mockLocationData.area}, {mockLocationData.city}</span>
          </div>
          <p className="text-sm text-gray-500">{mockLocationData.totalPosts} community posts available</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-3">Safety Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">💧</div>
              <div className="text-sm text-gray-600 mb-1">Flood Risk</div>
              <div className="font-semibold text-green-600">{mockLocationData.safetyMetrics.floodRisk}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">🌬️</div>
              <div className="text-sm text-gray-600 mb-1">Air Quality</div>
              <div className="font-semibold text-green-600">{mockLocationData.safetyMetrics.airQuality}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-sm text-gray-600 mb-1">Crime Rate</div>
              <div className="font-semibold text-green-600">{mockLocationData.safetyMetrics.crimeRate}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">💧</div>
              <div className="text-sm text-gray-600 mb-1">Water Avail</div>
              <div className="font-semibold text-green-600">{mockLocationData.safetyMetrics.waterAvailability}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-3">Nearby Essentials</h3>
          <div className="space-y-3">
            {mockLocationData.nearbyEssentials.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <span className="font-medium text-gray-800">{item.type}</span>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{item.distance} km away</div>
                  <div className="text-xs text-gray-500">{item.count} locations</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setCurrentPage('home')}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            View Community Posts ({mockLocationData.totalPosts})
          </button>

          <button 
            onClick={handleBookVerification}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <Calendar size={20} className="mr-2" />
            Request Professional Verification
          </button>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Professional Verification Includes:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• On-site safety and infrastructure assessment</li>
            <li>• Photo and video documentation</li>
            <li>• Local expert insights and market analysis</li>
            <li>• Detailed written report with recommendations</li>
            <li>• Multiple service packages available</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => setCurrentPage('home')}
          className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold text-black">Enter Your Location</h2>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Enter 6-digit PIN Code
        </label>
        <div className="flex space-x-3 justify-center mb-8">
          {pinCode.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black bg-white shadow-sm"
              maxLength="1"
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <span className="text-gray-500 text-sm">OR</span>
      </div>

      <button className="w-full bg-white border border-gray-300 text-black py-3 rounded-lg font-medium mb-8 hover:bg-gray-50 transition-colors shadow-sm">
        📍 Use My Location
      </button>

      <button 
        onClick={handleGetInsights}
        disabled={pinCode.join('').length !== 6}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
      >
        Get Insights
      </button>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-black mb-3">Popular Chennai Areas</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { area: "T. Nagar", pin: "600017" },
            { area: "Velachery", pin: "600042" },
            { area: "OMR", pin: "600096" },
            { area: "Adyar", pin: "600020" }
          ].map((location, index) => (
            <button
              key={index}
              onClick={() => {
                setPinCode(location.pin.split(''));
                setTimeout(() => handleGetInsights(), 100);
              }}
              className="text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded border border-gray-200 transition-colors"
            >
              <div className="font-medium">{location.area}</div>
              <div className="text-xs text-gray-500">{location.pin}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreatePost = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pinCode: '',
    area: '',
    city: 'Chennai',
    content: '',
    tags: [],
    isAnonymous: true
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = () => {
    if (formData.content.trim() && formData.pinCode && formData.area) {
      alert(`Post created successfully for ${formData.area}, ${formData.city}! Your anonymous review has been added to the community.`);
      setFormData({
        pinCode: '',
        area: '',
        city: 'Chennai',
        content: '',
        tags: [],
        isAnonymous: true
      });
      setCurrentStep(1);
      setCurrentPage('home');
    }
  };

  const suggestedTags = [
    'Safety', 'Connectivity', 'Traffic', 'Water Supply', 'Schools', 'Hospitals'
  ];

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 pb-20">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-black">Share Your Experience</h2>
            <p className="text-sm text-gray-600">Help your community with honest insights</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black bg-white"
            >
              {indianCities.map(city => (
                <option key={city.id} value={city.name}>{city.name}, {city.state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => handleInputChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit PIN code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              maxLength="6"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area/Locality *</label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              placeholder="e.g., T. Nagar, Velachery, OMR"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            disabled={!formData.pinCode || !formData.area || formData.pinCode.length !== 6}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next: Write Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => setCurrentStep(1)} 
          className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-black">Write Your Review</h2>
          <p className="text-sm text-gray-600">{formData.area}, {formData.city}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience *</label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Share your honest thoughts about living in this area..."
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black resize-none bg-white"
            maxLength="500"
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.content.length}/500
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                  formData.tags.includes(tag)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!formData.content.trim() || formData.content.length < 20}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Share Experience
        </button>
      </div>
    </div>
  );
};

const SettingsPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setCurrentPage('home')}
          className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-black">Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Account</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Anonymous ID:</span>
              <span className="font-medium">LocalResident_4738</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reputation Score:</span>
              <span className="font-medium text-green-600">145 points</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">About PinSight</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div>Version: 1.0.0</div>
            <div>Privacy Policy</div>
            <div>Terms of Service</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="mb-16">
          <div className="w-32 h-32 mx-auto mb-8 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              <path 
                d="M50 5 C30 5, 15 20, 15 40 C15 60, 50 90, 50 90 C50 90, 85 60, 85 40 C85 20, 70 5, 50 5 Z" 
                fill="#000000"
              />
              <circle 
                cx="50" 
                cy="40" 
                r="16" 
                fill="#ffffff"
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-black mb-2">PinSight</h1>
          <p className="text-lg text-gray-700 font-medium">Insightful living starts here</p>
        </div>
        
        <button 
          onClick={onGetStarted}
          className="w-full bg-black text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const PinSightApp = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setCurrentPage('home');
  };

  if (showWelcome) {
    return <WelcomePage onGetStarted={handleGetStarted} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'search':
        return <PinSearch setCurrentPage={setCurrentPage} />;
      case 'post':
        return <CreatePost setCurrentPage={setCurrentPage} />;
      case 'settings':
        return <SettingsPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {renderPage()}
        <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default function HomePage() {
  return <PinSightApp />;
}