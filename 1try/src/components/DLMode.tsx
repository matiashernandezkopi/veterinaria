import { useDarkMode } from '../hooks/useDarkMode';

function DLMode() {
    
    const { isDark, toggle } = useDarkMode();
  return (
    <button
        onClick={toggle}
        className="
            w-fit rounded-lg border 
            border-gray-300 dark:border-neutral-600
            px-3 py-2 text-sm
            hover:bg-gray-100 dark:hover:bg-neutral-700
            transition cursor-pointer
        "
        >
        {isDark ? "☀️" : "🌙"}
    </button>
  )
}

export default DLMode