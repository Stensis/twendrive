import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import rawChatConversations from '@/data/owner/chatConversations.json';
import rawChatMessages from '@/data/owner/chatMessages.json';
import { ChatConversation, ChatMessage, Role, Sender } from '@/lib/owner/types';

// Format data
const chatConversations: ChatConversation[] = rawChatConversations.map((c) => ({
    ...c,
    role: c.role as Role,
}));

const chatMessages: ChatMessage[] = rawChatMessages.map((m) => ({
    ...m,
    sender: m.sender as Sender,
}));

const MessagesPage = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            <ChatInterface
                userRole="owner"
                conversations={chatConversations}
                currentConversation={chatConversations[0]}
                messages={chatMessages}
            />
        </div>
    );
};

export default MessagesPage;
