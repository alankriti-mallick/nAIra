export const getCalendarData = async () => {
    const response = await fetch("http://localhost:5000/api/calendar/today");
    return response.json();
};