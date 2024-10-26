import React from 'react';

interface ChatItemProps {
    title: string;
    date: string;
    isNew?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ title, date, isNew }) => {
    return (
        <div style={styles.chatItemContainer}>
            <span style={styles.dateLabel}>{date}</span>
            <p style={styles.chatTitle}>
                {title} {isNew && <span style={styles.newDot}>•</span>}
            </p>
        </div>
    );
};

const styles = {
    sidebarContainer: {
        width: '250px',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '20px',
        boxSizing: 'border-box' as const,
    },
    sidebarHeader: {
        marginBottom: '20px',
    },
    chatList: {
        flex: 1,
        overflowY: 'auto' as const,
    },
    chatItemContainer: {
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '4px',
    },
    chatTitle: {
        fontSize: '14px',
        fontWeight: 'normal' as const,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
    },
    dateLabel: {
        fontSize: '12px',
        color: '#888',
    },
    newDot: {
        color: '#007bff',
        marginLeft: '5px',
    },
    upgradeSection: {
        marginTop: 'auto',
        fontSize: '12px',
        color: '#888',
        textAlign: 'center' as const,
        borderTop: '1px solid #333',
        paddingTop: '10px',
    },
};


export default ChatItem;
