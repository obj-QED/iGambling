import { DropdownBlock } from '../ui/blocks/DropdownBlock/DropdownBlock';
import { SearchLeftMenuBlock } from '../ui/blocks/SearchLeftMenuBlock/SearchLeftMenuBlock';
import { TimerBlock } from '../ui/blocks/TimerBlock/TimerBlock';
import { WheelMdlBlock } from '../ui/blocks/WheelMdlBlock/WheelMdlBlock';
import { registerBlocks } from './blocks';

registerBlocks({
  search_leftmenu: SearchLeftMenuBlock,
  timer: TimerBlock,
  wheel_mdl: WheelMdlBlock,
  menuDropdown: DropdownBlock,
});
