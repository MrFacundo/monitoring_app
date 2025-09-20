const timeRanges = [
  { label: 'Past Hour', value: 'hour' },
  { label: 'Past Day', value: 'day' },
  { label: '7 Days', value: 'week' },
  { label: '30 Days', value: 'month' },
]

function TimeSelector({ timeRange, setTimeRange , disabled}) {
  return (
    <div className="time-selector">
      {timeRanges.map(({ label, value }) => (
        <button
          key={value}
          disabled={disabled}
          className={timeRange === value ? 'active' : ''}
          onClick={() => setTimeRange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default TimeSelector
