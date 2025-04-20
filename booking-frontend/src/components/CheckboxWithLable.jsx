import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function CheckBoxWithLabel({ label, checked, onChange, border = true }) {
  return (
    <div>
      <div
        className={cn(
          'flex items-center space-x-2  p-2  rounded',
          border && 'border-1'
        )}
      >
        <Checkbox checked={checked} onCheckedChange={onChange} />
        <Label htmlFor='terms'>{label}</Label>
      </div>
    </div>
  )
}
