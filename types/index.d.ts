declare interface DailyGoalProps {
  dailyGoal: number;
  glasses: number;
  totalGlasses: number;
  progress: number;
  setDailyGoal: (goal: number) => void;
  handleAddGlass: () => void;
  handleReset: () => void;
}

declare interface NotificationsProps {
  notificationsOn: boolean;
  setNotificationsOn: (on: boolean) => void;
}

type HistoryProps = {
  weeklyData: { day: string; glasses: number }[];
};
