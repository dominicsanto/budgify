import { XCircleIcon } from '@heroicons/react/20/solid'

const FlashAlert = ({ message }) => {
  return (
    <div className="mt-2 text-center rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </div>
  )
}

export default FlashAlert;
