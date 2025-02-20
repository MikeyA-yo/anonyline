import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-gray-500" />
    </div>
  )
}
