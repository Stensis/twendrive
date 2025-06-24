// src/pages/renterDashboard/MessagesPage.tsx

import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import {  MessagesPageProps } from '@/lib/renter/types';

const MessagesPage: React.FC<MessagesPageProps> = ({
    chatConversations,
    chatMessages,
}) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            <ChatInterface
                userRole="renter"
                conversations={chatConversations}
                currentConversation={chatConversations[0]}
                messages={chatMessages}
            />
        </div>
    );
};

export default MessagesPage;
