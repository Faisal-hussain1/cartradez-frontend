import {LoaderIcon} from '@/shared/components/icons';
import {Button} from '@/shared/components/ui/button';
import {SubmitButtonProps} from '@/shared/interfaces/buttons';

export default function SubmitButton({
  buttonText,
  loading = false,
  styles = '',
  style = {},
  disabled = false,
  variant,
}: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      className={styles}
      style={style}
      disabled={loading || disabled}
      variant={variant}
    >
      {!loading ? buttonText : <LoaderIcon className='loader-icon' />}
    </Button>
  );
}
