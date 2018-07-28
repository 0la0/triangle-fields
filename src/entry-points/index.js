import { UI } from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import triangleField from '../main/triangle-field';

import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';

// export default function(context) {
//   const sketchObject = context.selection.firstObject();
//   if (!sketchObject) {
//     context.document.showMessage('Select a shape!');
//     // UI.alert('Error', 'Select a shape!');
//     return;
//   }
//   triangleField(context, sketchObject, 20, 30);
// }




export default function(context) {
  const options = { identifier: 'unique.id', };
  const browserWindow = new BrowserWindow(options)
  browserWindow.loadURL('./ui/index.html');

  const closeLoader = () => browserWindow.webContents.executeJavaScript('closeLoader()');

  browserWindow.webContents.on('GENERATE_FIELD', dto => {
    try {
      const params = JSON.parse(dto);
      const { numEdgePoints, numFieldPoints } = params;
      // const sketchObject = context.selection.firstObject();
      const selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
      if (selection.count() < 1) {
        context.document.showMessage('Select a shape!');
        closeLoader();
        return;
      }
      const sketchObject = selection.firstObject();
      triangleField(context, sketchObject, numEdgePoints, numFieldPoints);
      closeLoader();
    }
    catch(error) {
      console.log('error:', error);
      closeLoader();
    }
  });

}
