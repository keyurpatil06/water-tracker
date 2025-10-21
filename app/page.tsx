"use client"

import CircularProgress from "@/components/CircularProgress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface WaterData {
  dailyGoal: number
  notificationsOn: boolean
  history: Record<string, number>
  totalGlasses: number
}

const Home = () => {
  const [glasses, setGlasses] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(12)
  const [totalGlasses, setTotalGlasses] = useState(0)
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [weeklyData, setWeeklyData] = useState<{ day: string; glasses: number }[]>([])

  const today = new Date().toISOString().split("T")[0]

  // Load saved data from localStorage
  useEffect(() => {
    const dataStr = localStorage.getItem("waterTracker")
    if (dataStr) {
      const data: WaterData = JSON.parse(dataStr)
      setDailyGoal(data.dailyGoal)
      setNotificationsOn(data.notificationsOn)
      setTotalGlasses(data.totalGlasses || 0)

      const history = data.history || {}
      setGlasses(history[today] || 0)
      updateWeeklyData(history)
    } else {
      const data: WaterData = { dailyGoal, notificationsOn, history: {}, totalGlasses: 0 }
      localStorage.setItem("waterTracker", JSON.stringify(data))
    }
  }, [])

  // Save to localStorage whenever relevant data changes
  useEffect(() => {
    const dataStr = localStorage.getItem("waterTracker")
    const data: WaterData = dataStr
      ? JSON.parse(dataStr)
      : { dailyGoal, notificationsOn, history: {}, totalGlasses: 0 }

    if (!data.history) data.history = {}

    data.dailyGoal = dailyGoal
    data.notificationsOn = notificationsOn
    data.history[today] = glasses
    data.totalGlasses = totalGlasses

    localStorage.setItem("waterTracker", JSON.stringify(data))
    updateWeeklyData(data.history)
  }, [glasses, dailyGoal, notificationsOn, totalGlasses, today])

  const updateWeeklyData = (history: Record<string, number>) => {
    const days: { day: string; glasses: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const dateStr = date.toISOString().split("T")[0]
      days.push({ day: dayName, glasses: history[dateStr] || 0 })
    }
    setWeeklyData(days)
  }

  const handleAddGlass = () => {
    setGlasses(glasses + 1)
    setTotalGlasses(totalGlasses + 1)
  }

  const handleReset = () => setGlasses(0)

  const progress = Math.min((glasses / dailyGoal) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-12 px-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl line-clamp-none font-bold text-blue-400 mb-3">Water You Doing?💧</h1>
        <p className="text-xl text-blue-200">Stay hydrated, you beautiful dehydrated disaster!</p>
      </div>

      {/* Daily Goal Input */}
      <div className="mb-10 flex flex-col sm:flex-row items-center gap-4 bg-blue-950 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <Label htmlFor="dailygoal" className="font-semibold text-lg text-blue-200 min-w-[150px]">
          Daily Goal (glasses)
        </Label>
        <Input
          type="number"
          id="dailygoal"
          min={1}
          value={dailyGoal}
          onChange={(e) => setDailyGoal(Number(e.target.value))}
          className="w-24 bg-gray-800 text-white border-blue-500 focus:border-blue-400 focus:ring focus:ring-blue-400 
             appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-moz-appearance]:textfield"
        />
      </div>

      {/* Circular Progress */}
      <div className="mb-6 flex flex-col items-center">
        <CircularProgress progress={progress} size={160} strokeWidth={14} />
        <p className="mt-4 text-blue-200 font-medium text-lg">{glasses}/{dailyGoal} glasses today</p>
        <p className="text-blue-400 font-medium text-md mt-1">Total {totalGlasses} glasses drank today!</p>
      </div>

      {/* Add / Reset Buttons */}
      <div className="flex gap-6 mb-8">
        <Button className="bg-blue-500 hover:bg-blue-400 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200" onClick={handleAddGlass}>
          Add Glass
        </Button>
        <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Notifications */}
      {/* <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-sm w-full max-w-md justify-between mb-10">
        <Label htmlFor="notifications" className="text-blue-200 font-medium text-lg">Notifications</Label>
        <Switch
          id="notifications"
          checked={notificationsOn}
          onCheckedChange={(checked) => setNotificationsOn(checked)}
          className={`${notificationsOn ? "bg-blue-500" : "bg-gray-600"}`}
        />
      </div> */}

      {/* Weekly Chart */}
      <div className="bg-blue-950 p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-blue-200 text-xl font-semibold mb-4">Weekly Water Intake</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData}>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#93C5FD" />
            <YAxis stroke="#93C5FD" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} />
            <Line type="monotone" dataKey="glasses" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Home
