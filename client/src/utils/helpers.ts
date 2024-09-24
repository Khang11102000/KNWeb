export const calculateHoursPassed = (createdAt: string): number => {
  if (!createdAt) return 0

  // Current time
  const now: Date = new Date()

  // Convert time from string to object Date
  const createdTime: Date = new Date(createdAt)

  // Calculate time passed (milliseconds)
  const timeDifference = (now as any) - (createdTime as any)

  // Chuyển đổi milliseconds sang giờ
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60))

  return hoursPassed
}
