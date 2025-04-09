"use client"

import { useEffect, useRef } from "react"
import "./MessageList.css"
import Message from "./Message"

const MessageList = ({ messages = [], currentUser }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.MessageDate).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <div className="message-list">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="message-group">
          <div className="message-date-divider">
            <span className="message-date">{date}</span>
          </div>
          {dateMessages.map((message, index) => {
            // Check if this message should be grouped with the previous one
            const prevMessage = index > 0 ? dateMessages[index - 1] : null
            const shouldGroup =
              prevMessage &&
              message.UserID === prevMessage.UserID &&
              new Date(message.MessageDate) - new Date(prevMessage.MessageDate) < 5 * 60 * 1000 // 5 minutes

            return (
              <Message
                key={message.MessageID}
                message={message}
                isGrouped={shouldGroup}
                isCurrentUser={message.UserID === currentUser?.UserID}
              />
            )
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList

