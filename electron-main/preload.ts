import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  on: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.on(channel, listener),
});
