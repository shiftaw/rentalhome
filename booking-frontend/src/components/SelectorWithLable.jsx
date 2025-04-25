import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectorWithLabel({
  label,
  important,
  value,
  onValueChange,
  options = [],
  type = '',
  placeholder = '',
}) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='inp' className='font-thin'>
        {label} {important && <span className='text-red-600'>*</span>}
      </Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((value) => {
            return <SelectItem value={value}>{value}</SelectItem>
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
