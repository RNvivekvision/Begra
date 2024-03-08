import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  RNButton,
  RNKeyboardAvoid,
  RNStyles,
  RNText,
  SCInput,
} from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { setUser } from '../Redux/Actions';
import { Images, Strings } from '../Constants';
import { NavRoutes } from '../Navigation';
import { Functions, Validation } from '../Utils';
import { FetchMethod, URL } from '../Api';
import { Toast } from 'react-native-toast-notifications';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const styles = useStyles();
  const [State, setState] = useState({
    email: '',
    password: '',
    passwordSecure: true,
    submitPressed: false,
    isLoading: false,
  });

  const errorEmail =
    State.submitPressed &&
    (State.email.length === 0 || !Validation.isEmailValid(State.email));
  const errorPassword =
    State.submitPressed &&
    (State.password.length === 0 ||
      !Validation.isPasswordValid(State.password));
  const noErrors =
    Validation.isEmailValid(State.email) &&
    Validation.isPasswordValid(State.password);

  const onLoginPress = async () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (!noErrors) return;

    const Params = { email: State.email, password: State.password };
    setState(p => ({ ...p, isLoading: true }));
    try {
      const response = await FetchMethod.POST({
        EndPoint: URL.Login,
        Params: Params,
        NeedToken: false,
      });
      console.log('onLoginPress -> ', JSON.stringify(response, null, 2));
      if (response?.isSuccess) {
        Params.token = response?.authToken;
        await Functions.setAppData({ User: Params });
        dispatch(setUser(Params));
        navigation.replace(NavRoutes.BarcodeInput);
      } else {
        Toast.show(response?.message);
      }
    } catch (e) {
      console.log('Error onSubmitPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNKeyboardAvoid>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.content}>
            <Image
              source={Images.appLogo}
              resizeMode={'contain'}
              style={styles.logo}
            />
            <Image
              source={Images.loginLogo}
              resizeMode={'contain'}
              style={styles.loginLogo}
            />

            <RNText style={styles.title}>{Strings.Login}</RNText>

            <SCInput
              title={Strings.Email}
              placeholder={Strings.Enteryouremail}
              value={State.email}
              keyboardType={'email-address'}
              onChangeText={v => setState(p => ({ ...p, email: v }))}
              onSubmitEditing={() => passwordRef.current.focus()}
              error={errorEmail}
            />

            <SCInput
              ref={passwordRef}
              title={Strings.Password}
              placeholder={Strings.EnteryourPassword}
              value={State.password}
              secureTextEntry={State.passwordSecure}
              returnKeyType={'done'}
              onChangeText={v => setState(p => ({ ...p, password: v }))}
              onSubmitEditing={Keyboard.dismiss}
              error={errorPassword}
              icon={State.passwordSecure ? Images.Show : Images.Hide}
              onIconPress={() =>
                setState(p => ({ ...p, passwordSecure: !p.passwordSecure }))
              }
            />

            <View style={styles.RememberMeContainer}>
              <TouchableOpacity activeOpacity={0.6}>
                <View style={RNStyles.flexRow}>
                  <View style={styles.Box} />
                  <RNText size={FontSize.font12} color={Colors.N475569}>
                    {Strings.Rememberme}
                  </RNText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <RNText size={FontSize.font12} color={Colors.N054579}>
                  {Strings.ForgotPassword}
                </RNText>
              </TouchableOpacity>
            </View>

            <RNButton
              disable={State.isLoading}
              isLoading={State.isLoading}
              title={Strings.Login}
              style={styles.login}
              onPress={onLoginPress}
            />

            <RNText
              align={'center'}
              pTop={hp(2)}
              size={FontSize.font12}
              color={Colors.N64748B}>
              {Strings.Orcontinuewith}
            </RNText>

            <View style={RNStyles.flexRow}>
              <RNButton
                icon={Images.Google}
                title={Strings.Google}
                style={styles.loginWith}
                textStyle={styles.loginwithText}
              />
              <RNButton
                icon={Images.Facebook}
                title={Strings.Facebook}
                style={styles.loginWith}
                textStyle={styles.loginwithText}
              />
            </View>

            <View style={styles.DontHaveAccount}>
              <RNText size={FontSize.font12} color={Colors.N475569}>
                {Strings.DontHaveAccount}
              </RNText>

              <TouchableOpacity activeOpacity={0.6}>
                <RNText
                  family={FontFamily.Medium}
                  size={FontSize.font12}
                  color={Colors.N054579}>
                  {Strings.Createnow}
                </RNText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </RNKeyboardAvoid>
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    content: {
      ...RNStyles.container,
      marginHorizontal: wp(6),
      paddingTop: inset.top + hp(2),
      paddingBottom: inset.bottom,
    },
    logo: {
      width: wp(20),
      height: hp(5),
    },
    loginLogo: {
      width: wp(53),
      height: hp(25),
      marginVertical: hp(2),
    },
    title: {
      fontSize: FontSize.font32,
      fontFamily: FontFamily.SemiBold,
    },
    RememberMeContainer: {
      ...RNStyles.flexRowBetween,
      paddingVertical: hp(1.5),
      paddingBottom: hp(3),
    },
    Box: {
      width: wp(4),
      height: wp(4),
      borderWidth: 1,
      marginRight: wp(2),
      borderRadius: wp(1),
    },
    login: {
      width: wp(85),
      marginHorizontal: 0,
    },
    loginWith: {
      flex: 1,
      marginHorizontal: wp(1),
      backgroundColor: Colors.F1F5F9,
    },
    loginwithText: {
      color: Colors.Black,
      fontSize: FontSize.font14,
      fontFamily: FontFamily.Regular,
    },
    DontHaveAccount: {
      ...RNStyles.flexRow,
      alignSelf: 'center',
      paddingVertical: hp(1),
      color: Colors.N828282,
    },
  });
};

export default Login;
