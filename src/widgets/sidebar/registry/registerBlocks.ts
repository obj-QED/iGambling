import { DropdownBlock } from '../ui/blocks/DropdownBlock/DropdownBlock';
import { Logo } from '../ui/blocks/Logo/Logo';
import { Search } from '../ui/blocks/Search/Search';
import { TimerBlock } from '../ui/blocks/TimerBlock/TimerBlock';
import { WheelMdlBlock } from '../ui/blocks/WheelMdlBlock/WheelMdlBlock';
import { registerBlocks } from './blocks';

registerBlocks({
  search_leftmenu: Search,
  timer: TimerBlock,
  wheel_mdl: WheelMdlBlock,
  logo: Logo,
  menuDropdown: DropdownBlock,
});
