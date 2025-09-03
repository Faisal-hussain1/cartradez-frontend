import {SketchPicker} from 'react-color';
import {ColorPickerProps} from '@/shared/interfaces/common';

const ColorPicker = ({value, onColorPick}: ColorPickerProps) => {
  return <SketchPicker color={value} onChangeComplete={onColorPick} />;
};

export default ColorPicker;
