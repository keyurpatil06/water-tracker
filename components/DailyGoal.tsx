import { Label } from "./ui/label"
import { Input } from "./ui/input"
import CircularProgress from "./CircularProgress"
import { Button } from "./ui/button"

const DailyGoal = ({
  dailyGoal,
  glasses,
  totalGlasses,
  progress,
  setDailyGoal,
  handleAddGlass,
  handleReset,
}: DailyGoalProps) => {
  return (
    <section>
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

      <div className="mb-6 flex flex-col items-center">
        <CircularProgress progress={progress} size={160} strokeWidth={14} />
        <p className="mt-4 text-blue-200 font-medium text-lg">
          {glasses}/{dailyGoal} glasses today
        </p>
        <p className="text-blue-400 font-medium text-md mt-1">
          Total {totalGlasses} glasses drank today!
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-8">
        <Button
          className="bg-blue-500 hover:bg-blue-400 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
          onClick={handleAddGlass}
        >
          Add Glass
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-200"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </section>
  )
}

export default DailyGoal
