import React from 'react';
import ListItem from './ListItem';

type ListContainerProps = {
    children: React.ReactNode;
}

function ListContainer({ children }: ListContainerProps) {
    return (
        <ul>
            {children}
        </ul>
    )
}

export default ListContainer;