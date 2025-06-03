"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Box, Paper, TextField, IconButton, Typography, Avatar, Divider, CircularProgress } from "@mui/material"
import {
  Send as SendIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"

export interface ChatMessage {
  id: string
  content: string
  role: "admin" | "applicant"
  timestamp: Date
  isTyping?: boolean
}

export interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  title?: string
  height?: string | number
  showAttachButton?: boolean
  showOptionsButton?: boolean
  adminAvatar?: string
  candidateAvatar?: string
  disabled?: boolean
  isSending: boolean
}

export default function ChatInterface({
  messages = [],
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message...",
  title = "Chat",
  height = 600,
  showAttachButton = false,
  showOptionsButton = false,
  adminAvatar,
  candidateAvatar,
  disabled = false,
  isSending
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim() && !disabled && !isLoading) {
      onSendMessage(inputValue.trim())
      setInputValue("")
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = (
    message: ChatMessage,
    isLast: boolean,
    isSending: boolean
  ) => {
    const isAdmin = message.role === "admin";

    return (
      <Box
        key={message.id}
        sx={{
          display: "flex",
          flexDirection: isAdmin ? "row-reverse" : "row",
          alignItems: "flex-start",
          mb: 2,
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: isAdmin ? "primary.main" : "secondary.main",
          }}
          src={isAdmin ? adminAvatar : candidateAvatar}
        >
          {isAdmin ? (
            <PersonIcon fontSize="small" />
          ) : (
            <BotIcon fontSize="small" />
          )}
        </Avatar>

        <Box
          sx={{
            maxWidth: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: isAdmin ? "flex-end" : "flex-start",
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              bgcolor: isAdmin ? "primary.main" : "grey.100",
              color: isAdmin ? "primary.contrastText" : "text.primary",
              borderRadius: 2,
              borderTopLeftRadius: isAdmin ? 2 : 0.5,
              borderTopRightRadius: isAdmin ? 0.5 : 2,
              position: "relative",
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", color: "inherit" }}
            >
              {message.content}
            </Typography>
            {message.isTyping && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <CircularProgress size={12} sx={{ mr: 1 }} />
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Typing...
                </Typography>
              </Box>
            )}
          </Paper>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isAdmin && isLast && isSending && <CircularProgress size={12} />}
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                opacity: 0.6,
                fontSize: "0.7rem",
              }}
            >
              {formatTime(message.timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="h2" color="primary.contrastText">
          {title}
        </Typography>
        {showOptionsButton && (
          <IconButton size="small" sx={{ color: "inherit" }}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          bgcolor: "background.default",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              opacity: 0.5,
            }}
          >
            <BotIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Start the conversation
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message, ind) => {
              const isLast = ind === messages.length - 1
              return renderMessage(message, isLast, isSending)})}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      <Divider />

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {showAttachButton && (
          <IconButton size="small" disabled={disabled}>
            <AttachFileIcon />
          </IconButton>
        )}

        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          size="small"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled || isLoading}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled || isLoading}
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}
