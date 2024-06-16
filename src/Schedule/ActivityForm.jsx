import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateWeekAndDay, calculateDate, daysOfWeek } from './dateUtils';

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
        isImportant: false,
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
            isImportant: false,
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
                        locale="pl"
                        calendarStartDay={1}
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
                        timeFormat="HH:mm"
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
                        timeFormat="HH:mm"
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

export default ActivityForm;
