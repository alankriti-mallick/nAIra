const ical = require("node-ical");

const getCalendarEvents = async (req, res) => {
  try {

    const url = "https://calendar.google.com/calendar/ical/31fd694a1bee2731a55b0474958174d3573e89ea9af85f560b31589cf3b9b091%40group.calendar.google.com/private-2a430787672cb29d7ee1a82fbc6f4caa/basic.ics";

    const data = await ical.async.fromURL(url);

    const events = [];
    const today = new Date().toDateString();

    let meetingMinutes = 0;

    for (let key in data) {

      const event = data[key];

      if (event.type === "VEVENT") {

        const start = new Date(event.start);
        const end = new Date(event.end);

        if (start.toDateString() === today) {

          const duration = (end - start) / 60000; // minutes
          meetingMinutes += duration;

          events.push({
            title: event.summary,
            start,
            end
          });

        }
      }
    }

    const meetingCount = events.length;
    const meetingHours = (meetingMinutes / 60).toFixed(1);

    // Assume 8 hour workday
    const freeHours = (8 - meetingHours).toFixed(1);

    let energyLevel = "High";

    if (meetingCount >= 6) energyLevel = "Low";
    else if (meetingCount >= 3) energyLevel = "Medium";

    res.json({
      meetingCount,
      meetingHours,
      freeHours,
      energyLevel,
      events
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Calendar fetch failed" });
  }
};

module.exports = { getCalendarEvents };