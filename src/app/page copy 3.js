'use client'

import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export default function Page() {
  const [isSmall, setIsSmall] = useState(false)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f0f0f0',
      }}
    >
      <motion.div
        onClick={() => setIsSmall(!isSmall)}
        animate={{
          width: isSmall ? 400 : 1200,
          height: isSmall ? 400 : 800,
        }}
        transition={{ duration: 1.8, type: 'spring' }}
        style={{
          backgroundColor: '#1976d2',
          borderRadius: '12px',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontSize: 24, // fix font size explicitly
            userSelect: 'none', // optional, avoid text selection on click
          }}
        >
          Bottom Left Text
        </Typography>
      </motion.div>
    </Box>
  )
}
