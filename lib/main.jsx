import {ComponentRegistry} from 'nylas-exports';

import SendToOrgModeButton from './send-to-org-mode-button';

export function activate() {
  ComponentRegistry.register(SendToOrgModeButton, {
    role: 'MessageList:ThreadActionsToolbarButton',
  });
}

export function serialize() {
}

export function deactivate() {
  ComponentRegistry.unregister(SendToOrgModeButton);
}
