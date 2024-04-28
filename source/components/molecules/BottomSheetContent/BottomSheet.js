import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import appColors from '../../../AppConstants/appColors';

const BottomSheet = forwardRef(({Height, children}, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={false}
      closeOnPressMask={true}
      height={Height}
      customStyles={{
        container: {
          backgroundColor: appColors.darkgrey,
          borderRadius: 20,
        },
        draggableIcon: {
          backgroundColor: appColors.AppGreen,
        },
      }}>
      {children}
    </RBSheet>
  );
});

export default BottomSheet;
