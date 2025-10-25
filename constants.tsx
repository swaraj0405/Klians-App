import React from 'react';
import { User, Role, Post, Conversation, Message, Email, Event, Broadcast, Group, GroupMessage, EmailParticipant } from './types';

// ICONS
export const ICONS = {
    home: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    homeSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
    messages: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    messagesSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.293l-3.353 3.354a1 1 0 01-1.414 0L8.293 15H4a2 2 0 01-2-2V5zm3.5 1a.5.5 0 000 1h5a.5.5 0 000-1h-5zM5 9a.5.5 0 000 1h3a.5.5 0 000-1H5z" /></svg>,
    groups: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    groupsSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>,
    mailbox: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    mailboxSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2h10a1 1 0 011 1v1.382l-5.645 3.387a1.001 1.001 0 01-1.11 0L4 8.382V7a1 1 0 011-1z" clipRule="evenodd" /></svg>,
    events: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    eventsSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
    profile: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    profileSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>,
    analytics: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    broadcast: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.378 1.282 18.735 1 19 1s.622.282.832.486M5.436 13.683L5 15a1 1 0 001 1h2.154l1.41-1.41M5.436 13.683A4.001 4.001 0 007 18h1.832c4.1 0 7.625 2.236 9.168 5.514C18.378 22.718 18.735 23 19 23s.622-.282.832-.486" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    moon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
    sun: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    bell: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    bellSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>,
    search: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    chevronLeft: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    chevronRight: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    minimize: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
    maximize: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" /></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    bold: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 12H4M13 12a4 4 0 110 8H4a4 4 0 110-8h9zm2-4a4 4 0 100-8H4a4 4 0 100 8h11z" /></svg>,
    italic: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4h6m-4 16h6M13 4L9 20" /></svg>,
    underline: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19h14M8 4v12a4 4 0 008 0V4" /></svg>,
    alignLeft: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" /></svg>,
    alignCenter: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" /></svg>,
    alignRight: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" /></svg>,
    listUnordered: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm0 6a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm0 6a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z" /></svg>,
    listOrdered: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01" /></svg>,
    attachment: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>,
    trash: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    smile: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    security: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    privacy: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-4.944c3.956 0 7.454 2.368 9 5.944z" /></svg>,
    danger: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    grid: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    saved: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>,
    media: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    video: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    gif: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h3.375c1.11 0 2.063.91 2.063 2.031V11.5M11.5 11.5V14.5a2.5 2.5 0 0 1-5 0V4m18 0h-5.5a2.5 2.5 0 0 0-2.5 2.5v7m0-7H14" /></svg>,
    document: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,

    // New Icons for Feed
    moreHorizontal: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>,
    comment: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
    like: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.5l1.318-1.182a4.5 4.5 0 1 1 6.364 6.364L12 20.036l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" /></svg>,
    likeSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656z" clipRule="evenodd" /></svg>,
    share: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z" /></svg>,
    saveSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4z" /></svg>,
    pinSolid: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5.586l3.293-3.293a1 1 0 111.414 1.414L12.414 11H18a1 1 0 110 2h-5.586l3.293 3.293a1 1 0 11-1.414 1.414L11 14.414V20a1 1 0 11-2 0v-5.586l-3.293 3.293a1 1 0 11-1.414-1.414L7.586 13H2a1 1 0 110-2h5.586L4.293 7.707a1 1 0 111.414-1.414L9 9.586V4a1 1 0 011-1z" clipRule="evenodd" /></svg>,
};

