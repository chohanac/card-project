'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Box, Card, Typography } from '@mui/material';
import { motion, LayoutGroup } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CELL_SIZE = 100;
const GAP = 16;
const ROWS = 3;
const COLS = 6;

const baseLayout = [
  ['card1', 'card2', 'card2', 'card3', 'card3', 'card4'],
  ['card1', 'card5', 'card5', 'card3', 'card3', 'card6'],
  ['card7', 'card5', 'card5', 'card8', 'card9', 'card9'],
];

const card3ExpandedLayout = [
  ['card2', 'card3', 'card3', 'card3', 'card3', 'card4'],
  ['card1', 'card3', 'card3', 'card3', 'card3', 'card6'],
  ['card7', 'card5', 'card5', 'card8', 'card9', 'card9'],
];

const card2ExpandedLayout = [
  ['card1', 'card2', 'card2', 'card2', 'card3', 'card4'],
  ['card1', 'card2', 'card2', 'card2', 'card3', 'card6'],
  ['card7', 'card5', 'card5', 'card8', 'card9', 'card9'],
];

const card1ExpandedLayout = [
  ['card1', 'card1', 'card2', 'card3', 'card3', 'card4'],
  ['card1', 'card1', 'card5', 'card3', 'card3', 'card6'],
  ['card1', 'card1', 'card7', 'card8', 'card9', 'card9'],
];

const card5ExpandedLayout = [
  ['card1', 'card2', 'card2', 'card3', 'card4', 'card6'],
  ['card1', 'card5', 'card5', 'card5', 'card5', 'card9'],
  ['card7', 'card5', 'card5', 'card5', 'card5', 'card8'],
];

const card7Layout = [
  ['card7', 'card7', 'card1', 'card3', 'card3', 'card4'],
  ['card7', 'card7', 'card2', 'card3', 'card3', 'card6'],
  ['card7', 'card7', 'card5', 'card8', 'card9', 'card9'],
];

const card8Layout = [
  ['card1', 'card2', 'card2', 'card3', 'card3', 'card4'],
  ['card1', 'card5', 'card8', 'card8', 'card8', 'card6'],
  ['card7', 'card5', 'card8', 'card8', 'card8', 'card9'],
];

const card9Layout = [
  ['card1', 'card2', 'card2', 'card3', 'card4', 'card6'],
  ['card1', 'card5', 'card5', 'card9', 'card9', 'card9'],
  ['card7', 'card8', 'card8', 'card9', 'card9', 'card9'],
];

const card6Layout = [
  ['card1', 'card2', 'card2', 'card3', 'card3', 'card4'],
  ['card1', 'card5', 'card8', 'card6', 'card6', 'card6'],
  ['card7', 'card5', 'card9', 'card6', 'card6', 'card6'],
];

const card4Layout = [
  ['card1', 'card2', 'card2', 'card3', 'card4', 'card4'],
  ['card1', 'card5', 'card8', 'card6', 'card4', 'card4'],
  ['card7', 'card5', 'card9', 'card9', 'card4', 'card4'],
];

const layoutsMap = {
  card3: card3ExpandedLayout,
  card2: card2ExpandedLayout,
  card1: card1ExpandedLayout,
  card5: card5ExpandedLayout,
  card7: card7Layout,
  card8: card8Layout,
  card9: card9Layout,
  card6: card6Layout,
  card4: card4Layout,
};

const cardContentMap = {
  card1: {
    image: 'https://m.media-amazon.com/images/I/91QsI+ZEgbL.jpg',
    title: 'Chernobyl',
    label: 'Article',
  },
  card2: {
    image: 'https://m.media-amazon.com/images/I/81ANaVZk5LL._AC_UF1000,1000_QL80_.jpg',
    title: 'Atomic Habits',
    label: 'Audiobook',
  },
  card3: {
    image: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/340/2024/09/19111526/6GT9lvyyKx7hiwtKMC4BisMTA7N-1-scaled.jpg',
    title: 'The Wild Robot',
    label: 'Movie',
  },
  card4: {
    image: 'https://www.salesforce.com/ca/blog/wp-content/uploads/sites/12/2023/10/The20Best20Business20Tweets20of202017-10.png?strip=all&quality=95',
    title: 'Top Tweets',
    label: 'Movie',
  },
  card5: {
    image: 'https://images.squarespace-cdn.com/content/v1/58e20fa444024364dbad7db9/154c2924-dfb1-4992-a753-2ab307703267/Screen+Shot+2022-02-04+at+10.12.25+AM.png',
    title: 'Dune',
    label: 'Movie',
  },
  card6: {
    image: 'https://www.prsformusic.com/-/media/images/2025-brand-refresh-headers/licensing-v2.ashx?h=2500&w=2500&la=en&hash=334ACB27F242464262BEDC9299C97667',
    title: 'Chappell Roan',
    label: 'Music',
  },
  card7: {
    image: 'https://www.tainstruments.com/wp-content/uploads/MicrosoftTeams-image-7-scaled.jpg',
    title: 'Beach',
    label: 'Article',
  },
  card8: {
    image: 'https://www.bbcselect.com/uploads/2021/11/Premium-iconic-image.png',
    title: 'BBC Podcasts',
    label: 'AudioBook',
  },
  card9: {
    image: 'https://m.media-amazon.com/images/I/81mIt5y6fRL.jpg',
    title: "The HitchHiker's Guide to the Galaxy",
    label: 'Audiobook',
  },
};

