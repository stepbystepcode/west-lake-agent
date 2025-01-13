import * as crypto from 'crypto';

// Intent enum
export enum ChatIntent {
    CHAT = 'chat',
    SOAR_AIQL = 'soar-aiql',
    SOAR_INSTRUCTION = 'soar-instruction',
    ANALYZE_HTTP = 'analyze-http',
    INSTRUCTION_TI = 'instruction-ti',
    INSTRUCTION_CVE = 'instruction-cve',
    ALPHA_AIQL = 'alpha-aiql'
}

// Status enum
export enum ChatStatus {
    SUCCESS = '0',
    GENERATING = '1',
    ERROR = '2',
    QUERY_VIOLATION = '3',
    ANSWER_VIOLATION = '4',
    SESSION_STOPPED = '8'
}

// History item interface
export interface History {
    qid: string;
    uid?: string;
    query: string;
    answer: string;
}

// Request interface
export interface ChatRequest {
    sid?: string;
    intent?: ChatIntent;
    query?: string;
    uid?: string;
    history?: History[];
    ext?: string;
    encrypt?: boolean;
    files?: string[];
}

// Response interface
export interface ChatResponse {
    sid: string;
    qid: string;
    intent: ChatIntent;
    query: string;
    answer: string;
    errorMessage?: string;
    status: ChatStatus;
    ext?: string;
}

export function getSign(): string {
    const key = process.env.appKey;
    const secret = process.env.appSecret;

    if (!key || !secret) {
        throw new Error('appKey and appSecret must be set in environment variables');
    }

    const timestamp = Date.now();
    const data = `${timestamp}\n${secret}\n${key}`;
    
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const sign = hmac.digest();
    
    return `${timestamp}${sign.toString('base64')}`;
}

export function getWebSocketUrl(): string {
    const key = process.env.appKey;
    const sign = getSign();
    return `https://www.das-ai.com/open/ws/chat?appKey=${key}&sign=${sign}`;
}
