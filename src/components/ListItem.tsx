type ListItemProps = {
    children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
    return (
        <li>
            {children}
        </li>
    );
}

export default ListItem;