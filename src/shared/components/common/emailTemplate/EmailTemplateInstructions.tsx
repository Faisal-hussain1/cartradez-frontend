import {useState} from 'react';
import {InfoIcon, CloseIcon} from '@/shared/components/icons';
import {Button} from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import useTranslation from '@/shared/hooks/useTranslation';

export default function EmailTemplateInstructions() {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  const allowedVariables = t('emailTemplateInstructions.allowedVariables', {
    returnObjects: true,
  }) as string[];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          onClick={() => setOpen(true)}
          className='w-full md:w-auto justify-start md:justify-between gap-2 bg-mist text-secondary'
        >
          <InfoIcon className='h-4 w-4' />
          {t('settings.emailTemplateHelp')}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='max-w-md p-2 border shadow-md space-y-2 text-sm'
        align='end'
        avoidCollisions={true}
      >
        <div className='flex justify-end'>
          <button
            onClick={() => setOpen(false)}
            className='text-muted-foreground hover:text-primary transition hover:bg-accent'
            type='button'
          >
            <CloseIcon className='h-4 w-4' />
          </button>
        </div>
        <div className='space-y-2 text-muted-foreground'>
          <p className='font-medium text-primary'>
            {t('emailTemplateInstructions.howToUse')}
          </p>
          <ul className='list-disc list-inside ml-2'>
            <li>{t('emailTemplateInstructions.useOnlyAllowed')}</li>
            <li>
              {t('emailTemplateInstructions.wrapVariables')}
              <code>{`{{variableName}}`}</code>
            </li>
            <li>{t('emailTemplateInstructions.supportsFormatting')}</li>
            <li>{t('emailTemplateInstructions.invalidVariables')}</li>
            <li>{t('emailTemplateInstructions.variablesUsageNote')}</li>
          </ul>
          <p className='pt-1 font-medium text-primary'>
            {t('emailTemplateInstructions.availableVariables')}
          </p>
          <ul className='list-disc list-inside ml-2'>
            {allowedVariables?.map((v) => (
              <li key={v}>
                <code>{`{{${v}}}`}</code>
              </li>
            ))}
          </ul>
          <p className='pt-1 font-medium text-primary'>
            {t('emailTemplateInstructions.exampleTemplate')}
          </p>
          <pre className='p-1.5 text-xs whitespace-pre-wrap max-h-52 overflow-auto'>
            {t('emailTemplateInstructions.exampleTemplateText')}
          </pre>
        </div>
      </PopoverContent>
    </Popover>
  );
}