// USERS
export const USERS: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.j@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-1',
    coverPhoto: 'https://picsum.photos/seed/cover-1/1500/500',
    bio: 'Student at KLIAS. Passionate about web development and open source. Coffee enthusiast.',
    studentId: 'KLIAS-12345',
    linkedin: 'https://linkedin.com/',
    role: Role.STUDENT,
    createdAt: '2023-01-15T09:30:00Z',
    lastSeen: 'Online',
    followers: 184,
    following: 256,
  },
  'user-2': {
    id: 'user-2',
    name: 'Emily Reed',
    username: 'ereed',
    email: 'e.reed@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-2',
    coverPhoto: 'https://picsum.photos/seed/cover-2/1500/500',
    bio: 'Professor of Computer Science at KLIAS. Research interests in AI and machine learning.',
    linkedin: 'https://linkedin.com/',
    role: Role.TEACHER,
    createdAt: '2020-08-22T14:00:00Z',
    lastSeen: 'Active 15 minutes ago',
    followers: 1250,
    following: 89,
  },
  'user-3': {
    id: 'user-3',
    name: 'Michael Chen',
    username: 'mchen',
    email: 'm.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-3',
    coverPhoto: 'https://picsum.photos/seed/cover-3/1500/500',
    bio: 'Admin at KLIAS. Making sure everything runs smoothly.',
    role: Role.ADMIN,
    createdAt: '2019-05-10T11:45:00Z',
    lastSeen: 'Offline',
    followers: 5,
    following: 200,
  },
  'user-4': {
    id: 'user-4',
    name: 'Sophia Rodriguez',
    username: 'sophia.r',
    email: 's.rodriguez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-4',
    coverPhoto: 'https://picsum.photos/seed/cover-4/1500/500',
    bio: 'Student, studying Design. Loves photography and hiking.',
    studentId: 'KLIAS-67890',
    role: Role.STUDENT,
    createdAt: '2023-02-20T16:20:00Z',
    lastSeen: 'Online',
    followers: 842,
    following: 431,
  },
  'user-5': {
    id: 'user-5',
    name: 'David Lee',
    username: 'dlee',
    email: 'd.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-5',
    coverPhoto: 'https://picsum.photos/seed/cover-5/1500/500',
    bio: 'Physics Professor. Fascinated by the universe.',
    role: Role.TEACHER,
    createdAt: '2021-06-01T08:00:00Z',
    lastSeen: 'Active 2 hours ago',
    followers: 734,
    following: 12,
  },
  'user-6': {
    id: 'user-6',
    name: 'Olivia Martinez',
    username: 'omartinez',
    email: 'o.martinez@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-6',
    coverPhoto: 'https://picsum.photos/seed/cover-6/1500/500',
    bio: 'Art history major. Loves museums and classic films.',
    studentId: 'KLIAS-11223',
    role: Role.STUDENT,
    createdAt: '2023-03-10T10:00:00Z',
    lastSeen: 'Offline',
    followers: 312,
    following: 301,
  },
  'user-7': {
    id: 'user-7',
    name: 'James Wilson',
    username: 'jwilson',
    email: 'j.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user-7',
    coverPhoto: 'https://picsum.photos/seed/cover-7/1500/500',
    bio: 'Business student, aspiring entrepreneur.',
    studentId: 'KLIAS-44556',
    role: Role.STUDENT,
    createdAt: '2023-04-05T13:30:00Z',
    lastSeen: 'Active 5 minutes ago',
    followers: 550,
    following: 600,
  },
};

// SUGGESTED USERS
export const SUGGESTED_USERS: User[] = [USERS['user-2'], USERS['user-4'], USERS['user-5']];

// MOCK POSTS
export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    author: USERS['user-2'],
    content: 'Just published a new paper on advancements in neural networks. Exciting times for AI! #AI #MachineLearning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 125,
    comments: 18,
    image: 'https://picsum.photos/seed/post-1/800/800',
    imageDescription: 'Abstract representation of a neural network',
  },
  {
    id: 'post-2',
    author: USERS['user-1'],
    content: 'Struggling with this data structures assignment... any tips for understanding recursion better? #coding #studentlife',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 12,
  },
  {
    id: 'post-3',
    author: USERS['user-4'],
    content: 'Check out my latest design project! A rebranding concept for a local coffee shop. Feedback is welcome! 🎨☕ #design #portfolio',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 230,
    comments: 35,
    image: 'https://picsum.photos/seed/post-3/800/800',
    imageDescription: 'Aesthetic flat-lay of design mockups for a coffee shop',
  },
  {
    id: 'post-4',
    author: USERS['user-4'],
    content: 'Morning hike views.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 451,
    comments: 52,
    image: 'https://picsum.photos/seed/post-4/800/800',
    imageDescription: 'A beautiful mountain landscape at sunrise',
  },
  {
    id: 'post-5',
    author: USERS['user-4'],
    content: 'Trying out a new cafe downtown.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 312,
    comments: 29,
    image: 'https://picsum.photos/seed/post-5/800/800',
    imageDescription: 'A cup of latte art on a wooden table',
  },
];

// MOCK CONVERSATIONS
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: [USERS['user-1'], USERS['user-4']],
    messages: [
      { id: 'msg-1-1', sender: USERS['user-1'], text: 'Hey Sophia! Loved your design project.', timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), read: true },
      { id: 'msg-1-2', sender: USERS['user-4'], text: 'Thanks Alex! I appreciate that. How are your studies going?', timestamp: new Date(Date.now() - 19 * 60 * 1000).toISOString(), read: true },
      { id: 'msg-1-3', sender: USERS['user-1'], text: 'Going well, just stuck on some recursion stuff for my assignment.', timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(), read: false },
    ],
    unreadCount: 1,
    isGroup: false,
  },
  {
    id: 'conv-2',
    participants: [USERS['user-1'], USERS['user-2']],
    messages: [
      { id: 'msg-2-1', sender: USERS['user-1'], text: 'Professor Reed, I had a question about the lecture on Monday.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), read: true },
      { id: 'msg-2-2', sender: USERS['user-2'], text: 'Of course, Alex. What can I help you with?', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10000).toISOString(), read: true },
    ],
    unreadCount: 0,
    isGroup: false,
  },
];

// MOCK GROUPS
export const MOCK_GROUPS: Group[] = [
    {
        id: 'group-1',
        name: 'CS Study Group',
        avatar: 'https://picsum.photos/seed/cs-group/200',
        members: [USERS['user-1'], USERS['user-4'], USERS['user-7']],
        admins: ['user-1'],
        messages: [
            { id: 'gmsg-1', sender: USERS['user-1'], text: 'Anyone free to review data structures tonight?', timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
            { id: 'gmsg-2', sender: USERS['user-4'], text: 'I can in about an hour!', timestamp: new Date(Date.now() - 59 * 60 * 1000).toISOString() },
        ],
        description: 'Collaborate on computer science topics.',
        createdAt: '2023-10-01T10:00:00Z',
    },
    {
        id: 'group-2',
        name: 'Faculty Announcements',
        avatar: 'https://picsum.photos/seed/faculty-group/200',
        members: [USERS['user-2'], USERS['user-5'], USERS['user-3']],
        admins: ['user-2', 'user-3'],
        messages: [
            { id: 'gmsg-3', sender: USERS['user-2'], text: 'Reminder: Faculty meeting tomorrow at 10 AM in the main conference room.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
        ],
        createdAt: '2022-05-20T14:30:00Z',
    }
];


// MOCK EMAILS
const createParticipant = (user: User): EmailParticipant => ({
  name: user.name,
  email: user.email,
  initial: user.name.charAt(0).toUpperCase(),
  color: user.role === Role.STUDENT ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800',
});

export const MOCK_EMAILS: Email[] = [
  {
    id: 'email-1',
    sender: createParticipant(USERS['user-2']),
    recipient: createParticipant(USERS['user-1']),
    subject: 'Mid-term Exam Grades',
    preview: 'Hi Alex, the grades for the mid-term exam have been posted. Please check the student portal. Best, Prof. Reed',
    body: 'Hi Alex,\n\nThe grades for the mid-term exam have been posted. Please check the student portal.\n\nBest,\nProf. Reed',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'email-2',
    sender: createParticipant(USERS['user-3']),
    recipient: createParticipant(USERS['user-1']),
    subject: 'Campus Maintenance Notification',
    preview: 'Dear students, please be advised that the main library will be closed this weekend for scheduled maintenance.',
    body: 'Dear students,\n\nPlease be advised that the main library will be closed this weekend for scheduled maintenance.\n\nThank you,\nKLIAS Administration',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

export const MOCK_SENT_EMAILS: Email[] = [
    {
        id: 'sent-1',
        sender: createParticipant(USERS['user-1']),
        recipient: createParticipant(USERS['user-2']),
        subject: 'Re: Mid-term Exam Grades',
        preview: 'Thank you, Professor. I will check them now.',
        body: 'Thank you, Professor. I will check them now.',
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        isRead: true,
    }
];
export const MOCK_TRASHED_EMAILS: Email[] = [];

// MOCK EVENTS
export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'Annual Tech Summit',
    description: 'Join us for a day of insightful talks and workshops from industry leaders in technology.',
    location: 'Grand Auditorium',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: USERS['user-3'],
    attendees: ['user-1', 'user-2', 'user-4', 'user-5'],
  },
  {
    id: 'event-2',
    title: 'Guest Lecture: The Future of AI',
    description: 'A special lecture by Dr. Aris Thorne on the ethical implications and future of artificial intelligence.',
    location: 'Science Hall - Room 201',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    creator: USERS['user-2'],
    attendees: ['user-1', 'user-5'],
  },
];

// MOCK BROADCASTS
export const MOCK_BROADCASTS: Broadcast[] = [
  {
    id: 'broadcast-1',
    title: 'Welcome Back Students!',
    content: 'Welcome to the new semester! We wish you all the best in your studies. Please check the updated course catalog.',
    author: USERS['user-3'],
    target: 'All',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'broadcast-2',
    title: 'Faculty Meeting Reminder',
    content: 'A reminder that the quarterly faculty meeting is scheduled for this Friday at 2 PM in the main conference hall.',
    author: USERS['user-2'],
    target: Role.TEACHER,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ANALYTICS DATA
export const ANALYTICS_DATA = {
    userEngagement: [
        { name: 'Jan', value: 2400 },
        { name: 'Feb', value: 1398 },
        { name: 'Mar', value: 9800 },
        { name: 'Apr', value: 3908 },
        { name: 'May', value: 4800 },
        { name: 'Jun', value: 3800 },
    ],
    postActivity: [
        { name: 'Students', value: 400, fill: '#3b82f6' },
        { name: 'Teachers', value: 300, fill: '#10b981' },
        { name: 'Admins', value: 50, fill: '#8b5cf6' },
    ],
    messagingActivity: [
        { name: 'Jan', DMs: 4000, Groups: 2400 },
        { name: 'Feb', DMs: 3000, Groups: 1398 },
        { name: 'Mar', DMs: 2000, Groups: 9800 },
        { name: 'Apr', DMs: 2780, Groups: 3908 },
        { name: 'May', DMs: 1890, Groups: 4800 },
        { name: 'Jun', DMs: 2390, Groups: 3800 },
    ],
    keyMetrics: {
        totalUsers: 5830,
        activeUsers: 4120,
        postsToday: 128,
        messagesSent: 1459,
    },
};

// TRENDING TOPICS
export const TRENDING_TOPICS = [
    '#FinalExams',
    '#SummerInternships',
    '#KLIASFest2024',
    '#NewResearch',
    '#CampusLife'
];