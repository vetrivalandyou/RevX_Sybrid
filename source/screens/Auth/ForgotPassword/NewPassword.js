import React from 'react';
import {Text, View} from 'react-native';
import appColors from '../../../AppConstants/appColors';
import Screen from '../../../components/atom/ScreenContainer/Screen';
import AuthHeader from '../../../components/molecules/AuthHeader';
import SimpleTextField from '../../../components/molecules/TextFeilds/SimpleTextField';
import constants from '../../../AppConstants/Constants.json';

import ButtonComponent from '../../../components/atom/CustomButtons/ButtonComponent';
import {PostRequest} from '../../../services/apiCall';
import {endPoint} from '../../../AppConstants/urlConstants';
import {Formik} from 'formik';

const NewPassword = ({navigation}) => {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isEye, setIsEye] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const validationSchema = Yup.object().shape({
    NewPassword: Yup.string().required('Password is required'),
    ConfirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const ResetPassword = (values, setSubmitting) => {
    PostRequest(endPoint.RESET_PASSWORD, values)
      .then(res => {
        if (res?.data?.code == 201) {
          SimpleSnackBar(res?.data?.message);
          navigation.goBack();
        } else {
          SimpleSnackBar(res?.data?.message);
        }
        setSubmitting(false);
      })
      .catch(err => {
        SimpleSnackBar(messages.Catch, appColors.Red);
      });
  };

  return (
    <Screen
      authStyle={{flex: 1, backgroundColor: appColors.Goldcolor}}
      viewStyle={{flex: 1, backgroundColor: appColors.Black}}
      statusBarColor={appColors.Goldcolor}>
      <View style={{flex: 0.3}}>
        <AuthHeader
          logIn={'New Password'}
          heading={'Create New Password'}
          subheading={'Please Login your account, Enter your details.'}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Formik
        initialValues={{
          NewPassword: '',
          ConfirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          ResetPassword(values, setSubmitting);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <View
              style={{
                backgroundColor: 'white',
                flex: 0.7,
                padding: 15,
                backgroundColor: appColors.Black,
              }}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'space-evenly',
                }}>
                <SimpleTextField
                  placeholder={'Enter Your Password'}
                  // value={passwordValue}
                  // onChangeText={setPasswordValue}
                  onPressIcon={() => setIsEye(!isEye)}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('NewPassword')}
                  onBlur={handleBlur('NewPassword')}
                  value={values.NewPassword}
                />
                {touched.NewPassword && errors.NewPassword && (
                  <View style={{marginLeft: 10, margin: 5}}>
                    <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                      {errors.NewPassword}
                    </Text>
                  </View>
                )}

                <SimpleTextField
                  placeholder={'Enter Your Confirm Password'}
                  // value={passwordValue}
                  // onChangeText={setPasswordValue}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={appColors.LightGray}
                  onChangeText={handleChange('ConfirmPassword')}
                  onBlur={handleBlur('ConfirmPassword')}
                  value={values.ConfirmPassword}
                />
                {touched.ConfirmPassword && errors.ConfirmPassword && (
                  <View style={{marginLeft: 10, margin: 5}}>
                    <Text style={{color: appColors.Goldcolor, fontSize: 10}}>
                      {errors.ConfirmPassword}
                    </Text>
                  </View>
                )}
              </View>

              <View style={{flex: 0.1}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                  }}>
                  Password must be atleast 8 Character{' '}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                  marginHorizontal: 20,
                }}>
                <ButtonComponent
                  title={'Reset Password'}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  // onPress={() =>
                  //   navigation.navigate(constants.AuthScreen.Login)
                  // }
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
};
export default NewPassword;
