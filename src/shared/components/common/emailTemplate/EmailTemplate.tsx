import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import SettingsContainer from '@/shared/components/common/containers/settings';
import useTranslation from '@/shared/hooks/useTranslation';
import {
  EmailTemplatePayload,
  EmailTemplateProps,
} from '@/shared/interfaces/settings';
import {emailTemplateSchema} from '@/shared/schemas/emailTemplate';
import RichTextInput from '@/shared/components/common/inputs/richTextEditor';
import TextInput from '@/shared/components/common/inputs/textInput';
import SubmitButton from '@/shared/components/common/buttons/submitButton';
import EmailTemplateInstructions from './EmailTemplateInstructions';
import {descriptionToolbar} from '@/shared/constants/textEditor';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {FocusedField} from '@/shared/types/common';
import {EMAIL_TEMPLATES_FIELD_NAMES} from '@/shared/constants/general';
import {userMutations} from '@/shared/reactQuery';

export default function EmailTemplate({
  subject = '',
  description = '',
  onSubmit,
  isPending,
}: EmailTemplateProps) {
  const {t, ct} = useTranslation();

  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const variableContainerRef = useRef<HTMLDivElement | null>(null);

  const allowedVariables = t('emailTemplateInstructions.allowedVariables', {
    returnObjects: true,
  }) as string[];

  const {usePreviewPaymentEmailTemplateMutation} = userMutations();

  const {
    control,
    handleSubmit,
    formState: {isValid},
    getValues,
    setValue,
  } = useForm<EmailTemplatePayload>({
    resolver: yupResolver(ct(emailTemplateSchema)),
    defaultValues: {subject, description},
  });

  const {
    mutate: executePreviewPaymentEmailTemplateMutation,
    isPending: isPreviewEmailTemplatePending,
  } = usePreviewPaymentEmailTemplateMutation();

  const onPreviewEmailTemplate = () => {
    const [descriptionValue, subjectValue] = getValues([
      'description',
      'subject',
    ]);

    executePreviewPaymentEmailTemplateMutation({
      payload: {
        subject: subjectValue,
        description: descriptionValue,
      },
    });
  };

  const insertVariable = (variable: string) => {
    if (!focusedField) return;
    const insertText = `{{${variable}}}`;
    if (focusedField === EMAIL_TEMPLATES_FIELD_NAMES.subject) {
      const input = document.querySelector(
        'input[name="subject"]'
      ) as HTMLInputElement;
      if (input) {
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;

        const newValue =
          input.value.slice(0, start) + insertText + input.value.slice(end);
        setValue('subject', newValue);
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(
            start + insertText.length,
            start + insertText.length
          );
        }, 0);
      }
    } else if (focusedField === EMAIL_TEMPLATES_FIELD_NAMES.description) {
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const textNode = document.createTextNode(insertText);
          range.deleteContents();
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
          setValue('description', editor.innerHTML);
        }
      }
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const form = formRef.current;
      const variableContainer = variableContainerRef.current;
      const target = event.target as Node;

      const subjectInput = form?.querySelector('input[name="subject"]');
      const descriptionEditor = form?.querySelector('.ql-editor');

      const isInSubjectInput = subjectInput?.contains(target);
      const isInDescriptionEditor = descriptionEditor?.contains(target);
      const isInVariableContainer = variableContainer?.contains(target);

      if (isInSubjectInput || isInDescriptionEditor || isInVariableContainer) {
        return; // Do nothing, keep focusedField as is
      }

      // Clicked elsewhere — reset
      setFocusedField(null);
    };

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <SettingsContainer heading={t('settings.emailTemplate')}>
      <div className='flex-end'>
        <EmailTemplateInstructions />
      </div>

      <div className='mb-2 text-sm text-gray-600'>
        {t('emailTemplateInstructions.variablesInstructions')}
      </div>

      {/* Insert Variables */}
      <div ref={variableContainerRef} className='mb-4 flex flex-wrap gap-2.5'>
        {allowedVariables.map((variable) => (
          <PrimaryButton
            key={variable}
            onClick={() => insertVariable(variable)}
            styles='px-2 py-1 text-xs bg-gray-100 text-primary border rounded hover:bg-gray-200'
            buttonText={variable}
          />
        ))}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <TextInput
          control={control}
          name='subject'
          label={t('settings.subjectLabel')}
          placeholder={t('settings.subjectPlaceholder')}
          onFocus={() => setFocusedField('subject')}
        />
        <RichTextInput
          control={control}
          name='description'
          label={t('settings.emailDescriptionLabel')}
          toolbarOptions={descriptionToolbar}
          imagesAllowed={false}
          onFocus={() => setFocusedField('description')}
        />

        <div className='flex-end gap-3 col-span-1 md:col-span-2'>
          <PrimaryButton
            disabled={!isValid || isPreviewEmailTemplatePending}
            buttonText={t('settings.previewEmailTemplate')}
            onClick={onPreviewEmailTemplate}
          />
          <SubmitButton
            styles='text-primary'
            buttonText={t('submitButton.text')}
            variant={'outline'}
            loading={isPending}
          />
        </div>
      </form>
    </SettingsContainer>
  );
}
