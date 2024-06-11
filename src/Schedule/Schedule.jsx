import React, { useState, useEffect } from 'react';
import addButton from '../images/add-button.png'; // Import the button image
import './Schedule.css'; // Import custom CSS for styling

const Schedule = ({ setTitle }) => {
    const [week, setWeek] = useState(1);
    const [activities, setActivities] = useState([
        { week: 1, day: 'Poniedziałek', title: 'Wykład Matematyki', start: '08:00', end: '09:30' },
        { week: 1, day: 'Środa', title: 'Laboratorium Fizyczne', start: '10:00', end: '12:00' },
        { week: 1, day: 'Piątek', title: 'Warsztat Informatyczny', start: '13:00', end: '15:00' },
        { week: 2, day: 'Poniedziałek', title: 'Wykład Matematyki', start: '08:00', end: '09:30' },
        { week: 2, day: 'Środa', title: 'Laboratorium Fizyczne', start: '10:00', end: '12:00' },
        { week: 2, day: 'Piątek', title: 'Warsztat Informatyczny', start: '13:00', end: '15:00' },
        { week: 3, day: 'Poniedziałek', title: 'Wykład Matematyki', start: '08:00', end: '09:30' },
        { week: 3, day: 'Środa', title: 'Laboratorium Fizyczne', start: '10:00', end: '12:00' },
        { week: 3, day: 'Piątek', title: 'Warsztat Informatyczny', start: '13:00', end: '15:00' },
    ]);

    const [newActivity, setNewActivity] = useState({ week: 1, day: 'Poniedziałek', title: '', start: '', end: '' });
    const [isFormVisible, setIsFormVisible] = useState(false); // State to manage form visibility

    const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];

    useEffect(() => {
        setTitle("Terminarz");
    }, [setTitle]);

    const handleWeekChange = (direction) => {
        setWeek(prev => {
            const newWeek = prev + direction;
            return newWeek < 1 ? 1 : newWeek > 15 ? 15 : newWeek;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewActivity(prev => ({ ...prev, [name]: value }));
    };

    const addActivity = () => {
        setActivities(prev => [...prev, newActivity]);
        setNewActivity({ week: 1, day: 'Poniedziałek', title: '', start: '', end: '' });
        setIsFormVisible(false); // Hide the form after adding activity
    };

    const cancelAddActivity = () => {
        setIsFormVisible(false);
    };

    const filteredActivities = activities.filter(activity => activity.week === week);

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
                            {filteredActivities.filter(activity => activity.day === day).length > 0 ? (
                                filteredActivities.filter(activity => activity.day === day).map((activity, index) => (
                                    <li key={index} className="activity-item">
                                        {activity.title}: {activity.start} - {activity.end}
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
                onClick={() => setIsFormVisible(true)} // Show the form on button click
            />
            {isFormVisible && (
                <div className="activity-form">
                    <h2>Dodaj Aktywność</h2>
                    <form onSubmit={(e) => { e.preventDefault(); addActivity(); }}>
                        <button type="button" onClick={cancelAddActivity}>Anuluj</button>
                        <div>
                            <label>Tydzień:</label>
                            <input type="number" name="week" value={newActivity.week} onChange={handleInputChange} min="1" max="15" />
                        </div>
                        <div>
                            <label>Dzień:</label>
                            <select name="day" value={newActivity.day} onChange={handleInputChange}>
                                {daysOfWeek.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Tytuł:</label>
                            <input type="text" name="title" value={newActivity.title} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Początek:</label>
                            <input type="time" name="start" value={newActivity.start} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Koniec:</label>
                            <input type="time" name="end" value={newActivity.end} onChange={handleInputChange} />
                        </div>
                        <button type="submit">Dodaj Aktywność</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Schedule;
