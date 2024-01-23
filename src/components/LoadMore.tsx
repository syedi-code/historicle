import React from 'react';

interface LoadMoreProps {
    onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => (
    <button onClick={onClick}>Load more!</button>
);

export default LoadMore;