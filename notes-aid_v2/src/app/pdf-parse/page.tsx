"use client";
import { useState, useRef, useEffect } from 'react';
import pdfToImages from '@/lib/pdfToImages';
import OCRImages from "@/lib/OCRImages";
import MultiFileUpload from '@/components/MultiFileUpload';
import Layout from '@/components/Layout';
import { Mic, MicOff, Send, FileText, Sparkles, BookOpen, Trash2, ChevronDown, ChevronUp, Download, Copy, Loader2, AlertCircle, CheckCircle } from 'lucide-react';


interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

type PDFDocument = {
    name: string;
    content: Record<string, string>;
    totalPages: number;
};

type Message = {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    userAnswer?: number;
};

const DocumentAI = () => {
    const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<{
        current: number;
        total: number;
        type?: 'Processing' | 'Recognising';
        fileName?: string;
    }>({ current: 0, total: 0 });
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSending, setIsSending] = useState(false);
    
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [generatingQuiz, setGeneratingQuiz] = useState(false);
    
    const [showPdfContent, setShowPdfContent] = useState(false);
    const [copiedMessage, setCopiedMessage] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    
    const chatEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                sendMessage();
            }
            if (e.key === 'Escape' && isListening) {
                toggleVoiceInput();
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [inputMessage, isListening]);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognitionConstructor = (window as Window & { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognitionConstructor();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                setInputMessage(prev => prev + ' ' + transcript);
            };

            recognitionRef.current.onerror = (event: Event) => {
                console.error('Speech recognition error:', event);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleFilesSelect = async (files: File[]) => {
        setProcessing(true);
        const newPdfs: PDFDocument[] = [];

        for (const file of files) {
            if (file.type !== 'application/pdf') {
                alert(`${file.name} is not a valid PDF file`);
                continue;
            }

            setProgress({ current: 0, total: 0, fileName: file.name });

            try {
                const pdfUrl = URL.createObjectURL(file);
                const imageUrls = await pdfToImages(pdfUrl, {
                    scale: 2,
                    onStart: (prog) => setProgress({ current: prog.current, total: prog.total, type: 'Processing', fileName: file.name }),
                    onProgress: (prog) => setProgress({ current: prog.current, total: prog.total, type: 'Processing', fileName: file.name }),
                });

                const recognisedContent = await OCRImages(imageUrls, {
                    onStart: (prog) => setProgress({ current: 0, total: prog.total, type: 'Recognising', fileName: file.name }),
                    onProgress: (prog) => setProgress({ current: prog.current, total: prog.total, type: 'Recognising', fileName: file.name }),
                });

                newPdfs.push({
                    name: file.name,
                    content: recognisedContent,
                    totalPages: Object.keys(recognisedContent).length,
                });

                URL.revokeObjectURL(pdfUrl);
            } catch (processingError) {
                console.error(`Error processing ${file.name}:`, processingError);
                alert(`Failed to process ${file.name}`);
            }
        }

        setPdfs(prev => [...prev, ...newPdfs]);
        setProcessing(false);
        setProgress({ current: 0, total: 0 });
    };

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const getPdfContext = () => {
        return pdfs.map(pdf => {
            const content = Object.entries(pdf.content)
                .map(([page, text]) => `Page ${page}: ${text}`)
                .join('\n\n');
            return `Document: ${pdf.name}\n${content}`;
        }).join('\n\n---\n\n');
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isSending) return;
        if (pdfs.length === 0) {
            alert('Please upload at least one PDF first');
            return;
        }

        const userMessage: Message = {
            role: 'user',
            content: inputMessage.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsSending(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: inputMessage.trim() }],
                    pdfContext: getPdfContext(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message.content,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);

            // if ('speechSynthesis' in window) {
            //     const utterance = new SpeechSynthesisUtterance(data.message.content);
            //     utterance.rate = 1.0;
            //     utterance.pitch = 1.0;
            //     window.speechSynthesis.speak(utterance);
            // }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };

    const generateQuiz = async () => {
        if (pdfs.length === 0) {
            alert('Please upload at least one PDF first');
            return;
        }

        setGeneratingQuiz(true);
        try {
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pdfContext: getPdfContext(),
                    questionCount: 5,
                    difficulty: 'medium',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate quiz');
            }

            setQuiz(data.questions);
            setShowQuiz(true);
            setQuizScore(null);
        } catch (error) {
            console.error('Error generating quiz:', error);
            alert('Failed to generate quiz. Please try again.');
        } finally {
            setGeneratingQuiz(false);
        }
    };

    const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
        setQuiz(prev => {
            const updated = [...prev];
            updated[questionIndex].userAnswer = answerIndex;
            return updated;
        });
    };

    const submitQuiz = () => {
        const score = quiz.reduce((acc, q) => acc + (q.userAnswer === q.correctAnswer ? 1 : 0), 0);
        setQuizScore(score);
    };

    const removePdf = (index: number) => {
        setPdfs(prev => prev.filter((_, pdfIndex) => pdfIndex !== index));
        showNotification('success', 'PDF removed successfully');
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessage(true);
            showNotification('success', 'Copied to clipboard!');
            setTimeout(() => setCopiedMessage(false), 2000);
        } catch (clipboardError) {
            console.error('Failed to copy:', clipboardError);
            showNotification('error', 'Failed to copy');
        }
    };

    const downloadChat = () => {
        const chatText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}\n`).join('\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.txt';
        a.click();
        URL.revokeObjectURL(url);
        showNotification('success', 'Chat history downloaded!');
    };

    // Notification component
    const Notification = () => notification ? (
        <div className={`fixed top-24 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md border transition-all duration-300 ${
            notification.type === 'success' 
                ? 'bg-green-500/20 border-green-500/50 text-green-100' 
                : 'bg-red-500/20 border-red-500/50 text-red-100'
        }`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
        </div>
    ) : null;

    // Initial upload screen
    if (pdfs.length === 0 && !processing) {
        return (
            <Layout>
                <Notification />
                <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4">
                    <div className="w-full max-w-4xl">
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative">
                                    <BookOpen className="w-20 h-20 text-purple-400 animate-pulse" />
                                    <div className="absolute inset-0 bg-purple-400 blur-xl opacity-50"></div>
                                </div>
                            </div>
                            <h1 className="text-6xl font-extrabold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                Document AI
                            </h1>
                            <p className="text-2xl text-gray-300 mb-2 font-medium">Your Intelligent Study Companion</p>
                            <p className="text-gray-400 text-lg">Upload PDFs, chat with AI, generate quizzes, and ace your studies! 🚀</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-purple-400" />
                                    Upload Your Study Materials
                                </h2>
                                <p className="text-gray-300 mb-4">Upload multiple PDFs of your college notes and materials</p>
                            </div>
                            <MultiFileUpload onFilesAccepted={handleFilesSelect} />
                            
                            <div className="mt-8 grid md:grid-cols-3 gap-4">
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer">
                                    <Sparkles className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-white font-semibold mb-1">AI Chat</h3>
                                    <p className="text-gray-400 text-sm">Ask questions and get instant answers with source citations</p>
                                </div>
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 group cursor-pointer">
                                    <Mic className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-white font-semibold mb-1">Voice Input</h3>
                                    <p className="text-gray-400 text-sm">Speak your questions and hear responses</p>
                                </div>
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 group cursor-pointer">
                                    <BookOpen className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-white font-semibold mb-1">Quiz Generation</h3>
                                    <p className="text-gray-400 text-sm">Auto-generate quizzes from your materials</p>
                                </div>
                            </div>

                            {/* Tips section */}
                            <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Pro Tips</h4>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>• Upload clear, readable PDF scans for best results</li>
                                            <li>• Use <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs">Ctrl+Enter</kbd> to send messages quickly</li>
                                            <li>• Press <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs">Esc</kbd> to stop voice input</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Processing screen
    if (processing) {
        return (
            <Layout>
                <Notification />
                <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
                            <h2 className="text-3xl font-bold text-white mb-2">Processing PDFs</h2>
                            <p className="text-gray-300">{progress.fileName || 'Please wait...'}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-4 relative">
                                <div
                                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-4 transition-all duration-300 relative overflow-hidden"
                                    style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                </div>
                            </div>
                            <div className="text-center text-white">
                                {progress.total ? (
                                    <div>
                                        <p className="font-semibold text-lg">{progress.type}...</p>
                                        <p className="text-gray-300 text-sm mt-1">
                                            {Math.floor((progress.current / progress.total) * 100)}% ({progress.current}/{progress.total} pages)
                                        </p>
                                    </div>
                                ) : (
                                    <p>Initializing...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Main interface with chat and features
    return (
        <Layout>
            <Notification />
            <div className="min-h-screen py-24 px-4">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
                            <BookOpen className="w-10 h-10 text-purple-400" />
                            Document AI
                        </h1>
                        <p className="text-gray-300">Chat with your documents using AI</p>
                    </div>

                {/* Uploaded PDFs */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Uploaded Documents ({pdfs.length})
                        </h2>
                        <button
                            onClick={() => setShowPdfContent(!showPdfContent)}
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            {showPdfContent ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {pdfs.map((pdf, index) => (
                            <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-white font-semibold truncate">{pdf.name}</p>
                                    <p className="text-gray-400 text-sm">{pdf.totalPages} pages</p>
                                </div>
                                <button
                                    onClick={() => removePdf(index)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {showPdfContent && (
                        <div className="bg-black/30 rounded-xl p-4 max-h-64 overflow-y-auto">
                            {pdfs.map((pdf, pdfIndex) => (
                                <div key={pdfIndex} className="mb-6 last:mb-0">
                                    <h3 className="text-white font-semibold mb-2">{pdf.name}</h3>
                                    {Object.entries(pdf.content).map(([page, text]) => (
                                        <div key={page} className="mb-3">
                                            <div className="text-purple-400 text-sm mb-1">Page {page}</div>
                                            <pre className="text-gray-300 text-xs whitespace-pre-wrap break-words">{text}</pre>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Upload More PDFs
                    </button>
                    <div className="hidden">
                        <MultiFileUpload onFilesAccepted={handleFilesSelect} />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Chat Section */}
                    <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 flex flex-col" style={{ height: '600px' }}>
                        <div className="p-6 border-b border-white/20 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                                AI Chat Assistant
                            </h2>
                            {messages.length > 0 && (
                                <button
                                    onClick={downloadChat}
                                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                                    title="Download chat history"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download</span>
                                </button>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.length === 0 ? (
                                <div className="text-center text-gray-400 mt-12">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400 opacity-50" />
                                    <p className="text-lg mb-2">Start chatting with your documents!</p>
                                    <p className="text-sm">Ask questions and get answers based on your uploaded PDFs</p>
                                    <div className="mt-6 text-xs text-gray-500">
                                        <p>💡 Tip: Use Ctrl+Enter to send messages quickly</p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                                        <div className={`max-w-[80%] rounded-2xl p-4 relative ${
                                            msg.role === 'user' 
                                                ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg' 
                                                : 'bg-white/10 text-gray-100 border border-white/20'
                                        }`}>
                                            <p className="whitespace-pre-wrap">{msg.content}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs opacity-70">
                                                    {msg.timestamp.toLocaleTimeString()}
                                                </p>
                                                <button
                                                    onClick={() => copyToClipboard(msg.content)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                                                    title="Copy message"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-6 border-t border-white/20">
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleVoiceInput}
                                    className={`p-3 rounded-lg transition-all duration-300 ${
                                        isListening 
                                            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                    title={isListening ? 'Stop listening (ESC)' : 'Start voice input'}
                                >
                                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                </button>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                    placeholder="Ask a question about your documents... (Ctrl+Enter to send)"
                                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    disabled={isSending}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isSending || !inputMessage.trim()}
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/50"
                                    title="Send message (Ctrl+Enter)"
                                >
                                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quiz Section */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20" style={{ height: '600px', overflow: 'auto' }}>
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-green-400" />
                            Quiz Generator
                        </h2>
                        
                        {!showQuiz ? (
                            <div>
                                <p className="text-gray-300 mb-6">Generate a quiz from your uploaded documents to test your knowledge!</p>
                                <button
                                    onClick={generateQuiz}
                                    disabled={generatingQuiz}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {generatingQuiz ? 'Generating Quiz...' : 'Generate Quiz'}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4 flex justify-between items-center">
                                    <h3 className="text-white font-semibold">Quiz Questions</h3>
                                    <button
                                        onClick={() => {
                                            setShowQuiz(false);
                                            setQuiz([]);
                                            setQuizScore(null);
                                        }}
                                        className="text-sm text-purple-400 hover:text-purple-300"
                                    >
                                        Close Quiz
                                    </button>
                                </div>
                                
                                <div className="space-y-4 mb-4">
                                    {quiz.map((q, qIndex) => (
                                        <div key={qIndex} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                            <p className="text-white font-semibold mb-3">{qIndex + 1}. {q.question}</p>
                                            <div className="space-y-2">
                                                {q.options.map((option, oIndex) => (
                                                    <button
                                                        key={oIndex}
                                                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                                                        disabled={quizScore !== null}
                                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                            q.userAnswer === oIndex
                                                                ? quizScore !== null
                                                                    ? oIndex === q.correctAnswer
                                                                        ? 'bg-green-600 text-white'
                                                                        : 'bg-red-600 text-white'
                                                                    : 'bg-purple-600 text-white'
                                                                : quizScore !== null && oIndex === q.correctAnswer
                                                                    ? 'bg-green-600/50 text-white'
                                                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                            {quizScore !== null && (
                                                <p className="text-gray-300 text-sm mt-3 p-2 bg-black/20 rounded">
                                                    {q.explanation}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {quizScore === null ? (
                                    <button
                                        onClick={submitQuiz}
                                        disabled={quiz.some(q => q.userAnswer === undefined)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Submit Quiz
                                    </button>
                                ) : (
                                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
                                        <p className="text-2xl font-bold text-white mb-2">
                                            Score: {quizScore}/{quiz.length}
                                        </p>
                                        <p className="text-gray-300">
                                            {quizScore === quiz.length ? 'Perfect! 🎉' : quizScore >= quiz.length * 0.6 ? 'Good job! 👍' : 'Keep studying! 📚'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default DocumentAI;
