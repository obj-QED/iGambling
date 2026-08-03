import { BonusBoxBlock } from '../ui/blocks/BonusBoxBlock/BonusBoxBlock';
import { ColorSchemeBlock } from '../ui/blocks/ColorSchemeBlock/ColorSchemeBlock';
import { DropdownBlock } from '../ui/blocks/DropdownBlock/DropdownBlock';
import { LogoBlock } from '../ui/blocks/LogoBlock/LogoBlock';
import { NotificationBlock } from '../ui/blocks/NotificationBlock/NotificationBlock';
import { SearchBlock } from '../ui/blocks/SearchBlock/SearchBlock';
import { WalletBlock } from '../ui/blocks/WalletBlock/WalletBlock';
import { registerBlocks } from './blocks';

registerBlocks({
  search: SearchBlock,
  logo: LogoBlock,
  bonus_box: BonusBoxBlock,
  wallet: WalletBlock,
  notification: NotificationBlock,
  color_scheme: ColorSchemeBlock,
  menuDropdown: DropdownBlock,
});
