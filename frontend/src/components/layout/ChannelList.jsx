"use client"

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./ChannelList.css"
import { ChevronDown, ChevronRight, Plus, Hash, Volume2, Megaphone, Lock } from "lucide-react"

const ChannelList = ({ channels = [], serverId }) => {
  const { channelId } = useParams()
  const [expandedCategories, setExpandedCategories] = useState({})

  // Group channels by type
  const channelsByType = channels.reduce((acc, channel) => {
    const type = channel.ChannelType
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(channel)
    return acc
  }, {})

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const getChannelIcon = (type, isPrivate) => {
    if (isPrivate) return <Lock size={16} />

    switch (type) {
      case "Text":
        return <Hash size={16} />
      case "Voice":
        return <Volume2 size={16} />
      case "Announcement":
        return <Megaphone size={16} />
      default:
        return <Hash size={16} />
    }
  }

  return (
    <div className="channel-list">
      {Object.entries(channelsByType).map(([type, typeChannels]) => (
        <div key={type} className="channel-category">
          <div className="channel-category__header" onClick={() => toggleCategory(type)}>
            {expandedCategories[type] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            <span>{type.toUpperCase()} CHANNELS</span>
            <button className="channel-category__add">
              <Plus size={16} />
            </button>
          </div>

          <div className={`channel-category__channels ${!expandedCategories[type] ? "collapsed" : ""}`}>
            {typeChannels.map((channel) => (
              <Link
                key={channel.ChannelID}
                to={`/servers/${serverId}/channels/${channel.ChannelID}`}
                className={`channel-item ${channelId === channel.ChannelID ? "active" : ""}`}
              >
                <div className="channel-item__icon">{getChannelIcon(channel.ChannelType, channel.IsPrivate)}</div>
                <div className="channel-item__name">{channel.ChannelName}</div>
                {channel.IsPrivate && <Lock size={12} className="channel-item__private" />}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChannelList

