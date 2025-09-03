import {LoaderIcon} from '@/shared/components/icons';
import {Button} from '@/shared/components/ui/button';
import {PrimaryButtonProps} from '@/shared/interfaces/buttons';

export default function PrimaryButton({
  buttonText,
  disabled = false,
  loading = false,
  onClick,
  styles,
  variant,
  style = {},
}: PrimaryButtonProps) {
  return (
    <Button
      variant={variant}
      className={`${styles} disabled:text-gray70`}
      disabled={loading || disabled}
      onClick={onClick}
      type='button'
      style={style}
    >
      {!loading ? buttonText : <LoaderIcon className='loader-icon' />}
    </Button>
  );
}
