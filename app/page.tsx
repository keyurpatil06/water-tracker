"use client"

import DailyGoal from "@/components/DailyGoal"
import NotificationToggle from "@/components/NotificationToggle"
import WeeklyChart from "@/components/WeeklyChart "
import { useEffect, useState } from "react"

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
  const [notificationsOn, setNotificationsOn] = useState(false)
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

  const handleReset = () => {
    setGlasses(0)
    setTotalGlasses(0)
  }

  const progress = Math.min((glasses / dailyGoal) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-12 px-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl line-clamp-none font-bold text-blue-400 mb-3">Water You Doing?💧</h1>
        <p className="text-xl text-blue-200">Stay hydrated, you beautiful dehydrated disaster!</p>
      </div>

      <DailyGoal
        dailyGoal={dailyGoal}
        glasses={glasses}
        progress={progress}
        totalGlasses={totalGlasses}
        setDailyGoal={setDailyGoal}
        handleAddGlass={handleAddGlass}
        handleReset={handleReset}
      />

      <NotificationToggle
        notificationsOn={notificationsOn}
        setNotificationsOn={setNotificationsOn}
      />

      <WeeklyChart weeklyData={weeklyData} />

    </div>
  )
}

export default Home
