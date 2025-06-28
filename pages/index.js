import React, { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPin, setSelectedPin] = useState('400001');
  const [pinInput, setPinInput] = useState(['', '', '', '', '', '']);
  
  const [posts] = useState([
    {
      id: 1,
      user: 'LocalResident_4738',
      pinCode: '400001',
      timeAgo: '2 hours ago',
      content: 'Living here for 3 years. Great connectivity to markets and restaurants. The area is generally safe but can get crowded during evenings. Water supply is consistent.',
      upvotes: 12,
      downvotes: 2,
      comments: 5
    },
    {
      id: 2,
      user: 'AreaExpert_2901',
      pinCode: '400001',
      timeAgo: '5 hours ago',
      content: 'Just moved here last month. The metro connectivity is excellent, but parking can be a nightmare during peak hours. Overall happy with the decision.',
      upvotes: 8,
      downvotes: 1,
      comments: 3
    },
    {
      id: 3,
      user: 'FamilyPerson_1547',
      pinCode: '400001',
      timeAgo: '1 day ago',
      content: 'Perfect area for families. Good schools nearby and safe for children. The community is very friendly and helpful.',
      upvotes: 15,
      downvotes: 0,
      comments: 7
    }
  ]);

  const [pinData] = useState({
    '400001': {
      locationName: 'Fort, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      safetyMetrics: {
        floodRisk: 'Low',
        airQuality: 'Clean',
        crimeRate: 'Safe',
        waterAvailability: 'Good'
      },
      nearbyEssentials: [
        { type: 'ATM', distance: 0.8, count: 5 },
        { type: 'Grocery', distance: 1.2, count: 12 },
        { type: 'Pharmacy', distance: 1.5, count: 3 },
        { type: 'School', distance: 2.3, count: 8 }
      ],
      totalPosts: 27
    }
  });

  const handlePinInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPinInput = [...pinInput];
      newPinInput[index] = value;
      setPinInput(newPinInput);
      
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVote = (postId, type) => {
    // Vote functionality can be implemented here
    console.log(`Voted ${type} on post ${postId}`);
  };

  const PostCard = ({ post }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
            A
          </div>
          <span className="font-medium text-gray-900">{post.user}</span>
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">{post.pinCode}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{post.timeAgo}</p>
      <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>
      
      <div className="flex items-center gap-6 text-sm">
        <button 
          onClick={() => handleVote(post.id, 'up')}
          className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
        >
          👍 {post.upvotes}
        </button>
        
        <button 
          onClick={() => handleVote(post.id, 'down')}
          className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
        >
          👎 {post.downvotes > 0 && post.downvotes}
        </button>
        
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
          💬 {post.comments} comments
        </button>
      </div>
    </div>
  );

  const SafetyCard = ({ icon, label, value }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            <div className="bg-white border-b border-gray-200 p-4 -mx-4 -mt-4 mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Community Insights</h1>
              <p className="text-sm text-gray-600">Anonymous reviews from real residents</p>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    📍 {selectedPin} - {pinData[selectedPin]?.locationName}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveTab('search')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        );

      case 'search':
        const currentPinData = pinData[selectedPin];
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Search by PIN Code</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Enter 6-digit PIN Code</label>
                <div className="flex gap-2 mb-4">
                  {pinInput.map((digit, index) => (
                    <input
                      key={index}
                      data-index={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handlePinInputChange(index, e.target.value)}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold focus:border-black focus:ring-1 focus:ring-black outline-none"
                      maxLength="1"
                    />
                  ))}
                </div>
                
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-500">OR</span>
                </div>
                
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium mb-4 hover:bg-gray-200 transition-colors">
                  📍 Use My Location
                </button>
                
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Get Insights
                </button>
              </div>
            </div>

            {currentPinData && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Safety Overview</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <SafetyCard icon="💧" label="Flood Risk" value={currentPinData.safetyMetrics.floodRisk} />
                    <SafetyCard icon="🌬️" label="Air Quality" value={currentPinData.safetyMetrics.airQuality} />
                    <SafetyCard icon="🛡️" label="Crime Rate" value={currentPinData.safetyMetrics.crimeRate} />
                    <SafetyCard icon="💧" label="Water Supply" value={currentPinData.safetyMetrics.waterAvailability} />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Nearby Essentials</h3>
                  <div className="space-y-2">
                    {currentPinData.nearbyEssentials.map((essential, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium">{essential.type}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{essential.distance} km</div>
                          <div className="text-xs text-gray-600">{essential.count} nearby</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Community Activity</h4>
                  <p className="text-sm text-blue-800">
                    <strong>{currentPinData.totalPosts} posts</strong> from residents in this area
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'post':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Share Your Experience</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Anonymous posting:</strong> Your identity is protected. Share honest experiences to help the community.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your experience (anonymous)</label>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none resize-none"
                placeholder="Share your thoughts about living in this area..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">PIN Code</label>
              <input
                type="text"
                value={selectedPin}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none"
                placeholder="Enter PIN code"
              />
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Post Anonymously
            </button>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Anonymous Name</span>
                <span className="text-sm text-gray-600">LocalResident_4738</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Current PIN</span>
                <span className="text-sm text-gray-600">{selectedPin}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Reputation Score</span>
                <span className="text-sm text-gray-600">145 points</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">Posts Created</span>
                <span className="text-sm text-gray-600">12</span>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Privacy Policy
              </button>
            </div>
          </div>
        );

      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold">PinSight</h1>
          <p className="text-sm opacity-75">Insightful living starts here</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 pb-24">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'search', label: 'Search', icon: '🔍' },
            { id: 'post', label: 'Post', icon: '➕' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-2 text-center transition-colors ${
                activeTab === tab.id 
                  ? 'text-black font-semibold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="text-xl mb-1">{tab.icon}</div>
              <div className="text-xs">{tab.label}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
