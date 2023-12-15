import RBSheet from "react-native-raw-bottom-sheet";
import React, {useRef, forwardRef} from "react";
import colors from "../../../AppConstants/colors";
import { ScrollView } from "react-native";
import styles from "./styles";

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

const BottomSheet = (props) => {

  // const ref = forwardRef(props.reference)
  return (
    <RBSheet
      // ref={ref}
      // keyboardAvoidingViewEnabled={true}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={350}
      onClose={props.onClose}
      customStyles={{
        container: { borderTopLeftRadius: 30, borderTopRightRadius: 30 },
        draggableIcon: { backgroundColor: colors.AppLightGray }
      }}
    >

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.bottomSheetScrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        {props.children}
      </ScrollView>

    </RBSheet>
  )
}


export default BottomSheet;