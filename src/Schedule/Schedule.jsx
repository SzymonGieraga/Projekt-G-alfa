import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addButton from '../images/add-button.png'; // Import the button image
import './Schedule.css'; // Import custom CSS for styling

const supabaseUrl = 'https://qwnteknxdzdjnwdalwmq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bnRla254ZHpkam53ZGFsd21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NjAyMDQsImV4cCI6MjAzNDAzNjIwNH0.j5nR3PUTOaJkbFv2Kay3eOLizRfb5nMUaqkE6o2bbv4';
const supabase = createClient(supabaseUrl, supabaseKey);

const specificUserId = '0105e29b-1bac-4563-b519-26ce94d478d2';

const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const startDate = new Date(2024, 5, 3); // 03.06.2024



const calculateWeekAndDay = (date) => {
    const diff = (date - startDate) / (1000 * 60 * 60 * 24);
    const week = Math.floor(diff / 7) + 1;
    const day = date.getDay();
    const dayOfWeek = daysOfWeek[day === 0 ? 6 : day - 1]; // Adjust for Sunday as 0
    return { week, dayOfWeek };
};

const calculateDate = (week, dayOfWeek) => {
    const dayIndex = daysOfWeek.indexOf(dayOfWeek);
    const daysOffset = (week - 1) * 7 + dayIndex;
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + daysOffset);
    return newDate;
};

const ActivityForm = ({ onSave, onCancel }) => {
    const currentDate = new Date();
    const { week, dayOfWeek } = calculateWeekAndDay(currentDate);

    const [newActivity, setNewActivity] = useState({
        week: week,
        day: dayOfWeek,
        date: currentDate,
        title: '',
        start: new Date(currentDate.setHours(8, 0, 0, 0)),
        end: new Date(currentDate.setHours(9, 0, 0, 0)),
        isImportant: false, // Add isImportant state
    });

    const handleDateChange = (date) => {
        const { week, dayOfWeek } = calculateWeekAndDay(date);
        setNewActivity(prev => ({
            ...prev,
            date,
            week,
            day: dayOfWeek,
            start: date,
            end: date,
        }));
    };

    const handleWeekChange = (week) => {
        const newDate = calculateDate(week, newActivity.day);
        setNewActivity(prev => ({
            ...prev,
            week,
            date: newDate,
            start: newDate,
            end: newDate,
        }));
    };

    const handleDayChange = (day) => {
        const newDate = calculateDate(newActivity.week, day);
        setNewActivity(prev => ({
            ...prev,
            day,
            date: newDate,
            start: newDate,
            end: newDate,
        }));
    };

    const handleInputChange = (value, field) => {
        setNewActivity(prev => ({ ...prev, [field]: value }));
    };

    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        setNewActivity(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setNewActivity(prev => ({ ...prev, isImportant: e.target.checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newActivity);
        setNewActivity({
            week: week,
            day: dayOfWeek,
            date: currentDate,
            title: '',
            start: new Date(currentDate.setHours(8, 0, 0, 0)),
            end: new Date(currentDate.setHours(9, 0, 0, 0)),
            isImportant: false, // Reset isImportant state
        });
    };

    return (
        <div className="activity-form">
            <h2>Dodaj Aktywność<button type="button" onClick={onCancel}>X</button></h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tytuł:</label>
                    <input type="text" name="title" value={newActivity.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Tydzień: </label>
                    <input
                        type="number"
                        name="week"
                        value={newActivity.week}
                        onChange={(e) => handleWeekChange(parseInt(e.target.value, 10))}
                        min="1"
                        max="15"
                    />
                </div>
                <div>
                    <label>Dzień: </label>
                    <select
                        name="day"
                        value={newActivity.day}
                        onChange={(e) => handleDayChange(e.target.value)}
                    >
                        {daysOfWeek.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Data:</label>
                    <DatePicker
                        selected={newActivity.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        locale="pl" // Set the locale to Polish or any other locale you need
                        calendarStartDay={1} // Start the week on Monday
                    />
                </div>
                <div>
                    <label>Początek:</label>
                    <DatePicker
                        selected={newActivity.start}
                        onChange={date => handleInputChange(date, 'start')}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Czas rozpoczęcia"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm" // Set time format to 24-hour
                    />
                </div>
                <div>
                    <label>Koniec:</label>
                    <DatePicker
                        selected={newActivity.end}
                        onChange={date => handleInputChange(date, 'end')}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Czas końca"
                        dateFormat="HH:mm"
                        timeFormat="HH:mm" // Set time format to 24-hour
                    />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={newActivity.isImportant} onChange={handleCheckboxChange} />
                        Ważne
                    </label>
                </div>
                <button type="submit">Dodaj Aktywność</button>
            </form>
        </div>
    );
};

const Schedule = ({setTitle}) => {
    setTitle("Terminarz");
    const currentDate = new Date();
    const { week: currentWeek } = calculateWeekAndDay(currentDate);
    const [week, setWeek] = useState(currentWeek);
    const [activities, setActivities] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, error } = await supabase
                    .from('activities')
                    .select('*')
                    .eq('user_id', specificUserId); // Filter by user ID

                if (error) {
                    throw error;
                }

                const formattedActivities = data.map(activity => ({
                    ...activity,
                    start: new Date(`2024-06-03T${activity.starts_at}`),
                    end: new Date(`2024-06-03T${activity.ends_at}`)
                }));
                setActivities(formattedActivities);
            } catch (error) {
                console.error('Error fetching activities:', error.message);
            }
        };

        fetchActivities();
    }, []);

    const handleWeekChange = (direction) => {
        setWeek(prev => Math.max(1, Math.min(prev + direction, 15)));
    };

    const handleAddActivity = useCallback(async (newActivity) => {
        try {
            const notificationTime = new Date(newActivity.start);
            notificationTime.setDate(notificationTime.getDate() - 1); // Set notification time to one day before the start time

            const { data, error } = await supabase
                .from('activities')
                .insert([{
                    title: newActivity.title,
                    week: newActivity.week,
                    week_day: newActivity.day,
                    user_id: specificUserId,
                    starts_at: newActivity.start.toTimeString().split(' ')[0],
                    ends_at: newActivity.end.toTimeString().split(' ')[0],
                    is_important: newActivity.isImportant, // Add is_important field
                    notification_time: newActivity.isImportant ? notificationTime.toISOString() : null, // Add notification_time field
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
                            {filteredActivities.filter(activity => activity.week_day === day).length > 0 ? (
                                filteredActivities.filter(activity => activity.week_day === day).map((activity, index) => (
                                    <li key={index} className="activity-item">
                                        {activity.title}: {activity.start.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} - {activity.end.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                    </li>
                                ))
                            ) : (
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
