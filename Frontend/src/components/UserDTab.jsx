import React, { useState } from "react";
import UserVideos from "./UserVideos";
import UserPlaylist from "./UserPlaylist";
import UserTweet from "./UserTweet";


const TabComponent = ({ userDetails }) => {
    const tabs = [
      { name: "Home", content: <div>Home Content</div> },
      { name: "Videos", content: <UserVideos userDetails={userDetails}/> },
      { name: "Playlists", content: <UserPlaylist /> },
      { name: "Tweet", content: <UserTweet /> },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].name);
    
    
  
  
    return (
    <div className=" text-white h-screen">
      <div className="sticky top-0 z-10 flex justify-center space-x-8  border-b border-[#303030]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`p-2 hover:border-b-2 ${
              activeTab === tab.name ? "text-red-500 border-b-2 border-red-500" : ""
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="p-2">
        {tabs.find((tab) => tab.name === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabComponent;
