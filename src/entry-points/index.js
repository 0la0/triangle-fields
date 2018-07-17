import { UI } from 'sketch';
import triangleField from '../main/triangle-field';

export default function(context) {
  const sketchObject = context.selection.firstObject();
  if (!sketchObject) {
    context.document.showMessage('Select a shape!');
    // UI.alert('Error', 'Select a shape!');
    return;
  }
  triangleField(context, sketchObject, 20, 20);
}
