"use client"

import React, { useState } from "react"
import "./MessageInput.css"
import { PlusCircle, AtSign, Smile, Paperclip, Gift, Send } from "lucide-react"

const MessageInput = ({ onSendMessage, channelName, placeholder }) => {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [attachments, setAttachments] = useState([])
  const fileInputRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() || attachments.length > 0) {
      onSendMessage({
        content: message,
        attachments: attachments,
      })
      setMessage("")
      setAttachments([])
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
    if (!isTyping && e.target.value) {
      setIsTyping(true)
    } else if (isTyping && !e.target.value) {
      setIsTyping(false)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    // Convert files to attachments
    const newAttachments = files.map((file) => {
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")

      return {
        file,
        name: file.name,
        size: file.size,
        type: isImage ? "Image" : isVideo ? "Video" : "Document",
        url: URL.createObjectURL(file),
      }
    })

    setAttachments([...attachments, ...newAttachments])

    // Reset file input
    e.target.value = null
  }

  const removeAttachment = (index) => {
    const newAttachments = [...attachments]
    URL.revokeObjectURL(newAttachments[index].url)
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  return (
    <div className="message-input">
      <button className="message-input__upload" onClick={handleFileClick}>
        <PlusCircle size={24} />
      </button>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} multiple />

      {attachments.length > 0 && (
        <div className="message-input__attachments">
          {attachments.map((attachment, index) => (
            <div key={index} className="message-input__attachment">
              {attachment.type === "Image" ? (
                <img src={attachment.url || "/placeholder.svg"} alt={attachment.name} />
              ) : (
                <div className="message-input__file">
                  <div className="message-input__file-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M15.5,2H6.5C5.1,2 4,3.1 4,4.5v15C4,20.9 5.1,22 6.5,22h12c1.4,0 2.5-1.1 2.5-2.5V7.5L15.5,2z M6.5,4h8.5v3.5c0,0.8 0.7,1.5 1.5,1.5H20v10.5c0,0.3-0.2,0.5-0.5,0.5h-13C6.2,20 6,19.8 6,19.5v-15C6,4.2 6.2,4 6.5,4z M13,9h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"
                      ></path>
                    </svg>
                  </div>
                  <div className="message-input__file-info">
                    <div className="message-input__file-name">{attachment.name}</div>
                    <div className="message-input__file-size">{(attachment.size / 1024).toFixed(2)} KB</div>
                  </div>
                </div>
              )}
              <button className="message-input__attachment-remove" onClick={() => removeAttachment(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <form className="message-input__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder={placeholder || `Message ${channelName}`}
          className="message-input__field"
        />
        <div className="message-input__actions">
          <button type="button" className="message-input__action" onClick={handleFileClick}>
            <Paperclip size={20} />
          </button>
          <button type="button" className="message-input__action">
            <Gift size={20} />
          </button>
          <button type="button" className="message-input__action">
            <AtSign size={20} />
          </button>
          <button type="button" className="message-input__action">
            <Smile size={20} />
          </button>
          {(message || attachments.length > 0) && (
            <button type="submit" className="message-input__send">
              <Send size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default MessageInput

