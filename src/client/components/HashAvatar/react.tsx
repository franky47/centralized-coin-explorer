import { Svg } from '@47ng/chakra-next'
import { BoxProps, useColorModeValue, useToken } from '@chakra-ui/react'
import React from 'react'
import { mapValueToColor } from './defs'
import { useHashAvatar, UseHashAvatarArgs } from './useHashAvatar'

export interface HashAvatarProps extends BoxProps, UseHashAvatarArgs {
  showGrid?: boolean
  showLabels?: boolean
  showSections?: boolean
}

export const HashAvatar: React.FC<HashAvatarProps> = ({
  radiusFactor = 0.42,
  hash = Array(64).fill('0').join(''),
  showGrid = false,
  showLabels = false,
  showSections = true,
  variant = 'normal',
  mapColor = mapValueToColor,
  ...props
}) => {
  const sections = useHashAvatar({
    radiusFactor,
    hash,
    variant,
    mapColor
  })

  const gridColor = useToken('colors', 'accent.500')
  const strokeColor = useColorModeValue('white', 'black')

  return (
    <Svg viewBox="-1 -1 2 2" overflow="visible" {...props}>
      {sections.map((section, i) => (
        <path
          key={i}
          d={section.path}
          fill={showSections ? section.color : 'none'}
          stroke={showGrid ? gridColor : strokeColor}
          strokeWidth={0.02}
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  )
}
