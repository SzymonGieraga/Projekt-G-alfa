import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import addButton from '../images/add-button.png'; 
import './Schedule.css'; 
import ActivityForm from './ActivityForm'; // Import the ActivityForm component
import { calculateWeekAndDay, daysOfWeek } from './dateUtils';

const supabaseUrl = 'https://lgfyfbsajqevelhnyiak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZnlmYnNhanFldmVsaG55aWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3ODczNTcsImV4cCI6MjAzMzM2MzM1N30.miplvEdimTfLZXJP74SS4vpfgT5PSyJJ8pw1DPDFbpA';
const supabase = createClient(supabaseUrl, supabaseKey);

const startDate = new Date(2024, 5, 3); // 03.06.2024

const calculateDate = (week, dayOfWeek) => {
    const dayIndex = daysOfWeek.indexOf(dayOfWeek);
    const daysOffset = (week - 1) * 7 + dayIndex;
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + daysOffset);
    return newDate;
};

const Schedule = ({ setTitle, session }) => {
    setTitle("Terminarz");
    const currentDate = new Date();
    const { week: currentWeek } = calculateWeekAndDay(currentDate);
    const [week, setWeek] = useState(currentWeek);
    const [activities, setActivities] = useState([]);
    const [events, setEvents] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchActivitiesAndEvents = async () => {
            try {
                const { data: activitiesData, error: activitiesError } = await supabase
                    .from('activities')
                    .select('*')
                    .eq('user_id', session.user.id);

                if (activitiesError) {
                    throw activitiesError;
                }

                const formattedActivities = activitiesData.map(activity => ({
                    ...activity,
                    start: new Date(`2024-06-03T${activity.starts_at}`),
                    end: new Date(`2024-06-03T${activity.ends_at}`)
                }));

                const { data: eventParticipationsData, error: eventParticipationsError } = await supabase
                    .from('event_participations')
                    .select('event_id')
                    .eq('user_id', session.user.id);

                if (eventParticipationsError) {
                    throw eventParticipationsError;
                }

                const eventIds = eventParticipationsData.map(participation => participation.event_id);

                const { data: eventsData, error: eventsError } = await supabase
                    .from('events')
                    .select('*')
                    .in('id', eventIds);

                if (eventsError) {
                    throw eventsError;
                }

                const formattedEvents = eventsData.map(event => ({
                    ...event,
                    start: new Date(`2024-06-03T${event.starts_at}`),
                    end: new Date(`2024-06-03T${event.ends_at}`)
                }));

                setActivities(formattedActivities);
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchActivitiesAndEvents();
    }, []);

    const handleWeekChange = (direction) => {
        setWeek(prev => Math.max(1, Math.min(prev + direction, 15)));
    };

    const handleAddActivity = useCallback(async (newActivity) => {
        try {
            const notificationTime = new Date(newActivity.start);
            notificationTime.setDate(notificationTime.getDate() - 1);

            const { data, error } = await supabase
                .from('activities')
                .insert([{
                    title: newActivity.title,
                    week: newActivity.week,
                    week_day: newActivity.day,
                    user_id: session.user.id,
                    starts_at: newActivity.start.toTimeString().split(' ')[0],
                    ends_at: newActivity.end.toTimeString().split(' ')[0],
                    is_important: newActivity.isImportant,
                    notification_time: newActivity.isImportant ? notificationTime.toISOString() : null,
                }]);

            if (error) {
                throw error;
            }

            setActivities(prev => [...prev, {
                ...newActivity,
                start: newActivity.start,
                end: newActivity.end
            }]);
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding activity:', error.message);
        }
    }, []);

    const filteredActivities = useMemo(() => activities.filter(activity => activity.week === week), [activities, week]);
    const filteredEvents = useMemo(() => events.filter(event => {
        const eventWeekAndDay = calculateWeekAndDay(new Date(event.date));
        return eventWeekAndDay.week === week;
    }), [events, week]);

    return (
        <div className="schedule-body">
            <div className="week-navigation">
                <button onClick={() => handleWeekChange(-1)}>&lt;</button>
                <span> Tydzień {week} </span>
                <button onClick={() => handleWeekChange(1)}>&gt;</button>
            </div>
            <div className="schedule">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-column">
                        <h2>{day}</h2>
                        <ul>
                            {filteredActivities.filter(activity => activity.week_day === day).map((activity, index) => (
                                <li key={index} className="activity-item">
                                    {activity.title}: {activity.start.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} - {activity.end.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                </li>
                            ))}
                            {filteredEvents.filter(event => {
                                const eventWeekAndDay = calculateWeekAndDay(new Date(event.date));
                                return eventWeekAndDay.dayOfWeek === day;
                            }).map((event, index) => (
                                <li key={index} className="event-item">
                                    {event.name}:  {event.start.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                </li>
                            ))}
                            {filteredActivities.filter(activity => activity.week_day === day).length === 0 &&
                            filteredEvents.filter(event => {
                                const eventWeekAndDay = calculateWeekAndDay(new Date(event.date));
                                return eventWeekAndDay.dayOfWeek === day;
                            }).length === 0 && (
                                <li className="no-activity">Żadnych aktywności tego dnia</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
            <img 
                src={addButton} 
                alt="Add Activity" 
                className="add-button" 
                onClick={() => setIsFormVisible(true)}
            />
            {isFormVisible && (
                <ActivityForm onSave={handleAddActivity} onCancel={() => setIsFormVisible(false)} />
            )}
        </div>
    );
};

export default Schedule;
