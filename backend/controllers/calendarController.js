const getTodayCalendar = (req, res) => {

    const meetings = [
        {
            title: "Product Meeting",
            start: "10:00",
            end: "11:00"
        },
        {
            title: "Client Call",
            start: "12:00",
            end: "12:30"
        },
        {
            title: "Team Standup",
            start: "3:00",
            end: "3:30"
        }
    ];

    const meetingCount = meetings.length;

    let energyLevel = "High";

    if (meetingCount >= 5) energyLevel = "Low";
    else if (meetingCount >= 3) energyLevel = "Medium";

    res.json({
        meetings,
        meetingCount,
        energyLevel
    });
};

module.exports = { getTodayCalendar };