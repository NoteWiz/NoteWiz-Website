'use client';
import { useTheme } from '@emotion/react';
import React from 'react';
import D3WorldCloud from 'react-d3-cloud';
type Props = {}

const data = [
    {
        text: 'Hey',
        value: 3,
    },
    {
        text: 'Computer',
        value: 5,
    },
    {
        text: 'Alphabets',
        value: 12,
    },
];
const fontSizeMapper = (word: {value: number}) => {
    return Math.log2(word.value) * 5 + 16;
}
const CustomWorldCloud = (props: Props) => {
    const theme = useTheme()
  return (
    <>
    <D3WorldCloud 
    height={550} 
    data={data}
    font="Times" 
    fontSize={fontSizeMapper}
    rotate={0}
    padding={10}
    // fill={theme.theme == 'dark' ? 'white' : 'black'}
    />
    </>
  )
}

export default CustomWorldCloud