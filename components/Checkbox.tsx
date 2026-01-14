import * as React from "react"
import { cn } from "../lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  labelClassName?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, labelClassName, ...props }, ref) => {
    return (
      <label className="flex items-center">
        <input
          type="checkbox"
          className={cn(
            "rounded border-gray-300 text-teal-600 focus:ring-teal-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <span className={cn("ml-2 text-sm text-gray-700", labelClassName)}>
            {label}
          </span>
        )}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox } 