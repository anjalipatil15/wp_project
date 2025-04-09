"use client"

import { useState } from "react"
import "./Message.css"
import { MoreHorizontal, Edit, Trash, Reply } from "lucide-react"

const Message = ({ message, isGrouped, isCurrentUser }) => {
  const [showActions, setShowActions] = useState(false)
  const [showAttachments, setShowAttachments] = useState(true)

  const formattedTime = new Date(message.MessageDate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formattedDate = new Date(message.MessageDate).toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className={`message ${isGrouped ? "message--grouped" : ""} ${isCurrentUser ? "message--self" : ""}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isGrouped && (
        <div className="message__avatar">
          <img src={message.ProfilePicture || "/placeholder.svg?height=40&width=40"} alt={message.Username || "User"} />
        </div>
      )}
      <div className="message__content">
        {!isGrouped && (
          <div className="message__header">
            <span className="message__author">{message.Username || "User"}</span>
            <span className="message__timestamp" title={formattedDate}>
              {formattedTime}
            </span>
          </div>
        )}
        <div className="message__text">
          {message.MessageContent}
          {message.EditDate && (
            <span className="message__edited" title={`Edited at ${new Date(message.EditDate).toLocaleString()}`}>
              (edited)
            </span>
          )}
        </div>

        {message.Attachments && message.Attachments.length > 0 && showAttachments && (
          <div className="message__attachments">
            {message.Attachments.map((attachment, index) => (
              <div key={index} className="message__attachment">
                {attachment.FileType === "Image" ? (
                  <img
                    src={attachment.FileURL || "/placeholder.svg?height=300&width=400"}
                    alt="Attachment"
                    onClick={() => window.open(attachment.FileURL, "_blank")}
                  />
                ) : attachment.FileType === "Video" ? (
                  <video controls>
                    <source src={attachment.FileURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="message__file">
                    <div className="message__file-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M15.5,2H6.5C5.1,2 4,3.1 4,4.5v15C4,20.9 5.1,22 6.5,22h12c1.4,0 2.5-1.1 2.5-2.5V7.5L15.5,2z M6.5,4h8.5v3.5c0,0.8 0.7,1.5 1.5,1.5H20v10.5c0,0.3-0.2,0.5-0.5,0.5h-13C6.2,20 6,19.8 6,19.5v-15C6,4.2 6.2,4 6.5,4z M13,9h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"
                        ></path>
                      </svg>
                    </div>
                    <div className="message__file-info">
                      <div className="message__file-name">{attachment.FileURL.split("/").pop() || "Document"}</div>
                      <div className="message__file-size">{(attachment.FileSize / 1024).toFixed(2)} KB</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showActions && (
        <div className="message__actions">
          <button className="message__action" title="Reply">
            <Reply size={16} />
          </button>
          {isCurrentUser && (
            <>
              <button className="message__action" title="Edit">
                <Edit size={16} />
              </button>
              <button className="message__action message__action--delete" title="Delete">
                <Trash size={16} />
              </button>
            </>
          )}
          <button className="message__action" title="More">
            <MoreHorizontal size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Message

