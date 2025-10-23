"use client"

import { useEffect } from "react"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

const NotificationToggle = ({
  notificationsOn,
  setNotificationsOn,
}: NotificationsProps) => {
  // Ask for permission when toggled on
  useEffect(() => {
    if (notificationsOn) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("✅ Notifications enabled!", {
            body: "You'll now get hydration reminders 💧",
            icon: "/icon.png",
          })
        } else {
          alert("Please allow notifications in your browser settings.")
          setNotificationsOn(false)
        }
      })
    }
  }, [notificationsOn])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (notificationsOn && Notification.permission === "granted") {
      interval = setInterval(() => {
        new Notification("💧 Time to drink water!", {
          body: "Hydrate yourself you beautiful dehydrated disaster!",
          icon: "/icon.png",
        })
      }, 2 * 60 * 60 * 1000) // every 2 hours
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [notificationsOn])

  return (
    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl shadow-sm w-full max-w-md justify-between mb-10">
      <Label htmlFor="notifications" className="text-blue-200 font-medium text-lg">
        Notifications
      </Label>
      <Switch
        id="notifications"
        checked={notificationsOn}
        onCheckedChange={(checked) => setNotificationsOn(checked)}
        className={`${notificationsOn ? "bg-blue-500" : "bg-gray-600"}`}
      />
    </div>
  )
}

export default NotificationToggle
