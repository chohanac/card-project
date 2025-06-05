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
        bgcolor: '#f0f0f0'
      }}
    >
      <motion.div
        layout
        onClick={() => setIsSmall(!isSmall)}
        transition={{ duration: 1.8, type: 'spring' }}
        style={{
          width: isSmall ? 400 : 1200,
          height: isSmall ? 400 : 800,
          backgroundColor: '#1976d2',
          borderRadius: '12px',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Bottom Left Text
        </Typography>
      </motion.div>
    </Box>
  )
}
