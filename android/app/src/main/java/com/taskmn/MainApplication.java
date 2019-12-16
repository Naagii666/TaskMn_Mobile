package com.taskmn;

import android.app.Application;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
// import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage; 
import java.util.Arrays;
import java.util.List;
import com.filepicker.FilePickerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeRestartPackage(),
            // new RNDateTimePickerPackage(),
            new ImagePickerPackage(),
            new RCTSplashScreenPackage(),
            new ReactNativeIcons(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new AsyncStoragePackage(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new FilePickerPackage(),
            new RNDateTimePickerPackage()
            // new RCTSplashScreenPackage()
      );
    }
    
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
