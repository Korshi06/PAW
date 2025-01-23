import React from 'react';

interface Post {
    id: number;
    title: string;
    text: string;
}

const postsData:  Post[] = [
    { id: 1, title: '1Post', text: 'post1' },
    { id: 2, title: '2Post', text: 'post2' },
    { id: 3, title: '3Post', text: 'post3' },
    { id: 4, title: '4Post', text: 'post4' },
];

export default postsData;

