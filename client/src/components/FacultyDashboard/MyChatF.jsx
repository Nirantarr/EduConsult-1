import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Send } from 'lucide-react';

const MyChatF = ({ bookings, onChatSelect, activeSession }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const facultyInfo = JSON.parse(localStorage.getItem('facultyInfo'));
    const API_URL = process.env.REACT_APP_API_URL;

    // ... (useEffect for socket connection and fetching messages is very similar to the student's, no major changes needed)

    const formatToIST = (dateString) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(dateString).toLocaleTimeString('en-IN', options);
    };

    useEffect(() => {
        socketRef.current = io(API_URL);
        socketRef.current.on('receiveMessage', (message) => {
            // Only update messages if the incoming message belongs to the active session
            if (message.session === activeSession?._id) {
                setMessages(prev => [...prev, message]);
            }
        });
        return () => socketRef.current.disconnect();
    }, [API_URL, activeSession]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (activeSession) {
                // Join the socket room for the current session
                socketRef.current.emit('joinRoom', { sessionId: activeSession._id });
                try {
                    const { token } = facultyInfo;
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    // Fetch messages using the sessionId
                    const { data } = await axios.get(`${API_URL}/api/chat/messages/${activeSession._id}`, config);
                    setMessages(data);
                } catch (error) {
                    console.error("Failed to fetch messages");
                    setMessages([]); // Clear messages on error
                }
            }
        };
        fetchMessages();
    }, [activeSession, API_URL, facultyInfo.token]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && activeSession) {
            const messageData = {
                session: activeSession._id,
                sender: facultyInfo._id,
                senderModel: 'Faculty', // <-- Key difference: Identify sender as Faculty
                content: newMessage,
            };
            socketRef.current.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };
    const activeBookingInfo = bookings.find(b => b._id === activeSession?.booking);



    return  (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Live Chat Support</h1>
                <p className="text-gray-500 mt-1">Respond to user queries in real-time.</p>
            </header>
            <div className="bg-white rounded-2xl shadow-lg p-4 h-[70vh] flex">
                <div className="w-1/3 border-r pr-4 overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Active Chats</h2>
                    {bookings.map(booking => (
                        <div key={booking._id} onClick={() => onChatSelect(booking)}
                             className={`p-3 rounded-lg cursor-pointer mb-2 ${activeSession?.booking === booking._id ? 'bg-indigo-100' : 'hover:bg-gray-50'}`}>
                            <p className="font-semibold text-gray-800">{booking.student.fullName}</p>
                            <p className="text-sm text-gray-500 truncate">{booking.service.title}</p>
                        </div>
                    ))}
                </div>
                <div className="w-2/3 pl-4 flex flex-col">
                    {activeSession && activeBookingInfo ? (
                        <>
                            <div className="border-b pb-2 mb-4">
                                <h3 className="font-bold text-lg">Chat with {activeBookingInfo.student.fullName}</h3>
                            </div>
                            <div className="flex-grow overflow-y-auto mb-4 pr-2">
                                {messages.map((msg) => (
                                    <div key={msg._id} className={`flex ${msg.sender === facultyInfo._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-lg mb-2 ${msg.sender === facultyInfo._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 text-right ${msg.sender === facultyInfo._id ? 'text-blue-200' : 'text-gray-500'}`}>
                                                {formatToIST(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={sendMessage} className="flex items-center">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                       placeholder="Type your reply..."
                                       className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
export default MyChatF;