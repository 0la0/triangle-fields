import { UI } from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import triangleField from '../main/triangle-field';

// import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';


export default function(context) {
  const options = { identifier: 'unique.id', };
  let browserWindow = new BrowserWindow(options)
  browserWindow.on('closed', () => {
    console.log('closed!');
    browserWindow = null;
  });
  browserWindow.loadURL('./ui/index.html');

  const closeLoader = () => browserWindow.webContents.executeJavaScript('closeLoader()');

  browserWindow.webContents.on('GENERATE_FIELD', dto => {
    try {
      const params = JSON.parse(dto);
      console.log(params);

      // const sketchObject = context.selection.firstObject();
      const selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
      if (selection.count() < 1) {
        context.document.showMessage('Select a shape!');
        closeLoader();
        return;
      }
      const sketchObject = selection.firstObject();
      const start = new Date();
      console.log('startRendering', start.getTime())
      triangleField(context, sketchObject, params);
      const end = new Date();
      console.log('done rendering???', end.getTime() - start.getTime())
      closeLoader();
    }
    catch(error) {
      console.log('error:', error);
      closeLoader();
    }
  });

}
