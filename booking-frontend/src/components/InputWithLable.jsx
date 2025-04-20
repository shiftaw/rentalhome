import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputWithLabel({
  label,
  important,
  value,
  onValueChange,
  type = '',
  placeholder = '',
}) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='inp' className='font-thin'>
        {label} {important && <span className='text-red-600'>*</span>}
      </Label>
      <Input
        value={value}
        onChange={onValueChange}
        className='focus-visible:ring-0 focus-visible:border-blue-300 focus-visible:border-2 border-gray-300'
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
