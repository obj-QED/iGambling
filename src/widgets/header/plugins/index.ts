import { registerPlugins } from '../sdk';
import { searchPlugin } from './search';
import { walletPlugin } from './wallet';

export const pluginRegistry = registerPlugins([walletPlugin, searchPlugin]);

export { searchPlugin, walletPlugin };
