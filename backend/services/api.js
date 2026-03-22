export const getCalendarData = async () => {
    const response = await fetch("https://naira-83jk.onrender.com/api/calendar/today");
    return response.json();
};