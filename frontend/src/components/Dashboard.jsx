import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/calendar")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {!data ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Meetings</h3>
              <p className="text-2xl font-bold">{data.meetingCount}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Meeting Hours</h3>
              <p className="text-2xl font-bold">{data.meetingHours}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Free Hours</h3>
              <p className="text-2xl font-bold">{data.freeHours}</p>
            </div>

            <div className="bg-primary p-5 rounded-xl shadow">
              <h3 className="text-text">Energy Level</h3>
              <p className="text-2xl font-bold">{data.energyLevel}</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-primary shadow rounded-xl p-5">
        <h2 className="text-lg font-semibold">Meal Suggestion</h2>
        <p className="mt-2">Paneer Stir Fry</p>
        <p className="text-text">Prep Time: 15 mins</p>
      </div>

      <div className="bg-primary shadow rounded-xl p-5">
        <h2 className="text-lg font-semibold">Tasks Pending</h2>
        <p className="text-2xl mt-2">3</p>
      </div>
    </div>
  );
}

export default Dashboard;
