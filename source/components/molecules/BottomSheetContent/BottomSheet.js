// import RBSheet from "react-native-raw-bottom-sheet";
// import React, { useRef, forwardRef } from "react";
// import appColors from "../../../AppConstants/appColors";
// const BottomSheet = forwardRef((props, ref) => (
//   <RBSheet
//     ref={ref}
//     // keyboardAvoidingViewEnabled={true}
//     closeOnDragDown={true}
//     closeOnPressMask={true}
//     height={350}
//     onClose={props.onClose}
//     customStyles={{
//       container: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
//       draggableIcon: { backgroundColor: colors.AppLightGray }
//     }}
//   >
//     <ScrollView
//       style={{ flex: 1 }}
//       contentContainerStyle={styles.bottomSheetScrollContainer}
//       keyboardShouldPersistTaps='handled'
//     >
//       {props.children}
//     </ScrollView>
//   </RBSheet>
// ))

// const BottomSheet = (props) => {

//   const ref = forwardRef(props.reference)
//   return (
//     <RBSheet
//       ref={ref}
//       closeOnDragDown={true}
//       closeOnPressMask={true}
//       height={350}
//       onClose={props.onClose}
//       customStyles={{
//         container: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
//         draggableIcon: { backgroundColor: appColors.AppBlue }
//       }}
//     >
//       {children}

//     </RBSheet>
//   )
// }

// export default BottomSheet;

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
