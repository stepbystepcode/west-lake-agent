import { Hono } from 'hono';
import * as dotenv from 'dotenv';
import { ChatRequest, ChatResponse, ChatStatus, ChatIntent, getWebSocketUrl } from './types';
import { createBunWebSocket } from 'hono/bun';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();

// WebSocket connection handler
app.get('/ws', upgradeWebSocket((c) => {
    return {
        onMessage(message, ws) {
            try {
                const request: ChatRequest = JSON.parse(message.toString());
                
                // Create WebSocket connection to AI service
                const aiWs = new WebSocket(getWebSocketUrl());
                
                aiWs.on('open', () => {
                    // Forward the request to AI service
                    aiWs.send(JSON.stringify(request));
                });

                aiWs.on('message', (data: string) => {
                    // Forward AI service response back to client
                    ws.send(data);
                });

                aiWs.on('error', (error) => {
                    const errorResponse: ChatResponse = {
                        sid: request.sid || '',
                        qid: '',
                        intent: request.intent || ChatIntent.CHAT,
                        query: request.query || '',
                        answer: '',
                        status: ChatStatus.ERROR,
                        errorMessage: error.message
                    };
                    ws.send(JSON.stringify(errorResponse));
                });

                aiWs.on('close', () => {
                    console.log('AI service connection closed');
                });
            } catch (error) {
                const errorResponse: ChatResponse = {
                    sid: '',
                    qid: '',
                    intent: ChatIntent.CHAT,
                    query: '',
                    answer: '',
                    status: ChatStatus.ERROR,
                    errorMessage: error instanceof Error ? error.message : 'Unknown error'
                };
                ws.send(JSON.stringify(errorResponse));
            }
        },
        onClose() {
            console.log('Client disconnected');
        },
        onError(err) {
            console.error('Error processing WebSocket connection:', err);
        }
    };
}));

// Health check endpoint
app.get('/health', (c) => {
    return c.json({ status: 'ok' });
});

// Get WebSocket URL endpoint
app.get('/ws-url', async (c) => {
    try {
        const wsUrl = getWebSocketUrl();
        return c.json({ url: wsUrl });
    } catch (error) {
        return c.json({ 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, 500);
    }
});

export default {
    port: 1421,
    fetch: app.fetch,
    websocket
};