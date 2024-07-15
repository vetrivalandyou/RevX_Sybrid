#import "AppDelegate.h"
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>

#import <GoogleMaps/GoogleMaps.h>

#import <RNFBDynamicLinksAppDelegateInterceptor.h> 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNFBDynamicLinksAppDelegateInterceptor sharedInstance];
  if([FIRApp defaultApp] == nil){
    [FIRApp configure];
  }
  [GMSServices provideAPIKey:@"AIzaSyBBa3zOSl9VtdV4EqNfgRs2x0x20e_neW0"];
  self.moduleName = @"RevXMobileApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
