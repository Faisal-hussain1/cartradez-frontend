function Label({
  text,
  isRequired = false,
  labelStyle,
}: {
  text: string;
  isRequired?: boolean;
  labelStyle?: string;
}) {
  return (
    <p className={`text-[15px] text-secondary ${labelStyle}`}>
      {text}
      {isRequired && <span className='text-red100 pl-0.5'>*</span>}
    </p>
  );
}

export default Label;
