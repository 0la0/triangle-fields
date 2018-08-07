import { UI } from 'sketch';
import BrowserWindow from 'sketch-module-web-view';
import createTriangleField from './TriangleField';

const UI_WIDTH = 684;
const UI_PATH = './ui/index.html';
const GENERATE_FIELD = 'GENERATE_FIELD';
const CLOSE_LOADER = 'closeLoader()';
const WEBVIEW_ID = 'triangle-field-ui';

export default function init(context) {
  const options = {
    identifier: WEBVIEW_ID,
    width: UI_WIDTH,
    show: false,
  };
  let browserWindow = new BrowserWindow(options);
  const closeLoader = () => browserWindow.webContents.executeJavaScript(CLOSE_LOADER);

  browserWindow.on('closed', () => {
    browserWindow = null;
    // TODO: exit plugin and clean up resources
  });

  browserWindow.webContents.on(GENERATE_FIELD, dto => {
    let params;
    try {
      params = JSON.parse(dto);
    } catch(error) {
      console.log('ERROR', error);
      context.document.showMessage('Error, check logs');
      return;
    }
    const selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
    if (selection.count() < 1) {
      context.document.showMessage('Select a shape!');
      closeLoader();
      return;
    }
    const sketchObject = selection.firstObject();
    const isShape = sketchObject instanceof MSShapeGroup;
    if (!isShape) {
      context.document.showMessage('Selecton must be a shape!');
      closeLoader();
      return;
    }
    const page = NSDocumentController.sharedDocumentController().currentDocument().currentPage();
    createTriangleField(page, sketchObject, params);
    closeLoader();
  });

  browserWindow.once('ready-to-show', () => browserWindow.show());
  browserWindow.loadURL(UI_PATH);
}