function DynamicCard({ width = 100, height = 110, label, image, title, mediaLabel }) {
  const getTransform = () => {
    // return 'scale(1) translateY(0%)';
    if (width === height) return 'scale(1.1) translateY(-5%)';
    if (width > height) return 'scale(1.25)';
    return 'scale(1.15) translateY(5%)';
  };

  return (


    <Box
      sx={{
        position: 'relative',
        width,
        height,
        '&:hover .arrow-buttons': {
          display: 'flex',
        },
      }}
    >


      <Card
        sx={{
          width,
          height,
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          border: '10px solid #555',
          backgroundColor: '#000',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', zIndex: 0 }}>
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: getTransform(),
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease',
            }}
          />
        </Box>

        <Box sx={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', px: 1, py: 0.2, borderRadius: 1, zIndex: 2 }}>
          <Typography variant="caption" sx={{ color: 'white', fontSize: '0.75rem' }}>
            {mediaLabel}
          </Typography>
        </Box>



        <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)', zIndex: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>{title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#ccc' }}>
            <span>2024 | Prime Video</span>
            <span>1h 42m</span>
          </Box>
        </Box>













      </Card>



      <Box
        className="arrow-buttons"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 3,
          display: 'none',
          flexDirection: 'column',
          gap: 0.5,
          '& > button': {
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            width: 32,
            height: 32,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.4)',
            },
          },
        }}
      >
        <IconButton size="small"><ArrowUpwardIcon fontSize="small" /></IconButton>
        <IconButton size="small"><ArrowDownwardIcon fontSize="small" /></IconButton>
        <IconButton size="small"><ArrowBackIcon fontSize="small" /></IconButton>
        <IconButton size="small"><ArrowForwardIcon fontSize="small" /></IconButton>
      </Box>
    </Box >








  );
}

export default function Page() {
  const [expandedCard, setExpandedCard] = useState(null);
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(100);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const size = (width - (COLS - 1) * GAP) / COLS;
        setCellSize(size);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const grid = useMemo(() => {
    if (expandedCard && layoutsMap[expandedCard]) {
      return layoutsMap[expandedCard];
    }
    return baseLayout;
  }, [expandedCard]);

  const groups = useMemo(() => {
    const visited = Array(ROWS).fill(null).map(() => Array(COLS).fill(false));
    const result = [];

    const bfs = (r, c, color) => {
      const queue = [[r, c]];
      visited[r][c] = true;
      let minR = r, maxR = r, minC = c, maxC = c;

      while (queue.length > 0) {
        const [cr, cc] = queue.shift();
        for (const [dr, dc] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
          const nr = cr + dr, nc = cc + dc;
          if (
            nr >= 0 && nr < ROWS &&
            nc >= 0 && nc < COLS &&
            !visited[nr][nc] &&
            grid[nr][nc] === color
          ) {
            visited[nr][nc] = true;
            queue.push([nr, nc]);
            minR = Math.min(minR, nr);
            maxR = Math.max(maxR, nr);
            minC = Math.min(minC, nc);
            maxC = Math.max(maxC, nc);
          }
        }
      }
      result.push({ color, minR, maxR, minC, maxC });
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!visited[r][c]) {
          bfs(r, c, grid[r][c]);
        }
      }
    }
    return result;
  }, [grid]);

  const expandableColors = new Set(Object.keys(layoutsMap));
  const groupsByColorCount = {};
  expandableColors.forEach(color => {
    groupsByColorCount[color] = 0;
  });

  return (
    <>
      <Head>
        <title>Dynamic Grid</title>
      </Head>
      <div style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
      </div>


      <Box sx={{ maxHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 6 }}>
        <LayoutGroup>
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              width: '100%', maxWidth: '1800px',
              aspectRatio: `${COLS}/${ROWS}`,
              userSelect: 'none'
            }}
          >
            {groups.map(({ color, minR, maxR, minC, maxC }) => {
              const width = (maxC - minC + 1) * cellSize + (maxC - minC) * GAP;
              const height = (maxR - minR + 1) * cellSize + (maxR - minR) * GAP;
              const top = minR * (cellSize + GAP);
              const left = minC * (cellSize + GAP);
              const isExpandable = expandableColors.has(color);
              const index = groupsByColorCount[color]++;
              const layoutId = `${color}-group-${index}`;
              const content = cardContentMap[color] || {};

              return (
                <motion.div
                  key={layoutId}
                  layout
                  layoutId={layoutId}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  style={{
                    position: 'absolute',
                    top,
                    left,
                    width,
                    height,
                    borderRadius: 8,
                    cursor: isExpandable ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (!isExpandable) return;
                    setExpandedCard(color === expandedCard ? null : color);
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <DynamicCard
                    width={width}
                    height={height}
                    label={color}
                    image={content.image}
                    title={content.title}
                    mediaLabel={content.label}
                  />
                </motion.div>
              );
            })}
          </Box>
        </LayoutGroup>
      </Box>
    </>
  );
}
