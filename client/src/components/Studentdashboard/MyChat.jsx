import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Send } from 'lucide-react';

const MyChat = ({ bookings, onChatSelect, activeSession }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

    // Function to format UTC date to IST
    const formatToIST = (dateString) => {
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleTimeString('en-IN', options);
    };

    // useEffect for socket connection
    useEffect(() => {
        socketRef.current = io(API_URL);
        socketRef.current.on('receiveMessage', (message) => {
            if (message.session === activeSession?._id) {
                setMessages(prev => [...prev, message]);
            }
        });
        return () => { if (socketRef.current) socketRef.current.disconnect(); };
    }, [API_URL, activeSession]);

    // useEffect for fetching messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (activeSession) {
                socketRef.current.emit('joinRoom', { sessionId: activeSession._id });
                try {
                    const { token } = studentInfo;
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const { data } = await axios.get(`${API_URL}/api/chat/messages/${activeSession._id}`, config);
                    setMessages(data);
                } catch (error) {
                    console.error("Failed to fetch messages");
                    setMessages([]);
                }
            }
        };
        fetchMessages();
    }, [activeSession, API_URL, studentInfo.token]);
    
    // useEffect for scrolling to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to send a message
    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && activeSession) {
            const messageData = {
                session: activeSession._id,
                sender: studentInfo._id,
                senderModel: 'Student',
                content: newMessage,
            };
            socketRef.current.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };

    // Find the full booking object that corresponds to the active session
    const activeBookingInfo = bookings.find(b => b._id === activeSession?.booking);

    // --- RETURN STATEMENT WITH UPDATED UI ---
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Header section to match faculty UI */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">My Chats</h1>
                <p className="text-gray-500 mt-1">Review your conversations with mentors.</p>
            </header>
            
            {/* Main Chat Container */}
            <div className="bg-white rounded-2xl shadow-lg p-4 h-[70vh] flex">
                {/* Left Panel: Active Chats */}
                <div className="w-1/3 border-r pr-4 overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Active Chats</h2>
                    {bookings.map(booking => (
                        <div key={booking._id} onClick={() => onChatSelect(booking)}
                             className={`p-3 rounded-lg cursor-pointer mb-2 ${activeSession?.booking === booking._id ? 'bg-indigo-100' : 'hover:bg-gray-50'}`}>
                            <p className="font-semibold text-gray-800">{booking.faculty.fullName}</p>
                            <p className="text-sm text-gray-500 truncate">{booking.service.title}</p>
                        </div>
                    ))}
                </div>

                {/* Right Panel: Chat Window */}
                <div className="w-2/3 pl-4 flex flex-col">
                    {activeSession && activeBookingInfo ? (
                        <>
                            <div className="border-b pb-2 mb-4">
                                <h3 className="font-bold text-lg">Chat with {activeBookingInfo.faculty.fullName}</h3>
                            </div>
                            <div className="flex-grow overflow-y-auto mb-4 pr-2">
                                {messages.map((msg) => (
                                    <div key={msg._id} className={`flex ${msg.sender === studentInfo._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-lg mb-2 ${msg.sender === studentInfo._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 text-right ${msg.sender === studentInfo._id ? 'text-blue-200' : 'text-gray-500'}`}>
                                                {formatToIST(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={sendMessage} className="flex items-center">
                                {/* Styled input and button to match faculty UI */}
                                <input 
                                    type="text" 
                                    value={newMessage} 
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                />
                                <button type="submit" className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">Select a chat from the left to start messaging.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MyChat;