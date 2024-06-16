export const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const startDate = new Date(2024, 5, 3); // 03.06.2024

export const calculateWeekAndDay = (date) => {
    const diff = (date - startDate) / (1000 * 60 * 60 * 24);
    const week = Math.floor(diff / 7) + 1;
    const day = date.getDay();
    const dayOfWeek = daysOfWeek[day === 0 ? 6 : day - 1];
    return { week, dayOfWeek };
};

export const calculateDate = (week, dayOfWeek) => {
    const dayIndex = daysOfWeek.indexOf(dayOfWeek);
    const daysOffset = (week - 1) * 7 + dayIndex;
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + daysOffset);
    return newDate;
};