import {Fragment} from 'react';
import {StepperProps} from '@/shared/interfaces/common';
import {CheckMarkIcon} from '@/shared/components/icons';
import {THEME} from '@/shared/constants/theme';

export const Stepper = ({
  steps,
  currentStep,
  buttonTextColor,
  themeColor = THEME.color.primary,
}: StepperProps) => {
  return (
    <div className='flex justify-between py-12 px-6 md:px-20 lg:px-60 w-full'>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <Fragment key={step.label}>
            <div className='flex relative flex-col items-center'>
              {/* Step circle */}
              <div
                style={{border: `1px solid ${themeColor}`, padding: '8px'}}
                className={`w-12 h-12 rounded-full flex items-center justify-center`}
              >
                <div
                  style={{
                    backgroundColor: isCompleted || isActive ? themeColor : '',
                    color: isCompleted ? buttonTextColor : undefined,
                  }}
                  className='w-full h-full rounded-full flex items-center justify-center'
                >
                  {isCompleted && <CheckMarkIcon />}
                </div>
              </div>

              {/* Step number */}
              <div className='text-xs my-2 text-gray-600'>
                Step {String(index + 1).padStart(2, '0')}
              </div>

              {/* Step label */}
              <div className='text-[14px] md:text-base font-bold absolute whitespace-nowrap top-20'>
                {step.label}
              </div>
            </div>

            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mt-6 ${isCompleted ? 'bg-mist' : 'bg-gray10'}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
