import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: "horizontal" | "vertical";
  allowClickPrevious?: boolean;
  className?: string;
}

export function ProgressStepper({
  steps,
  currentStep,
  onStepClick,
  orientation = "horizontal",
  allowClickPrevious = true,
  className,
}: ProgressStepperProps) {
  const handleStepClick = (index: number) => {
    if (!onStepClick) return;
    if (allowClickPrevious && index < currentStep) {
      onStepClick(index);
    }
  };

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "w-full",
        isHorizontal ? "flex items-center justify-between" : "flex flex-col space-y-4",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = allowClickPrevious && index < currentStep && onStepClick;

        return (
          <div
            key={step.id}
            className={cn(
              isHorizontal ? "flex items-center flex-1" : "flex items-start gap-4",
              index === steps.length - 1 && isHorizontal && "flex-none"
            )}
          >
            {/* Step Circle */}
            <button
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              className={cn(
                "relative flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isHorizontal ? "h-10 w-10" : "h-8 w-8 shrink-0",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground border-2 border-border",
                isClickable && "cursor-pointer hover:scale-110"
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
              
              {/* Pulse animation for current step */}
              {isCurrent && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
            </button>

            {/* Step Content */}
            <div className={cn(
              isHorizontal ? "hidden md:block ml-3" : "flex-1"
            )}>
              <p
                className={cn(
                  "font-medium text-sm",
                  (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && isHorizontal && (
              <div className="flex-1 mx-4">
                <div
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    index < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              </div>
            )}

            {/* Vertical Connector */}
            {index < steps.length - 1 && !isHorizontal && (
              <div
                className={cn(
                  "absolute left-4 top-10 w-0.5 h-8 -translate-x-1/2",
                  index < currentStep ? "bg-primary" : "bg-border"
                )}
                style={{ marginLeft: "15px" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Progress bar variant for simpler use cases
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showLabels?: boolean;
  className?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  showLabels = true,
  className,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabels && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-primary font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Dot stepper variant for minimal design
interface DotStepperProps {
  totalSteps: number;
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function DotStepper({
  totalSteps,
  currentStep,
  onStepClick,
  className,
}: DotStepperProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStepClick?.(index)}
          disabled={!onStepClick}
          className={cn(
            "rounded-full transition-all duration-300",
            index === currentStep
              ? "w-8 h-2 bg-primary"
              : "w-2 h-2 bg-muted hover:bg-muted-foreground/50",
            onStepClick && "cursor-pointer"
          )}
        />
      ))}
    </div>
  );
}
