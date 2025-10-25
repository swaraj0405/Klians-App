import React, { useState } from 'react';
import { Event, User } from '../types';
import { ICONS, USERS } from '../constants';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';
import { useAuth } from '../hooks/useAuth';

interface EventCardProps {
  event: Event;
  isReminderSet: boolean;
  onToggleReminder: (eventId: string) => void;
}

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


export const EventCard: React.FC<EventCardProps> = ({ event, isReminderSet, onToggleReminder }) => {
  const { user } = useAuth();
  const [isAttending, setIsAttending] = useState(user ? event.attendees.includes(user.id) : false);
  const [attendees, setAttendees] = useState<User[]>(event.attendees.map(id => USERS[id]).filter(Boolean));

  const handleRsvp = () => {
    if (!user) return;
    setIsAttending(!isAttending);
    if (!isAttending) {
      setAttendees([...attendees, user]);
    } else {
      setAttendees(attendees.filter(a => a.id !== user.id));
    }
  };

  const eventDate = new Date(event.date);

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">{event.title}</h3>
            {isReminderSet && (
                <span className="text-yellow-500" title="Reminder is set">
                    {ICONS.bellSolid}
                </span>
            )}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Created by {event.creator.name}
        </p>
        <p className="mt-4 text-slate-700 dark:text-slate-300">{event.description}</p>
        <div className="mt-4 flex flex-col space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
                <CalendarIcon />
                <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center space-x-2">
                <LocationIcon />
                <span>{event.location}</span>
            </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center -space-x-2">
                {attendees.slice(0, 5).map(attendee => (
                    <Avatar key={attendee.id} src={attendee.avatar} alt={attendee.name} size="sm" className="border-2 border-white dark:border-slate-800" />
                ))}
                {attendees.length > 5 && (
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold border-2 border-white dark:border-slate-800">
                        +{attendees.length - 5}
                    </div>
                )}
                {attendees.length === 0 && <p className="text-sm text-slate-500">No one is attending yet.</p>}
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => onToggleReminder(event.id)} 
                    className={`p-2 rounded-full transition-colors ${isReminderSet ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`} 
                    title={isReminderSet ? 'Remove reminder' : 'Set reminder'}
                    aria-label={isReminderSet ? 'Remove reminder' : 'Set reminder'}
                >
                    {isReminderSet ? ICONS.bellSolid : ICONS.bell}
                </button>
                <Button onClick={handleRsvp} variant={isAttending ? 'secondary' : 'primary'}>
                    {isAttending ? 'Attending' : 'RSVP'}
                </Button>
            </div>
        </div>
      </div>
    </Card>
  );
};