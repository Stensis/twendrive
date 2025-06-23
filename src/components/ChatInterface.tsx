
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send } from 'lucide-react';
import { ChatConversation, ChatInterfaceProps } from '@/lib/types';

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  userRole,
  conversations,
  currentConversation,
  messages
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(
    currentConversation || null
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat List */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-orange-600" />
            <span>Conversations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 hover:bg-orange-50 cursor-pointer border-b transition-colors ${
                  selectedConversation?.id === chat.id ? 'bg-orange-100' : ''
                }`}
                onClick={() => setSelectedConversation(chat)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{chat.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{chat.time}</span>
                    {chat.unread > 0 && (
                      <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      chat.role === 'owner' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {chat.role === 'owner' ? 'Owner' : 'Renter'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2 border-2 border-orange-200">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-medium">
                  {selectedConversation.name.charAt(0)}
                </div>
                <span>{selectedConversation.name}</span>
                <Badge 
                  variant="secondary" 
                  className={`ml-auto ${
                    selectedConversation.role === 'owner' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {selectedConversation.role === 'owner' ? 'Car Owner' : 'Renter'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-3 max-w-xs ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4 bg-gray-50">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1 border-orange-200 focus:border-orange-400" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatInterface;
